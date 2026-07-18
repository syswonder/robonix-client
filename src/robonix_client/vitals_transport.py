from __future__ import annotations

import asyncio
import time
from contextlib import suppress
from typing import Any, AsyncIterator

import grpc
import yaml

from .proto import module_health_client_pb2, soma_client_pb2, vitals_client_pb2
from .transport import (
    ClientSettings,
    discover_endpoint,
    grpc_channel,
    system_snapshot,
)

CONTRACT_SOMA_GET_YAML = "robonix/system/soma/get_yaml"
CONTRACT_SOMA_GET_URDF = "robonix/system/soma/get_urdf"
CONTRACT_VITALS_STREAM = "robonix/system/vitals/stream"
CONTRACT_VITALS_MODULES_GET = "robonix/system/vitals/modules/get"

SOMA_GET_YAML_PATH = "/robonix.contracts.RobonixSystemSomaGetYaml/GetYaml"
SOMA_GET_URDF_PATH = "/robonix.contracts.RobonixSystemSomaGetUrdf/GetUrdf"
VITALS_STREAM_PATH = "/robonix.contracts.RobonixSystemVitalsStream/StreamVitals"
VITALS_MODULES_GET_PATH = (
    "/robonix.contracts.RobonixSystemVitalsModulesGet/GetModuleHealthSnapshot"
)

HEALTH_SEVERITY = {
    "unknown": 0,
    "ok": 1,
    "stale": 2,
    "warn": 3,
    "error": 4,
}
SIGNAL_HEALTH_NAMES = {0: "ok", 1: "warn", 2: "error", 3: "stale"}
BODY_HEALTH_NAMES = {0: "ok", 1: "error", 2: "error"}
MODULE_HEALTH_NAMES = {0: "ok", 1: "warn", 2: "error"}


async def _unary_unary(
    target: str,
    path: str,
    request: Any,
    response_type: Any,
    timeout: float = 4.0,
) -> Any:
    async with grpc_channel(target) as channel:
        call = channel.unary_unary(
            path,
            request_serializer=request.SerializeToString,
            response_deserializer=response_type.FromString,
        )
        return await call(request, timeout=timeout)


