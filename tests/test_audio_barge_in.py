from __future__ import annotations

import asyncio
import json

from robonix_client.audio_device_server import server_web


def test_speaker_stop_discards_buffer_without_drain(monkeypatch) -> None:
    lifecycle: list[str] = []

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

    assert lifecycle == ["start", "stop", "close"]

