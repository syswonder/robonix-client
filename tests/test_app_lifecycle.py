from __future__ import annotations

import asyncio

import robonix_client.app as client_app


def test_shutdown_stops_reverse_bridge_before_owned_audio_server(monkeypatch) -> None:
    events: list[str] = []

    class FakeReverseBridge:
        def stop(self) -> None:
            events.append("reverse")

    monkeypatch.setattr(client_app, "_reverse_audio", FakeReverseBridge())
    monkeypatch.setattr(
        client_app.audio_server_control,
        "stop",
        lambda: events.append("server"),
    )

    asyncio.run(client_app.stop_client_audio())

    assert events == ["reverse", "server"]
    assert client_app._reverse_audio is None


def test_shutdown_stops_owned_audio_server_when_reverse_bridge_fails(
    monkeypatch,
) -> None:
    events: list[str] = []

    class FailingReverseBridge:
        def stop(self) -> None:
            events.append("reverse")
            raise RuntimeError("reverse stop failed")

    monkeypatch.setattr(client_app, "_reverse_audio", FailingReverseBridge())
    monkeypatch.setattr(
        client_app.audio_server_control,
        "stop",
        lambda: events.append("server"),
    )

    try:
        asyncio.run(client_app.stop_client_audio())
    except RuntimeError as exc:
        assert str(exc) == "reverse stop failed"
    else:
        raise AssertionError("reverse bridge failure was not propagated")

    assert events == ["reverse", "server"]
    assert client_app._reverse_audio is None
