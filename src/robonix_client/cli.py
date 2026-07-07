from __future__ import annotations

import argparse

import uvicorn


def main() -> int:
    parser = argparse.ArgumentParser(prog="robonix-client")
    parser.add_argument("--host", default="127.0.0.1", help="WebUI bind host")
    parser.add_argument("--port", type=int, default=7860, help="WebUI bind port")
    parser.add_argument("--reload", action="store_true", help="reload during local development")
    args = parser.parse_args()

    uvicorn.run(
        "robonix_client.app:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
    )
    return 0

