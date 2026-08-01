# Lakes

Lakes are scoped to the active **fishing mode**. Each mode has its own lake list, favorites, and default/last-used lake preferences.

## Lake creation

`LakeService.create()` with name, location, spots array, optional metadata. `fishingMode` is stamped on write.

## Fishing spots

Embedded in `Lake.spots` as `FishingSpot[]` with id, name, coordinates, notes.

## Lake images

Photos stored via `ImageService` (current mode); IDs in `lake.photoIds`. Cover via `coverImageId`.

## Lake overview

`/lakes` lists lakes for the current mode with search and favorites.

## Lake detail

`/lakes/:id` shows lake info, spots, statistics, photos. Lakes from another mode are not returned by `getById`.

Optional address and country can be set on the lake. Latitude/longitude can be entered manually or looked up from lake name/address using the coordinate lookup action (requires internet).

Lookup uses OpenStreetMap Nominatim from the client side and saves coordinates directly on success.

## Lake statistics

Derived from sessions and catches linked via `session.lakeId` (same mode).

## Session integration

Sessions optionally reference `lakeId`. Last used lake is stored per mode in `modePreferences[mode].lastLakeId` (and mirrored to legacy `AppSettings.lastLakeId` while that mode is active). Default lake in Settings uses `modePreferences[mode].defaultLakeId`.

## Rename cascade

When a lake is renamed via `LakeService.update`, matching auto-generated session titles (`sessions.defaultNameAtLake` in all locales, plus legacy `Session at …`) for that `lakeId` are rewritten to the current language’s default title. Custom session names are left unchanged. Sync runs on mode-scoped session lists.

When a lake spot is updated via `LakeService.updateSpot`, linked `SessionSpot` snapshots (`lakeSpotId` match) sync name, coordinates, depth, bottom type, and notes. Detached session spots (no `lakeSpotId`) are unchanged.
