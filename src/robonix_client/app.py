from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import grpc
from fastapi import FastAPI, Query, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from . import audio_bridge_control
from .transport import (
    DEFAULT_ATLAS,
    ClientSettings,
    enroll_voiceprint,
    notify_session_end,
    play_tts_test,
    start_voice_session,
    submit_text,
    system_snapshot,
)

STATIC_DIR = Path(__file__).with_name("static")

app = FastAPI(title="Robonix Client", version="0.1.0")
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class BridgeStartRequest(BaseModel):
    host: str = "0.0.0.0"
    port: int = 60000
    uiHost: str = "127.0.0.1"


class EnrollRequest(BaseModel):
    settings: dict[str, Any] = {}
    userId: str
    userName: str = ""
    seconds: float = 6.0


class AudioPlayTestRequest(BaseModel):
    settings: dict[str, Any] = {}
    text: str = "Robonix speaker test"


@app.get("/")
async def index() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/defaults")
async def defaults() -> dict[str, Any]:
    return {
        "atlasEndpoint": os.environ.get("ROBONIX_ATLAS_ENDPOINT", DEFAULT_ATLAS),
        "liaisonEndpoint": os.environ.get("ROBONIX_LIAISON_ENDPOINT", ""),
        "userId": os.environ.get("ROBONIX_CLIENT_USER_ID", ""),
        "recordSeconds": int(os.environ.get("ROBONIX_CLIENT_RECORD_SECONDS", "30")),
        "ttsEnabled": os.environ.get("ROBONIX_CLIENT_TTS", "1").lower() not in {"0", "false", "no"},
    }


@app.get("/api/system")
async def system(atlas: str = Query(DEFAULT_ATLAS)) -> dict[str, Any]:
    try:
        return await system_snapshot(atlas)
    except Exception as exc:
        return {
            "atlasEndpoint": atlas,
            "summary": {"providers": 0, "active": 0, "errors": 1, "terminated": 0, "state": "offline"},
            "requiredContracts": [],
            "providers": [],
            "error": str(exc),
        }


@app.post("/api/audio-bridge/start")
async def audio_bridge_start(req: BridgeStartRequest) -> dict[str, Any]:
    return audio_bridge_control.start(req.host, req.port, req.uiHost)


@app.post("/api/audio-bridge/stop")
async def audio_bridge_stop() -> dict[str, Any]:
    return audio_bridge_control.stop()


@app.get("/api/audio-bridge/health")
async def audio_bridge_health(host: str = Query("127.0.0.1"), port: int = Query(60000)) -> dict[str, Any]:
    return await audio_bridge_control.health(host, port)


@app.post("/api/voiceprint/enroll")
async def voiceprint_enroll(req: EnrollRequest) -> dict[str, Any]:
    try:
        settings = ClientSettings.from_payload(req.settings)
        return await enroll_voiceprint(settings, req.userId, req.userName, req.seconds)
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


@app.post("/api/audio/play-test")
async def audio_play_test(req: AudioPlayTestRequest) -> dict[str, Any]:
    try:
        settings = ClientSettings.from_payload(req.settings)
        return await play_tts_test(settings, req.text)
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


@app.websocket("/ws/task")
async def task_ws(ws: WebSocket) -> None:
    await ws.accept()
    try:
        payload = await ws.receive_json()
        settings = ClientSettings.from_payload(payload.get("settings"))
        text = (payload.get("text") or "").strip()
        attachments = payload.get("attachments") or []
        if not text and not attachments:
            await ws.send_json({"type": "error", "error": "empty task"})
            return
        await ws.send_json({"type": "accepted", "sessionId": settings.session_id})
        async for item in submit_text(settings, text, attachments):
            await ws.send_json(item)
        await ws.send_json({"type": "done"})
    except WebSocketDisconnect:
        return
    except grpc.aio.AioRpcError as exc:
        await _send_error(ws, f"gRPC {exc.code().name}: {exc.details()}")
    except Exception as exc:
        await _send_error(ws, str(exc))


@app.websocket("/ws/voice")
async def voice_ws(ws: WebSocket) -> None:
    await ws.accept()
    try:
        payload = await ws.receive_json()
        settings = ClientSettings.from_payload(payload.get("settings"))
        await ws.send_json({"type": "accepted", "sessionId": settings.session_id})
        async for item in start_voice_session(settings):
            await ws.send_json(item)
        await ws.send_json({"type": "done"})
    except WebSocketDisconnect:
        return
    except grpc.aio.AioRpcError as exc:
        await _send_error(ws, f"gRPC {exc.code().name}: {exc.details()}")
    except Exception as exc:
        await _send_error(ws, str(exc))


@app.websocket("/ws/session-end")
async def session_end_ws(ws: WebSocket) -> None:
    await ws.accept()
    try:
        payload = await ws.receive_json()
        settings = ClientSettings.from_payload(payload.get("settings"))
        await notify_session_end(settings)
        await ws.send_json({"type": "done"})
    except Exception as exc:
        await _send_error(ws, str(exc))


async def _send_error(ws: WebSocket, message: str) -> None:
    try:
        await ws.send_json({"type": "error", "error": message})
    except RuntimeError:
        pass
