from __future__ import annotations

import json
import sys
import time
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Any, AsyncIterator
from urllib.parse import urlparse

import grpc
from google.protobuf.empty_pb2 import Empty

PROTO_DIR = Path(__file__).with_name("proto")
if str(PROTO_DIR) not in sys.path:
    sys.path.insert(0, str(PROTO_DIR))

import atlas_pb2  # type: ignore  # noqa: E402
import audio_pb2  # type: ignore  # noqa: E402
import liaison_pb2  # type: ignore  # noqa: E402
import pilot_pb2  # type: ignore  # noqa: E402
import tts_pb2  # type: ignore  # noqa: E402
import voiceprint_pb2  # type: ignore  # noqa: E402

CONSUMER_ID = "robonix-client/gui"
DEFAULT_ATLAS = "127.0.0.1:50051"
DEFAULT_ATLAS_PORT = 50051
DEFAULT_LIAISON_PORT = 50081

CONTRACT_LIAISON_SUBMIT = "robonix/system/liaison/submit"
CONTRACT_LIAISON_VOICE = "robonix/system/liaison/voice"
CONTRACT_PILOT = "robonix/system/pilot"
CONTRACT_EXECUTOR = "robonix/system/executor"
CONTRACT_MIC = "robonix/primitive/audio/mic"
CONTRACT_SPEAKER = "robonix/primitive/audio/speaker"
CONTRACT_ASR = "robonix/service/speech/asr"
CONTRACT_TTS = "robonix/service/speech/tts"
CONTRACT_VOICEPRINT = "robonix/service/voiceprint/identify"
CONTRACT_VOICEPRINT_ENROLL = "robonix/service/voiceprint/enroll"

PILOT_EVENT_NAMES = {
    0: "text_chunk",
    1: "plan",
    2: "batch_result",
    3: "status",
    4: "final_text",
    5: "node_state",
    6: "task_state",
}

VOICE_EVENT_NAMES = {
    0: "session_started",
    1: "recording_started",
    2: "recording_done",
    3: "asr_partial",
    4: "asr_final",
    5: "user_identified",
    6: "pilot",
    7: "tts_started",
    8: "tts_done",
    9: "session_done",
    10: "error",
}

NODE_KIND_NAMES = {
    0: "sequence",
    1: "parallel",
    2: "do",
}

RTDL_NODE_STATE_NAMES = {
    0: "PENDING",
    1: "RUNNING",
    2: "SUCCEEDED",
    3: "FAILED",
    4: "CANCELED",
    5: "TIMEOUT",
    6: "PAUSED",
}

STATE_NAMES = {
    0: "UNSPECIFIED",
    1: "REGISTERED",
    2: "INACTIVE",
    3: "ACTIVE",
    4: "ERROR",
    5: "TERMINATED",
}

KIND_NAMES = {
    0: "unspecified",
    1: "primitive",
    2: "service",
    3: "skill",
}

TRANSPORT_NAMES = {
    0: "unspecified",
    1: "grpc",
    2: "ros2",
    3: "mcp",
}


@dataclass(slots=True)
class ClientSettings:
    atlas_endpoint: str = DEFAULT_ATLAS
    liaison_endpoint: str = ""
    user_id: str = ""
    session_id: str = ""
    record_seconds: int = 30
    language: str = ""
    tts_enabled: bool = True
    mic_node_id: str = ""
    asr_node_id: str = ""
    voiceprint_node_id: str = ""
    tts_node_id: str = ""
    speaker_node_id: str = ""

    @classmethod
    def from_payload(cls, payload: dict[str, Any] | None) -> "ClientSettings":
        payload = payload or {}
        atlas_endpoint = payload.get("atlasEndpoint") or ""
        if not atlas_endpoint and payload.get("robotHost"):
            atlas_port = payload.get("atlasPort") or DEFAULT_ATLAS_PORT
            atlas_endpoint = f"{payload.get('robotHost')}:{atlas_port}"
        return cls(
            atlas_endpoint=normalize_grpc_target(atlas_endpoint or DEFAULT_ATLAS),
            liaison_endpoint=normalize_grpc_target(payload.get("liaisonEndpoint") or ""),
            user_id=(payload.get("userId") or "").strip(),
            session_id=(payload.get("sessionId") or "").strip(),
            record_seconds=max(0, int(payload.get("recordSeconds") or 30)),
            language=(payload.get("language") or "").strip(),
            tts_enabled=bool(payload.get("ttsEnabled", True)),
            mic_node_id=(payload.get("micNodeId") or "").strip(),
            asr_node_id=(payload.get("asrNodeId") or "").strip(),
            voiceprint_node_id=(payload.get("voiceprintNodeId") or "").strip(),
            tts_node_id=(payload.get("ttsNodeId") or "").strip(),
            speaker_node_id=(payload.get("speakerNodeId") or "").strip(),
        )


