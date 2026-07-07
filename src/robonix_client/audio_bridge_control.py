from __future__ import annotations

import asyncio
import json
import platform
import subprocess
import sys
from pathlib import Path
from typing import Any

import websockets

_process: subprocess.Popen | None = None
_log_handle = None


async def health(host: str = "127.0.0.1", port: int = 60000, timeout_s: float = 2.0) -> dict[str, Any]:
    url = f"ws://{host}:{port}/health"
    try:
        async with websockets.connect(url, open_timeout=timeout_s) as ws:
            msg = await asyncio.wait_for(ws.recv(), timeout=timeout_s)
            payload = json.loads(msg) if isinstance(msg, str) else {}
            payload["reachable"] = True
            payload["url"] = url
            return payload
    except Exception as exc:
        return {"reachable": False, "url": url, "error": str(exc)}


def start(
    host: str = "0.0.0.0",
    port: int = 60000,
    ui_host: str = "127.0.0.1",
) -> dict[str, Any]:
    global _process, _log_handle
    if _process is not None and _process.poll() is None:
        return _status(port, already_running=True)

    if platform.system() != "Darwin":
        return {
            "ok": False,
            "error": "The bundled audio bridge is intended to run on macOS with CoreAudio.",
            "platform": platform.system(),
        }

    log_path = Path.home() / ".robonix-client" / "audio-bridge.log"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    _log_handle = log_path.open("a", encoding="utf-8")
    script = Path(__file__).parent / "audio_bridge" / "server_web.py"
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
    _process = subprocess.Popen(
        cmd,
        stdout=_log_handle,
        stderr=subprocess.STDOUT,
        start_new_session=True,
    )
    return _status(port, log_path=log_path)


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


def _status(port: int, already_running: bool = False, log_path: Path | None = None) -> dict[str, Any]:
    running = _process is not None and _process.poll() is None
    return {
        "ok": running,
        "running": running,
        "pid": _process.pid if running else None,
        "alreadyRunning": already_running,
        "wsUrl": f"ws://127.0.0.1:{port}",
        "uiUrl": f"http://127.0.0.1:{port + 1}/",
        "logPath": str(log_path) if log_path else "",
    }

