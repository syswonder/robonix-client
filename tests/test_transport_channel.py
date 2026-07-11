import unittest
from unittest import mock

from robonix_client.transport import GRPC_CHANNEL_OPTIONS, grpc_channel


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


if __name__ == "__main__":
    unittest.main()