class RobonixApiError(RuntimeError):
    pass


def normalize_grpc_target(raw: str) -> str:
    value = (raw or "").strip()
    if not value:
        return ""
    parsed = urlparse(value if "://" in value else f"grpc://{value}")
    host = parsed.hostname or value.split("/", 1)[0]
    port = f":{parsed.port}" if parsed.port else ""
    return f"{host}{port}"


def split_host_port(target: str) -> tuple[str, int | None]:
    normalized = normalize_grpc_target(target)
    if not normalized:
        return "", None
    parsed = urlparse(f"grpc://{normalized}")
    return parsed.hostname or "", parsed.port


def is_loopback_host(host: str) -> bool:
    value = (host or "").strip().lower()
    return value in {"", "127.0.0.1", "localhost", "::1", "0.0.0.0"}


def rewrite_remote_endpoint(endpoint: str, atlas_endpoint: str) -> str:
    endpoint_host, endpoint_port = split_host_port(endpoint)
    atlas_host, _ = split_host_port(atlas_endpoint)
    if not endpoint_port or not endpoint_host:
        return normalize_grpc_target(endpoint)
    if is_loopback_host(endpoint_host) and atlas_host and not is_loopback_host(atlas_host):
        return f"{atlas_host}:{endpoint_port}"
    return normalize_grpc_target(endpoint)


def _fallback_liaison(atlas_endpoint: str) -> str:
    atlas = normalize_grpc_target(atlas_endpoint or DEFAULT_ATLAS)
    parsed = urlparse(f"grpc://{atlas}")
    host = parsed.hostname or "127.0.0.1"
    return f"{host}:{DEFAULT_LIAISON_PORT}"


def _now_ms() -> int:
    return int(time.time() * 1000)


def _safe_json(raw: str) -> Any:
    if not raw:
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return raw


async def _unary_unary(
    target: str,
    path: str,
    request: Any,
    response_type: Any,
    timeout: float = 4.0,
) -> Any:
    async with grpc.aio.insecure_channel(normalize_grpc_target(target)) as channel:
        call = channel.unary_unary(
            path,
            request_serializer=request.SerializeToString,
            response_deserializer=response_type.FromString,
        )
        return await call(request, timeout=timeout)


async def query_atlas(
    atlas_endpoint: str,
    *,
    provider_id: str = "",
    contract_id: str = "",
    transport: int = 0,
) -> list[Any]:
    req = atlas_pb2.QueryRequest(
        kind=0,
        id=provider_id,
        contract_id=contract_id,
        namespace_prefix="",
        transport=transport,
    )
    resp = await _unary_unary(
        atlas_endpoint,
        "/robonix.atlas.Atlas/Query",
        req,
        atlas_pb2.QueryResponse,
    )
    return list(resp.providers)


async def connect_capability(
    atlas_endpoint: str,
    provider_id: str,
    contract_id: str,
    consumer_id: str = CONSUMER_ID,
) -> str:
    req = atlas_pb2.ConnectCapabilityRequest(
        consumer_id=consumer_id,
        provider_id=provider_id,
        contract_id=contract_id,
        transport=1,
    )
    resp = await _unary_unary(
        atlas_endpoint,
        "/robonix.atlas.Atlas/ConnectCapability",
        req,
        atlas_pb2.ConnectCapabilityResponse,
    )
    return rewrite_remote_endpoint(resp.endpoint, atlas_endpoint)


