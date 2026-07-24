from __future__ import annotations

import grpc
from fastapi import (
    APIRouter,
    HTTPException,
    Response,
    WebSocket,
    WebSocketDisconnect,
)
from pydantic import BaseModel

from .transport import ClientSettings
from .urdf_assets import urdf_asset_store
from .vitals_alerts import (
    AlertStillActiveError,
    VitalsAlertTracker,
    vitals_alert_store,
)
from .vitals_transport import stream_vitals_events

router = APIRouter()


class ResolveAlertRequest(BaseModel):
    operator: str = "operator"


@router.get("/api/vitals/urdf-assets/{resource_set_id}/{asset_path:path}")
async def urdf_asset(resource_set_id: str, asset_path: str) -> Response:
    """Serve one immutable resource that arrived with a Soma URDF."""
    try:
        asset = urdf_asset_store.get(resource_set_id, asset_path)
    except (KeyError, ValueError) as exc:
        raise HTTPException(status_code=404, detail="URDF asset not found") from exc
    return Response(
        content=asset.data,
        media_type=asset.media_type,
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff",
        },
    )


@router.get("/api/vitals/alerts")
async def list_vitals_alerts(include_resolved: bool = False) -> dict:
    """Return persisted Vitals incidents for the alert panel."""
    if include_resolved:
        return {"alerts": vitals_alert_store.list_alerts(include_resolved=True)}
    return vitals_alert_store.payload()


@router.post("/api/vitals/alerts/{alert_id}/resolve")
async def resolve_vitals_alert(
    alert_id: int,
    request: ResolveAlertRequest,
) -> dict:
    """Resolve a recovered incident after explicit operator confirmation."""
    try:
        resolved = vitals_alert_store.resolve(alert_id, request.operator)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Alert not found") from exc
    except AlertStillActiveError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    return {"resolved": resolved, **vitals_alert_store.payload()}


@router.post("/api/vitals/alerts/history/clear")
async def clear_vitals_alert_history(
    request: ResolveAlertRequest,
) -> dict:
    """Remove resolved incident history from the persistent alert database."""
    deleted = vitals_alert_store.clear_resolved_history()
    return {
        "deleted": deleted,
        "operator": request.operator.strip() or "operator",
        **vitals_alert_store.payload(),
    }


@router.websocket("/ws/vitals")
async def vitals_ws(ws: WebSocket) -> None:
    await ws.accept()
    try:
        payload = await ws.receive_json()
        settings = ClientSettings.from_payload(payload.get("settings"))
        await ws.send_json(
            {"type": "accepted", "atlasEndpoint": settings.atlas_endpoint}
        )
        await ws.send_json(
            {"type": "alerts", "data": vitals_alert_store.payload()}
        )
        alert_tracker = VitalsAlertTracker(vitals_alert_store)
        async for event in stream_vitals_events(settings):
            await ws.send_json(event)
            alert_event = alert_tracker.observe(event)
            if alert_event is not None:
                await ws.send_json(alert_event)
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
