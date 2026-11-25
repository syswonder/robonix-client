import asyncio
import threading
import time
import unittest
from unittest import mock

import websockets

from robonix_client import audio_server_control
from robonix_client.audio_reverse_bridge import (
    REPLACED_CLOSE_CODE,
    REPLACED_CLOSE_REASON,
    AudioReverseBridge,
    ReverseAudioBusy,
    _was_replaced,
)


def _closed_exc(code: int, reason: str) -> websockets.ConnectionClosed:
    rcvd = websockets.frames.Close(code, reason)
    return websockets.ConnectionClosed(rcvd=rcvd, sent=None)


class WasReplacedTest(unittest.TestCase):
    def test_matches_code_and_reason(self) -> None:
        exc = _closed_exc(REPLACED_CLOSE_CODE, REPLACED_CLOSE_REASON)
        self.assertTrue(_was_replaced(exc))

    def test_other_code_is_not_a_replace(self) -> None:
        exc = _closed_exc(1001, REPLACED_CLOSE_REASON)
        self.assertFalse(_was_replaced(exc))

    def test_other_reason_is_not_a_replace(self) -> None:
        exc = _closed_exc(REPLACED_CLOSE_CODE, "robot target changed")
        self.assertFalse(_was_replaced(exc))


class _OpenThenClosedRobot:
    """A /client connection that opens, then is closed by the robot while relaying."""

    def __init__(self, code: int, reason: str, opened: list) -> None:
        self._exc = _closed_exc(code, reason)
        self._opened = opened

    async def __aenter__(self):
        self._opened.append(True)
        return self

    async def __aexit__(self, *_args):
        return None

    async def send(self, _payload):
        return None

    def __aiter__(self):
        return self

    async def __anext__(self):
        raise self._exc


class _StubRobot:
    """A /client connection that closes itself with a chosen code right away."""

    def __init__(self, code: int, reason: str) -> None:
        self._code = code
        self._reason = reason

    async def __aenter__(self):
        raise _closed_exc(self._code, self._reason)

    async def __aexit__(self, *_args):
        return None

    async def send(self, _payload):
        return None


class AudioReverseBridgeReplaceTest(unittest.IsolatedAsyncioTestCase):
    async def test_replace_sets_taken_over_and_stops_reconnecting(self) -> None:
        bridge = AudioReverseBridge("ws://robot:60002/client")

        def connect(*_args, **_kwargs):
            return _StubRobot(REPLACED_CLOSE_CODE, REPLACED_CLOSE_REASON)

        with mock.patch("robonix_client.audio_reverse_bridge.websockets.connect", connect):
            await bridge._run_async()

        status = bridge.status()
        self.assertTrue(status["takenOver"])
        self.assertFalse(status["connected"])
        self.assertFalse(bridge.holds("ws://robot:60002/client"))

    async def test_replace_while_relaying_drops_the_slot(self) -> None:
        bridge = AudioReverseBridge("ws://robot:60002/client")
        opened: list = []

        def connect(*_args, **_kwargs):
            return _OpenThenClosedRobot(REPLACED_CLOSE_CODE, REPLACED_CLOSE_REASON, opened)

        with mock.patch("robonix_client.audio_reverse_bridge.websockets.connect", connect):
            await bridge._run_async()

        self.assertEqual(opened, [True])
        self.assertTrue(bridge.status()["takenOver"])
        self.assertFalse(bridge.holds("ws://robot:60002/client"))

    async def test_connect_after_takeover_starts_a_new_relay_without_waiting(self) -> None:
        bridge = AudioReverseBridge("ws://robot:60002/client")
        release = threading.Event()
        # The relay that lost the slot is still winding down.
        old = threading.Thread(target=release.wait, daemon=True)
        old.start()
        bridge._thread = old
        bridge._taken_over = True
        old_generation = bridge._generation

        with mock.patch.object(bridge, "_run", lambda _gen: None):
            started = time.monotonic()
            bridge.connect("ws://robot:60002/client")
            elapsed = time.monotonic() - started

        release.set()
        self.assertLess(elapsed, 0.5)
        self.assertIsNot(bridge._thread, old)
        self.assertEqual(bridge._generation, old_generation + 1)
        self.assertFalse(bridge.status()["takenOver"])

    async def test_retarget_clears_old_connection_before_new_thread_runs(self) -> None:
        previous = "ws://previous:60002/client"
        replacement = "ws://replacement:60002/client"
        bridge = AudioReverseBridge(previous)
        release = threading.Event()
        old = threading.Thread(target=release.wait, daemon=True)
        old.start()
        self.addCleanup(release.set)
        bridge._thread = old
        bridge._connected_endpoint = previous

        with mock.patch.object(bridge, "_run", lambda _generation: None):
            bridge.connect(replacement)
        self.assertEqual(bridge.status()["target"], replacement)
        self.assertFalse(bridge.status()["connected"])
        self.assertFalse(bridge.holds(replacement))
        self.assertFalse(bridge.holds(previous))

    async def test_stale_relay_cannot_mark_a_newer_one_taken_over(self) -> None:
        bridge = AudioReverseBridge("ws://robot:60002/client")
        stale_generation = bridge._generation
        bridge._generation += 1  # a newer connect() started meanwhile

        def connect(*_args, **_kwargs):
            return _StubRobot(REPLACED_CLOSE_CODE, REPLACED_CLOSE_REASON)

        with mock.patch("robonix_client.audio_reverse_bridge.websockets.connect", connect):
            await bridge._run_async(stale_generation)

        self.assertFalse(bridge.status()["takenOver"])

    async def test_non_replace_close_keeps_reconnecting(self) -> None:
        bridge = AudioReverseBridge("ws://robot:60002/client")
        attempts = []

        def connect(*_args, **_kwargs):
            attempts.append(True)
            if len(attempts) == 1:
                return _StubRobot(1001, "server shutting down")
            bridge._stop.set()
            return _StubRobot(1001, "server shutting down")

        with mock.patch("robonix_client.audio_reverse_bridge.websockets.connect", connect):
            with mock.patch("robonix_client.audio_reverse_bridge.asyncio.sleep", mock.AsyncMock()):
                await bridge._run_async()

        self.assertEqual(len(attempts), 2)
        self.assertFalse(bridge.status()["takenOver"])


