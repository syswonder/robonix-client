import asyncio
import json
import unittest
from unittest import mock

from robonix_client.audio_reverse_bridge import AudioReverseBridge


class _Robot:
    def __init__(self, commands, stage):
        self._commands = iter(commands)
        self.stage = stage
        self.sent = []

    def __aiter__(self):
        return self

    async def __anext__(self):
        await asyncio.sleep(0)
        try:
            command = next(self._commands)
        except StopIteration:
            self.stage[0] = 1
            raise StopAsyncIteration
        return json.dumps(command)

    async def send(self, payload):
        self.sent.append(payload)


class _Mic:
    def __init__(self, stage, exits):
        self.stage = stage
        self.exits = exits

    async def __aenter__(self):
        return self

    async def __aexit__(self, *_args):
        self.exits.append(self.stage[0])

    def __aiter__(self):
        return self

    async def __anext__(self):
        await asyncio.Event().wait()


class AudioStreamGenerationTest(unittest.IsolatedAsyncioTestCase):
    async def test_stale_stop_does_not_cancel_new_mic_generation(self):
        stage = [0]
        exits = []
        robot = _Robot(
            [
                {"type": "mic_start", "stream_id": "old"},
                {"type": "mic_start", "stream_id": "new"},
                {"type": "mic_stop", "stream_id": "old"},
            ],
            stage,
        )

        def connect(*_args, **_kwargs):
            return _Mic(stage, exits)

        bridge = AudioReverseBridge("ws://robot:60002/client")
        with mock.patch("robonix_client.audio_reverse_bridge.websockets.connect", connect):
            await bridge._relay(robot)

        self.assertEqual(exits, [0, 1])
        end_ids = [
            json.loads(payload)["stream_id"]
            for payload in robot.sent
            if isinstance(payload, str) and json.loads(payload).get("type") == "mic_end"
        ]
        self.assertEqual(end_ids, ["old", "new"])


if __name__ == "__main__":
    unittest.main()
