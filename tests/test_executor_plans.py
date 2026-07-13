from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock, patch

from robonix_client import transport


class ExecutorPlansTest(unittest.IsolatedAsyncioTestCase):
    async def test_uses_control_plane_without_submitting_rtdl(self):
        settings = transport.ClientSettings(atlas_endpoint="robot:50051")
        response = SimpleNamespace(
            success=True,
            plans_json=(
                '{"count":1,"plans":[{"plan_id":"10","description":"watch",'
                '"op_count":2,"cancelled":false,"stop_points":0,'
                '"ops":[{"op_id":"1","state":"running"}]}]}'
            ),
            error="",
        )
        with (
            patch.object(
                transport,
                "discover_endpoint",
                AsyncMock(return_value="robot:50061"),
            ),
            patch.object(
                transport, "_unary_unary", AsyncMock(return_value=response)
            ) as call,
        ):
            result = await transport.list_active_plans(settings)

        self.assertEqual(result["count"], 1)
        self.assertEqual(result["plans"][0]["planId"], "10")
        self.assertEqual(result["plans"][0]["ops"][0]["state"], "running")
        self.assertTrue(call.await_args.args[1].endswith("/ListActivePlans"))

    async def test_rejects_invalid_snapshot(self):
        settings = transport.ClientSettings(atlas_endpoint="robot:50051")
        response = SimpleNamespace(success=True, plans_json="[]", error="")
        with (
            patch.object(
                transport,
                "discover_endpoint",
                AsyncMock(return_value="robot:50061"),
            ),
            patch.object(
                transport, "_unary_unary", AsyncMock(return_value=response)
            ),
        ):
            with self.assertRaisesRegex(transport.RobonixApiError, "invalid"):
                await transport.list_active_plans(settings)


if __name__ == "__main__":
    unittest.main()
