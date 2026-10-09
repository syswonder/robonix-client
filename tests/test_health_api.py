import unittest

from robonix_client.health_api import _positive, compute_node_sample
from robonix_client.proto import vitals_client_pb2


class PositiveSentinelTest(unittest.TestCase):
    def test_maps_negative_sentinel_and_non_numbers_to_none(self):
        self.assertIsNone(_positive(-1.0))
        self.assertIsNone(_positive(None))
        self.assertIsNone(_positive("n/a"))
        self.assertEqual(_positive(54.2), 54.2)
        self.assertEqual(_positive(0.0), 0.0)


class ComputeNodeSampleTest(unittest.TestCase):
    def test_projects_compute_node_signals_from_vitals(self):
        snapshot = vitals_client_pb2.VitalsSnapshot(
            components=[
                vitals_client_pb2.ComponentHealth(
                    name="body/compute_node/cpu/temperature", value=54.2
                ),
                vitals_client_pb2.ComponentHealth(
                    name="body/compute_node/input_power/voltage", value=24.8
                ),
                vitals_client_pb2.ComponentHealth(
                    name="body/compute_node/input_power/current", value=1.1
                ),
            ]
        )

        sample = compute_node_sample(snapshot)

        self.assertAlmostEqual(sample["cpuTemp"], 54.2, places=2)
        self.assertAlmostEqual(sample["voltage"], 24.8, places=2)
        self.assertAlmostEqual(sample["current"], 1.1, places=2)
        self.assertGreater(sample["ts"], 0)

    def test_maps_missing_or_sentinel_signals_to_none(self):
        snapshot = vitals_client_pb2.VitalsSnapshot(
            components=[
                vitals_client_pb2.ComponentHealth(
                    name="body/compute_node/cpu/temperature", value=-1.0
                ),
            ]
        )

        sample = compute_node_sample(snapshot)

        self.assertIsNone(sample["cpuTemp"])
        self.assertIsNone(sample["voltage"])
        self.assertIsNone(sample["current"])


if __name__ == "__main__":
    unittest.main()