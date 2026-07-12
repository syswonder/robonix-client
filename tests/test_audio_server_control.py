from __future__ import annotations

import asyncio
import json

from robonix_client import audio_server_control


def test_health_bypasses_environment_proxy(monkeypatch) -> None:
    captured: dict[str, object] = {}

    class FakeSocket:
        async def recv(self) -> str:
            return json.dumps({"ok": True})

    class FakeConnection:
        async def __aenter__(self) -> FakeSocket:
            return FakeSocket()

        async def __aexit__(self, *_args) -> None:
            return None

    def fake_connect(url: str, **kwargs):
        captured.update(url=url, **kwargs)
        return FakeConnection()

    monkeypatch.setattr(audio_server_control.websockets, "connect", fake_connect)

    result = asyncio.run(audio_server_control.health("127.0.0.1", 60000))

    assert result["reachable"] is True
    assert captured["url"] == "ws://127.0.0.1:60000/health"
    assert captured["proxy"] is None
