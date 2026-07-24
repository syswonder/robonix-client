# SPDX-License-Identifier: MulanPSL-2.0

from __future__ import annotations

import os
import sqlite3
import threading
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable


ALERT_HEALTH = {"warn", "error", "stale"}


class AlertStillActiveError(RuntimeError):
    pass


@dataclass(frozen=True)
class ReconcileResult:
    changed: bool
    notify_ids: tuple[int, ...]


def default_alert_database_path() -> Path:
    configured = os.environ.get("ROBONIX_CLIENT_VITALS_DB", "").strip()
    if configured:
        return Path(configured).expanduser()
    data_home = Path(
        os.environ.get("XDG_DATA_HOME", Path.home() / ".local" / "share")
    ).expanduser()
    return data_home / "robonix-client" / "vitals-alerts.sqlite3"


class VitalsAlertStore:
    def __init__(self, path: Path | str | None = None) -> None:
        self.path = Path(path).expanduser() if path else default_alert_database_path()
        self._lock = threading.RLock()
        self._initialized = False

    def _connect(self) -> sqlite3.Connection:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(self.path, timeout=5)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA journal_mode=WAL")
        connection.execute("PRAGMA foreign_keys=ON")
        if not self._initialized:
            self._initialize(connection)
        return connection

    def _initialize(self, connection: sqlite3.Connection) -> None:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS vitals_alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fingerprint TEXT NOT NULL,
                scope TEXT NOT NULL,
                source_type TEXT NOT NULL,
                source_id TEXT NOT NULL,
                robot_id TEXT NOT NULL DEFAULT '',
                label TEXT NOT NULL,
                severity TEXT NOT NULL,
                detail TEXT NOT NULL DEFAULT '',
                condition_active INTEGER NOT NULL DEFAULT 1,
                first_seen_at_ms INTEGER NOT NULL,
                last_seen_at_ms INTEGER NOT NULL,
                recovered_at_ms INTEGER,
                resolved_at_ms INTEGER,
                resolved_by TEXT NOT NULL DEFAULT ''
            );
            CREATE UNIQUE INDEX IF NOT EXISTS vitals_alerts_open_fingerprint
                ON vitals_alerts(fingerprint)
                WHERE resolved_at_ms IS NULL;
            CREATE INDEX IF NOT EXISTS vitals_alerts_open_order
                ON vitals_alerts(resolved_at_ms, condition_active, last_seen_at_ms);
            """
        )
        connection.commit()
        self._initialized = True

    @staticmethod
    def _fingerprint(candidate: dict[str, Any]) -> str:
        return "|".join(
            (
                str(candidate.get("sourceType") or "unknown"),
                str(candidate.get("robotId") or ""),
                str(candidate.get("sourceId") or "unknown"),
            )
        )

    @staticmethod
    def _alert(row: sqlite3.Row) -> dict[str, Any]:
        condition_active = bool(row["condition_active"])
        resolved = row["resolved_at_ms"] is not None
        status = "resolved" if resolved else "active" if condition_active else "recovered"
        return {
            "id": int(row["id"]),
            "sourceType": row["source_type"],
            "sourceId": row["source_id"],
            "robotId": row["robot_id"],
            "label": row["label"],
            "severity": row["severity"],
            "detail": row["detail"],
            "conditionActive": condition_active,
            "status": status,
            "firstSeenAtMs": int(row["first_seen_at_ms"]),
            "lastSeenAtMs": int(row["last_seen_at_ms"]),
            "recoveredAtMs": row["recovered_at_ms"],
            "resolvedAtMs": row["resolved_at_ms"],
            "resolvedBy": row["resolved_by"],
        }

    def reconcile(
        self,
        scope: str,
        candidates: Iterable[dict[str, Any]],
        now_ms: int | None = None,
    ) -> ReconcileResult:
        observed_at = int(now_ms if now_ms is not None else time.time() * 1000)
        normalized = {
            self._fingerprint(candidate): candidate
            for candidate in candidates
            if str(candidate.get("severity") or "") in ALERT_HEALTH
        }
        notify_ids: list[int] = []
        changed = False
        with self._lock, self._connect() as connection:
            open_rows = {
                row["fingerprint"]: row
                for row in connection.execute(
                    "SELECT * FROM vitals_alerts WHERE scope = ? AND resolved_at_ms IS NULL",
                    (scope,),
                )
            }
            for fingerprint, candidate in normalized.items():
                severity = str(candidate["severity"])
                source_type = str(candidate.get("sourceType") or "unknown")
                source_id = str(candidate.get("sourceId") or "unknown")
                robot_id = str(candidate.get("robotId") or "")
                label = str(candidate.get("label") or source_id)
                detail = str(candidate.get("detail") or "")
                existing = open_rows.pop(fingerprint, None)
                if existing is None:
                    cursor = connection.execute(
                        """
                        INSERT INTO vitals_alerts (
                            fingerprint, scope, source_type, source_id, robot_id,
                            label, severity, detail, condition_active,
                            first_seen_at_ms, last_seen_at_ms
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
                        """,
                        (
                            fingerprint,
                            scope,
                            source_type,
                            source_id,
                            robot_id,
                            label,
                            severity,
                            detail,
                            observed_at,
                            observed_at,
                        ),
                    )
                    notify_ids.append(int(cursor.lastrowid))
                    changed = True
                    continue

                reactivated = not bool(existing["condition_active"])
                details_changed = any(
                    (
                        existing["severity"] != severity,
                        existing["detail"] != detail,
                        existing["label"] != label,
                    )
                )
                connection.execute(
                    """
                    UPDATE vitals_alerts
                    SET source_type = ?, source_id = ?, robot_id = ?, label = ?,
                        severity = ?, detail = ?, condition_active = 1,
                        last_seen_at_ms = ?, recovered_at_ms = NULL
                    WHERE id = ?
                    """,
                    (
                        source_type,
                        source_id,
                        robot_id,
                        label,
                        severity,
                        detail,
                        observed_at,
                        int(existing["id"]),
                    ),
                )
                if reactivated:
                    notify_ids.append(int(existing["id"]))
                changed = changed or reactivated or details_changed

            for existing in open_rows.values():
                if not bool(existing["condition_active"]):
                    continue
                connection.execute(
                    """
                    UPDATE vitals_alerts
                    SET condition_active = 0, recovered_at_ms = ?
                    WHERE id = ?
                    """,
                    (observed_at, int(existing["id"])),
                )
                changed = True
            connection.commit()
        return ReconcileResult(changed=changed, notify_ids=tuple(notify_ids))

    def list_alerts(
        self,
        *,
        include_resolved: bool = False,
        limit: int = 200,
    ) -> list[dict[str, Any]]:
        where = "" if include_resolved else "WHERE resolved_at_ms IS NULL"
        with self._lock, self._connect() as connection:
            rows = connection.execute(
                f"""
                SELECT * FROM vitals_alerts
                {where}
                ORDER BY
                    CASE WHEN resolved_at_ms IS NULL THEN 0 ELSE 1 END,
                    condition_active DESC,
                    CASE severity WHEN 'error' THEN 3 WHEN 'warn' THEN 2 ELSE 1 END DESC,
                    last_seen_at_ms DESC
                LIMIT ?
                """,
                (max(1, min(int(limit), 1000)),),
            ).fetchall()
        return [self._alert(row) for row in rows]

    def resolve(self, alert_id: int, operator: str = "operator") -> dict[str, Any]:
        resolved_at = int(time.time() * 1000)
        with self._lock, self._connect() as connection:
            row = connection.execute(
                "SELECT * FROM vitals_alerts WHERE id = ? AND resolved_at_ms IS NULL",
                (int(alert_id),),
            ).fetchone()
            if row is None:
                raise KeyError(alert_id)
            if bool(row["condition_active"]):
                raise AlertStillActiveError(
                    "the health source is still reporting this condition"
                )
            connection.execute(
                """
                UPDATE vitals_alerts
                SET resolved_at_ms = ?, resolved_by = ?
                WHERE id = ?
                """,
                (resolved_at, operator.strip() or "operator", int(alert_id)),
            )
            connection.commit()
            updated = connection.execute(
                "SELECT * FROM vitals_alerts WHERE id = ?", (int(alert_id),)
            ).fetchone()
        return self._alert(updated)

    def payload(self, notify_ids: Iterable[int] = ()) -> dict[str, Any]:
        alerts = self.list_alerts()
        active = sum(1 for alert in alerts if alert["conditionActive"])
        recovered = len(alerts) - active
        return {
            "alerts": alerts,
            "summary": {
                "open": len(alerts),
                "active": active,
                "recovered": recovered,
            },
            "notifyAlertIds": [int(alert_id) for alert_id in notify_ids],
        }


class VitalsAlertTracker:
    def __init__(self, store: VitalsAlertStore) -> None:
        self.store = store
        self.description: dict[str, Any] = {}
        self.description_ready = False
        self.pending_hardware: dict[str, Any] | None = None

    def observe(self, event: dict[str, Any]) -> dict[str, Any] | None:
        event_type = str(event.get("type") or "")
        if event_type == "description":
            self.description = event.get("data") or {}
            if event.get("provisional"):
                return None
            self.description_ready = True
            if self.pending_hardware is None:
                return None
            hardware = self.pending_hardware
            self.pending_hardware = None
            result = self._observe_hardware(hardware)
        if event_type == "hardware":
            hardware = event.get("data") or {}
            if not self.description_ready:
                self.pending_hardware = hardware
                return None
            result = self._observe_hardware(hardware)
        elif event_type == "modules":
            result = self._observe_modules(event.get("data") or {})
        elif event_type == "providers":
            result = self._observe_providers(event.get("data") or {})
        elif event_type != "description":
            return None
        if not result.changed:
            return None
        return {
            "type": "alerts",
            "data": self.store.payload(result.notify_ids),
        }

    def _observe_hardware(self, snapshot: dict[str, Any]) -> ReconcileResult:
        robot_id = str(self.description.get("id") or "robot")
        labels = {
            str(component.get("id") or ""): str(
                component.get("label") or component.get("id") or "Component"
            )
            for component in self.description.get("components", [])
            if isinstance(component, dict)
        }
        candidates = []
        for row in snapshot.get("componentHealth", []):
            if not isinstance(row, dict):
                continue
            severity = str(row.get("directHealth") or "unknown")
            component_id = str(row.get("componentId") or "")
            if severity not in ALERT_HEALTH or not component_id:
                continue
            candidates.append(
                {
                    "sourceType": "component",
                    "sourceId": component_id,
                    "robotId": robot_id,
                    "label": labels.get(component_id, component_id),
                    "severity": severity,
                    "detail": str(row.get("detail") or "Hardware health anomaly"),
                }
            )
        if any(candidate["sourceId"] != "body" for candidate in candidates):
            candidates = [
                candidate
                for candidate in candidates
                if candidate["sourceId"] != "body"
            ]
        return self.store.reconcile(f"hardware:{robot_id}", candidates)

    def _observe_modules(self, snapshot: dict[str, Any]) -> ReconcileResult:
        candidates = []
        for module in snapshot.get("modules", []):
            if not isinstance(module, dict):
                continue
            severity = str(module.get("health") or "unknown")
            source_id = str(module.get("moduleKey") or module.get("moduleId") or "")
            if severity not in ALERT_HEALTH or not source_id:
                continue
            candidates.append(
                {
                    "sourceType": "module",
                    "sourceId": source_id,
                    "label": str(module.get("moduleId") or source_id),
                    "severity": severity,
                    "detail": str(
                        module.get("detail")
                        or module.get("reasonCode")
                        or "Module health anomaly"
                    ),
                }
            )
        return self.store.reconcile("modules", candidates)

    def _observe_providers(self, snapshot: dict[str, Any]) -> ReconcileResult:
        candidates = []
        for provider in snapshot.get("providers", []):
            if not isinstance(provider, dict):
                continue
            severity = str(provider.get("health") or "unknown")
            source_id = str(provider.get("id") or "")
            if severity not in ALERT_HEALTH or not source_id:
                continue
            candidates.append(
                {
                    "sourceType": "provider",
                    "sourceId": source_id,
                    "label": source_id,
                    "severity": severity,
                    "detail": str(
                        provider.get("stateDetail")
                        or provider.get("state")
                        or "Provider health anomaly"
                    ),
                }
            )
        return self.store.reconcile("providers", candidates)


vitals_alert_store = VitalsAlertStore()
