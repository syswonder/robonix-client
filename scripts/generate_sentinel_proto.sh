#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROTO_DIR="$ROOT_DIR/src/robonix_client/proto"
PYTHON="${PYTHON:-python}"

if [[ "$($PYTHON -m grpc_tools.protoc --version)" != "libprotoc 31.1" ]]; then
  echo "Sentinel bindings require protoc 31.1 (grpcio-tools 1.76.0)." >&2
  exit 1
fi

"$PYTHON" -m grpc_tools.protoc \
  --proto_path="$PROTO_DIR" \
  --python_out="$PROTO_DIR" \
  "$PROTO_DIR/sentinel.proto"