class ConnectReverseAudioTest(unittest.IsolatedAsyncioTestCase):
    def setUp(self) -> None:
        from robonix_client import app as app_module

        # These tests replace module-level bridge state; put it back afterwards.
        saved = (app_module._reverse_audio, app_module._reverse_provider)

        def restore() -> None:
            app_module._reverse_audio, app_module._reverse_provider = saved

        self.addCleanup(restore)
        app_module._reverse_audio = None
        app_module._reverse_provider = ""

    async def test_busy_without_take_over_raises(self) -> None:
        from robonix_client import app as app_module

        bridge_info = {"endpoint": "ws://robot:60002/client", "connected": True}

        async def fake_discover(_settings, _provider_id):
            return dict(bridge_info)

        with mock.patch.object(app_module, "discover_audio_bridge", fake_discover):
            with self.assertRaises(ReverseAudioBusy) as ctx:
                await app_module._connect_reverse_audio(
                    mock.Mock(), "provider-a", take_over=False
                )
        self.assertEqual(ctx.exception.provider_id, "provider-a")

    async def test_busy_with_take_over_connects(self) -> None:
        from robonix_client import app as app_module

        bridge_info = {"endpoint": "ws://robot:60002/client", "connected": True}

        async def fake_discover(_settings, _provider_id):
            return dict(bridge_info)

        fake_bridge = mock.Mock()
        fake_bridge.holds.return_value = True
        fake_bridge.status.return_value = {
            "connected": True,
            "target": "ws://robot:60002/client",
            "lastError": "",
            "takenOver": False,
        }

        with mock.patch.object(app_module, "discover_audio_bridge", fake_discover):
            with mock.patch.object(app_module, "AudioReverseBridge", lambda *a, **k: fake_bridge):
                with mock.patch.object(app_module, "_restore_saved_devices", mock.AsyncMock()):
                    result = await app_module._connect_reverse_audio(
                        mock.Mock(), "provider-a", take_over=True
                    )

        self.assertTrue(result["fresh"])
        self.assertTrue(result["connected"])
        fake_bridge.connect.assert_called_once_with("ws://robot:60002/client")


class LocalDevicesTest(unittest.IsolatedAsyncioTestCase):
    async def test_converts_device_server_payload(self) -> None:
        payload = {
            "devices": [
                {"id": 0, "name": "Default Mic", "max_input_channels": 2, "max_output_channels": 0},
                {"id": 1, "name": "Default Speaker", "max_input_channels": 0, "max_output_channels": 2},
                {"id": 2, "name": "Silent Device", "max_input_channels": 0, "max_output_channels": 0},
            ],
            "input_default": 0,
            "output_default": 1,
            "input_current": 0,
            "output_current": None,
        }

        async def fake_local_request(_path, _body=None, timeout_s=3.0):
            return payload

        with mock.patch.object(audio_server_control, "_local_request", fake_local_request):
            result = await audio_server_control.local_devices("provider-a")

        self.assertEqual(result["providerId"], "provider-a")
        self.assertEqual(len(result["devices"]), 2)
        mic = next(d for d in result["devices"] if d["kind"] == "input")
        self.assertTrue(mic["isDefault"])
        self.assertEqual(result["currentInputId"], "0")
        self.assertEqual(result["currentOutputId"], "")


class SelectLocalDeviceTest(unittest.IsolatedAsyncioTestCase):
    async def test_non_numeric_id_is_rejected_not_defaulted(self) -> None:
        sent = mock.AsyncMock(return_value={"ok": True})
        with mock.patch.object(audio_server_control, "_local_request", sent):
            with self.assertRaises(ValueError):
                await audio_server_control.select_local_device("input", "usb-mic")
        sent.assert_not_called()

    async def test_blank_id_selects_os_default(self) -> None:
        sent = mock.AsyncMock(return_value={"ok": True})
        with mock.patch.object(audio_server_control, "_local_request", sent):
            await audio_server_control.select_local_device("output", "")
        sent.assert_awaited_once_with("/set_device", {"output": None})


if __name__ == "__main__":
    unittest.main()
