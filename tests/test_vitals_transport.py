import unittest

from robonix_client.proto import module_health_client_pb2, vitals_client_pb2
from robonix_client.vitals_transport import (
    aggregate_component_health,
    module_snapshot_to_dict,
    normalize_robot_description,
    provider_snapshot_to_dict,
    vitals_snapshot_to_dict,
)


SOMA_YAML = """
urdf:
  root_link: base_link
  model_name: test_robot
robot:
  id: test_robot
  display_name: Test Mobile Robot
  family: mobile_robot
  root_part: base
  dimensions:
    length_m: 0.8
    width_m: 0.6
    height_m: 1.2
  exports:
    - provider_id: test_robot_health
  components:
    - id: base
      type: mobile_base
      urdf_link: base_link
      components:
        - id: left_wheel
          type: wheel
          urdf_joint: left_joint
        - id: battery
          type: battery
    - id: head_camera
      type: rgbd_camera
      urdf_link: camera_link
"""


class RobotDescriptionTest(unittest.TestCase):
    def test_normalizes_recursive_soma_components(self):
        description = normalize_robot_description(SOMA_YAML)

        self.assertEqual(description["id"], "test_robot")
        self.assertEqual(description["family"], "mobile_robot")
        self.assertEqual(description["render"]["mode"], "procedural")
        self.assertEqual(
            [component["id"] for component in description["components"]],
            [
                "body",
                "body/base",
                "body/base/left_wheel",
                "body/base/battery",
                "body/head_camera",
            ],
        )
        self.assertEqual(description["components"][2]["parentId"], "body/base")
        self.assertEqual(
            description["components"][0]["providers"], ["test_robot_health"]
        )

    def test_marks_urdf_with_visual_geometry_as_renderable(self):
        description = normalize_robot_description(
            SOMA_YAML,
            "<robot><link name='base'><visual><geometry/></visual></link></robot>",
        )

        self.assertEqual(description["render"]["mode"], "urdf")


class ComponentHealthTest(unittest.TestCase):
    def setUp(self):
        self.description = normalize_robot_description(SOMA_YAML)

    def test_uses_longest_component_prefix_and_propagates_faults(self):
        signals = [
            {
                "key": "body/base/battery/soc",
                "health": "warn",
                "detail": "battery low",
            },
            {
                "key": "body/base/left_wheel/motor",
                "health": "error",
                "detail": "motor fault",
            },
            {
                "key": "body/head_camera/stream",
                "health": "ok",
                "detail": "camera streaming",
            },
        ]
        rows = aggregate_component_health(
            self.description,
            signals,
            [{"key": "body", "health": "ok"}],
        )
        health = {row["componentId"]: row for row in rows}

        self.assertEqual(health["body/base/battery"]["directHealth"], "warn")
        self.assertEqual(health["body/base/left_wheel"]["directHealth"], "error")
        self.assertEqual(health["body/base"]["health"], "error")
        self.assertEqual(health["body"]["health"], "error")
        self.assertEqual(health["body/head_camera"]["health"], "ok")
        self.assertEqual(
            health["body/base/battery"]["signalKeys"],
            ["body/base/battery/soc"],
        )

    def test_converts_vitals_snapshot_to_browser_shape(self):
        snapshot = vitals_client_pb2.VitalsSnapshot(
            ts_ns=1_700_000_000_000_000_000,
            power=vitals_client_pb2.PowerState(
                soc_percent=82.5,
                voltage=24.2,
                charging=False,
                remaining_s=7200,
            ),
            health_signals=[
                vitals_client_pb2.HealthSignal(
                    key="body/head_camera/stream",
                    status=0,
                    detail="camera streaming",
                )
            ],
            bodies=[vitals_client_pb2.BodyHealth(key="body", status=0)],
        )

        result = vitals_snapshot_to_dict(snapshot, self.description)

        self.assertEqual(result["power"]["socPercent"], 82.5)
        self.assertEqual(result["signals"][0]["health"], "ok")
        self.assertEqual(result["summary"]["overall"], "ok")
        self.assertEqual(result["updatedAtMs"], 1_700_000_000_000)


class SoftwareHealthTest(unittest.TestCase):
    def test_ttl_expiry_is_presented_as_stale_instead_of_generic_error(self):
        snapshot = module_health_client_pb2.ModuleHealthSnapshot(
            schema_version=1,
            ts_ns=1_700_000_000_000_000_000,
            seq=4,
            modules=[
                module_health_client_pb2.ModuleHealth(
                    module_key="executor/executor",
                    module_id="executor",
                    provider_id="executor",
                    health=2,
                    state="unavailable",
                    reason_code="TTL_EXPIRED",
                    detail="module health report expired",
                    ttl_ms=3000,
                ),
                module_health_client_pb2.ModuleHealth(
                    module_key="pilot/pilot",
                    module_id="pilot",
                    provider_id="pilot",
                    health=1,
                    state="active",
                    reason_code="DEGRADED",
                    detail="limited model access",
                    ttl_ms=3000,
                ),
            ],
        )

        result = module_snapshot_to_dict(snapshot)
        modules = {module["moduleId"]: module for module in result["modules"]}

        self.assertEqual(modules["executor"]["health"], "stale")
        self.assertEqual(modules["pilot"]["health"], "warn")
        self.assertEqual(result["summary"]["overall"], "warn")

    def test_maps_atlas_lifecycle_to_health(self):
        result = provider_snapshot_to_dict(
            {
                "atlasEndpoint": "127.0.0.1:50051",
                "updatedAtMs": 100,
                "providers": [
                    {"id": "soma", "state": "ACTIVE", "capabilities": []},
                    {"id": "pilot", "state": "ERROR", "capabilities": []},
                    {"id": "old", "state": "TERMINATED", "capabilities": []},
                ],
            }
        )

        providers = {provider["id"]: provider for provider in result["providers"]}
        self.assertEqual(providers["soma"]["health"], "ok")
        self.assertEqual(providers["pilot"]["health"], "error")
        self.assertEqual(providers["old"]["health"], "stale")
        self.assertEqual(result["summary"]["overall"], "error")


if __name__ == "__main__":
    unittest.main()
