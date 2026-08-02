from __future__ import annotations

from collections import Counter
from pathlib import Path
import re
import unittest


ROOT = Path(__file__).parents[1]
STATIC = ROOT / "src" / "robonix_client" / "static"
APP = ROOT / "src" / "robonix_client" / "app.py"


class FrontendStructureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.html = (STATIC / "index.html").read_text(encoding="utf-8")
        self.javascript = (STATIC / "app.js").read_text(encoding="utf-8")
        self.app = APP.read_text(encoding="utf-8")
        self.styles = "\n".join(
            path.read_text(encoding="utf-8")
            for path in (STATIC / "styles.css", STATIC / "next-ui.css")
        )

    def test_html_ids_are_unique_and_javascript_ids_exist(self) -> None:
        html_ids = re.findall(r'\bid="([^"]+)"', self.html)
        duplicates = sorted(
            identifier
            for identifier, count in Counter(html_ids).items()
            if count > 1
        )
        javascript_ids = set(
            re.findall(r'\b(?:\$|maybe)\("([^"]+)"\)', self.javascript)
        )

        self.assertEqual(duplicates, [])
        self.assertEqual(sorted(javascript_ids - set(html_ids)), [])

    def test_navigation_and_page_panels_stay_in_sync(self) -> None:
        navigation_pages = set(re.findall(r'data-page="([^"]+)"', self.html))
        panel_pages = set(re.findall(r'data-page-panel="([^"]+)"', self.html))

        self.assertEqual(navigation_pages, panel_pages)
        self.assertEqual(
            navigation_pages,
            {
                "admin",
                "audio",
                "dashboard",
                "executions",
                "logs",
                "profile",
                "sentinel",
                "settings",
                "vitals",
            },
        )

    def test_sentinel_direct_route_serves_spa(self) -> None:
        self.assertIn('@app.get("/sentinel")', self.app)

    def test_material_ui_dependencies_do_not_return(self) -> None:
        frontend = "\n".join((self.html, self.javascript, self.styles)).lower()
        forbidden = ("material-web", "@material", "mdc-", "<md-")

        for marker in forbidden:
            with self.subTest(marker=marker):
                self.assertNotIn(marker, frontend)

    def test_voiceprint_profile_exposes_state_waveform_and_playback(self) -> None:
        for identifier in (
            "voiceprintSummary",
            "voiceprintPreview",
            "voiceprintWaveform",
            "voiceprintPreviewMeta",
            "playVoiceprintPreview",
            "voiceprintPreviewAudio",
        ):
            with self.subTest(identifier=identifier):
                self.assertIn(f'id="{identifier}"', self.html)

        for behavior in (
            "No voiceprint enrolled.",
            "Voiceprint enrolled.",
            "refreshVoiceprintPreview",
            "drawVoiceprintWaveform",
            "displayGain",
            "playVoiceprintPreview",
            "audio.play()",
        ):
            with self.subTest(behavior=behavior):
                self.assertIn(behavior, self.javascript)

    def test_audio_route_tests_are_mutually_blocking(self) -> None:
        for behavior in (
            'state.audio.testBusy = "microphone"',
            'state.audio.testBusy = "speaker"',
            'micTest.toggleAttribute("disabled", busy)',
            'speakerTest.toggleAttribute("disabled", busy)',
            'state.audio.testBusy = ""',
        ):
            with self.subTest(behavior=behavior):
                self.assertIn(behavior, self.javascript)

    def test_sentinel_uses_typed_generic_predicates(self) -> None:
        frontend = "\n".join((self.html, self.javascript))
        for required in (
            "SENTINEL_VALUE_KINDS",
            "SENTINEL_NUMERIC_OPERATORS",
            "RFC 6901",
            "min_inclusive",
            "max_inclusive",
            "Robot conditions",
            "Argument conditions",
        ):
            with self.subTest(required=required):
                self.assertIn(required, frontend)
        for forbidden in ('value="gripper_open"', 'value="moving"', "Robot state"):
            with self.subTest(forbidden=forbidden):
                self.assertNotIn(forbidden, frontend)


if __name__ == "__main__":
    unittest.main()
