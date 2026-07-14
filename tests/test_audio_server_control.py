from __future__ import annotations

import asyncio
import json
from pathlib import Path

from robonix_client import audio_server_control


def _reset_audio_process() -> None:
    if audio_server_control._log_handle is not None:
        audio_server_control._log_handle.close()
    audio_server_control._process = None
    audio_server_control._log_handle = None


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


def test_start_supports_linux_portaudio(monkeypatch, tmp_path) -> None:
    _reset_audio_process()
    captured: dict[str, object] = {}

    class FakeProcess:
        pid = 1234

        def poll(self):
            return None

    def fake_popen(cmd, **kwargs):
        captured["cmd"] = cmd
        captured.update(kwargs)
        return FakeProcess()

    monkeypatch.setattr(audio_server_control.platform, "system", lambda: "Linux")
    monkeypatch.setattr(audio_server_control.importlib, "import_module", lambda _name: object())
    monkeypatch.setattr(audio_server_control, "_port_open", lambda *_args, **_kwargs: False)
    monkeypatch.setattr(Path, "home", staticmethod(lambda: tmp_path))
    monkeypatch.setattr(audio_server_control.subprocess, "Popen", fake_popen)

    result = audio_server_control.start(port=60100)

    assert result["ok"] is True
    assert result["platform"] == "Linux"
    assert result["backend"] == "PortAudio/Linux"
    assert result["pid"] == 1234
    assert captured["cmd"][0] == audio_server_control.sys.executable
    assert "server_web.py" in captured["cmd"][1]
    assert captured["cmd"][-2:] == ["--ui-host", audio_server_control.DEFAULT_UI_HOST]
    _reset_audio_process()


def test_start_reports_linux_audio_dependency(monkeypatch) -> None:
    _reset_audio_process()
    monkeypatch.setattr(audio_server_control.platform, "system", lambda: "Linux")
    def missing_sounddevice(_name):
        raise ModuleNotFoundError("No module named 'sounddevice'")

    monkeypatch.setattr(audio_server_control.importlib, "import_module", missing_sounddevice)
    monkeypatch.setattr(audio_server_control, "_port_open", lambda *_args, **_kwargs: False)

    result = audio_server_control.start()

    assert result["ok"] is False
    assert "sounddevice" in result["error"]
    assert "apt install" in result["error"]


def test_start_rejects_unsupported_local_audio_platform(monkeypatch) -> None:
    _reset_audio_process()
    monkeypatch.setattr(audio_server_control.platform, "system", lambda: "Windows")
    monkeypatch.setattr(audio_server_control, "_port_open", lambda *_args, **_kwargs: False)

    result = audio_server_control.start()

    assert result["ok"] is False
    assert result["backend"] == "unsupported"
    assert "Linux and macOS" in result["error"]
