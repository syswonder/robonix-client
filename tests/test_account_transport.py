import json
import unittest
from types import SimpleNamespace
from unittest import mock

from robonix_client import transport


class AccountTransportTest(unittest.IsolatedAsyncioTestCase):
    async def test_login_uses_liaison_account_service(self):
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
        with mock.patch.object(
            transport, "_unary_unary", mock.AsyncMock(return_value=response)
        ) as call:
            result = await transport.account_login(settings, "alice", "secret-pass")

        endpoint, method, request, response_type = call.await_args.args
        self.assertEqual(endpoint, "robot:50081")
        self.assertEqual(method, "/robonix.keystone.v1.Keystone/Login")
        self.assertEqual(request.username, "alice")
        self.assertEqual(request.password, "secret-pass")
        self.assertIs(response_type, transport.keystone_pb2.AuthResponse)
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
        with mock.patch.object(
            transport, "_unary_unary", mock.AsyncMock(return_value=profile)
        ) as call:
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


if __name__ == "__main__":
    unittest.main()
