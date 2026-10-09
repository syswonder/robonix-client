import unittest

from robonix_client.perception import _rewrite_loopback, _sse_json


class RewriteLoopbackTest(unittest.TestCase):
    def test_leaves_routable_endpoint_untouched(self):
        endpoint, host = _rewrite_loopback(
            "http://10.0.0.5:50052/mcp", "192.168.1.10:50051"
        )

        self.assertEqual(endpoint, "http://10.0.0.5:50052/mcp")
        self.assertIsNone(host)

    def test_rewrites_loopback_to_robot_host_and_returns_advertised_host(self):
        endpoint, host = _rewrite_loopback(
            "http://127.0.0.1:50052/mcp", "192.168.1.10:50051"
        )

        self.assertEqual(endpoint, "http://192.168.1.10:50052/mcp")
        self.assertEqual(host, "127.0.0.1:50052")

    def test_rewrites_loopback_without_port(self):
        endpoint, host = _rewrite_loopback(
            "http://localhost/mcp", "192.168.1.10:50051"
        )

        self.assertEqual(endpoint, "http://192.168.1.10/mcp")
        self.assertEqual(host, "localhost")


class SseJsonTest(unittest.TestCase):
    def test_parses_data_lines_ignoring_events_and_malformed_payloads(self):
        body = (
            'event: message\ndata: {"jsonrpc": "2.0", "result": {"ok": true}}\n\n'
            ": keepalive\n\n"
            'data: {"jsonrpc": "2.0", "result": {"n": 1}}\n\n'
            "data: not-json\n\n"
        )

        messages = _sse_json(body)

        self.assertEqual(
            messages,
            [
                {"jsonrpc": "2.0", "result": {"ok": True}},
                {"jsonrpc": "2.0", "result": {"n": 1}},
            ],
        )

    def test_returns_empty_for_body_without_data_lines(self):
        self.assertEqual(_sse_json("event: message\n\n"), [])


if __name__ == "__main__":
    unittest.main()