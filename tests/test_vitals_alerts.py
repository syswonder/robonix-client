# SPDX-License-Identifier: MulanPSL-2.0

from __future__ import annotations

import asyncio
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from fastapi import HTTPException

from robonix_client.vitals_alerts import (
    AlertStillActiveError,
    VitalsAlertStore,
    VitalsAlertTracker,
)
from robonix_client.vitals_api import (
    ResolveAlertRequest,
    clear_vitals_alert_history,
    list_vitals_alerts,
    resolve_vitals_alert,
)


def component_alert(severity: str = "error") -> dict:
    return {
        "sourceType": "component",
        "sourceId": "body/arm/joint_2",
        "robotId": "piper",
        "label": "Joint 2",
        "severity": severity,
        "detail": "motor over-temperature",
    }


class VitalsAlertStoreTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.database = Path(self.temporary.name) / "alerts.sqlite3"
        self.store = VitalsAlertStore(self.database)

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def test_persists_recovery_until_operator_resolves(self) -> None:
        created = self.store.reconcile(
            "hardware:piper", [component_alert()], now_ms=100
        )
        alert_id = created.notify_ids[0]

        restarted_store = VitalsAlertStore(self.database)
        persisted = restarted_store.list_alerts()
        self.assertEqual([alert["id"] for alert in persisted], [alert_id])
        self.assertEqual(persisted[0]["status"], "active")

        with self.assertRaises(AlertStillActiveError):
            restarted_store.resolve(alert_id)

        recovered = restarted_store.reconcile(
            "hardware:piper", [], now_ms=200
        )
        self.assertTrue(recovered.changed)
        self.assertEqual(restarted_store.list_alerts()[0]["status"], "recovered")

        resolved = restarted_store.resolve(alert_id, "zhenyu")
        self.assertEqual(resolved["status"], "resolved")
        self.assertEqual(resolved["resolvedBy"], "zhenyu")
        self.assertEqual(restarted_store.list_alerts(), [])
        self.assertEqual(
            restarted_store.list_alerts(include_resolved=True)[0]["id"],
            alert_id,
        )

    def test_clear_resolved_history_keeps_open_incidents(self) -> None:
        first = self.store.reconcile(
            "hardware:piper", [component_alert()], now_ms=100
        )
        resolved_id = first.notify_ids[0]
        self.store.reconcile("hardware:piper", [], now_ms=200)
        self.store.resolve(resolved_id)
        open_id = self.store.reconcile(
            "modules",
            [
                {
                    "sourceType": "module",
                    "sourceId": "pilot",
                    "label": "Pilot",
                    "severity": "stale",
                    "detail": "heartbeat timed out",
                }
            ],
            now_ms=300,
        ).notify_ids[0]

        deleted = self.store.clear_resolved_history()
        remaining = self.store.list_alerts(include_resolved=True)

        self.assertEqual(deleted, 1)
        self.assertEqual([alert["id"] for alert in remaining], [open_id])
        self.assertEqual(remaining[0]["status"], "active")

    def test_reactivation_notifies_and_new_incident_follows_resolution(self) -> None:
        first = self.store.reconcile(
            "hardware:piper", [component_alert("warn")], now_ms=100
        )
        alert_id = first.notify_ids[0]
        self.store.reconcile("hardware:piper", [], now_ms=200)

        reactivated = self.store.reconcile(
            "hardware:piper", [component_alert("error")], now_ms=300
        )
        self.assertEqual(reactivated.notify_ids, (alert_id,))
        self.store.reconcile("hardware:piper", [], now_ms=400)
        self.store.resolve(alert_id)

        recurring = self.store.reconcile(
            "hardware:piper", [component_alert()], now_ms=500
        )
        self.assertNotEqual(recurring.notify_ids[0], alert_id)


class VitalsAlertTrackerTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.store = VitalsAlertStore(
            Path(self.temporary.name) / "tracker.sqlite3"
        )
        self.tracker = VitalsAlertTracker(self.store)

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def test_tracks_direct_component_fault_without_parent_duplicates(self) -> None:
        self.tracker.observe(
            {
                "type": "description",
                "data": {
                    "id": "tiago",
                    "components": [
                        {"id": "body", "label": "TIAGo"},
                        {"id": "body/base/battery", "label": "Battery"},
                    ],
                },
            }
        )
        event = self.tracker.observe(
            {
                "type": "hardware",
                "data": {
                    "componentHealth": [
                        {
                            "componentId": "body",
                            "health": "error",
                            "directHealth": "ok",
                            "detail": "child fault propagated",
                        },
                        {
                            "componentId": "body/base/battery",
                            "health": "error",
                            "directHealth": "error",
                            "detail": "battery controller offline",
                        },
                    ]
                },
            }
        )

        self.assertIsNotNone(event)
        alerts = event["data"]["alerts"]
        self.assertEqual(len(alerts), 1)
        self.assertEqual(alerts[0]["label"], "Battery")
        self.assertEqual(alerts[0]["sourceId"], "body/base/battery")

    def test_suppresses_aggregate_body_alert_when_component_faults_exist(self) -> None:
        self.tracker.observe(
            {
                "type": "description",
                "data": {
                    "id": "piper",
                    "components": [
                        {"id": "body", "label": "Piper"},
                        {"id": "body/arm/joint_2", "label": "Joint 2"},
                    ],
                },
            }
        )
        event = self.tracker.observe(
            {
                "type": "hardware",
                "data": {
                    "componentHealth": [
                        {
                            "componentId": "body",
                            "health": "error",
                            "directHealth": "error",
                            "detail": "body aggregate error",
                        },
                        {
                            "componentId": "body/arm/joint_2",
                            "health": "error",
                            "directHealth": "error",
                            "detail": "joint communication lost",
                        },
                    ]
                },
            }
        )

        self.assertEqual(
            [alert["sourceId"] for alert in event["data"]["alerts"]],
            ["body/arm/joint_2"],
        )

    def test_waits_for_final_description_before_persisting_hardware(self) -> None:
        provisional = self.tracker.observe(
            {
                "type": "description",
                "provisional": True,
                "data": {"id": "robot", "components": []},
            }
        )
        early_hardware = self.tracker.observe(
            {
                "type": "hardware",
                "data": {
                    "componentHealth": [
                        {
                            "componentId": "body/base/battery",
                            "health": "error",
                            "directHealth": "error",
                            "detail": "battery controller offline",
                        }
                    ]
                },
            }
        )
        final = self.tracker.observe(
            {
                "type": "description",
                "data": {
                    "id": "tiago",
                    "components": [
                        {"id": "body/base/battery", "label": "Battery"}
                    ],
                },
            }
        )

        self.assertIsNone(provisional)
        self.assertIsNone(early_hardware)
        self.assertEqual(final["data"]["alerts"][0]["robotId"], "tiago")
        self.assertEqual(final["data"]["alerts"][0]["label"], "Battery")


class VitalsAlertApiTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.store = VitalsAlertStore(Path(self.temporary.name) / "api.sqlite3")
        self.created = self.store.reconcile(
            "hardware:piper", [component_alert()], now_ms=100
        )

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def test_api_rejects_active_alert_and_resolves_recovered_alert(self) -> None:
        alert_id = self.created.notify_ids[0]
        with patch("robonix_client.vitals_api.vitals_alert_store", self.store):
            with self.assertRaises(HTTPException) as raised:
                asyncio.run(
                    resolve_vitals_alert(alert_id, ResolveAlertRequest())
                )
            self.assertEqual(raised.exception.status_code, 409)

            self.store.reconcile("hardware:piper", [], now_ms=200)
            payload = asyncio.run(
                resolve_vitals_alert(
                    alert_id,
                    ResolveAlertRequest(operator="operator-a"),
                )
            )
            listed = asyncio.run(list_vitals_alerts(include_resolved=True))

        self.assertEqual(payload["summary"]["open"], 0)
        self.assertEqual(listed["alerts"][0]["resolvedBy"], "operator-a")

    def test_api_clears_resolved_history_only(self) -> None:
        alert_id = self.created.notify_ids[0]
        self.store.reconcile("hardware:piper", [], now_ms=200)
        self.store.resolve(alert_id, "operator-a")
        active = self.store.reconcile(
            "modules",
            [
                {
                    "sourceType": "module",
                    "sourceId": "pilot",
                    "label": "Pilot",
                    "severity": "stale",
                    "detail": "heartbeat timed out",
                }
            ],
            now_ms=300,
        )

        with patch("robonix_client.vitals_api.vitals_alert_store", self.store):
            cleared = asyncio.run(
                clear_vitals_alert_history(ResolveAlertRequest(operator="janitor"))
            )
            remaining = asyncio.run(list_vitals_alerts(include_resolved=True))

        self.assertEqual(cleared["deleted"], 1)
        self.assertEqual(cleared["operator"], "janitor")
        self.assertEqual(cleared["summary"]["open"], 1)
        self.assertEqual(
            [alert["id"] for alert in remaining["alerts"]],
            [active.notify_ids[0]],
        )


if __name__ == "__main__":
    unittest.main()
