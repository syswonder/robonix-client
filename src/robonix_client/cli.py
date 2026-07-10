from __future__ import annotations

import argparse
import os
import sys

import uvicorn


def main() -> int:
    parser = argparse.ArgumentParser(prog="robonix-client")
    parser.add_argument("--host", default="127.0.0.1", help="WebUI bind host")
    parser.add_argument("--port", type=int, default=7860, help="WebUI bind port")
    parser.add_argument("--robot-host", default="", help="Default remote Robonix host shown in the UI")
    parser.add_argument("--atlas-port", type=int, default=50051, help="Default remote Atlas gRPC port")
    parser.add_argument("--user-id", default="", help="Default client user id, for example voice:wheatfox")
    parser.add_argument("--session-id", default="", help="Initial session id")
    parser.add_argument("--session-title", default="", help="Initial session title shown in chat")
    parser.add_argument("--mic-node-id", default="", help="Atlas provider id for the client-facing microphone")
    parser.add_argument("--mic-device-id", default="", help="Device id selected in the microphone provider")
    parser.add_argument("--speaker-node-id", default="", help="Atlas provider id for response playback")
    parser.add_argument("--speaker-device-id", default="", help="Device id selected in the speaker provider")
    parser.add_argument("--tts-node-id", default="", help="Atlas provider id for speech synthesis")
    parser.add_argument("--audio-server-host", default="", help="Local audio device server health/WebSocket host for the browser UI")
    parser.add_argument("--audio-server-bind-host", default="", help="Local audio device server bind host")
    parser.add_argument("--audio-server-port", type=int, default=0, help="Local audio device server WebSocket port")
    parser.add_argument("--audio-server-ui-host", default="", help="Local audio device server debug UI bind host")
    parser.add_argument("--reload", action="store_true", help="reload during local development")
    args = parser.parse_args()

    def explicitly_set(flag: str) -> bool:
        return flag in sys.argv or any(argument.startswith(f"{flag}=") for argument in sys.argv)

    if args.robot_host:
        os.environ["ROBONIX_ROBOT_HOST"] = args.robot_host
        os.environ["ROBONIX_ATLAS_ENDPOINT"] = f"{args.robot_host}:{args.atlas_port}"
    if explicitly_set("--atlas-port"):
        os.environ["ROBONIX_ATLAS_PORT"] = str(args.atlas_port)
    if args.user_id:
        os.environ["ROBONIX_CLIENT_USER_ID"] = args.user_id
    if args.session_id:
        os.environ["ROBONIX_CLIENT_SESSION_ID"] = args.session_id
    if args.session_title:
        os.environ["ROBONIX_CLIENT_SESSION_TITLE"] = args.session_title
    if args.mic_node_id:
        os.environ["ROBONIX_CLIENT_MIC_NODE_ID"] = args.mic_node_id
    if args.mic_device_id:
        os.environ["ROBONIX_CLIENT_MIC_DEVICE_ID"] = args.mic_device_id
    if args.speaker_node_id:
        os.environ["ROBONIX_CLIENT_SPEAKER_NODE_ID"] = args.speaker_node_id
    if args.speaker_device_id:
        os.environ["ROBONIX_CLIENT_SPEAKER_DEVICE_ID"] = args.speaker_device_id
    if args.tts_node_id:
        os.environ["ROBONIX_CLIENT_TTS_NODE_ID"] = args.tts_node_id
    if args.audio_server_host:
        os.environ["ROBONIX_CLIENT_AUDIO_SERVER_HOST"] = args.audio_server_host
    if args.audio_server_bind_host:
        os.environ["ROBONIX_CLIENT_AUDIO_SERVER_BIND_HOST"] = args.audio_server_bind_host
    if args.audio_server_port:
        os.environ["ROBONIX_CLIENT_AUDIO_SERVER_PORT"] = str(args.audio_server_port)
    if args.audio_server_ui_host:
        os.environ["ROBONIX_CLIENT_AUDIO_SERVER_UI_HOST"] = args.audio_server_ui_host

    uvicorn.run(
        "robonix_client.app:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
    )
    return 0
