from __future__ import annotations

import asyncio
import importlib
import json
import os
import platform
import signal
import socket
import subprocess
import sys
import threading
import time
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

SUPPORTED_AUDIO_PLATFORMS = {"Darwin", "Linux", "Windows"}


def _audio_backend(system: str | None = None) -> str:
    current = system or platform.system()
    if current == "Darwin":
        return "PortAudio/CoreAudio"
    if current == "Linux":
        return "PortAudio/Linux"
    if current == "Windows":
        return "PortAudio/WASAPI"
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
    if current == "Windows":
        return (
            "Install the client audio extra: "
            "pip install 'robonix-client[audio]'"
            "  (sounddevice ships its own PortAudio DLL on Windows, "
            "no system library required)"
        )
    return "Local audio is supported on Linux, macOS, and Windows."


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


def local_port() -> int:
    """Port of this machine's audio device server, as last started from this client."""
    return _last_port


async def _local_request(path: str, body: dict[str, Any] | None = None, timeout_s: float = 3.0) -> dict[str, Any]:
    """One request/response exchange with this machine's audio device server."""
    url = f"ws://{DEFAULT_BRIDGE_HOST}:{_last_port}{path}"
    async with websockets.connect(url, open_timeout=timeout_s, proxy=None) as ws:
        if body is not None:
            await ws.send(json.dumps(body))
        message = await asyncio.wait_for(ws.recv(), timeout=timeout_s)
    result = json.loads(message) if isinstance(message, str) else None
    if not isinstance(result, dict):
        raise RuntimeError(f"audio device server {path} returned an invalid response")
    return result


async def local_devices(provider_id: str) -> dict[str, Any]:
    """This machine's audio devices, in the shape the provider device list uses.

    A reverse bridge only forwards to whichever client holds it, so listing
    through the provider can show another client's devices. The local server
    is always this machine.
    """
    payload = await _local_request("/devices")
    devices = []
    for entry in payload.get("devices", []):
        in_ch = int(entry.get("max_input_channels", 0))
        out_ch = int(entry.get("max_output_channels", 0))
        if in_ch == 0 and out_ch == 0:
            continue
        name = str(entry.get("name", ""))
        kind = "duplex" if in_ch and out_ch else "input" if in_ch else "output"
        devices.append(
            {
                "id": str(entry["id"]),
                "name": name,
                "kind": kind,
                "isDefault": (kind != "output" and entry["id"] == payload.get("input_default"))
                or (kind != "input" and entry["id"] == payload.get("output_default")),
                "channels": max(in_ch, out_ch),
                "note": "bluetooth"
                if any(hint in name.lower() for hint in ("airpods", "bluetooth", "iphone", "ipad"))
                else "",
            }
        )
    current_in = payload.get("input_current")
    current_out = payload.get("output_current")
    return {
        "providerId": provider_id,
        "devices": devices,
        "currentInputId": "" if current_in is None else str(current_in),
        "currentOutputId": "" if current_out is None else str(current_out),
    }


async def select_local_device(kind: str, device_id: str) -> None:
    """Choose this machine's input or output device; blank restores the OS default."""
    if kind not in {"input", "output"}:
        raise ValueError(f"unsupported audio device kind: {kind}")
    raw = device_id.strip()
    if raw and not raw.lstrip("-").isdigit():
        # Silently turning an unknown id into the OS default would report a choice that was not made.
        raise ValueError(f"invalid {kind} device id: {device_id!r}")
    value: int | None = int(raw) if raw else None
    result = await _local_request("/set_device", {kind: value})
    if not result.get("ok"):
        raise RuntimeError(result.get("error") or f"audio device server rejected {kind} device")


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
        # Port held by something that doesn't answer /health -- almost
        # always a previous audio_device_server left behind by an unclean
        # client exit (start_new_session=True means it outlives a crashed
        # or SIGKILLed parent). Force-reset instead of leaving the client
        # permanently stuck behind a dead port.
        if not _reset_stale_listener(port):
            return {
                "ok": False,
                "running": False,
                "external": True,
                "error": (
                    f"port {port} is occupied by an unresponsive audio server "
                    f"and it could not be reset automatically: "
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
    try:
        if _process is not None and _process.poll() is None:
            _process.terminate()
            try:
                _process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                _process.kill()
                _process.wait(timeout=5)
    finally:
        _process = None
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


def _pids_on_port(port: int) -> list[int]:
    """PIDs with *port* LISTENing. Best-effort; empty on unsupported platforms."""
    if platform.system() not in {"Darwin", "Linux"}:
        return []
    try:
        out = subprocess.run(
            ["lsof", "-ti", f":{port}", "-sTCP:LISTEN"],
            capture_output=True, text=True, timeout=3,
        )
    except (OSError, subprocess.TimeoutExpired):
        return []
    return [int(pid) for pid in out.stdout.split() if pid.strip().isdigit()]


def _reset_stale_listener(port: int, timeout_s: float = 5.0) -> bool:
    """SIGTERM (then SIGKILL) whatever is holding *port*. True once it's free."""
    pids = _pids_on_port(port)
    if not pids:
        return False
    for sig in (signal.SIGTERM, signal.SIGKILL):
        for pid in pids:
            try:
                os.kill(pid, sig)
            except ProcessLookupError:
                pass
            except PermissionError:
                return False
        deadline = time.monotonic() + (timeout_s if sig == signal.SIGTERM else 1.0)
        while time.monotonic() < deadline:
            if not _port_open(DEFAULT_BRIDGE_HOST, port, timeout_s=0.2):
                return True
            time.sleep(0.2)
    return not _port_open(DEFAULT_BRIDGE_HOST, port, timeout_s=0.2)
