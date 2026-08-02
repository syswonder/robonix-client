import json
import unittest
from types import SimpleNamespace
from unittest import mock

from robonix_client import transport


class AccountTransportTest(unittest.IsolatedAsyncioTestCase):
    def test_remote_atlas_host_rewrites_loopback_sentinel_endpoint(self):
        self.assertEqual(
            transport.rewrite_remote_endpoint(
                "127.0.0.1:50062", "100.117.99.116:50051"
            ),
            "100.117.99.116:50062",
        )
        self.assertEqual(
            transport.rewrite_remote_endpoint(
                "127.0.0.1:50062", "127.0.0.1:50051"
            ),
            "127.0.0.1:50062",
        )

    async def test_connection_gate_requires_keystone_login_and_registration(self):
        settings = transport.ClientSettings(atlas_endpoint="robot:50051")
        with mock.patch.object(
            transport,
            "discover_endpoint",
            mock.AsyncMock(
                side_effect=["robot:50095", "robot:50095"]
            ),
        ) as discover:
            result = await transport.account_connection_status(settings)

        self.assertEqual(result["robotHost"], "robot")
        self.assertEqual(result["keystoneEndpoint"], "robot:50095")
        self.assertEqual(
            [call.args[1] for call in discover.await_args_list],
            [
                transport.CONTRACT_KEYSTONE_LOGIN,
                transport.CONTRACT_KEYSTONE_REGISTER,
            ],
        )

    async def test_login_discovers_and_calls_keystone_directly(self):
        settings = transport.ClientSettings(
            atlas_endpoint="robot:50051",
            liaison_endpoint="robot:50081",
        )
        response = SimpleNamespace(
            session_token="opaque-session",
            expires_at_ms=1234,
            user=SimpleNamespace(
                user_id="user-alice",
                username="alice",
                display_name="Alice",
                email="alice@example.com",
                enabled=True,
                roles=["user"],
                voice_guard_enabled=False,
                voiceprint_enrolled=False,
                password_change_required=False,
                created_at_ms=1,
                updated_at_ms=2,
            ),
        )
        with (
            mock.patch.object(
                transport,
                "discover_endpoint",
                mock.AsyncMock(return_value="robot:50095"),
            ) as discover,
            mock.patch.object(
                transport, "_unary_unary", mock.AsyncMock(return_value=response)
            ) as call,
        ):
            result = await transport.account_login(
                settings, "alice", "secret-pass"
            )

        endpoint, method, request, response_type = call.await_args.args
        discover.assert_awaited_once_with(
            "robot:50051",
            transport.CONTRACT_KEYSTONE_LOGIN,
            "keystone",
        )
        self.assertEqual(endpoint, "robot:50095")
        self.assertEqual(
            method,
            "/robonix.contracts.RobonixSystemKeystoneLogin/Login",
        )
        self.assertEqual(request.username, "alice")
        self.assertEqual(request.password, "secret-pass")
        self.assertIs(response_type, transport.keystone_pb2.Login_Response)
        self.assertEqual(result["sessionToken"], "opaque-session")
        self.assertEqual(result["user"]["userId"], "user-alice")

    async def test_profile_and_handsfree_carry_opaque_session(self):
        settings = transport.ClientSettings(
            atlas_endpoint="robot:50051",
            liaison_endpoint="robot:50081",
            auth_token="opaque-session",
            mic_node_id="client_mic",
            speaker_node_id="client_speaker",
        )
        profile = SimpleNamespace(
            user=SimpleNamespace(
                user_id="user-alice",
                username="alice",
                display_name="Alice",
                email="",
                enabled=True,
                roles=["user"],
                voice_guard_enabled=True,
                voiceprint_enrolled=True,
                password_change_required=False,
                created_at_ms=1,
                updated_at_ms=2,
            )
        )
        with (
            mock.patch.object(
                transport,
                "discover_endpoint",
                mock.AsyncMock(return_value="robot:50095"),
            ),
            mock.patch.object(
                transport, "_unary_unary", mock.AsyncMock(return_value=profile)
            ) as call,
        ):
            await transport.account_profile(settings)
        request = call.await_args.args[2]
        self.assertEqual(request.session_token, "opaque-session")

        handsfree_response = SimpleNamespace(
            ok=True, enabled=True, state="listening", detail=""
        )
        with (
            mock.patch.object(
                transport,
                "discover_endpoint",
                mock.AsyncMock(return_value="robot:50081"),
            ),
            mock.patch.object(
                transport,
                "_unary_unary",
                mock.AsyncMock(return_value=handsfree_response),
            ) as call,
        ):
            await transport.set_handsfree_enabled(settings, True)
        request = call.await_args.args[2]
        self.assertEqual(request.session_token, "opaque-session")
        self.assertEqual(request.mic_provider_id, "client_mic")
        self.assertEqual(request.speaker_provider_id, "client_speaker")

    async def test_voiceprint_preview_returns_authenticated_pcm(self):
        settings = transport.ClientSettings(
            atlas_endpoint="robot:50051",
            auth_token="opaque-session",
        )
        response = SimpleNamespace(
            available=True,
            audio_data=b"\x01\x00\x02\x00",
            sample_rate_hz=16000,
            updated_at_ms=1234,
        )
        with mock.patch.object(
            transport,
            "account_call",
            mock.AsyncMock(return_value=response),
        ) as call:
            result = await transport.account_get_voiceprint_preview(settings)

        self.assertEqual(
            call.await_args.args[1],
            transport.CONTRACT_KEYSTONE_GET_VOICEPRINT_PREVIEW,
        )
        self.assertEqual(call.await_args.args[2], "GetVoiceprintPreview")
        self.assertEqual(call.await_args.args[3].session_token, "opaque-session")
        self.assertIs(
            call.await_args.args[4],
            transport.keystone_pb2.GetVoiceprintPreview_Response,
        )
        self.assertTrue(result["available"])
        self.assertEqual(result["audioPcmBase64"], "AQACAA==")
        self.assertEqual(result["bytes"], 4)
        self.assertEqual(result["updatedAtMs"], 1234)
        self.assertEqual(result["peak"], 2)
        self.assertGreater(result["rms"], 0)
        self.assertEqual(result["nonzeroRatio"], 1.0)

    async def test_voiceprint_preview_hides_empty_audio(self):
        settings = transport.ClientSettings(auth_token="opaque-session")
        response = SimpleNamespace(
            available=True,
            audio_data=b"",
            sample_rate_hz=0,
            updated_at_ms=0,
        )
        with mock.patch.object(
            transport,
            "account_call",
            mock.AsyncMock(return_value=response),
        ):
            result = await transport.account_get_voiceprint_preview(settings)

        self.assertFalse(result["available"])
        self.assertEqual(result["audioPcmBase64"], "")
        self.assertEqual(result["sampleRateHz"], 16000)
        self.assertEqual(result["peak"], 0)
        self.assertEqual(result["rms"], 0)
        self.assertEqual(result["nonzeroRatio"], 0)

    def test_text_task_separates_session_secret_from_user_hint(self):
        settings = transport.ClientSettings(
            atlas_endpoint="robot:50051",
            session_id="session-1",
            user_id="Alice",
            auth_token="opaque-session",
        )
        task = transport.build_text_task(settings, "hello")
        context = json.loads(task.context_json)
        self.assertEqual(context["user_id"], "Alice")
        self.assertEqual(context["session_token"], "opaque-session")
        self.assertNotIn("opaque-session", task.text)

    async def test_sentinel_rules_use_sentinel_provider_and_admin_session(self):
        settings = transport.ClientSettings(
            atlas_endpoint="robot:50051", auth_token="opaque-session"
        )
        response = SimpleNamespace(rules_json='[{"id":"deny-motion"}]')
        with (
            mock.patch.object(
                transport,
                "discover_endpoint_handle",
                mock.AsyncMock(return_value=("channel-1", "robot:50062")),
            ) as discover,
            mock.patch.object(
                transport, "_unary_unary", mock.AsyncMock(return_value=response)
            ) as call,
            mock.patch.object(
                transport, "disconnect_capability", mock.AsyncMock()
            ) as disconnect,
        ):
            rules = await transport.sentinel_list_rules(settings)

        discover.assert_awaited_once_with(
            "robot:50051", transport.CONTRACT_SENTINEL_LIST_RULES, "sentinel"
        )
        disconnect.assert_awaited_once_with("robot:50051", "channel-1")
        endpoint, method, request, response_type = call.await_args.args
        self.assertEqual(endpoint, "robot:50062")
        self.assertEqual(
            method,
            "/robonix.contracts.RobonixSystemSentinelListRules/ListRules",
        )
        self.assertEqual(request.session_token, "opaque-session")
        self.assertIs(response_type, transport.sentinel_pb2.ListRules_Response)
        self.assertEqual(rules, [{"id": "deny-motion"}])


if __name__ == "__main__":
    unittest.main()
