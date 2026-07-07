"""Vendored Robonix protobuf messages used by the client transport."""

from __future__ import annotations

import sys
from pathlib import Path

PROTO_DIR = Path(__file__).parent
if str(PROTO_DIR) not in sys.path:
    sys.path.insert(0, str(PROTO_DIR))
