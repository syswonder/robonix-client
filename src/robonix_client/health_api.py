"""Compute-node telemetry panel, driven by the Vitals snapshot stream.

Reads the shared `robonix/system/vitals/stream` contract and projects compute-
node metrics into the flat shape consumed by the browser panel. When Vitals is
unreachable, or the stream carries no compute-node signals, the adapter reports
`source=unavailable` and stops so the browser keeps the panel hidden.
"""

from __future__ import annotations

import asyncio
import time
from typing import Any, AsyncIterator

import grpc
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from .proto import vitals_client_pb2
from .transport import ClientSettings, discover_endpoint, stream_channel
from .vitals_transport import CONTRACT_VITALS_STREAM, VITALS_STREAM_PATH

router = APIRouter()

CPU_TEMP_SIGNAL = "body/compute_node/cpu/temperature"
INPUT_VOLTAGE_SIGNAL = "body/compute_node/input_power/voltage"
INPUT_CURRENT_SIGNAL = "body/compute_node/input_power/current"
COMPUTE_NODE_SIGNALS = ("cpuTemp", "voltage", "current")
COMPUTE_NODE_GRACE_S = 8.0


def _error_text(exc: BaseException) -> str:
    if isinstance(exc, grpc.aio.AioRpcError):
        return f"gRPC {exc.code().name}: {exc.details()}"
    return str(exc) or exc.__class__.__name__


def _positive(value: float) -> float | None:
    """Return the value, or None for Vitals' -1 'unknown' sentinel."""
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if number >= 0 else None


def compute_node_sample(snapshot: vitals_client_pb2.VitalsSnapshot) -> dict[str, Any]:
    """Project one Vitals snapshot into the browser's flat sample shape."""
    by_name = {entry.name: entry.value for entry in snapshot.components}
    return {
        "ts": int(time.time() * 1000),
        "cpuTemp": _positive(by_name.get(CPU_TEMP_SIGNAL)),
        "voltage": _positive(by_name.get(INPUT_VOLTAGE_SIGNAL)),
        "current": _positive(by_name.get(INPUT_CURRENT_SIGNAL)),
    }


async def _stream_vitals(
    settings: ClientSettings,
) -> AsyncIterator[dict[str, Any]]:
    """Relay live compute-node readings from the Vitals snapshot stream."""
    endpoint = await discover_endpoint(settings.atlas_endpoint, CONTRACT_VITALS_STREAM)
    async with stream_channel(endpoint) as channel:
        call = channel.unary_stream(
            VITALS_STREAM_PATH,
            request_serializer=vitals_client_pb2.StreamVitals_Request.SerializeToString,
            response_deserializer=vitals_client_pb2.VitalsSnapshot.FromString,
        )
        async for snapshot in call(vitals_client_pb2.StreamVitals_Request()):
            yield {
                "type": "sample",
                "source": "vitals",
                "data": compute_node_sample(snapshot),
            }


async def stream_health_events(settings: ClientSettings) -> AsyncIterator[dict[str, Any]]:
    """Yield browser-ready events and merge partial component snapshots."""
    yield {"type": "accepted", "contract": CONTRACT_VITALS_STREAM}
    retry_seconds = 1.0
    while True:
        latest: dict[str, Any] = {key: None for key in COMPUTE_NODE_SIGNALS}
        deadline = time.monotonic() + COMPUTE_NODE_GRACE_S
        try:
            async for event in _stream_vitals(settings):
                sample = event["data"]
                for key in COMPUTE_NODE_SIGNALS:
                    if sample[key] is not None:
                        latest[key] = sample[key]
                if any(value is not None for value in latest.values()):
                    retry_seconds = 1.0
                    yield {
                        "type": "sample",
                        "source": "vitals",
                        "data": {"ts": sample["ts"], **latest},
                    }
                elif time.monotonic() > deadline:
                    yield {
                        "type": "source",
                        "source": "unavailable",
                        "error": "Vitals stream carries no compute-node signals",
                    }
                    return
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            yield {
                "type": "source",
                "source": "connecting",
                "error": f"Vitals stream unavailable: {_error_text(exc)}",
            }
        await asyncio.sleep(retry_seconds)
        retry_seconds = min(retry_seconds * 2.0, 15.0)


@router.websocket("/ws/health")
async def health_ws(ws: WebSocket) -> None:
    await ws.accept()
    try:
        payload = await ws.receive_json()
        settings = ClientSettings.from_payload(payload.get("settings"))
        await ws.send_json({"type": "source", "source": "connecting"})
        async for event in stream_health_events(settings):
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
