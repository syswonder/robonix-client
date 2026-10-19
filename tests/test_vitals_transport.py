import asyncio
import unittest
from contextlib import suppress
from unittest.mock import AsyncMock, patch

from google.protobuf import descriptor_pb2, descriptor_pool, message_factory

from robonix_client.proto import (
    module_health_client_pb2,
    soma_client_pb2,
    vitals_client_pb2,
)
from robonix_client.transport import ClientSettings
from robonix_client.vitals_transport import (
    _description_loop,
    aggregate_component_health,
    fallback_robot_description,
    load_robot_description,
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


class WireCompatibilityTest(unittest.TestCase):
    def test_decodes_current_dev_next_vitals_wire_layout(self):
        """Decode bytes produced by an independent copy of the server schema."""
        source = descriptor_pb2.FileDescriptorProto(
            name="dev_next_vitals.proto",
            package="dev_next.vitals",
            syntax="proto3",
        )

        def add_message(name):
            message = source.message_type.add()
            message.name = name
            return message

        def add_field(message, name, number, field_type, *, repeated=False, type_name=""):
            field = message.field.add()
            field.name = name
            field.number = number
            field.type = field_type
            field.label = (
                descriptor_pb2.FieldDescriptorProto.LABEL_REPEATED
                if repeated
                else descriptor_pb2.FieldDescriptorProto.LABEL_OPTIONAL
            )
            if type_name:
                field.type_name = type_name

        string = descriptor_pb2.FieldDescriptorProto.TYPE_STRING
        float32 = descriptor_pb2.FieldDescriptorProto.TYPE_FLOAT
        uint32 = descriptor_pb2.FieldDescriptorProto.TYPE_UINT32
        uint64 = descriptor_pb2.FieldDescriptorProto.TYPE_UINT64
        int64 = descriptor_pb2.FieldDescriptorProto.TYPE_INT64
        boolean = descriptor_pb2.FieldDescriptorProto.TYPE_BOOL
        nested = descriptor_pb2.FieldDescriptorProto.TYPE_MESSAGE

        component = add_message("BodyComponent")
        for name, number, field_type in (
            ("name", 1, string),
            ("kind", 2, string),
            ("temperature", 3, float32),
            ("error_code", 4, uint32),
            ("enabled", 5, boolean),
            ("id", 6, string),
            ("parent_id", 7, string),
            ("model", 8, string),
        ):
            add_field(component, name, number, field_type)

        body = add_message("BodyHealth")
        add_field(body, "body_type", 1, string)
        add_field(body, "model", 2, string)
        add_field(body, "state", 3, uint32)
        add_field(body, "message", 4, string)
        add_field(
            body,
            "components",
            5,
            nested,
            repeated=True,
            type_name=".dev_next.vitals.BodyComponent",
        )

        health = add_message("ComponentHealth")
        for name, number, field_type in (
            ("name", 1, string),
            ("health", 2, uint32),
            ("detail", 3, string),
            ("value", 4, float32),
            ("threshold", 5, float32),
        ):
            add_field(health, name, number, field_type)

        power = add_message("PowerState")
        for name, number, field_type in (
            ("battery_percent", 1, float32),
            ("voltage", 2, float32),
            ("charging", 3, boolean),
            ("remaining_s", 4, int64),
        ):
            add_field(power, name, number, field_type)

        snapshot = add_message("VitalsSnapshot")
        add_field(snapshot, "ts_ns", 1, uint64)
        add_field(snapshot, "power", 2, nested, type_name=".dev_next.vitals.PowerState")
        add_field(
            snapshot,
            "components",
            3,
            nested,
            repeated=True,
            type_name=".dev_next.vitals.ComponentHealth",
        )
        add_field(
            snapshot,
            "bodies",
            4,
            nested,
            repeated=True,
            type_name=".dev_next.vitals.BodyHealth",
        )

        pool = descriptor_pool.DescriptorPool()
        pool.Add(source)
        source_snapshot = message_factory.GetMessageClass(
            pool.FindMessageTypeByName("dev_next.vitals.VitalsSnapshot")
        )(
            ts_ns=123,
            power={"battery_percent": 82.5, "voltage": 24.2},
            components=[
                {
                    "name": "body/base/battery/voltage",
                    "health": 1,
                    "detail": "low voltage",
                    "value": 23.2,
                    "threshold": 24.0,
                }
            ],
            bodies=[
                {
                    "body_type": "arm_right",
                    "model": "piper",
                    "state": 1,
                    "message": "joint fault",
                    "components": [
                        {
                            "name": "joint_1",
                            "kind": "joint",
                            "temperature": 41.5,
                            "error_code": 7,
                            "enabled": True,
                            "id": "body/arm_right/joint_1",
                            "parent_id": "body/arm_right",
                            "model": "piper_motor",
                        }
                    ],
                }
            ],
        )

        decoded = vitals_client_pb2.VitalsSnapshot.FromString(
            source_snapshot.SerializeToString()
        )
        self.assertEqual(decoded.components[0].name, "body/base/battery/voltage")
        self.assertEqual(decoded.components[0].health, 1)
        self.assertEqual(decoded.bodies[0].message, "joint fault")
        self.assertEqual(decoded.bodies[0].components[0].id, "body/arm_right/joint_1")
        self.assertEqual(decoded.bodies[0].components[0].error_code, 7)

    def test_get_urdf_matches_current_dev_next_fields(self):
        request_fields = [
            (field.name, field.number)
            for field in soma_client_pb2.GetUrdf_Request.DESCRIPTOR.fields
        ]
        response_fields = [
            (field.name, field.number)
            for field in soma_client_pb2.GetUrdf_Response.DESCRIPTOR.fields
        ]

        asset_fields = [
            (field.name, field.number)
            for field in soma_client_pb2.UrdfAsset.DESCRIPTOR.fields
        ]

        self.assertEqual(
            request_fields,
            [("robot_id", 1), ("include_assets", 2)],
        )
        self.assertEqual(
            response_fields,
            [("robot_id", 1), ("urdf_xml", 2), ("assets", 3)],
        )
        self.assertEqual(asset_fields, [("path", 1), ("data", 2)])


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


class RobotDescriptionLoadTest(unittest.IsolatedAsyncioTestCase):
    async def test_get_urdf_requests_and_stages_attached_assets(self):
        responses = [
            soma_client_pb2.GetYaml_Response(
                robot_id="test_robot",
                yaml_text=SOMA_YAML,
            ),
            soma_client_pb2.GetUrdf_Response(
                robot_id="test_robot",
                urdf_xml=(
                    "<robot><link name=\"base\"><visual><geometry>"
                    "<mesh filename=\"meshes/base.stl\"/>"
                    "</geometry></visual></link></robot>"
                ),
                assets=[
                    soma_client_pb2.UrdfAsset(
                        path="meshes/base.stl",
                        data=b"solid base",
                    )
                ],
            ),
        ]
        with (
            patch(
                "robonix_client.vitals_transport.discover_endpoint",
                AsyncMock(side_effect=["127.0.0.1:50092", "127.0.0.1:50092"]),
            ),
            patch(
                "robonix_client.vitals_transport._unary_unary",
                AsyncMock(side_effect=responses),
            ) as unary,
        ):
            description = await load_robot_description(ClientSettings())

        request = unary.await_args_list[1].args[2]
        self.assertEqual(request.robot_id, "test_robot")
        self.assertTrue(request.include_assets)
        self.assertRegex(
            description["urdfAssetBaseUrl"],
            r"^/api/vitals/urdf-assets/[0-9a-f]{64}/$",
        )
        self.assertEqual(description["render"]["mode"], "urdf")

    async def test_get_urdf_without_assets_remains_compatible(self):
        responses = [
            soma_client_pb2.GetYaml_Response(
                robot_id="test_robot",
                yaml_text=SOMA_YAML,
            ),
            soma_client_pb2.GetUrdf_Response(
                robot_id="test_robot",
                urdf_xml=(
                    "<robot><link name=\"base\"><visual><geometry>"
                    "<box size=\"1 1 1\"/>"
                    "</geometry></visual></link></robot>"
                ),
            ),
        ]
        with (
            patch(
                "robonix_client.vitals_transport.discover_endpoint",
                AsyncMock(side_effect=["127.0.0.1:50092", "127.0.0.1:50092"]),
            ),
            patch(
                "robonix_client.vitals_transport._unary_unary",
                AsyncMock(side_effect=responses),
            ),
        ):
            description = await load_robot_description(ClientSettings())

        self.assertEqual(description["urdfAssetBaseUrl"], "")
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

    def test_falls_back_to_online_flag_when_telemetry_is_absent(self):
        rows = aggregate_component_health(
            self.description,
            [],
            [
                {
                    "key": "body",
                    "health": "ok",
                    "components": [{"id": "body/head_camera", "enabled": True}],
                }
            ],
        )
        health = {row["componentId"]: row for row in rows}

        camera = health["body/head_camera"]
        self.assertEqual(camera["health"], "ok")
        self.assertEqual(camera["directHealth"], "ok")
        self.assertEqual(camera["detail"], "online, no health data")
        self.assertEqual(camera["sourceComponentId"], "body/head_camera")

    def test_treats_component_disabled_by_health_source_as_offline(self):
        rows = aggregate_component_health(
            self.description,
            [],
            [
                {
                    "key": "body",
                    "health": "ok",
                    "components": [{"id": "body/head_camera", "enabled": False}],
                }
            ],
        )
        health = {row["componentId"]: row for row in rows}

        camera = health["body/head_camera"]
        self.assertEqual(camera["health"], "error")
        self.assertEqual(camera["directHealth"], "error")
        self.assertEqual(
            camera["detail"],
            "component reported offline by the robot health source",
        )
        self.assertEqual(camera["sourceComponentId"], "body/head_camera")

    def test_direct_telemetry_takes_precedence_over_online_flag(self):
        signals = [
            {
                "key": "body/head_camera/stream",
                "health": "warn",
                "detail": "camera degraded",
            }
        ]
        rows = aggregate_component_health(
            self.description,
            signals,
            [
                {
                    "key": "body",
                    "health": "ok",
                    "components": [{"id": "body/head_camera", "enabled": False}],
                }
            ],
        )
        health = {row["componentId"]: row for row in rows}

        camera = health["body/head_camera"]
        self.assertEqual(camera["health"], "warn")
        self.assertEqual(camera["detail"], "camera degraded")

    def test_marks_disabled_actuator_idle_without_changing_health(self):
        signals = [
            {
                "key": "body/base/left_wheel/torque_enabled",
                "health": "ok",
                "detail": "left wheel torque is disabled (idle)",
                "observedValue": 0.0,
                "referenceValue": 0.0,
            }
        ]

        rows = aggregate_component_health(
            self.description,
            signals,
            [{"key": "body", "health": "ok"}],
        )
        health = {row["componentId"]: row for row in rows}

        wheel = health["body/base/left_wheel"]
        self.assertEqual(wheel["health"], "ok")
        self.assertEqual(wheel["directHealth"], "ok")
        self.assertEqual(wheel["directVisualState"], "idle")
        self.assertEqual(wheel["visualState"], "idle")
        self.assertEqual(health["body/base"]["visualState"], "idle")
        self.assertEqual(health["body"]["visualState"], "idle")

    def test_converts_vitals_snapshot_to_browser_shape(self):
        snapshot = vitals_client_pb2.VitalsSnapshot(
            ts_ns=1_700_000_000_000_000_000,
            power=vitals_client_pb2.PowerState(
                battery_percent=82.5,
                voltage=24.2,
                charging=False,
                remaining_s=7200,
            ),
            components=[
                vitals_client_pb2.ComponentHealth(
                    name="body/head_camera/stream",
                    health=0,
                    detail="camera streaming",
                )
            ],
            bodies=[vitals_client_pb2.BodyHealth(body_type="body", state=0)],
        )

        result = vitals_snapshot_to_dict(snapshot, self.description)

        self.assertEqual(result["power"]["socPercent"], 82.5)
        self.assertEqual(result["signals"][0]["health"], "ok")
        self.assertEqual(result["summary"]["overall"], "ok")
        self.assertEqual(result["updatedAtMs"], 1_700_000_000_000)

    def test_omits_negative_missing_power_sentinels(self):
        snapshot = vitals_client_pb2.VitalsSnapshot(
            power=vitals_client_pb2.PowerState(
                battery_percent=-1.0,
                voltage=-1.0,
                remaining_s=-1,
            )
        )

        result = vitals_snapshot_to_dict(snapshot, self.description)

        self.assertIsNone(result["power"])

    def test_marks_disabled_torque_signal_idle_in_browser_shape(self):
        snapshot = vitals_client_pb2.VitalsSnapshot(
            components=[
                vitals_client_pb2.ComponentHealth(
                    name="body/base/left_wheel/torque_enabled",
                    health=0,
                    detail="left wheel torque is disabled (idle)",
                    value=0.0,
                )
            ],
            bodies=[vitals_client_pb2.BodyHealth(body_type="body", state=0)],
        )

        result = vitals_snapshot_to_dict(snapshot, self.description)

        self.assertEqual(result["signals"][0]["health"], "ok")
        self.assertEqual(result["signals"][0]["visualState"], "idle")
        self.assertEqual(result["summary"]["overall"], "ok")

    def test_marks_enabled_torque_signal_ready_in_browser_shape(self):
        snapshot = vitals_client_pb2.VitalsSnapshot(
            components=[
                vitals_client_pb2.ComponentHealth(
                    name="body/base/left_wheel/torque_enabled",
                    health=0,
                    detail="left wheel torque is enabled (ready)",
                    value=1.0,
                    threshold=1.0,
                )
            ],
            bodies=[vitals_client_pb2.BodyHealth(body_type="body", state=0)],
        )

        result = vitals_snapshot_to_dict(snapshot, self.description)
        wheel = next(
            row
            for row in result["componentHealth"]
            if row["componentId"] == "body/base/left_wheel"
        )

        self.assertEqual(result["signals"][0]["visualState"], "ok")
        self.assertEqual(wheel["directHealth"], "ok")
        self.assertEqual(wheel["directVisualState"], "ok")
        self.assertEqual(wheel["signalCount"], 1)


class VitalsStreamOrderingTest(unittest.IsolatedAsyncioTestCase):
    async def test_description_reprojects_hardware_that_arrived_first(self):
        """A slow Soma description must replace provisional health topology."""
        description = normalize_robot_description(SOMA_YAML)
        snapshot = vitals_client_pb2.VitalsSnapshot(
            components=[
                vitals_client_pb2.ComponentHealth(
                    name="body/base/left_wheel/motor_temp",
                    health=0,
                )
            ],
            bodies=[vitals_client_pb2.BodyHealth(body_type="body", state=0)],
        )
        queue: asyncio.Queue[dict] = asyncio.Queue()
        description_state = {"value": fallback_robot_description()}
        hardware_state = {"value": snapshot}

        with patch(
            "robonix_client.vitals_transport.load_robot_description",
            AsyncMock(return_value=description),
        ):
            task = asyncio.create_task(
                _description_loop(
                    ClientSettings(), queue, description_state, hardware_state
                )
            )
            description_event = await asyncio.wait_for(queue.get(), timeout=1)
            hardware_event = await asyncio.wait_for(queue.get(), timeout=1)
            task.cancel()
            with suppress(asyncio.CancelledError):
                await task

        self.assertEqual(description_event["type"], "description")
        self.assertEqual(hardware_event["type"], "hardware")
        component_ids = {
            row["componentId"] for row in hardware_event["data"]["componentHealth"]
        }
        self.assertEqual(
            component_ids,
            {
                "body",
                "body/base",
                "body/base/left_wheel",
                "body/base/battery",
                "body/head_camera",
            },
        )
        wheel = next(
            row
            for row in hardware_event["data"]["componentHealth"]
            if row["componentId"] == "body/base/left_wheel"
        )
        self.assertEqual(wheel["health"], "ok")


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

    def test_treats_inactive_skill_as_healthy_without_masking_primitive(self):
        result = provider_snapshot_to_dict(
            {
                "providers": [
                    {
                        "id": "dual_piper_initialize",
                        "kind": "skill",
                        "state": "INACTIVE",
                    },
                    {
                        "id": "left_piper",
                        "kind": "primitive",
                        "state": "INACTIVE",
                    },
                ]
            }
        )

        providers = {provider["id"]: provider for provider in result["providers"]}
        self.assertEqual(providers["dual_piper_initialize"]["health"], "ok")
        self.assertEqual(providers["left_piper"]["health"], "warn")
        self.assertEqual(result["summary"]["overall"], "warn")


if __name__ == "__main__":
    unittest.main()
