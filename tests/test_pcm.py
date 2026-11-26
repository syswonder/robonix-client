import struct
import unittest

from robonix_client.transport import NEAR_SILENCE_PEAK, capture_warning, pcm16_stats, peak_dbfs


class PcmStatsTest(unittest.TestCase):
    def test_all_zero_stream_is_exactly_identified(self):
        stats = pcm16_stats(bytes(320))
        self.assertEqual(stats["samples"], 160)
        self.assertEqual(stats["peak"], 0)
        self.assertEqual(stats["nonzeroSamples"], 0)
        self.assertEqual(stats["rms"], 0.0)

    def test_quiet_nonzero_audio_is_not_flatline(self):
        pcm = struct.pack("<hhhh", 0, 1, -2, 0)
        stats = pcm16_stats(pcm)
        self.assertEqual(stats["peak"], 2)
        self.assertEqual(stats["nonzeroSamples"], 2)
        self.assertGreater(stats["rms"], 0.0)


class CaptureWarningTest(unittest.TestCase):
    def _warning(self, peak: int) -> str:
        return capture_warning(pcm16_stats(struct.pack("<hh", 0, peak)))

    def test_peak_below_threshold_is_near_silence(self):
        self.assertEqual(self._warning(NEAR_SILENCE_PEAK - 1), "near_silence")

    def test_peak_at_threshold_is_a_live_signal(self):
        self.assertEqual(self._warning(NEAR_SILENCE_PEAK), "")

    def test_negative_peak_counts_by_magnitude(self):
        stats = pcm16_stats(struct.pack("<hh", 0, -(NEAR_SILENCE_PEAK - 1)))
        self.assertEqual(capture_warning(stats), "near_silence")

    def test_empty_capture_has_no_warning(self):
        self.assertEqual(capture_warning(pcm16_stats(b"")), "")


class PeakDbfsTest(unittest.TestCase):
    def test_full_scale_is_zero_db(self):
        self.assertEqual(peak_dbfs(32768), 0.0)

    def test_half_scale_is_minus_six_db(self):
        self.assertEqual(peak_dbfs(16384), -6.0)

    def test_exact_silence_has_no_level(self):
        self.assertIsNone(peak_dbfs(0))


if __name__ == "__main__":
    unittest.main()