async def discover_endpoint(atlas_endpoint: str, contract_id: str, provider_hint: str = "") -> str:
    providers = await query_atlas(
        atlas_endpoint,
        provider_id=provider_hint,
        contract_id=contract_id,
        transport=1,
    )
    for provider in providers:
        if provider_hint and provider.id != provider_hint and provider.namespace != provider_hint:
            continue
        if any(cap.contract_id == contract_id and cap.transport == 1 for cap in provider.capabilities):
            endpoint = await connect_capability(atlas_endpoint, provider.id, contract_id)
            if endpoint:
                return endpoint
    raise RobonixApiError(f"no provider found for {contract_id}")


async def resolve_liaison(settings: ClientSettings, contract_id: str = CONTRACT_LIAISON_SUBMIT) -> str:
    if settings.liaison_endpoint:
        return settings.liaison_endpoint
    try:
        return await discover_endpoint(settings.atlas_endpoint, contract_id)
    except Exception:
        return _fallback_liaison(settings.atlas_endpoint)


def build_text_task(
    settings: ClientSettings,
    text: str,
    attachments: list[dict[str, Any]] | None = None,
    *,
    steer: bool = False,
) -> Any:
    session_id = settings.session_id or str(uuid.uuid4())
    user_id = settings.user_id or "local:robonix-client"
    context: dict[str, Any] = {
        "user_id": user_id,
        "modality": "image" if attachments else "text",
        "client": "robonix-client-gui",
        "interaction_mode": "steer" if steer else "task",
    }
    if steer:
        context["steer"] = True
    if attachments:
        context["attachments"] = attachments
    return pilot_pb2.Task(
        task_id=str(uuid.uuid4()),
        session_id=session_id,
        source=0,
        text=text,
        audio_data=b"",
        context_json=json.dumps(context, ensure_ascii=False),
        timestamp_ms=_now_ms(),
    )


def build_session_end_task(settings: ClientSettings) -> Any:
    session_id = settings.session_id or str(uuid.uuid4())
    user_id = settings.user_id or "local:robonix-client"
    return pilot_pb2.Task(
        task_id=str(uuid.uuid4()),
        session_id=session_id,
        source=0,
        text="",
        audio_data=b"",
        context_json=json.dumps({"session_end": True, "user_id": user_id}),
        timestamp_ms=_now_ms(),
    )


async def submit_text(
    settings: ClientSettings,
    text: str,
    attachments: list[dict[str, Any]] | None = None,
    *,
    steer: bool = False,
) -> AsyncIterator[dict[str, Any]]:
    async for item in _submit_text_once(settings, text, attachments, steer=steer):
        yield item


async def _submit_text_once(
    settings: ClientSettings,
    text: str,
    attachments: list[dict[str, Any]] | None = None,
    *,
    steer: bool = False,
) -> AsyncIterator[dict[str, Any]]:
    endpoint = await resolve_liaison(settings, CONTRACT_LIAISON_SUBMIT)
    task = build_text_task(settings, text, attachments, steer=steer)
    async with grpc.aio.insecure_channel(endpoint) as channel:
        call = channel.unary_stream(
            "/robonix.contracts.RobonixSystemLiaisonSubmit/SubmitTask",
            request_serializer=pilot_pb2.Task.SerializeToString,
            response_deserializer=lambda raw: raw,
        )
        stream = call(task)
        async for raw in stream:
            yield {"type": "pilot_event", "event": pilot_event_to_dict(decode_submit_event(raw))}


