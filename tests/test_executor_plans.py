from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock, patch

import grpc

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

    async def test_tags_the_hop_that_failed(self):
        settings = transport.ClientSettings(atlas_endpoint="robot:50051")
        deadline = grpc.aio.AioRpcError(
            grpc.StatusCode.DEADLINE_EXCEEDED,
            grpc.aio.Metadata(),
            grpc.aio.Metadata(),
            details="Deadline Exceeded",
        )
        cases = [
            # (discover_endpoint behavior, _unary_unary behavior, reason, endpoint)
            (AsyncMock(side_effect=deadline), AsyncMock(), "atlas_unreachable", "robot:50051"),
            (
                AsyncMock(side_effect=transport.RobonixApiError("no provider found")),
                AsyncMock(),
                "executor_not_registered",
                "robot:50051",
            ),
            (
                AsyncMock(return_value="robot:50061"),
                AsyncMock(side_effect=deadline),
                "executor_unreachable",
                "robot:50061",
            ),
            (
                AsyncMock(return_value="robot:50061"),
                AsyncMock(return_value=SimpleNamespace(success=False, plans_json="", error="busy")),
                "executor_error",
                "robot:50061",
            ),
        ]
        for discover, unary, reason, endpoint in cases:
            with self.subTest(reason=reason):
                with (
                    patch.object(transport, "discover_endpoint", discover),
                    patch.object(transport, "_unary_unary", unary),
                ):
                    with self.assertRaises(transport.ExecutorQueryError) as caught:
                        await transport.list_active_plans(settings)
                self.assertEqual(caught.exception.reason, reason)
                self.assertEqual(caught.exception.endpoint, endpoint)
                self.assertNotIn("<AioRpcError", caught.exception.detail)


if __name__ == "__main__":
    unittest.main()