def _mapping(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _list(value: Any) -> list[Any]:
    return value if isinstance(value, list) else []


def _label(value: str) -> str:
    return value.replace("_", " ").replace("-", " ").strip().title()


def _number(value: Any, default: float) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _component_path(parent_id: str, component_id: str) -> str:
    value = component_id.strip().strip("/")
    if not value:
        return parent_id
    if value == "body" or value.startswith("body/"):
        return value
    return f"{parent_id}/{value}"


def normalize_robot_description(
    yaml_text: str,
    urdf_xml: str = "",
    robot_id_hint: str = "",
) -> dict[str, Any]:
    document = yaml.safe_load(yaml_text) or {}
    if not isinstance(document, dict):
        raise ValueError("Soma YAML must contain a mapping")

    robot = _mapping(document.get("robot"))
    urdf = _mapping(document.get("urdf"))
    visual = _mapping(robot.get("visual"))
    robot_id = str(robot.get("id") or robot_id_hint or "robot").strip()
    display_name = str(robot.get("display_name") or _label(robot_id) or "Robot")
    family = str(robot.get("family") or "generic").strip().lower()
    dimensions = _mapping(robot.get("dimensions"))

    def provider_ids(exports: Any) -> list[str]:
        return [
            str(export.get("provider_id") or "")
            for export in (_mapping(item) for item in _list(exports))
            if export.get("provider_id")
        ]

    components: list[dict[str, Any]] = [
        {
            "id": "body",
            "localId": "body",
            "parentId": "",
            "label": display_name,
            "type": "robot",
            "urdfLink": str(urdf.get("root_link") or ""),
            "urdfJoint": "",
            "providers": provider_ids(robot.get("exports")),
        }
    ]

    def append_components(items: list[Any], parent_id: str) -> None:
        for raw_component in items:
            component = _mapping(raw_component)
            local_id = str(component.get("id") or "").strip()
            if not local_id:
                continue
            component_id = _component_path(parent_id, local_id)
            components.append(
                {
                    "id": component_id,
                    "localId": local_id,
                    "parentId": parent_id,
                    "label": str(component.get("display_name") or _label(local_id)),
                    "type": str(component.get("type") or "component").strip().lower(),
                    "model": str(component.get("model") or ""),
                    "urdfLink": str(component.get("urdf_link") or ""),
                    "urdfJoint": str(component.get("urdf_joint") or ""),
                    "providers": provider_ids(component.get("exports")),
                }
            )
            append_components(_list(component.get("components")), component_id)

    append_components(_list(robot.get("components")), "body")
    model_url = str(
        visual.get("model_url")
        or visual.get("modelUrl")
        or robot.get("model_url")
        or ""
    )
    has_urdf_visuals = bool(urdf_xml and "<visual" in urdf_xml)
    render_mode = "asset" if model_url else "urdf" if has_urdf_visuals else "procedural"
    return {
        "id": robot_id,
        "displayName": display_name,
        "family": family,
        "rootPart": str(robot.get("root_part") or ""),
        "dimensions": {
            "lengthM": _number(dimensions.get("length_m"), 0.7),
            "widthM": _number(dimensions.get("width_m"), 0.6),
            "heightM": _number(dimensions.get("height_m"), 1.0),
        },
        "components": components,
        "render": {
            "mode": render_mode,
            "modelUrl": model_url,
            "urdfRootLink": str(urdf.get("root_link") or ""),
            "urdfModelName": str(urdf.get("model_name") or ""),
        },
        "urdfXml": urdf_xml,
        "summary": str(_mapping(document.get("description")).get("summary") or ""),
    }


def fallback_robot_description() -> dict[str, Any]:
    return {
        "id": "robot",
        "displayName": "Robot",
        "family": "generic",
        "rootPart": "",
        "dimensions": {"lengthM": 0.7, "widthM": 0.6, "heightM": 1.0},
        "components": [
            {
                "id": "body",
                "localId": "body",
                "parentId": "",
                "label": "Robot",
                "type": "robot",
                "urdfLink": "",
                "urdfJoint": "",
                "providers": [],
            }
        ],
        "render": {
            "mode": "procedural",
            "modelUrl": "",
            "urdfRootLink": "",
            "urdfModelName": "",
        },
        "urdfXml": "",
        "summary": "",
    }


async def load_robot_description(settings: ClientSettings) -> dict[str, Any]:
    yaml_endpoint = await discover_endpoint(
        settings.atlas_endpoint, CONTRACT_SOMA_GET_YAML
    )
    yaml_response = await _unary_unary(
        yaml_endpoint,
        SOMA_GET_YAML_PATH,
        soma_client_pb2.GetYaml_Request(),
        soma_client_pb2.GetYaml_Response,
    )

    urdf_xml = ""
    try:
        urdf_endpoint = await discover_endpoint(
            settings.atlas_endpoint, CONTRACT_SOMA_GET_URDF
        )
        urdf_response = await _unary_unary(
            urdf_endpoint,
            SOMA_GET_URDF_PATH,
            soma_client_pb2.GetUrdf_Request(robot_id=yaml_response.robot_id),
            soma_client_pb2.GetUrdf_Response,
        )
        urdf_xml = urdf_response.urdf_xml
    except (grpc.aio.AioRpcError, RuntimeError):
        pass

    return normalize_robot_description(
        yaml_response.yaml_text,
        urdf_xml,
        yaml_response.robot_id,
    )


def _matches_component(signal_key: str, component_id: str) -> bool:
    return signal_key == component_id or any(
        signal_key.startswith(f"{component_id}{separator}")
        for separator in ("/", ".", ":")
    )


def _highest_health(values: list[str]) -> str:
    return max(values or ["unknown"], key=lambda value: HEALTH_SEVERITY.get(value, 0))


def _health_summary(values: list[str]) -> dict[str, Any]:
    counts = {name: values.count(name) for name in HEALTH_SEVERITY}
    return {
        "overall": _highest_health(values),
        "total": len(values),
        "ok": counts["ok"],
        "warn": counts["warn"],
        "error": counts["error"],
        "stale": counts["stale"],
        "unknown": counts["unknown"],
    }


def aggregate_component_health(
    description: dict[str, Any],
    signals: list[dict[str, Any]],
    bodies: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    components = [
        dict(component)
        for component in description.get("components", [])
        if isinstance(component, dict) and component.get("id")
    ]
    component_ids = sorted(
        (str(component["id"]) for component in components),
        key=len,
        reverse=True,
    )
    direct_signals: dict[str, list[dict[str, Any]]] = {
        component_id: [] for component_id in component_ids
    }
    body_health: dict[str, str] = {}

    for signal in signals:
        key = str(signal.get("key") or "")
        match = next(
            (component_id for component_id in component_ids if _matches_component(key, component_id)),
            "",
        )
        if match:
            direct_signals[match].append(signal)

    for body in bodies:
        key = str(body.get("key") or "body")
        match = next(
            (component_id for component_id in component_ids if _matches_component(key, component_id)),
            "body" if "body" in direct_signals else "",
        )
        if match:
            body_health[match] = str(body.get("health") or "unknown")

    rows: dict[str, dict[str, Any]] = {}
    for component in components:
        component_id = str(component["id"])
        component_signals = direct_signals.get(component_id, [])
        direct_values = [str(signal.get("health") or "unknown") for signal in component_signals]
        if component_id in body_health:
            direct_values.append(body_health[component_id])
        direct_health = _highest_health(direct_values)
        worst_signal = max(
            component_signals,
            key=lambda signal: HEALTH_SEVERITY.get(str(signal.get("health")), 0),
            default={},
        )
        rows[component_id] = {
            "componentId": component_id,
            "health": direct_health,
            "directHealth": direct_health,
            "signalCount": len(component_signals),
            "detail": str(worst_signal.get("detail") or ""),
            "sourceComponentId": component_id if direct_values else "",
            "signalKeys": [str(signal.get("key") or "") for signal in component_signals],
        }

    for component in sorted(components, key=lambda item: str(item["id"]).count("/"), reverse=True):
        component_id = str(component["id"])
        parent_id = str(component.get("parentId") or "")
        if not parent_id or parent_id not in rows:
            continue
        child = rows[component_id]
        parent = rows[parent_id]
        if HEALTH_SEVERITY[child["health"]] > HEALTH_SEVERITY[parent["health"]]:
            parent["health"] = child["health"]
            parent["sourceComponentId"] = child["sourceComponentId"] or component_id
            if child["detail"]:
                parent["detail"] = child["detail"]

    return [rows[str(component["id"])] for component in components]


def vitals_snapshot_to_dict(
    snapshot: Any,
    description: dict[str, Any],
) -> dict[str, Any]:
    signals = [
        {
            "key": signal.key,
            "health": SIGNAL_HEALTH_NAMES.get(int(signal.status), "unknown"),
            "status": int(signal.status),
            "detail": signal.detail,
            "observedValue": float(signal.observed_value),
            "referenceValue": float(signal.reference_value),
        }
        for signal in snapshot.health_signals
    ]
    bodies = [
        {
            "key": body.key,
            "model": body.model,
            "health": BODY_HEALTH_NAMES.get(int(body.status), "unknown"),
            "status": int(body.status),
            "components": [
                {
                    "id": component.id,
                    "parentId": component.parent_id,
                    "name": component.name,
                    "kind": component.kind,
                    "model": component.model,
                }
                for component in body.components
            ],
        }
        for body in snapshot.bodies
    ]
    component_health = aggregate_component_health(description, signals, bodies)
    power = snapshot.power
    return {
        "timestampNs": int(snapshot.ts_ns),
        "updatedAtMs": int(snapshot.ts_ns // 1_000_000) if snapshot.ts_ns else _now_ms(),
        "power": {
            "socPercent": float(power.soc_percent),
            "voltage": float(power.voltage),
            "charging": bool(power.charging),
            "remainingSeconds": int(power.remaining_s),
        },
        "signals": signals,
        "bodies": bodies,
        "componentHealth": component_health,
        "summary": _health_summary([row["health"] for row in component_health]),
    }


def _module_health(module: Any) -> str:
    marker = f"{module.state} {module.reason_code}".lower()
    if any(word in marker for word in ("stale", "expired", "unavailable", "timeout", "missing")):
        return "stale"
    return MODULE_HEALTH_NAMES.get(int(module.health), "unknown")


def module_snapshot_to_dict(snapshot: Any) -> dict[str, Any]:
    modules = [
        {
            "moduleKey": module.module_key,
            "moduleId": module.module_id,
            "providerId": module.provider_id,
            "health": _module_health(module),
            "healthCode": int(module.health),
            "state": module.state,
            "reasonCode": module.reason_code,
            "detail": module.detail,
            "source": module.source,
            "receivedAtNs": int(module.received_ts_ns),
            "ttlMs": int(module.ttl_ms),
        }
        for module in snapshot.modules
    ]
    modules.sort(
        key=lambda module: (
            -HEALTH_SEVERITY.get(str(module["health"]), 0),
            str(module["moduleId"]),
        )
    )
    return {
        "schemaVersion": int(snapshot.schema_version),
        "timestampNs": int(snapshot.ts_ns),
        "updatedAtMs": int(snapshot.ts_ns // 1_000_000) if snapshot.ts_ns else _now_ms(),
        "sequence": int(snapshot.seq),
        "modules": modules,
        "summary": _health_summary([str(module["health"]) for module in modules]),
    }


def provider_snapshot_to_dict(snapshot: dict[str, Any]) -> dict[str, Any]:
    state_health = {
        "ACTIVE": "ok",
        "ERROR": "error",
        "TERMINATED": "stale",
        "INACTIVE": "warn",
        "REGISTERED": "warn",
    }
    providers = [
        {
            **provider,
            "health": state_health.get(str(provider.get("state") or ""), "unknown"),
        }
        for provider in snapshot.get("providers", [])
        if isinstance(provider, dict)
    ]
    providers.sort(
        key=lambda provider: (
            -HEALTH_SEVERITY.get(str(provider["health"]), 0),
            str(provider.get("id") or ""),
        )
    )
    return {
        "updatedAtMs": int(snapshot.get("updatedAtMs") or _now_ms()),
        "atlasEndpoint": snapshot.get("atlasEndpoint", ""),
        "providers": providers,
        "summary": _health_summary([str(provider["health"]) for provider in providers]),
    }


def _now_ms() -> int:
    return int(time.time() * 1000)


def _error_text(exc: BaseException) -> str:
    if isinstance(exc, grpc.aio.AioRpcError):
        return f"gRPC {exc.code().name}: {exc.details()}"
    return str(exc)


async def _put_source(
    queue: asyncio.Queue[dict[str, Any]],
    source: str,
    state: str,
    error: str = "",
) -> None:
    await queue.put(
        {
            "type": "source",
            "source": source,
            "state": state,
            "error": error,
            "updatedAtMs": _now_ms(),
        }
    )


async def _description_loop(
    settings: ClientSettings,
    queue: asyncio.Queue[dict[str, Any]],
    description_state: dict[str, dict[str, Any]],
) -> None:
    retry_seconds = 1.0
    while True:
        try:
            description = await load_robot_description(settings)
            changed = description != description_state["value"]
            description_state["value"] = description
            if changed:
                await queue.put({"type": "description", "data": description})
            await _put_source(queue, "soma", "ready")
            retry_seconds = 1.0
            await asyncio.sleep(30.0)
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            await _put_source(queue, "soma", "error", _error_text(exc))
            await asyncio.sleep(retry_seconds)
            retry_seconds = min(retry_seconds * 2.0, 15.0)


async def _hardware_loop(
    settings: ClientSettings,
    queue: asyncio.Queue[dict[str, Any]],
    description_state: dict[str, dict[str, Any]],
) -> None:
    retry_seconds = 1.0
    while True:
        try:
            endpoint = await discover_endpoint(
                settings.atlas_endpoint, CONTRACT_VITALS_STREAM
            )
            await _put_source(queue, "hardware", "ready")
            retry_seconds = 1.0
            async with grpc_channel(endpoint) as channel:
                call = channel.unary_stream(
                    VITALS_STREAM_PATH,
                    request_serializer=vitals_client_pb2.StreamVitals_Request.SerializeToString,
                    response_deserializer=vitals_client_pb2.VitalsSnapshot.FromString,
                )
                async for snapshot in call(vitals_client_pb2.StreamVitals_Request()):
                    await queue.put(
                        {
                            "type": "hardware",
                            "data": vitals_snapshot_to_dict(
                                snapshot, description_state["value"]
                            ),
                        }
                    )
            raise RuntimeError("Vitals stream closed")
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            await _put_source(queue, "hardware", "error", _error_text(exc))
            await asyncio.sleep(retry_seconds)
            retry_seconds = min(retry_seconds * 2.0, 15.0)


async def _modules_loop(
    settings: ClientSettings,
    queue: asyncio.Queue[dict[str, Any]],
) -> None:
    retry_seconds = 1.0
    while True:
        try:
            endpoint = await discover_endpoint(
                settings.atlas_endpoint, CONTRACT_VITALS_MODULES_GET
            )
            await _put_source(queue, "modules", "ready")
            retry_seconds = 1.0
            while True:
                response = await _unary_unary(
                    endpoint,
                    VITALS_MODULES_GET_PATH,
                    module_health_client_pb2.GetModuleHealthSnapshot_Request(),
                    module_health_client_pb2.GetModuleHealthSnapshot_Response,
                )
                await queue.put(
                    {
                        "type": "modules",
                        "data": module_snapshot_to_dict(response.snapshot),
                    }
                )
                await asyncio.sleep(2.0)
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            await _put_source(queue, "modules", "error", _error_text(exc))
            await asyncio.sleep(retry_seconds)
            retry_seconds = min(retry_seconds * 2.0, 15.0)


async def _providers_loop(
    settings: ClientSettings,
    queue: asyncio.Queue[dict[str, Any]],
) -> None:
    while True:
        try:
            snapshot = await system_snapshot(settings.atlas_endpoint)
            await queue.put(
                {"type": "providers", "data": provider_snapshot_to_dict(snapshot)}
            )
            await _put_source(queue, "atlas", "ready")
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            await _put_source(queue, "atlas", "error", _error_text(exc))
        await asyncio.sleep(7.0)


async def stream_vitals_events(
    settings: ClientSettings,
) -> AsyncIterator[dict[str, Any]]:
    queue: asyncio.Queue[dict[str, Any]] = asyncio.Queue(maxsize=64)
    description_state = {"value": fallback_robot_description()}
    yield {
        "type": "description",
        "data": description_state["value"],
        "provisional": True,
    }
    tasks = [
        asyncio.create_task(_description_loop(settings, queue, description_state)),
        asyncio.create_task(_hardware_loop(settings, queue, description_state)),
        asyncio.create_task(_modules_loop(settings, queue)),
        asyncio.create_task(_providers_loop(settings, queue)),
    ]
    try:
        while True:
            yield await queue.get()
    finally:
        for task in tasks:
            task.cancel()
        with suppress(asyncio.CancelledError):
            await asyncio.gather(*tasks)
