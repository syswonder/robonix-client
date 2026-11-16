import unittest
from contextlib import asynccontextmanager
from unittest import mock

import grpc

from robonix_client import transport

import audio_pb2
import tts_pb2


def tts_chunk(data: bytes, final: bool = False):
    return tts_pb2.SynthesizeAudioChunk(
        chunk=audio_pb2.AudioChunk(data=data),
        encoding="pcm_s16le",
        sample_rate_hz=16000,
        is_final=final,
    )


class FakeChannel:
    """Serves the TTS stream and records what reaches the speaker."""

    def __init__(self, tts_items, played):
        self.tts_items = tts_items
        self.played = played

    def unary_stream(self, path, **_):
        async def call(_request, timeout=None):
            for item in self.tts_items:
                if isinstance(item, Exception):
                    raise item
                yield item

        return call

    def stream_unary(self, path, **_):
        async def call(chunks, timeout=None):
            async for chunk in chunks:
                self.played.append(chunk)

        return call


def fake_stream_channel(tts_items, played):
    @asynccontextmanager
    async def stream_channel(_target):
        yield FakeChannel(tts_items, played)

    return stream_channel


def rpc_error():
    return grpc.aio.AioRpcError(grpc.StatusCode.UNAVAILABLE, None, None, details="down")


class TtsStreamTest(unittest.IsolatedAsyncioTestCase):
    async def test_streamed_pcm_reaches_the_speaker(self):
        played = []
        items = [tts_chunk(b"\x01\x00" * 8), tts_chunk(b"\x02\x00" * 4), tts_chunk(b"", final=True)]
        stats = {}
        with mock.patch.object(transport, "stream_channel", fake_stream_channel(items, played)):
            await transport._stream_tts_to_speaker("tts", "speaker", tts_pb2.SynthesizeStream_Request(), stats)

        self.assertEqual([chunk.data for chunk in played], [b"\x01\x00" * 8, b"\x02\x00" * 4])
        self.assertEqual([chunk.sequence for chunk in played], [0, 1])
        self.assertEqual(stats, {"bytes": 24, "encoding": "pcm_s16le", "sampleRateHz": 16000})

    async def test_stream_error_after_audio_is_reported_with_byte_count(self):
        played = []
        stats = {}
        items = [tts_chunk(b"\x01\x00"), rpc_error()]
        with mock.patch.object(transport, "stream_channel", fake_stream_channel(items, played)):
            with self.assertRaises(grpc.aio.AioRpcError):
                await transport._stream_tts_to_speaker("tts", "speaker", tts_pb2.SynthesizeStream_Request(), stats)
        self.assertEqual(stats["bytes"], 2)

    async def test_play_test_falls_back_to_unary_when_stream_fails_first(self):
        played = []
        unary = tts_pb2.Synthesize_Response(audio_data=b"\x03\x00" * 4, sample_rate_hz=16000)

        class Channel(FakeChannel):
            def unary_unary(self, path, **_):
                async def call(_request, timeout=None):
                    return unary

                return call

        @asynccontextmanager
        async def stream_channel(_target):
            yield Channel([rpc_error()], played)

        async def discover(_atlas, contract_id, _node=""):
            return contract_id

        with mock.patch.object(transport, "stream_channel", stream_channel), \
                mock.patch.object(transport, "discover_endpoint", discover):
            result = await transport.play_tts_test(transport.ClientSettings(), "hi")

        self.assertEqual(result["bytes"], 8)
        self.assertNotIn("streamed", result)
        self.assertEqual([chunk.data for chunk in played], [b"\x03\x00" * 4])


if __name__ == "__main__":
    unittest.main()
