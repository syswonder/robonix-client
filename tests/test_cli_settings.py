from __future__ import annotations

import os
import unittest
from unittest.mock import patch

from robonix_client.app import defaults
from robonix_client.cli import main


class CliSettingsTest(unittest.IsolatedAsyncioTestCase):
    async def test_only_explicit_endpoint_flags_are_launch_overrides(self):
        for flags, host, port, overrides in (
            ([], "192.0.2.1", 50091, []),
            (["--robot-host=192.0.2.2"], "192.0.2.2", 50091, ["ROBONIX_ROBOT_HOST"]),
            (["--atlas-port", "50100"], "192.0.2.1", 50100, ["ROBONIX_ATLAS_PORT"]),
            (
                ["--robot-host", "192.0.2.2", "--atlas-port=50100"],
                "192.0.2.2", 50100, ["ROBONIX_ROBOT_HOST", "ROBONIX_ATLAS_PORT"],
            ),
        ):
            with self.subTest(flags=flags), patch.dict(os.environ, {
                "ROBONIX_ROBOT_HOST": "192.0.2.1",
                "ROBONIX_ATLAS_PORT": "50091",
                "ROBONIX_ATLAS_ENDPOINT": "192.0.2.1:50091",
            }, clear=True), patch("sys.argv", ["robonix-client", *flags]), patch(
                "robonix_client.cli.uvicorn.run"
            ):
                self.assertEqual(main(), 0)
                result = await defaults()
                self.assertEqual(result["robotHost"], host)
                self.assertEqual(result["atlasPort"], port)
                self.assertEqual(result["atlasEndpoint"], f"{host}:{port}")
                self.assertEqual(result["launchOverrides"], overrides)