async def notify_session_end(settings: ClientSettings) -> None:
    endpoint = await resolve_liaison(settings, CONTRACT_LIAISON_SUBMIT)
    task = build_session_end_task(settings)
    async with grpc.aio.insecure_channel(endpoint) as channel:
        call = channel.unary_stream(
            "/robonix.contracts.RobonixSystemLiaisonSubmit/SubmitTask",
            request_serializer=pilot_pb2.Task.SerializeToString,
            response_deserializer=lambda raw: raw,
        )
        async for _ in call(task):
            pass


async def start_voice_session(
    settings: ClientSettings,
    *,
    steer: bool = False,
) -> AsyncIterator[dict[str, Any]]:
    endpoint = await resolve_liaison(settings, CONTRACT_LIAISON_VOICE)
    context: dict[str, Any] = {
        "client": "robonix-client-gui",
        "interaction_mode": "steer" if steer else "voice",
    }
    if steer:
        context["steer"] = True
    req = liaison_pb2.StartVoiceSession_Request(
        session_id=settings.session_id or str(uuid.uuid4()),
        client_user_id=settings.user_id,
        record_seconds=settings.record_seconds,
        language=settings.language,
        tts_enabled=settings.tts_enabled,
        mic_node_id=settings.mic_node_id,
        asr_node_id=settings.asr_node_id,
        voiceprint_node_id=settings.voiceprint_node_id,
        tts_node_id=settings.tts_node_id,
        speaker_node_id=settings.speaker_node_id,
        context_json=json.dumps(context, ensure_ascii=False),
    )
    async with grpc.aio.insecure_channel(endpoint) as channel:
        call = channel.unary_stream(
            "/robonix.contracts.RobonixSystemLiaisonVoice/StartVoiceSession",
            request_serializer=liaison_pb2.StartVoiceSession_Request.SerializeToString,
            response_deserializer=lambda raw: raw,
        )
        stream = call(req)
        async for raw in stream:
            yield {"type": "voice_event", "event": voice_event_to_dict(decode_voice_event(raw))}


async def enroll_voiceprint(
    settings: ClientSettings,
    user_id: str,
    user_name: str = "",
    seconds: float = 6.0,
) -> dict[str, Any]:
    clean_user_id = normalize_voiceprint_user_id(user_id)
    if not clean_user_id:
        raise RobonixApiError("voiceprint user id is required")
    capture_seconds = max(1.0, float(seconds or 6.0))
    pcm = await record_pcm(settings, capture_seconds)
    if len(pcm) < 16000 * 2:
        raise RobonixApiError(f"recorded only {len(pcm)} bytes; need at least about 1 second")

    endpoint = await discover_endpoint(
        settings.atlas_endpoint,
        CONTRACT_VOICEPRINT_ENROLL,
        settings.voiceprint_node_id,
    )
    req = voiceprint_pb2.Enroll_Request(
        user_id=clean_user_id,
        user_name=user_name or clean_user_id,
        audio_data=pcm,
        encoding="pcm_s16le",
        sample_rate_hz=16000,
    )
    async with grpc.aio.insecure_channel(endpoint) as channel:
        call = channel.unary_unary(
            "/robonix.contracts.RobonixServiceVoiceprintEnroll/Enroll",
            request_serializer=voiceprint_pb2.Enroll_Request.SerializeToString,
            response_deserializer=voiceprint_pb2.Enroll_Response.FromString,
        )
        resp = await call(req, timeout=max(10.0, capture_seconds + 10.0))
    if not resp.success:
        error = resp.error or "voiceprint enroll failed"
        if is_already_enrolled_error(error):
            return {
                "ok": True,
                "alreadyEnrolled": True,
                "userId": clean_user_id,
                "userName": user_name or clean_user_id,
                "bytes": len(pcm),
                "seconds": capture_seconds,
                "message": error,
            }
        raise RobonixApiError(error)
    return {
        "ok": True,
        "alreadyEnrolled": False,
        "userId": clean_user_id,
        "userName": user_name or clean_user_id,
        "bytes": len(pcm),
        "seconds": capture_seconds,
    }


