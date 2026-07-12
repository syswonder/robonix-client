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


class AudioReverseBridge:
    def __init__(self, endpoint: str, local_port: int = 60000) -> None:
        self.endpoint = self._normalize_endpoint(endpoint)
        self.local_port = local_port
        self._stop = threading.Event()
        self._thread: threading.Thread | None = None
        self._loop: asyncio.AbstractEventLoop | None = None
        self._robot = None
        self._connected = threading.Event()
        self._lock = threading.Lock()
        self._last_error = ""

    def start(self) -> None:
        if self._thread and self._thread.is_alive():
            return
        self._stop.clear()
        self._thread = threading.Thread(target=self._run, name="robonix-client-audio", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        loop = self._loop
        robot = self._robot
        if loop is not None and robot is not None and loop.is_running():
            asyncio.run_coroutine_threadsafe(robot.close(code=1001, reason="client shutting down"), loop)
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=3.0)
        self._thread = None

    @staticmethod
    def _normalize_endpoint(endpoint: str) -> str:
        target = endpoint.strip()
        if not target.startswith(("ws://", "wss://")):
            raise ValueError("reverse audio endpoint must use ws:// or wss://")
        if not target.endswith("/client"):
            raise ValueError("reverse audio endpoint must end with /client")
        return target

    def set_target(self, endpoint: str) -> None:
        target = self._normalize_endpoint(endpoint)
        with self._lock:
            changed = target != self.endpoint
            self.endpoint = target
            robot = self._robot
            loop = self._loop
        if changed and robot is not None and loop is not None and loop.is_running():
            asyncio.run_coroutine_threadsafe(robot.close(code=1012, reason="robot target changed"), loop)

    def status(self) -> dict[str, object]:
        with self._lock:
            target = self.endpoint
            error = self._last_error
        return {"connected": self._connected.is_set(), "target": target, "lastError": error}

    def _run(self) -> None:
        asyncio.run(self._run_async())

    async def _run_async(self) -> None:
        self._loop = asyncio.get_running_loop()
        while not self._stop.is_set():
            with self._lock:
                target = self.endpoint
            try:
                async with websockets.connect(target, max_size=None, proxy=None, open_timeout=3.0) as robot:
                    with self._lock:
                        self._robot = robot
                        self._last_error = ""
                    self._connected.set()
                    log.info("audio relay connected to %s", target)
                    await robot.send(json.dumps({"type": "hello", "role": "robonix-client"}))
                    await self._relay(robot)
            except Exception as exc:  # noqa: BLE001
                with self._lock:
                    self._last_error = str(exc)
                log.debug("audio relay reconnect to %s: %s", target, exc)
            finally:
                with self._lock:
                    self._robot = None
                self._connected.clear()
            if not self._stop.is_set():
                await asyncio.sleep(1.0)
        self._loop = None

    async def _relay(self, robot) -> None:
        send_lock = asyncio.Lock()
        mic_task: asyncio.Task | None = None
        speaker = None

        async def stop_mic() -> None:
            nonlocal mic_task
            if mic_task is None:
                return
            mic_task.cancel()
            with suppress(asyncio.CancelledError, Exception):
                await mic_task
            mic_task = None

        async def start_mic() -> None:
            nonlocal mic_task
            await stop_mic()

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
                            await robot.send(json.dumps({"type": "mic_end"}))

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
                    await start_mic()
                elif command.get("type") == "mic_stop":
                    await stop_mic()
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
