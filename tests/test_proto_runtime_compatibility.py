from __future__ import annotations

import re
from pathlib import Path
import unittest


class ProtoRuntimeCompatibilityTests(unittest.TestCase):
    def test_executor_gencode_does_not_exceed_supported_runtime_floor(self) -> None:
        generated = (
            Path(__file__).parents[1]
            / "src"
            / "robonix_client"
            / "proto"
            / "executor_pb2.py"
        ).read_text(encoding="utf-8")
        match = re.search(r"Protobuf Python Version: (\d+)\.(\d+)\.(\d+)", generated)
        self.assertIsNotNone(match)
        version = tuple(int(part) for part in match.groups())
        self.assertLessEqual(version, (6, 31, 1))


if __name__ == "__main__":
    unittest.main()
