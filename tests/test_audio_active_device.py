import asyncio
import unittest
from unittest import mock

from robonix_client import app as app_module
from robonix_client.transport import ClientSettings

LISTING = {
    "providerId": "usb_mic",
    "devices": [
        {"id": "hw:1,0", "name": "USB Audio", "kind": "input"},
        {"id": "hw:2,0", "name": "Built-in", "kind": "input"},
        {"id": "hw:3,0", "name": "USB Speaker", "kind": "output"},
    ],
    "currentInputId": "hw:1,0",
    "currentOutputId": "hw:3,0",
}


def _run(coro):
    return asyncio.run(coro)


class ActiveDeviceTest(unittest.TestCase):
    def setUp(self) -> None:
        self.settings = ClientSettings.from_payload({})

    def _active(self, listing, provider="usb_mic", kind="input"):
        with mock.patch.object(app_module, "_provider_devices", mock.AsyncMock(return_value=listing)):
            return _run(app_module._active_device(self.settings, provider, kind))

    def test_input_uses_current_input_id(self) -> None:
        self.assertEqual(self._active(LISTING), {"id": "hw:1,0", "name": "USB Audio"})

    def test_output_uses_current_output_id(self) -> None:
        self.assertEqual(
            self._active(LISTING, kind="output"), {"id": "hw:3,0", "name": "USB Speaker"}
        )

    def test_blank_current_id_means_os_default(self) -> None:
        listing = {**LISTING, "currentInputId": ""}
        self.assertEqual(self._active(listing), {"id": "", "name": "OS default"})

    def test_unknown_current_id_falls_back_to_the_id(self) -> None:
        listing = {**LISTING, "currentInputId": "hw:9,9"}
        self.assertEqual(self._active(listing), {"id": "hw:9,9", "name": "hw:9,9"})

    def test_no_provider_selected_gives_none(self) -> None:
        self.assertIsNone(_run(app_module._active_device(self.settings, "", "input")))

    def test_unreachable_provider_gives_none_not_an_error(self) -> None:
        failing = mock.AsyncMock(side_effect=RuntimeError("list_devices not offered"))
        with mock.patch.object(app_module, "_provider_devices", failing):
            self.assertIsNone(_run(app_module._active_device(self.settings, "usb_mic", "input")))


class ProviderDevicesTest(unittest.TestCase):
    def setUp(self) -> None:
        self.settings = ClientSettings.from_payload({})

    def _devices(self, provider_id):
        local = mock.AsyncMock(return_value={"providerId": provider_id, "source": "local"})
        remote = mock.AsyncMock(return_value={"providerId": provider_id, "source": "atlas"})
        with mock.patch.object(app_module, "_bridge_provider_ids", mock.AsyncMock(return_value={"bridge"})), \
                mock.patch.object(app_module.audio_server_control, "local_devices", local), \
                mock.patch.object(app_module, "list_audio_devices", remote):
            return _run(app_module._provider_devices(self.settings, provider_id))

    def test_local_failure_preserves_robot_bridge_status(self) -> None:
        bridge = {"connected": True, "endpoint": "ws://robot:60002/client", "detail": "occupied"}
        with (
            mock.patch.object(app_module, "_bridge_provider_ids", mock.AsyncMock(return_value={"bridge"})),
            mock.patch.object(app_module.audio_server_control, "local_devices",
                              mock.AsyncMock(side_effect=ConnectionRefusedError("device server offline"))),
            mock.patch.object(app_module, "discover_audio_bridge", mock.AsyncMock(return_value=bridge)),
        ):
            result = _run(app_module.audio_route_devices(app_module.AudioProviderDevicesRequest(providerId="bridge")))
        self.assertTrue(result["bridgeConnected"])
        self.assertEqual(result["deviceError"], "device server offline")

    def test_explicit_blank_resets_only_the_specified_side(self) -> None:
        select = mock.AsyncMock()
        with (
            mock.patch.object(app_module, "_bridge_provider_ids", mock.AsyncMock(return_value={"bridge"})),
            mock.patch.object(app_module.audio_server_control, "select_local_device", select),
        ):
            result = _run(app_module.audio_route_apply(app_module.AudioRouteApplyRequest(
                providerId="bridge", inputId=""
            )))
        self.assertTrue(result["ok"])
        select.assert_awaited_once_with("input", "")

    def test_bridge_provider_reads_this_machine(self) -> None:
        self.assertEqual(self._devices("bridge")["source"], "local")

    def test_other_provider_goes_through_atlas(self) -> None:
        self.assertEqual(self._devices("usb_mic")["source"], "atlas")


class SpeakerTestDeviceTest(unittest.TestCase):
    def setUp(self) -> None:
        self.settings = ClientSettings.from_payload({"speakerNodeId": "bridge"})
        saved = (app_module._reverse_audio, app_module._reverse_provider)

        def restore() -> None:
            app_module._reverse_audio, app_module._reverse_provider = saved

        self.addCleanup(restore)

    def _device(self, reverse_audio, provider):
        app_module._reverse_audio = reverse_audio
        app_module._reverse_provider = provider
        active = mock.AsyncMock(return_value={"id": "1", "name": "Local Speaker"})
        with mock.patch.object(app_module, "_bridge_provider_ids", mock.AsyncMock(return_value={"bridge"})), \
                mock.patch.object(app_module, "_active_device", active):
            return _run(app_module._speaker_test_device(self.settings))

    def test_failed_device_lookup_keeps_playback_result(self) -> None:
        with (
            mock.patch.object(app_module, "play_tts_test", mock.AsyncMock(return_value={"ok": True, "bytes": 12})),
            mock.patch.object(app_module, "_speaker_test_device",
                              mock.AsyncMock(side_effect=RuntimeError("device metadata unavailable"))),
        ):
            result = _run(app_module.audio_play_test(app_module.AudioPlayTestRequest()))
        self.assertEqual(result, {"ok": True, "bytes": 12, "device": None})

    def test_bridge_held_elsewhere_reports_no_device(self) -> None:
        self.assertIsNone(self._device(None, ""))

    def test_bridge_held_by_us_reports_this_machine(self) -> None:
        held = mock.Mock()
        held.status.return_value = {"connected": True}
        self.assertEqual(self._device(held, "bridge"), {"id": "1", "name": "Local Speaker"})


if __name__ == "__main__":
    unittest.main()
