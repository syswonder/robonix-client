import unittest

from robonix_client import transport


def provider(provider_id: str, *contract_ids: str) -> dict:
    return {
        "id": provider_id,
        "capabilities": [
            {"contractId": contract_id} for contract_id in contract_ids
        ],
    }


def required_contract(result: list[dict], label: str) -> dict:
    return next(item for item in result if item["label"] == label)


class RequiredContractsTest(unittest.TestCase):
    def test_executor_matches_real_public_contracts_once(self):
        rows = [
            provider(
                "executor",
                transport.CONTRACT_EXECUTOR_EXECUTE,
                transport.CONTRACT_EXECUTOR_LIST_ACTIVE,
                transport.CONTRACT_EXECUTOR_CONTROL_PLAN,
            )
        ]

        executor = required_contract(transport.required_contracts(rows), "Executor")

        self.assertTrue(executor["available"])
        self.assertEqual(executor["providers"], ["executor"])
        self.assertEqual(
            executor["contractId"], transport.CONTRACT_EXECUTOR_EXECUTE
        )

    def test_executor_accepts_list_active_control_plane_contract(self):
        rows = [provider("executor", transport.CONTRACT_EXECUTOR_LIST_ACTIVE)]

        executor = required_contract(transport.required_contracts(rows), "Executor")

        self.assertTrue(executor["available"])
        self.assertEqual(executor["providers"], ["executor"])

    def test_executor_remains_missing_without_a_public_executor_contract(self):
        rows = [
            provider(
                "not-executor",
                "robonix/system/executor/builtin/read_file",
                transport.CONTRACT_PILOT,
            )
        ]

        executor = required_contract(transport.required_contracts(rows), "Executor")

        self.assertFalse(executor["available"])
        self.assertEqual(executor["providers"], [])


if __name__ == "__main__":
    unittest.main()
