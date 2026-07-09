from __future__ import annotations

import os
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import grpc
from fastapi import FastAPI, Query, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from . import audio_server_control
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


def _split_default_atlas(raw: str) -> tuple[str, int]:
    target = (raw or DEFAULT_ATLAS).strip()
    parsed = urlparse(target if "://" in target else f"grpc://{target}")
    host = parsed.hostname or "127.0.0.1"
    port = parsed.port or 50051
    return host, port


class AudioServerStartRequest(BaseModel):
    host: str = audio_server_control.DEFAULT_BRIDGE_BIND_HOST
    port: int = audio_server_control.DEFAULT_BRIDGE_PORT
    uiHost: str = audio_server_control.DEFAULT_UI_HOST


class EnrollRequest(BaseModel):
    settings: dict[str, Any] = {}
    userId: str
    userName: str = ""
    seconds: float = 6.0


class AudioPlayTestRequest(BaseModel):
    settings: dict[str, Any] = {}
    text: str = "Robonix speaker test"


def _payload_steer(payload: dict[str, Any]) -> bool:
    return bool(payload.get("steer") or payload.get("interactionMode") == "steer")


@app.get("/")
async def index() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/defaults")
async def defaults() -> dict[str, Any]:
    atlas_endpoint = os.environ.get("ROBONIX_ATLAS_ENDPOINT", DEFAULT_ATLAS)
    robot_host, atlas_port = _split_default_atlas(atlas_endpoint)
    launch_overrides = []
    for key in (
        "ROBONIX_ROBOT_HOST",
        "ROBONIX_ATLAS_PORT",
        "ROBONIX_CLIENT_USER_ID",
        "ROBONIX_CLIENT_SESSION_ID",
        "ROBONIX_CLIENT_SESSION_TITLE",
    ):
        if os.environ.get(key):
            launch_overrides.append(key)
    return {
        "atlasEndpoint": atlas_endpoint,
        "robotHost": os.environ.get("ROBONIX_ROBOT_HOST", robot_host),
        "atlasPort": int(os.environ.get("ROBONIX_ATLAS_PORT", str(atlas_port))),
        "liaisonEndpoint": os.environ.get("ROBONIX_LIAISON_ENDPOINT", ""),
        "userId": os.environ.get("ROBONIX_CLIENT_USER_ID", ""),
        "sessionId": os.environ.get("ROBONIX_CLIENT_SESSION_ID", ""),
        "sessionTitle": os.environ.get("ROBONIX_CLIENT_SESSION_TITLE", ""),
        "recordSeconds": int(os.environ.get("ROBONIX_CLIENT_RECORD_SECONDS", "30")),
        "ttsEnabled": os.environ.get("ROBONIX_CLIENT_TTS", "1").lower() not in {"0", "false", "no"},
        "audioServer": {
            "host": audio_server_control.DEFAULT_BRIDGE_HOST,
            "bindHost": audio_server_control.DEFAULT_BRIDGE_BIND_HOST,
            "port": audio_server_control.DEFAULT_BRIDGE_PORT,
            "uiHost": audio_server_control.DEFAULT_UI_HOST,
        },
        "launchOverrides": launch_overrides,
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


@app.post("/api/audio-server/start")
async def audio_server_start(req: AudioServerStartRequest) -> dict[str, Any]:
    return audio_server_control.start(req.host, req.port, req.uiHost)


@app.post("/api/audio-server/stop")
async def audio_server_stop() -> dict[str, Any]:
    return audio_server_control.stop()


@app.get("/api/audio-server/status")
async def audio_server_status() -> dict[str, Any]:
    return audio_server_control.status()


@app.get("/api/audio-server/health")
async def audio_server_health(
    host: str = Query(audio_server_control.DEFAULT_BRIDGE_HOST),
    port: int = Query(audio_server_control.DEFAULT_BRIDGE_PORT),
) -> dict[str, Any]:
    return await audio_server_control.health(host, port)


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
        steer = _payload_steer(payload)
        if not text and not attachments:
            await ws.send_json({"type": "error", "error": "empty task"})
            return
        await ws.send_json({"type": "accepted", "sessionId": settings.session_id})
        async for item in submit_text(settings, text, attachments, steer=steer):
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
        steer = _payload_steer(payload)
        await ws.send_json({"type": "accepted", "sessionId": settings.session_id})
        async for item in start_voice_session(settings, steer=steer):
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
