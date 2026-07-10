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
from .audio_reverse_bridge import AudioReverseBridge
from .transport import (
    DEFAULT_ATLAS,
    ClientSettings,
    discover_audio_bridge,
    enroll_voiceprint,
    get_handsfree_status,
    list_audio_devices,
    list_audio_providers,
    notify_session_end,
    play_tts_test,
    select_audio_device,
    start_voice_session,
    set_handsfree_enabled,
    submit_text,
    system_snapshot,
)

STATIC_DIR = Path(__file__).with_name("static")

app = FastAPI(title="Robonix Client", version="0.1.0")
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
_reverse_audio: AudioReverseBridge | None = None


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


class AudioReverseConnectRequest(BaseModel):
    settings: dict[str, Any] = {}
    providerId: str


class HandsfreeSetRequest(BaseModel):
    settings: dict[str, Any] = {}
    enabled: bool


class ClientSettingsRequest(BaseModel):
    settings: dict[str, Any] = {}


class AudioProviderDevicesRequest(BaseModel):
    settings: dict[str, Any] = {}
    providerId: str


class AudioRouteApplyRequest(BaseModel):
    settings: dict[str, Any] = {}


def _payload_steer(payload: dict[str, Any]) -> bool:
    return bool(payload.get("steer") or payload.get("interactionMode") == "steer")


@app.on_event("startup")
async def start_client_audio() -> None:
    """Start local device I/O. The robot endpoint is Atlas-discovered later."""
    if os.environ.get("ROBONIX_CLIENT_REVERSE_AUDIO", "1").lower() in {"0", "false", "no"}:
        return
    audio_server_control.start()


@app.on_event("shutdown")
async def stop_client_audio() -> None:
    global _reverse_audio
    if _reverse_audio is not None:
        _reverse_audio.stop()
        _reverse_audio = None


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
        "ROBONIX_CLIENT_MIC_NODE_ID",
        "ROBONIX_CLIENT_MIC_DEVICE_ID",
        "ROBONIX_CLIENT_SPEAKER_NODE_ID",
        "ROBONIX_CLIENT_SPEAKER_DEVICE_ID",
        "ROBONIX_CLIENT_TTS_NODE_ID",
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
        "micNodeId": os.environ.get("ROBONIX_CLIENT_MIC_NODE_ID", ""),
        "micDeviceId": os.environ.get("ROBONIX_CLIENT_MIC_DEVICE_ID", ""),
        "speakerNodeId": os.environ.get("ROBONIX_CLIENT_SPEAKER_NODE_ID", ""),
        "speakerDeviceId": os.environ.get("ROBONIX_CLIENT_SPEAKER_DEVICE_ID", ""),
        "ttsNodeId": os.environ.get("ROBONIX_CLIENT_TTS_NODE_ID", ""),
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


@app.post("/api/handsfree/set")
async def handsfree_set(req: HandsfreeSetRequest) -> dict[str, Any]:
    try:
        settings = ClientSettings.from_payload(req.settings)
        bridge = await _connect_selected_reverse_audio(settings) if req.enabled else None
        response = await set_handsfree_enabled(settings, req.enabled)
        if bridge is not None:
            response["audioBridge"] = bridge
        return response
    except Exception as exc:
        return {"available": False, "ok": False, "enabled": False, "state": "unavailable", "error": str(exc)}


@app.post("/api/handsfree/status")
async def handsfree_status(req: ClientSettingsRequest) -> dict[str, Any]:
    try:
        return await get_handsfree_status(ClientSettings.from_payload(req.settings))
    except Exception as exc:
        return {"available": False, "enabled": False, "state": "unavailable", "error": str(exc)}


@app.post("/api/audio-route/providers")
async def audio_route_providers(req: ClientSettingsRequest) -> dict[str, Any]:
    try:
        return await list_audio_providers(ClientSettings.from_payload(req.settings))
    except Exception as exc:
        return {"micProviders": [], "speakerProviders": [], "error": str(exc)}


@app.post("/api/audio-route/devices")
async def audio_route_devices(req: AudioProviderDevicesRequest) -> dict[str, Any]:
    try:
        return await list_audio_devices(ClientSettings.from_payload(req.settings), req.providerId)
    except Exception as exc:
        return {"providerId": req.providerId, "devices": [], "error": str(exc)}


@app.post("/api/audio-route/apply")
async def audio_route_apply(req: AudioRouteApplyRequest) -> dict[str, Any]:
    try:
        settings = ClientSettings.from_payload(req.settings)
        selected: list[dict[str, Any]] = []
        if settings.mic_node_id and settings.mic_device_id:
            selected.append(
                await select_audio_device(
                    settings,
                    settings.mic_node_id,
                    "input",
                    settings.mic_device_id,
                )
            )
        if settings.speaker_node_id and settings.speaker_device_id:
            selected.append(
                await select_audio_device(
                    settings,
                    settings.speaker_node_id,
                    "output",
                    settings.speaker_device_id,
                )
            )
        return {"ok": True, "selected": selected}
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


@app.post("/api/audio-server/start")
async def audio_server_start(req: AudioServerStartRequest) -> dict[str, Any]:
    return audio_server_control.start(req.host, req.port, req.uiHost)


@app.post("/api/audio-server/stop")
async def audio_server_stop() -> dict[str, Any]:
    return audio_server_control.stop()


@app.get("/api/audio-server/status")
async def audio_server_status() -> dict[str, Any]:
    return audio_server_control.status()


@app.post("/api/audio-reverse/connect")
async def audio_reverse_connect(req: AudioReverseConnectRequest) -> dict[str, Any]:
    try:
        bridge = await _connect_reverse_audio(
            ClientSettings.from_payload(req.settings), req.providerId
        )
        return {"ok": True, **bridge}
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


@app.get("/api/audio-reverse/status")
async def audio_reverse_status() -> dict[str, Any]:
    if _reverse_audio is None:
        return {"connected": False, "target": "", "lastError": "reverse audio is disabled"}
    return _reverse_audio.status()


async def _connect_reverse_audio(settings: ClientSettings, provider_id: str) -> dict[str, Any]:
    """Discover and connect one selected reverse-audio provider via Atlas."""
    global _reverse_audio
    bridge = await discover_audio_bridge(settings, provider_id)
    if _reverse_audio is None:
        _reverse_audio = AudioReverseBridge(
            bridge["endpoint"], audio_server_control.DEFAULT_BRIDGE_PORT
        )
        _reverse_audio.start()
    else:
        _reverse_audio.set_target(bridge["endpoint"])
    return {**bridge, **_reverse_audio.status()}


async def _connect_selected_reverse_audio(settings: ClientSettings) -> dict[str, Any] | None:
    """Connect only when the current audio route selects an Atlas bridge.

    Device selection remains provider-agnostic: a robot USB driver needs no
    client-side connection, while a reverse bridge is discovered from its
    declared capability rather than a provider name or fixed port.
    """
    selected = [
        provider_id
        for provider_id in (settings.mic_node_id, settings.speaker_node_id)
        if provider_id
    ]
    if not selected:
        return None
    providers = await list_audio_providers(settings)
    bridge_ids = {
        str(provider.get("id") or "")
        for provider in providers.get("bridgeProviders", [])
        if isinstance(provider, dict)
    }
    for provider_id in selected:
        if provider_id in bridge_ids:
            return await _connect_reverse_audio(settings, provider_id)
    return None


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
