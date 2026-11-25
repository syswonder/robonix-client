import unittest
import json
from unittest import mock

from robonix_client.transport import (
    GRPC_CHANNEL_OPTIONS,
    ClientSettings,
    abort_turn,
    build_text_task,
    build_voice_context,
    grpc_channel,
)


class GrpcChannelTest(unittest.TestCase):
    def test_robot_channels_disable_desktop_proxy(self):
        sentinel = object()
        with mock.patch(
            "robonix_client.transport.grpc.aio.insecure_channel",
            return_value=sentinel,
        ) as create:
            self.assertIs(grpc_channel("http://robot.local:50051"), sentinel)
        create.assert_called_once_with(
            "robot.local:50051", options=GRPC_CHANNEL_OPTIONS
        )
        self.assertEqual(
            GRPC_CHANNEL_OPTIONS,
            (
                ("grpc.enable_http_proxy", 0),
                ("grpc.max_receive_message_length", 32 * 1024 * 1024),
            ),
        )

    def test_voice_context_marks_f2_as_barge_in(self):
        self.assertEqual(
            build_voice_context(),
            {
                "client": "robonix-client-gui",
                "interaction_mode": "voice",
                "barge_in": True,
            },
        )

    def test_voice_steer_is_bound_to_current_turn(self):
        self.assertEqual(
            build_voice_context(steer=True, expected_turn_id="turn-7"),
            {
                "client": "robonix-client-gui",
                "interaction_mode": "steer",
                "barge_in": True,
                "steer": True,
                "expected_turn_id": "turn-7",
            },
        )


class TaskIdentityTest(unittest.TestCase):
    def test_task_omits_user_id_so_liaison_can_fill_it(self):
        task = build_text_task(ClientSettings(), "hello")
        context = json.loads(task.context_json)
        self.assertNotIn("user_id", context)

    def test_task_keeps_explicit_user_id(self):
        task = build_text_task(ClientSettings(user_id="alice"), "hello")
        self.assertEqual(json.loads(task.context_json)["user_id"], "alice")


class AbortTurnTest(unittest.IsolatedAsyncioTestCase):
    async def test_submits_session_scoped_abort_task(self):
        settings = ClientSettings(
            liaison_endpoint="robot.local:50051", session_id="session-7"
        )
        channel = mock.MagicMock()
        submit = channel.unary_stream.return_value
        submit.return_value.__aiter__.return_value = []
        with mock.patch("robonix_client.transport.grpc_channel") as open_channel:
            open_channel.return_value.__aenter__.return_value = channel

            async for _ in abort_turn(settings):
                pass

        open_channel.assert_called_once_with(settings.liaison_endpoint)
        channel.unary_stream.assert_called_once()
        self.assertEqual(
            channel.unary_stream.call_args.args,
            ("/robonix.contracts.RobonixSystemLiaisonSubmit/SubmitTask",),
        )
        submit.assert_called_once()
        (task,) = submit.call_args.args
        self.assertEqual(task.session_id, settings.session_id)
        context = json.loads(task.context_json)
        self.assertIs(context["abort_turn"], True)
        self.assertEqual(context["interaction_mode"], "abort")
        self.assertNotIn("expected_turn_id", context)


if __name__ == "__main__":
    unittest.main()
