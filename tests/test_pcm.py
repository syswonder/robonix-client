import struct
import unittest

from robonix_client.transport import pcm16_stats


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


if __name__ == "__main__":
    unittest.main()
