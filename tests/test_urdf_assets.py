# SPDX-License-Identifier: MulanPSL-2.0

from __future__ import annotations

import asyncio
import unittest

from fastapi import HTTPException

from robonix_client.urdf_assets import UrdfAssetStore, urdf_asset_store
from robonix_client.vitals_api import urdf_asset


class UrdfAssetStoreTest(unittest.TestCase):
    def test_caches_relative_resources_by_content(self) -> None:
        store = UrdfAssetStore()

        first_id = store.put([("meshes/base.stl", b"solid base")])
        second_id = store.put([("meshes/base.stl", b"solid base")])
        asset = store.get(first_id, "meshes/base.stl")

        self.assertEqual(first_id, second_id)
        self.assertEqual(asset.data, b"solid base")
        self.assertIn(asset.media_type, {"model/stl", "application/octet-stream"})

    def test_rejects_paths_outside_resource_root(self) -> None:
        store = UrdfAssetStore()

        with self.assertRaises(ValueError):
            store.put([("../secret.stl", b"secret")])
        with self.assertRaises(ValueError):
            store.put([("/tmp/secret.stl", b"secret")])
        with self.assertRaises(ValueError):
            store.put([(".", b"root")])

    def test_evicts_old_resource_sets(self) -> None:
        store = UrdfAssetStore(max_resource_sets=1)
        old_id = store.put([("old.stl", b"old")])
        new_id = store.put([("new.stl", b"new")])

        with self.assertRaises(KeyError):
            store.get(old_id, "old.stl")
        self.assertEqual(store.get(new_id, "new.stl").data, b"new")


class UrdfAssetRouteTest(unittest.TestCase):
    def tearDown(self) -> None:
        urdf_asset_store.clear()

    def test_serves_cached_resource_with_immutable_headers(self) -> None:
        resource_set_id = urdf_asset_store.put([("meshes/base.stl", b"solid base")])

        response = asyncio.run(urdf_asset(resource_set_id, "meshes/base.stl"))

        self.assertEqual(response.body, b"solid base")
        self.assertIn("immutable", response.headers["cache-control"])

    def test_missing_resource_returns_not_found(self) -> None:
        with self.assertRaises(HTTPException) as raised:
            asyncio.run(urdf_asset("missing", "meshes/base.stl"))

        self.assertEqual(raised.exception.status_code, 404)


if __name__ == "__main__":
    unittest.main()
