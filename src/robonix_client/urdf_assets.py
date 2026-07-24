# SPDX-License-Identifier: MulanPSL-2.0

from __future__ import annotations

import hashlib
import mimetypes
from collections import OrderedDict
from dataclasses import dataclass
from pathlib import PurePosixPath
from threading import RLock
from typing import Iterable


@dataclass(frozen=True)
class CachedUrdfAsset:
    data: bytes
    media_type: str


class UrdfAssetStore:
    """Small immutable LRU cache for resources attached to Soma URDFs."""

    def __init__(self, max_resource_sets: int = 4) -> None:
        if max_resource_sets < 1:
            raise ValueError("max_resource_sets must be positive")
        self._max_resource_sets = max_resource_sets
        self._resource_sets: OrderedDict[str, dict[str, CachedUrdfAsset]] = (
            OrderedDict()
        )
        self._lock = RLock()

    def put(self, assets: Iterable[tuple[str, bytes]]) -> str:
        """Validate and cache one immutable set, returning its content id."""
        normalized: dict[str, CachedUrdfAsset] = {}
        for raw_path, raw_data in assets:
            path = self.normalize_path(raw_path)
            data = bytes(raw_data)
            existing = normalized.get(path)
            if existing is not None and existing.data != data:
                raise ValueError(f"conflicting URDF asset path: {path}")
            media_type = mimetypes.guess_type(path)[0] or "application/octet-stream"
            normalized[path] = CachedUrdfAsset(data=data, media_type=media_type)
        if not normalized:
            return ""

        digest = hashlib.sha256()
        for path, asset in sorted(normalized.items()):
            path_bytes = path.encode("utf-8")
            digest.update(len(path_bytes).to_bytes(8, "big"))
            digest.update(path_bytes)
            digest.update(len(asset.data).to_bytes(8, "big"))
            digest.update(asset.data)
        resource_set_id = digest.hexdigest()

        with self._lock:
            self._resource_sets[resource_set_id] = normalized
            self._resource_sets.move_to_end(resource_set_id)
            while len(self._resource_sets) > self._max_resource_sets:
                self._resource_sets.popitem(last=False)
        return resource_set_id

    def get(self, resource_set_id: str, path: str) -> CachedUrdfAsset:
        """Return one cached asset and refresh its resource set's LRU age."""
        normalized_path = self.normalize_path(path)
        with self._lock:
            resources = self._resource_sets[resource_set_id]
            asset = resources[normalized_path]
            self._resource_sets.move_to_end(resource_set_id)
            return asset

    def clear(self) -> None:
        """Drop cached resource sets; primarily useful for isolated tests."""
        with self._lock:
            self._resource_sets.clear()

    @staticmethod
    def normalize_path(raw_path: str) -> str:
        """Accept only non-empty POSIX paths below the resource-set root."""
        value = str(raw_path or "").strip()
        path = PurePosixPath(value)
        if (
            not value
            or "\x00" in value
            or path.is_absolute()
            or not path.parts
            or ".." in path.parts
            or any(part in {"", "."} for part in path.parts)
        ):
            raise ValueError(f"invalid URDF asset path: {raw_path!r}")
        return path.as_posix()


urdf_asset_store = UrdfAssetStore()
