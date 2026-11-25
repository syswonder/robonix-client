"""Reverse client-audio transport.

The client connects outward to the selected robot and relays its loopback
audio-device server. The robot therefore never needs a client IP or port in a
deployment manifest.
"""
from __future__ import annotations

import asyncio
import json
import logging
import threading
from contextlib import suppress

import websockets

log = logging.getLogger(__name__)

# The robot closes the previous client with this code and reason when another
# client connects. Reconnecting after it would just take the slot back and start
# a ping-pong with the other client.
REPLACED_CLOSE_CODE = 1012
REPLACED_CLOSE_REASON = "replaced by newer client"


class ReverseAudioBusy(RuntimeError):
    """The robot's single reverse-audio slot is held by another client."""

    def __init__(self, provider_id: str) -> None:
        super().__init__(f"audio bridge {provider_id} is in use by another client")
        self.provider_id = provider_id


def _was_replaced(exc: websockets.ConnectionClosed) -> bool:
    return (
        exc.rcvd is not None
        and exc.rcvd.code == REPLACED_CLOSE_CODE
        and REPLACED_CLOSE_REASON in exc.rcvd.reason
    )


class AudioReverseBridge:
    def __init__(self, endpoint: str, local_port: int = 60000) -> None:
        self.endpoint = self._normalize_endpoint(endpoint)
        self.local_port = local_port
        self._stop = threading.Event()
        self._thread: threading.Thread | None = None
        self._task: asyncio.Task | None = None
        self._connected_endpoint: str | None = None
        self._lock = threading.Lock()
        self._last_error = ""
        self._taken_over = False
        self._generation = 0

    def _disconnect_locked(self) -> threading.Thread | None:
        self._generation += 1
        thread, self._thread = self._thread, None
        task, self._task = self._task, None
        self._connected_endpoint = None
        if task is not None:
            task.get_loop().call_soon_threadsafe(task.cancel)
        return thread

    def disconnect(self) -> threading.Thread | None:
        with self._lock:
            self._stop.set()
            return self._disconnect_locked()

    def stop(self) -> None:
        thread = self.disconnect()
        if thread is not None:
            thread.join(timeout=3.0)

    @staticmethod
    def _normalize_endpoint(endpoint: str) -> str:
        target = endpoint.strip()
        if not target.startswith(("ws://", "wss://")):
            raise ValueError("reverse audio endpoint must use ws:// or wss://")
        if not target.endswith("/client"):
            raise ValueError("reverse audio endpoint must end with /client")
        return target

    def connect(self, endpoint: str) -> None:
        target = self._normalize_endpoint(endpoint)
        with self._lock:
            if target == self.endpoint and self._thread and self._thread.is_alive() and not self._taken_over:
                return
            self._disconnect_locked()
            self.endpoint = target
            self._last_error = ""
            self._taken_over = False
            self._stop.clear()
            self._thread = threading.Thread(
                target=self._run, args=(self._generation,), name="robonix-client-audio", daemon=True
            )
            self._thread.start()

    def holds(self, endpoint: str) -> bool:
        with self._lock:
            return not self._taken_over and self._connected_endpoint == self._normalize_endpoint(endpoint)

    def status(self) -> dict[str, object]:
        with self._lock:
            return {
                "connected": self._connected_endpoint == self.endpoint and not self._taken_over,
                "target": self.endpoint,
                "lastError": self._last_error,
                "takenOver": self._taken_over,
            }

    def _run(self, generation: int) -> None:
        with suppress(asyncio.CancelledError):
            asyncio.run(self._run_async(generation))

    async def _run_async(self, generation: int | None = None) -> None:
        task = asyncio.current_task()
        with self._lock:
            if generation is None:
                generation = self._generation
            if generation != self._generation:
                return
            self._task = task
            target = self.endpoint

        try:
            while not self._stop.is_set() and generation == self._generation:
                try:
                    async with websockets.connect(target, max_size=None, proxy=None, open_timeout=3.0) as robot:
                        await robot.send(json.dumps({"type": "hello", "role": "robonix-client"}))
                        with self._lock:
                            if generation != self._generation:
                                return
                            self._connected_endpoint = target
                            self._last_error = ""
                        log.info("audio relay connected to %s", target)
                        await self._relay(robot)
                except Exception as exc:  # noqa: BLE001
                    replaced = isinstance(exc, websockets.ConnectionClosed) and _was_replaced(exc)
                    with self._lock:
                        if generation == self._generation:
                            self._taken_over = replaced
                            self._last_error = "taken over by another client" if replaced else str(exc)
                    if replaced:
                        log.info("audio relay on %s was taken over by another client", target)
                        return
                    log.debug("audio relay reconnect to %s: %s", target, exc)
                finally:
                    with self._lock:
                        if generation == self._generation:
                            self._connected_endpoint = None
                if not self._stop.is_set() and generation == self._generation:
                    await asyncio.sleep(1.0)
        finally:
            with self._lock:
                if self._task is task:
                    self._task = None

    async def _relay(self, robot) -> None:
        send_lock = asyncio.Lock()
        mic_task: asyncio.Task | None = None
        mic_stream_id = ""
        speaker = None

        async def stop_mic(expected_stream_id: str = "") -> None:
            nonlocal mic_task, mic_stream_id
            if mic_task is None:
                return
            if expected_stream_id and expected_stream_id != mic_stream_id:
                return
            mic_task.cancel()
            with suppress(asyncio.CancelledError, Exception):
                await mic_task
            mic_task = None
            mic_stream_id = ""

        async def start_mic(stream_id: str) -> None:
            nonlocal mic_task, mic_stream_id
            await stop_mic()
            mic_stream_id = stream_id

            async def pump() -> None:
                frames = 0
                try:
                    async with websockets.connect(
                        f"ws://127.0.0.1:{self.local_port}/mic", max_size=None, proxy=None
                    ) as mic:
                        async for frame in mic:
                            if isinstance(frame, bytes):
                                frames += 1
                                if frames == 1:
                                    log.info("audio relay received first microphone frame (%d bytes)", len(frame))
                                async with send_lock:
                                    await robot.send(frame)
                except Exception as exc:  # noqa: BLE001
                    log.warning("audio relay microphone pump failed after %d frame(s): %s", frames, exc)
                finally:
                    log.info("audio relay microphone pump finished after %d frame(s)", frames)
                    with suppress(Exception):
                        async with send_lock:
                            await robot.send(json.dumps({"type": "mic_end", "stream_id": stream_id}))

            mic_task = asyncio.create_task(pump())

        async def send_speaker(frame: bytes) -> None:
            nonlocal speaker
            if speaker is None:
                speaker = await websockets.connect(
                    f"ws://127.0.0.1:{self.local_port}/speaker", max_size=None, proxy=None
                )
            await speaker.send(frame)

        async def close_speaker(*, interrupt: bool = False) -> None:
            nonlocal speaker
            if speaker is not None:
                if interrupt:
                    with suppress(Exception):
                        await speaker.send(json.dumps({"type": "stop"}))
                await speaker.close()
                speaker = None

        async def local_control(op: str, payload: dict) -> dict:
            if op == "list_devices":
                path = "/devices"
                body = None
            elif op == "select_device":
                path = "/set_device"
                body = payload
            else:
                raise ValueError(f"unknown robot audio control operation: {op}")
            async with websockets.connect(
                f"ws://127.0.0.1:{self.local_port}{path}", max_size=None, proxy=None
            ) as local:
                if body is not None:
                    await local.send(json.dumps(body))
                message = await local.recv()
            if not isinstance(message, str):
                raise RuntimeError("local audio control returned binary data")
            result = json.loads(message)
            if not isinstance(result, dict):
                raise RuntimeError("local audio control returned invalid JSON")
            return result

        try:
            async for message in robot:
                if isinstance(message, bytes):
                    await send_speaker(message)
                    continue
                try:
                    command = json.loads(message)
                except json.JSONDecodeError:
                    continue
                if command.get("type") == "mic_start":
                    await start_mic(str(command.get("stream_id") or ""))
                elif command.get("type") == "mic_stop":
                    await stop_mic(str(command.get("stream_id") or ""))
                elif command.get("type") == "speaker_end":
                    await close_speaker()
                elif command.get("type") == "speaker_stop":
                    await close_speaker(interrupt=True)
                elif command.get("type") == "control_request":
                    request_id = str(command.get("id") or "")
                    try:
                        result = await local_control(
                            str(command.get("op") or ""),
                            command.get("payload") if isinstance(command.get("payload"), dict) else {},
                        )
                    except Exception as exc:  # noqa: BLE001
                        result = {"ok": False, "error": str(exc)}
                    response = {"type": "control_response", "id": request_id, **result}
                    async with send_lock:
                        await robot.send(json.dumps(response))
        finally:
            await stop_mic()
            await close_speaker()
