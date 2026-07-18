#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROTO_DIR="$ROOT_DIR/src/robonix_client/proto"
PROTOC="${PROTOC:-protoc}"

"$PROTOC" \
  --proto_path="$PROTO_DIR" \
  --python_out="$PROTO_DIR" \
  "$PROTO_DIR/soma_client.proto" \
  "$PROTO_DIR/vitals_client.proto" \
  "$PROTO_DIR/module_health_client.proto"
