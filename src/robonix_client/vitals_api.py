from __future__ import annotations

import grpc
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from .transport import ClientSettings
from .vitals_transport import stream_vitals_events

router = APIRouter()


@router.websocket("/ws/vitals")
async def vitals_ws(ws: WebSocket) -> None:
    await ws.accept()
    try:
        payload = await ws.receive_json()
        settings = ClientSettings.from_payload(payload.get("settings"))
        await ws.send_json(
            {"type": "accepted", "atlasEndpoint": settings.atlas_endpoint}
        )
        async for event in stream_vitals_events(settings):
            await ws.send_json(event)
    except WebSocketDisconnect:
        return
    except grpc.aio.AioRpcError as exc:
        await _send_error(ws, f"gRPC {exc.code().name}: {exc.details()}")
    except Exception as exc:
        await _send_error(ws, str(exc))


async def _send_error(ws: WebSocket, message: str) -> None:
    try:
        await ws.send_json({"type": "error", "error": message})
    except (RuntimeError, WebSocketDisconnect):
        pass
