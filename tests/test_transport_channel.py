import unittest
from unittest import mock

from robonix_client.transport import GRPC_CHANNEL_OPTIONS, build_voice_context, grpc_channel


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
        self.assertEqual(GRPC_CHANNEL_OPTIONS, (("grpc.enable_http_proxy", 0),))

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


if __name__ == "__main__":
    unittest.main()