async def record_pcm(settings: ClientSettings, seconds: float) -> bytes:
    endpoint = await discover_endpoint(settings.atlas_endpoint, CONTRACT_MIC, settings.mic_node_id)
    deadline = time.monotonic() + seconds
    chunks: list[bytes] = []
    async with grpc.aio.insecure_channel(endpoint) as channel:
        call = channel.unary_stream(
            "/robonix.contracts.RobonixPrimitiveAudioMic/Mic",
            request_serializer=Empty.SerializeToString,
            response_deserializer=audio_pb2.AudioChunk.FromString,
        )
        stream = call(Empty(), timeout=max(5.0, seconds + 5.0))
        async for chunk in stream:
            chunks.append(bytes(chunk.data))
            if time.monotonic() >= deadline:
                stream.cancel()
                break
    pcm = b"".join(chunks)
    if not pcm:
        raise RobonixApiError(
            "mic stream returned no audio. Ensure the robot-side mic primitive is pointed at a "
            "reachable audio device server host and that the server is serving ws://<client-host>:60000/mic."
        )
    return pcm


async def play_tts_test(settings: ClientSettings, text: str = "Robonix speaker test") -> dict[str, Any]:
    phrase = (text or "Robonix speaker test").strip()
    tts_endpoint = await discover_endpoint(settings.atlas_endpoint, CONTRACT_TTS, settings.tts_node_id)
    speaker_endpoint = await discover_endpoint(settings.atlas_endpoint, CONTRACT_SPEAKER, settings.speaker_node_id)
    synth = tts_pb2.Synthesize_Request(
        text=phrase,
        language=settings.language,
        voice="",
        speed=1.0,
    )
    async with grpc.aio.insecure_channel(tts_endpoint) as channel:
        call = channel.unary_unary(
            "/robonix.contracts.RobonixServiceSpeechTts/Synthesize",
            request_serializer=tts_pb2.Synthesize_Request.SerializeToString,
            response_deserializer=tts_pb2.Synthesize_Response.FromString,
        )
        resp = await call(synth, timeout=15.0)
    if resp.error:
        raise RobonixApiError(resp.error)
    audio = bytes(resp.audio_data)
    if not audio:
        raise RobonixApiError("TTS returned no audio")

    async def chunks() -> AsyncIterator[Any]:
        sample_rate = resp.sample_rate_hz or 16000
        frame_bytes = 2
        chunk_size = 32000
        for seq, start in enumerate(range(0, len(audio), chunk_size)):
            data = audio[start : start + chunk_size]
            yield audio_pb2.AudioChunk(
                timestamp_ns=time.time_ns(),
                data=data,
                sequence=seq,
                duration_s=len(data) / float(sample_rate * frame_bytes),
            )

    async with grpc.aio.insecure_channel(speaker_endpoint) as channel:
        call = channel.stream_unary(
            "/robonix.contracts.RobonixPrimitiveAudioSpeaker/Speaker",
            request_serializer=audio_pb2.AudioChunk.SerializeToString,
            response_deserializer=Empty.FromString,
        )
        await call(chunks(), timeout=20.0)

    return {
        "ok": True,
        "text": phrase,
        "bytes": len(audio),
        "encoding": resp.encoding,
        "sampleRateHz": int(resp.sample_rate_hz),
        "ttsEndpoint": tts_endpoint,
        "speakerEndpoint": speaker_endpoint,
    }


def normalize_voiceprint_user_id(user_id: str) -> str:
    value = (user_id or "").strip()
    if value.startswith("voice:"):
        return value.split(":", 1)[1].strip()
    if value.startswith("local:"):
        return value.split(":", 1)[1].strip()
    return value


def is_already_enrolled_error(error: str) -> bool:
    lower = error.lower()
    return (
        "already enrolled" in lower
        or "already registered" in lower
        or "已注册" in error
        or "已经注册" in error
    )


def decode_submit_event(raw: bytes) -> Any:
    """Decode liaison SubmitTask stream events.

    Older/current liaison builds stream raw PilotEvent messages. The checked-in
    liaison.proto also defines a SubmitTask_Response wrapper. Accept both so
    the GUI does not depend on one deployment's generated shape.
    """
    wrapped = liaison_pb2.SubmitTask_Response.FromString(raw)
    if wrapped.HasField("event"):
        return wrapped.event
    return pilot_pb2.PilotEvent.FromString(raw)


