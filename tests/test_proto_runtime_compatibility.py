from __future__ import annotations

import re
from pathlib import Path
import unittest


class ProtoRuntimeCompatibilityTests(unittest.TestCase):
    def test_gencode_does_not_exceed_supported_runtime_floor(self) -> None:
        proto_dir = (
            Path(__file__).parents[1]
            / "src"
            / "robonix_client"
            / "proto"
        )
        for filename in ("executor_pb2.py", "keystone_pb2.py"):
            with self.subTest(filename=filename):
                generated = (proto_dir / filename).read_text(encoding="utf-8")
                match = re.search(
                    r"Protobuf Python Version: (\d+)\.(\d+)\.(\d+)",
                    generated,
                )
                self.assertIsNotNone(match)
                version = tuple(int(part) for part in match.groups())
                self.assertLessEqual(version, (6, 31, 1))


if __name__ == "__main__":
    unittest.main()
