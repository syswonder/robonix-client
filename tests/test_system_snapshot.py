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


class ContractFlagsTest(unittest.TestCase):
    def provider_with(self, *contract_ids: str):
        item = transport.atlas_pb2.CapabilityProvider(id="p")
        for contract_id in contract_ids:
            item.capabilities.add(contract_id=contract_id)
        return item

    def test_flags_come_from_the_contract_descriptor(self):
        contracts = {
            "a": transport.atlas_pb2.ContractDescriptor(
                id="a", cross_namespace=True, llm_callable=False
            ),
            "b": transport.atlas_pb2.ContractDescriptor(id="b"),
        }

        caps = transport.provider_to_dict(
            self.provider_with("a", "b", "unknown"), contracts
        )["capabilities"]

        self.assertEqual(
            [(cap["crossNamespace"], cap["llmCallable"]) for cap in caps],
            # Absent `llm_callable` means true, also for unknown contracts.
            [(True, False), (False, True), (False, True)],
        )


if __name__ == "__main__":
    unittest.main()