def decode_voice_event(raw: bytes) -> Any:
    """Decode liaison voice stream events in wrapper or raw format."""
    wrapped = liaison_pb2.StartVoiceSession_Response.FromString(raw)
    if wrapped.HasField("event"):
        return wrapped.event
    return liaison_pb2.VoiceEvent.FromString(raw)


async def system_snapshot(atlas_endpoint: str) -> dict[str, Any]:
    atlas = normalize_grpc_target(atlas_endpoint or DEFAULT_ATLAS)
    providers = await query_atlas(atlas)
    provider_rows = [provider_to_dict(provider) for provider in providers]
    contract_presence = required_contracts(provider_rows)
    active = sum(1 for row in provider_rows if row["state"] == "ACTIVE")
    errors = [row for row in provider_rows if row["state"] == "ERROR"]
    terminated = [row for row in provider_rows if row["state"] == "TERMINATED"]
    degraded = bool(errors or terminated)
    return {
        "atlasEndpoint": atlas,
        "summary": {
            "providers": len(provider_rows),
            "active": active,
            "errors": len(errors),
            "terminated": len(terminated),
            "state": "degraded" if degraded else "ready" if active else "idle",
        },
        "requiredContracts": contract_presence,
        "providers": provider_rows,
        "updatedAtMs": _now_ms(),
    }


