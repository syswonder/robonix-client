import unittest

from robonix_client import transport  # noqa: F401  (puts proto/ on sys.path)

import pilot_pb2


def node(**fields):
    item = pilot_pb2.RtdlNode()
    for name, value in fields.items():
        if name == "children":
            item.children.extend(value)
        else:
            setattr(item, name, value)
    return item


class RtdlNodeDictTest(unittest.TestCase):
    def test_control_nodes_expose_kind_and_control_fields(self):
        plan = pilot_pb2.Plan()
        plan.nodes.extend([
            node(node_kind=3, children=[1, 2], condition_json='{"var":"x","path":["ok"]}'),
            node(node_kind=4, children=[3], repeat_count=3),
            node(node_kind=5, children=[3], condition_json="not json", max_iterations=10),
            node(node_kind=2, bind="pose"),
        ])

        data = transport.plan_to_dict(plan)
        kinds = [item["kind"] for item in data["nodes"]]
        self.assertEqual(kinds, ["if", "repeat", "while", "do"])

        branch, repeat, loop, action = data["nodes"]
        self.assertEqual(branch["condition"], {"var": "x", "path": ["ok"]})
        self.assertEqual(branch["children"], [1, 2])
        self.assertNotIn("repeatCount", branch)

        self.assertEqual(repeat["repeatCount"], 3)
        self.assertEqual(loop["maxIterations"], 10)
        # Unparseable condition stays as raw text, not a parsed field.
        self.assertEqual(loop["conditionJson"], "not json")
        self.assertNotIn("condition", loop)
        self.assertEqual(action["bind"], "pose")

    def test_plain_node_keeps_old_shape(self):
        data = transport.node_to_dict(0, node(node_kind=0, children=[1]))
        self.assertEqual(
            set(data),
            {"index", "kindId", "kind", "children", "opId", "description"},
        )


if __name__ == "__main__":
    unittest.main()
