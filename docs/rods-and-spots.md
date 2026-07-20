# Rods and session spots

## Overview

Sessions can include **session spots** (snapshots of lake spots) and **rods** (active fishing positions). Rods track bites, fish spotted, bait/rig, and link to catches.

## Models

- `SessionSpot` — snapshot on session (`sessionSpots[]` on `FishingSession`)
- `SessionRod` — embedded on session (`rods[]`)
- `BiteEvent`, `FishSpottedEvent` — IndexedDB event tables
- `RodSpotHistory` — optional spot movement history
- `SessionEvent` — timeline entries

## Session spots

When a lake is selected during session create/edit:

1. Lake spots load from `Lake.spots`
2. User selects one or more; snapshots copy name, coordinates, depth, bottom, notes
3. `lakeSpotId` references the source lake spot
4. Changing lake clears spots after confirmation
5. New spots can be added to the lake inline and immediately selected

Historical sessions keep snapshots even if lake spots change later.

## Rods

- Rod count asked at session start/edit (min 1, max configurable in Settings)
- Default names: Rod 1, Rod 2, …
- Each rod has at most one current `sessionSpotId`
- Multiple rods may share a spot
- Reducing rod count requires confirmation if removed rods have activity

## Bites and fish spotted

- `+` / `-` controls per rod; count derived from `BiteEvent` records
- Count never goes below zero
- Fish spotted registered via rod card; optional GPS

## Catches

Catches link via `rodId` and `sessionSpotId`. Opening Add Catch from a rod preselects rod, spot, bait, and rig.

## Session detail

**More info** expandable shows rod cards, summary stats, timeline, and rod change summary.

## Legacy migration (Dexie v4)

Existing sessions receive:

```ts
session.sessionSpots ??= [];
session.rods ??= [];
```

Catches with legacy `spotId` get `sessionSpotId` snapshots where possible. Active sessions without rods show a non-blocking setup prompt. Completed sessions are not auto-assigned rods.

## Services

| Service | Role |
|---------|------|
| `RodService` | Rod CRUD, spot assignment, count resize |
| `BiteEventService` | Add/remove bites |
| `FishSpottedEventService` | Register spotted fish |
| `SessionEventService` | Timeline events |
