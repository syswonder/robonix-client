from __future__ import annotations

import argparse
import os

import uvicorn


def main() -> int:
    parser = argparse.ArgumentParser(prog="robonix-client")
    parser.add_argument("--host", default="127.0.0.1", help="WebUI bind host")
    parser.add_argument("--port", type=int, default=7860, help="WebUI bind port")
    parser.add_argument("--robot-host", default="", help="Default remote Robonix host shown in the UI")
    parser.add_argument("--atlas-port", type=int, default=50051, help="Default remote Atlas gRPC port")
    parser.add_argument("--user-id", default="", help="Default operator user id, for example voice:wheatfox")
    parser.add_argument("--session-id", default="", help="Initial session id")
    parser.add_argument("--session-title", default="", help="Initial session title shown in chat")
    parser.add_argument("--reload", action="store_true", help="reload during local development")
    args = parser.parse_args()

    if args.robot_host:
        os.environ["ROBONIX_ROBOT_HOST"] = args.robot_host
        os.environ["ROBONIX_ATLAS_ENDPOINT"] = f"{args.robot_host}:{args.atlas_port}"
    os.environ["ROBONIX_ATLAS_PORT"] = str(args.atlas_port)
    if args.user_id:
        os.environ["ROBONIX_CLIENT_USER_ID"] = args.user_id
    if args.session_id:
        os.environ["ROBONIX_CLIENT_SESSION_ID"] = args.session_id
    if args.session_title:
        os.environ["ROBONIX_CLIENT_SESSION_TITLE"] = args.session_title

    uvicorn.run(
        "robonix_client.app:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
    )
    return 0
