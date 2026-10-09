"""Compute-node telemetry panel, driven by the Vitals snapshot stream.

Reads the shared `robonix/system/vitals/stream` contract (the same one behind
the Vitals page) and projects the compute-node metrics - CPU temperature and
input-power voltage/current - into the flat shape the browser panel renders.
When the stream is unreachable, or a snapshot carries no compute-node signals
(e.g. a deployment whose Soma model omits the component), the adapter reports
`source=unavailable` and stops, so the browser keeps the Compute Node panel
hidden.
"""

from __future__ import annotations

import asyncio
import time
from typing import Any, AsyncIterator

import grpc
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from .proto import vitals_client_pb2
from .transport import ClientSettings, discover_endpoint, grpc_channel
from .vitals_transport import CONTRACT_VITALS_STREAM, VITALS_STREAM_PATH

router = APIRouter()

# Signal names Vitals synthesizes for the compute-node metrics: the Soma model
# declares `body/compute_node/{cpu,input_power}` and Vitals flattens each metric
# into `{component_id}/{signal}`.
CPU_TEMP_SIGNAL = "body/compute_node/cpu/temperature"
INPUT_VOLTAGE_SIGNAL = "body/compute_node/input_power/voltage"
INPUT_CURRENT_SIGNAL = "body/compute_node/input_power/current"

# Signals the panel renders. Vitals delivers *partial* snapshots -- a single
# frame may carry only the physical-body readings while the compute node's
# arrive in another -- so one snapshot without these says nothing about the
# deployment. Only a sustained absence (over this grace window) means the Soma
# model genuinely has no compute-node component.
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
    async with grpc_channel(endpoint) as channel:
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
    """Yield browser-ready events.

    Snapshots are merged across frames: a compute-node signal seen once is
    carried forward, so the panel keeps showing all three metrics even though
    Vitals delivers them in separate partial snapshots. Only when *no* signal
    turns up within the grace window does the deployment count as lacking the
    component, and the panel is told to stay hidden. Transport failures are
    retried with backoff rather than hiding the panel for good.
    """
    yield {"type": "accepted", "contract": CONTRACT_VITALS_STREAM}
    retry_seconds = 1.0
    while True:
        try:
            latest: dict[str, Any] = {key: None for key in COMPUTE_NODE_SIGNALS}
            deadline = time.monotonic() + COMPUTE_NODE_GRACE_S
            async for event in _stream_vitals(settings):
                sample = event["data"]
                for key in COMPUTE_NODE_SIGNALS:
                    if sample[key] is not None:
                        latest[key] = sample[key]
                if any(latest[key] is not None for key in COMPUTE_NODE_SIGNALS):
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
