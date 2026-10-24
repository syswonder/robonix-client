import unittest
from unittest.mock import patch

from robonix_client import app as client_app


class StudioDiscoveryTest(unittest.IsolatedAsyncioTestCase):
    async def test_discover_studio_services(self):
        def fake_probe(host, port, timeout=0.35):
            if port == 50107:
                return {"port": 50107, "title": "scene — semantic map", "status": 200, "online": True}
            if port == 8091:
                return {"port": 8091, "title": "Robonix · mapping", "status": 200, "online": True}
            return None

        with patch("robonix_client.app._probe_http_port_sync", side_effect=fake_probe):
            res = await client_app.discover_studio_services(robot_host="127.0.0.1")
            self.assertTrue(res.get("ok"))
            services = res.get("services", [])
            self.assertEqual(len(services), 2)
            self.assertEqual(services[0]["port"], 50107)
            self.assertEqual(services[0]["name"], "Scene Service")
            self.assertEqual(services[1]["port"], 8091)
            self.assertEqual(services[1]["name"], "SLAM Mapping")

    async def test_discover_studio_services_with_extra_ports(self):
        def fake_probe(host, port, timeout=0.35):
            if port == 9999:
                return {"port": 9999, "title": "Custom Tool", "status": 200, "online": True}
            return None

        with patch("robonix_client.app._probe_http_port_sync", side_effect=fake_probe):
            res = await client_app.discover_studio_services(robot_host="127.0.0.1", extra_ports="9999,invalid")
            self.assertTrue(res.get("ok"))
            services = res.get("services", [])
            self.assertEqual(len(services), 1)
            self.assertEqual(services[0]["port"], 9999)
            self.assertEqual(services[0]["name"], "Custom Tool")

    async def test_port_4880_is_robonix_console(self):
        def fake_probe(host, port, timeout=0.35):
            if port == 4880:
                return {"port": 4880, "title": "Robonix Console", "status": 200, "online": True}
            return None

        with patch("robonix_client.app._probe_http_port_sync", side_effect=fake_probe):
            res = await client_app.discover_studio_services(robot_host="127.0.0.1")
            services = res.get("services", [])
            self.assertEqual(len(services), 1)
            self.assertEqual(services[0]["name"], "Robonix Console")

    async def test_title_matching_is_whole_word(self):
        # A "github" page title must not be mislabelled as the Console via a
        # bare "hub" substring match.
        def fake_probe(host, port, timeout=0.35):
            if port == 3000:
                return {"port": 3000, "title": "github dashboard", "status": 200, "online": True}
            return None

        with patch("robonix_client.app._probe_http_port_sync", side_effect=fake_probe):
            res = await client_app.discover_studio_services(robot_host="127.0.0.1")
            services = res.get("services", [])
            self.assertEqual(len(services), 1)
            self.assertNotEqual(services[0]["name"], "Robonix Console")

    async def test_rejects_multi_target_host(self):
        for bad in ("127.0.0.1,169.254.169.254", "http://evil/", "a b", "host/../x"):
            res = await client_app.discover_studio_services(robot_host=bad)
            self.assertFalse(res.get("ok"), bad)
            self.assertEqual(res.get("services"), [])

    async def test_rejects_cloud_metadata_host(self):
        res = await client_app.discover_studio_services(robot_host="169.254.169.254")
        self.assertFalse(res.get("ok"))

    async def test_extra_ports_are_capped(self):
        probed = []

        def fake_probe(host, port, timeout=0.35):
            probed.append(port)
            return None

        extra = ",".join(str(p) for p in range(20000, 20100))
        with patch("robonix_client.app._probe_http_port_sync", side_effect=fake_probe):
            await client_app.discover_studio_services(robot_host="127.0.0.1", extra_ports=extra)

        added = [p for p in probed if p not in client_app.CANDIDATE_STUDIO_PORTS]
        self.assertLessEqual(len(added), client_app.MAX_STUDIO_EXTRA_PORTS)


if __name__ == "__main__":
    unittest.main()
