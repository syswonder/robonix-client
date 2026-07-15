from __future__ import annotations

import asyncio
import json

from robonix_client.audio_device_server import server_web


def test_pcm_peak_level_tracks_s16_output() -> None:
    assert server_web._pcm_peak_level(b"") == 0.0
    assert server_web._pcm_peak_level(b"\x00\x00\x00\x40") == 0.5
    assert server_web._pcm_peak_level(b"\x00\x80") == 1.0


def test_speaker_stop_discards_buffer_without_drain(monkeypatch) -> None:
    lifecycle: list[str] = []

    class FakeStream:
        def __init__(self, **_kwargs) -> None:
            pass

        def start(self) -> None:
            lifecycle.append("start")

        def stop(self) -> None:
            lifecycle.append("stop")

        def abort(self) -> None:
            lifecycle.append("abort")

        def close(self) -> None:
            lifecycle.append("close")

    class FakeWebSocket:
        remote_address = ("127.0.0.1", 1)

        def __init__(self) -> None:
            self._messages = iter(
                [b"queued speech that must not finish", json.dumps({"type": "stop"})]
            )

        def __aiter__(self):
            return self

        async def __anext__(self):
            try:
                return next(self._messages)
            except StopIteration as exc:
                raise StopAsyncIteration from exc

    monkeypatch.setattr(server_web.sd, "RawOutputStream", FakeStream)
    monkeypatch.setattr(server_web, "pick_output_device", lambda _explicit: None)

    asyncio.run(asyncio.wait_for(server_web.serve_speaker(FakeWebSocket()), timeout=0.5))

    assert lifecycle == ["start", "abort", "close"]


def test_speaker_eof_clears_level_after_output_drain(monkeypatch) -> None:
    lifecycle: list[str] = []
    original_set_state = server_web._set_state

    class FakeStream:
        def __init__(self, **_kwargs) -> None:
            pass

        def start(self) -> None:
            lifecycle.append("start")

        def stop(self) -> None:
            lifecycle.append("stop")

        def close(self) -> None:
            lifecycle.append("close")

    class FakeWebSocket:
        remote_address = ("127.0.0.1", 1)

        def __aiter__(self):
            return self

        async def __anext__(self):
            raise StopAsyncIteration

    def record_set_state(key, value) -> None:
        if key == "output_level":
            lifecycle.append(f"level:{value}")
        original_set_state(key, value)

    monkeypatch.setattr(server_web.sd, "RawOutputStream", FakeStream)
    monkeypatch.setattr(server_web, "pick_output_device", lambda _explicit: None)
    monkeypatch.setattr(server_web, "_set_state", record_set_state)

    asyncio.run(asyncio.wait_for(server_web.serve_speaker(FakeWebSocket()), timeout=0.5))

    assert lifecycle == ["level:0.0", "start", "stop", "level:0.0", "close"]
