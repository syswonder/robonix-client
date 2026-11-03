import unittest

from robonix_client import transport  # noqa: F401  (puts proto/ on sys.path)

import pilot_pb2


class PilotEventTaskStateTest(unittest.TestCase):
    def test_task_state_event_includes_task_id_and_tasks(self):
        event = pilot_pb2.PilotEvent()
        event.event_kind = 6
        event.session_id = "s1"
        event.task_state.task_id = "T1"
        event.task_state.goal = "goal"
        event.task_state.success_criterion = "crit"
        event.task_state.status = "in_progress"
        task = event.task_state.tasks.add()
        task.task_id = "T1"
        task.goal = "g1"
        task.success_criterion = "c1"
        task.status = "done"
        task.status_reason = "ok"
        task.message_ids.append("m1")
        task.plan_ids.append("p1")

        data = transport.pilot_event_to_dict(event)

        self.assertEqual(
            data["taskState"],
            {
                "taskId": "T1",
                "goal": "goal",
                "successCriterion": "crit",
                "status": "in_progress",
                "tasks": [
                    {
                        "taskId": "T1",
                        "goal": "g1",
                        "successCriterion": "c1",
                        "status": "done",
                        "statusReason": "ok",
                        "messageIds": ["m1"],
                        "planIds": ["p1"],
                    }
                ],
            },
        )

    def test_task_state_event_with_no_tasks_yet(self):
        event = pilot_pb2.PilotEvent()
        event.event_kind = 6
        event.task_state.task_id = "T1"
        event.task_state.goal = "goal"
        event.task_state.success_criterion = "crit"
        event.task_state.status = "in_progress"

        data = transport.pilot_event_to_dict(event)

        self.assertEqual(data["taskState"]["tasks"], [])


if __name__ == "__main__":
    unittest.main()
