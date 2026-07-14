from __future__ import annotations

import asyncio
import importlib
import json
import os
import platform
import socket
import subprocess
import sys
import threading
from pathlib import Path
from typing import Any

import websockets

DEFAULT_BRIDGE_HOST = os.environ.get("ROBONIX_CLIENT_AUDIO_SERVER_HOST") or os.environ.get("ROBONIX_CLIENT_AUDIO_BRIDGE_HOST", "127.0.0.1")
DEFAULT_BRIDGE_BIND_HOST = os.environ.get("ROBONIX_CLIENT_AUDIO_SERVER_BIND_HOST") or os.environ.get("ROBONIX_CLIENT_AUDIO_BRIDGE_BIND_HOST", "0.0.0.0")
DEFAULT_BRIDGE_PORT = int(os.environ.get("ROBONIX_CLIENT_AUDIO_SERVER_PORT") or os.environ.get("ROBONIX_CLIENT_AUDIO_BRIDGE_PORT", "60000"))
DEFAULT_UI_HOST = os.environ.get("ROBONIX_CLIENT_AUDIO_SERVER_UI_HOST") or os.environ.get("ROBONIX_CLIENT_AUDIO_BRIDGE_UI_HOST", "127.0.0.1")

_process: subprocess.Popen | None = None
_log_handle = None
_last_host = DEFAULT_BRIDGE_HOST
_last_port = DEFAULT_BRIDGE_PORT
_last_ui_host = DEFAULT_UI_HOST

SUPPORTED_AUDIO_PLATFORMS = {"Darwin", "Linux"}


def _audio_backend(system: str | None = None) -> str:
    current = system or platform.system()
    if current == "Darwin":
        return "PortAudio/CoreAudio"
    if current == "Linux":
        return "PortAudio/Linux"
    return "unsupported"


def _audio_install_hint(system: str | None = None) -> str:
    current = system or platform.system()
    if current == "Linux":
        return (
            "Install PortAudio and the client audio extra: "
            "sudo apt install libportaudio2 portaudio19-dev && "
            "pip install 'robonix-client[audio]'"
        )
    if current == "Darwin":
        return (
            "Install PortAudio and the client audio extra: "
            "brew install portaudio && pip install 'robonix-client[audio]'"
        )
    return "Local audio is supported on Linux and macOS."


async def health(host: str = DEFAULT_BRIDGE_HOST, port: int = DEFAULT_BRIDGE_PORT, timeout_s: float = 2.0) -> dict[str, Any]:
    url = f"ws://{host}:{port}/health"
    try:
        # The audio device server is a local/private bridge.  Do not let
        # HTTP_PROXY/ALL_PROXY capture its WebSocket health probe: when that
        # happens the probe reports an otherwise healthy local server as
        # unreachable and the UI never opens its VU stream.
        async with websockets.connect(url, open_timeout=timeout_s, proxy=None) as ws:
            msg = await asyncio.wait_for(ws.recv(), timeout=timeout_s)
            payload = json.loads(msg) if isinstance(msg, str) else {}
            payload["reachable"] = True
            payload["url"] = url
            return payload
    except Exception as exc:
        return {"reachable": False, "url": url, "error": str(exc)}


def _blocking_health(host: str, port: int, timeout_s: float) -> dict[str, Any]:
    result: dict[str, Any] = {}

    def probe() -> None:
        result.update(asyncio.run(health(host, port, timeout_s)))

    thread = threading.Thread(target=probe, name="robonix-audio-health", daemon=True)
    thread.start()
    thread.join(timeout_s + 0.5)
    if thread.is_alive():
        return {"reachable": False, "error": "health probe timed out"}
    return result


def start(
    host: str = DEFAULT_BRIDGE_BIND_HOST,
    port: int = DEFAULT_BRIDGE_PORT,
    ui_host: str = DEFAULT_UI_HOST,
) -> dict[str, Any]:
    global _process, _log_handle, _last_host, _last_port, _last_ui_host
    _last_host = DEFAULT_BRIDGE_HOST if host in {"", "0.0.0.0", "::"} else host
    _last_port = port
    _last_ui_host = ui_host or DEFAULT_UI_HOST
    if _process is not None and _process.poll() is None:
        return status(already_running=True)
    if _port_open(DEFAULT_BRIDGE_HOST, port):
        probe = _blocking_health(DEFAULT_BRIDGE_HOST, port, timeout_s=1.0)
        if probe.get("reachable"):
            return status(already_running=True, external=True)
        return {
            "ok": False,
            "running": False,
            "external": True,
            "error": (
                f"port {port} is occupied by an unresponsive audio server: "
                f"{probe.get('error') or 'health timeout'}"
            ),
        }

    system = platform.system()
    if system not in SUPPORTED_AUDIO_PLATFORMS:
        return {
            "ok": False,
            "running": False,
            "error": _audio_install_hint(system),
            "platform": system,
            "backend": _audio_backend(system),
        }
    try:
        importlib.import_module("sounddevice")
    except Exception as exc:  # noqa: BLE001 - optional native dependency
        return {
            "ok": False,
            "running": False,
            "error": (
                f"Local audio backend is unavailable ({exc}). "
                f"{_audio_install_hint(system)}"
            ),
            "platform": system,
            "backend": _audio_backend(system),
        }

    log_path = Path.home() / ".robonix-client" / "audio-device-server.log"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    _log_handle = log_path.open("a", encoding="utf-8")
    script = Path(__file__).parent / "audio_device_server" / "server_web.py"
    cmd = [
        sys.executable,
        str(script),
        "--host",
        host,
        "--port",
        str(port),
        "--ui-host",
        ui_host,
    ]
    try:
        _process = subprocess.Popen(
            cmd,
            stdout=_log_handle,
            stderr=subprocess.STDOUT,
            start_new_session=True,
        )
    except OSError as exc:
        _log_handle.close()
        _log_handle = None
        return {
            "ok": False,
            "running": False,
            "error": f"failed to start local audio device server: {exc}",
            "platform": system,
            "backend": _audio_backend(system),
            "logPath": str(log_path),
        }
    return status(log_path=log_path)


def stop() -> dict[str, Any]:
    global _process, _log_handle
    if _process is None or _process.poll() is not None:
        return {"ok": True, "running": False}
    _process.terminate()
    try:
        _process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        _process.kill()
    if _log_handle is not None:
        _log_handle.close()
        _log_handle = None
    return {"ok": True, "running": False}


def status(already_running: bool = False, external: bool = False, log_path: Path | None = None) -> dict[str, Any]:
    running = _process is not None and _process.poll() is None
    reachable_external = external or (not running and _port_open(DEFAULT_BRIDGE_HOST, _last_port))
    return {
        "ok": running or reachable_external,
        "running": running,
        "pid": _process.pid if running else None,
        "alreadyRunning": already_running,
        "external": reachable_external and not running,
        "wsUrl": f"ws://{_last_host}:{_last_port}",
        "uiUrl": f"http://{_last_ui_host}:{_last_port + 1}/",
        "logPath": str(log_path) if log_path else "",
        "platform": platform.system(),
        "backend": _audio_backend(),
    }


def _port_open(host: str, port: int, timeout_s: float = 0.2) -> bool:
    try:
        with socket.create_connection((host, port), timeout=timeout_s):
            return True
    except OSError:
        return False