def required_contracts(provider_rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    expected = [
        ("Liaison submit", CONTRACT_LIAISON_SUBMIT),
        ("Liaison voice", CONTRACT_LIAISON_VOICE),
        ("Pilot", CONTRACT_PILOT),
        ("Executor", CONTRACT_EXECUTOR),
        ("Mic", CONTRACT_MIC),
        ("Speaker", CONTRACT_SPEAKER),
        ("ASR", CONTRACT_ASR),
        ("Voiceprint", CONTRACT_VOICEPRINT),
        ("Voice enroll", CONTRACT_VOICEPRINT_ENROLL),
        ("TTS", CONTRACT_TTS),
    ]
    out = []
    for label, contract in expected:
        matches = []
        for provider in provider_rows:
            for cap in provider["capabilities"]:
                if cap["contractId"] == contract:
                    matches.append(provider["id"])
        out.append(
            {
                "label": label,
                "contractId": contract,
                "available": bool(matches),
                "providers": matches,
            }
        )
    return out


def provider_to_dict(provider: Any) -> dict[str, Any]:
    return {
        "id": provider.id,
        "kind": KIND_NAMES.get(provider.kind, str(provider.kind)),
        "namespace": provider.namespace,
        "state": STATE_NAMES.get(provider.state, str(provider.state)),
        "stateDetail": provider.state_detail,
        "lastHeartbeatMs": int(provider.last_heartbeat_ms),
        "capabilities": [
            {
                "contractId": cap.contract_id,
                "transport": TRANSPORT_NAMES.get(cap.transport, str(cap.transport)),
                "description": cap.description,
            }
            for cap in provider.capabilities
        ],
    }


def pilot_event_to_dict(event: Any) -> dict[str, Any]:
    if event is None:
        return {
            "kindId": -1,
            "kind": "empty",
            "sessionId": "",
            "textChunk": "",
            "finalText": "",
        }
    data: dict[str, Any] = {
        "kindId": int(event.event_kind),
        "kind": PILOT_EVENT_NAMES.get(event.event_kind, f"unknown_{event.event_kind}"),
        "sessionId": event.session_id,
        "textChunk": event.text_chunk,
        "finalText": event.final_text,
    }
    if event.HasField("status"):
        data["status"] = {
            "sessionId": event.status.session_id,
            "state": int(event.status.state),
            "message": event.status.message,
        }
    if event.HasField("plan"):
        data["plan"] = plan_to_dict(event.plan)
    if event.HasField("batch_result"):
        data["batchResult"] = batch_result_to_dict(event.batch_result)
    if hasattr(event, "node_state") and event.HasField("node_state"):
        data["nodeState"] = node_state_to_dict(event.node_state)
    if hasattr(event, "task_state") and event.HasField("task_state"):
        data["taskState"] = {
            "goal": event.task_state.goal,
            "successCriterion": event.task_state.success_criterion,
            "status": event.task_state.status,
        }
    return data


def voice_event_to_dict(event: Any) -> dict[str, Any]:
    if event is None:
        return {
            "kindId": -1,
            "kind": "empty",
            "sessionId": "",
            "text": "",
            "userId": "",
            "confidence": 0.0,
            "error": "",
            "statusMessage": "",
            "timestampMs": 0,
        }
    data: dict[str, Any] = {
        "kindId": int(event.event_kind),
        "kind": VOICE_EVENT_NAMES.get(event.event_kind, f"unknown_{event.event_kind}"),
        "sessionId": event.session_id,
        "text": event.text,
        "userId": event.user_id,
        "confidence": float(event.confidence),
        "error": event.error,
        "statusMessage": event.status_message,
        "timestampMs": int(event.timestamp_ms),
    }
    if event.HasField("pilot"):
        data["pilot"] = pilot_event_to_dict(event.pilot)
    return data


def plan_to_dict(plan: Any) -> dict[str, Any]:
    return {
        "planId": plan.plan_id,
        "sessionId": plan.session_id,
        "round": int(plan.round),
        "rootIndex": int(plan.root_index),
        "nodes": [node_to_dict(i, node) for i, node in enumerate(plan.nodes)],
        "calls": [
            call_to_dict(node.call)
            for node in plan.nodes
            if node.HasField("call") and node.call.contract_id
        ],
    }


def node_to_dict(index: int, node: Any) -> dict[str, Any]:
    out = {
        "index": index,
        "kindId": int(node.node_kind),
        "kind": NODE_KIND_NAMES.get(node.node_kind, f"kind_{node.node_kind}"),
        "children": [int(child) for child in node.children],
        "opId": getattr(node, "op_id", ""),
        "description": getattr(node, "description", ""),
    }
    if node.HasField("call"):
        out["call"] = call_to_dict(node.call)
    return out


def call_to_dict(call: Any) -> dict[str, Any]:
    return {
        "callId": call.call_id,
        "providerId": call.provider_id,
        "contractId": call.contract_id,
        "name": call.contract_id.rsplit("/", 1)[-1] if call.contract_id else "",
        "argsRaw": call.args_json,
        "args": _safe_json(call.args_json),
    }


def batch_result_to_dict(result: Any) -> dict[str, Any]:
    return {
        "planId": result.plan_id,
        "sessionId": result.session_id,
        "round": int(result.round),
        "anyFailed": bool(result.any_failed),
        "results": [node_state_to_dict(item) for item in result.results],
    }


def node_state_to_dict(state: Any) -> dict[str, Any]:
    out = {
        "planId": state.plan_id,
        "nodeIndex": int(state.node_index),
        "nodeKindId": int(state.node_kind),
        "nodeKind": NODE_KIND_NAMES.get(state.node_kind, f"kind_{state.node_kind}"),
        "stateId": int(state.state),
        "state": RTDL_NODE_STATE_NAMES.get(state.state, str(state.state)),
        "operatorDetail": state.operator_detail,
        "opId": getattr(state, "op_id", ""),
        "description": getattr(state, "description", ""),
    }
    if state.HasField("leaf_result"):
        out["leafResult"] = call_result_to_dict(state.leaf_result)
    return out


def call_result_to_dict(result: Any) -> dict[str, Any]:
    return {
        "callId": result.call_id,
        "providerId": result.provider_id,
        "contractId": result.contract_id,
        "name": result.contract_id.rsplit("/", 1)[-1] if result.contract_id else "",
        "success": bool(result.success),
        "output": result.output,
        "error": result.error,
    }
