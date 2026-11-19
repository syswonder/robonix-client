from __future__ import annotations

import re
from pathlib import Path
import unittest

from robonix_client.proto import atlas_pb2


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

    def test_atlas_gencode_includes_time_descriptors(self) -> None:
        for message, field_number in (
            (atlas_pb2.DeclareCapabilityRequest, 7),
            (atlas_pb2.Capability, 8),
            (atlas_pb2.ConnectCapabilityResponse, 4),
        ):
            with self.subTest(message=message.__name__):
                self.assertEqual(
                    message.DESCRIPTOR.fields_by_name["time_descriptor"].number,
                    field_number,
                )


if __name__ == "__main__":
    unittest.main()
