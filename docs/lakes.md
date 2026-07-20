# Lakes

## Lake creation

`LakeService.create()` with name, location, spots array, optional metadata.

## Fishing spots

Embedded in `Lake.spots` as `FishingSpot[]` with id, name, coordinates, notes.

## Lake images

Photos stored via `ImageService`; IDs in `lake.photoIds`. Cover via `coverImageId`.

## Lake overview

`/lakes` lists all lakes with search and favorites.

## Lake detail

`/lakes/:id` shows lake info, spots, statistics, photos.

## Lake statistics

Derived from sessions and catches linked via `session.lakeId`.

## Session integration

Sessions optionally reference `lakeId`. Last used lake stored in settings as `lastLakeId` for new session defaults.
