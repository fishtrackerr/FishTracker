# Rods and session spots

## Overview

Sessions can include **session spots** (snapshots of lake spots) and **rods** (active fishing positions). Rods track bites, fish spotted, bait/rig, and link to catches.

Rods and spots are **mode-scoped via their parent session**: sessions, bite events, fish-spotted events, rod-spot history, and session timeline events all carry `fishingMode`. Repositories stamp the active mode on write; lists used from the UI come from mode-scoped sessions.

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

Linked session spots (`lakeSpotId` set) follow later lake spot edits (name, coordinates, depth, bottom, notes). Detached snapshots (no `lakeSpotId`) and spots whose lake spot was deleted keep their copied values.

## Rods

- Rod count asked at session start/edit (min 1, max configurable in Settings)
- Default names: Rod 1, Rod 2, …
- Each rod has at most one current `sessionSpotId`
- Multiple rods may share a spot
- Reducing rod count requires confirmation if removed rods have activity
- The start-session sheet creates the rods (count from the stepper) and assigns the chosen swim, as a saved session spot, to all of them; users then land on the session screen
- The rod sheet edits per-rod **bait**, **rig**, **notes**, **name**, **spot** and in/out of the water (`isActive`)
- **Recast**: change a rod's session spot and record `castAt` / a `rod-cast` timeline event. Available from the session screen action bar (recast dialog with rod picker) and **Recast now** in the rod sheet. Spot changes also write `RodSpotHistory` and a `rod-moved` event when the spot differs.

## Bites and fish spotted

- **Bite +1** on a rod tile (`BiteEventService.addBite`); the snackbar "Bite on rod N" offers **Undo** (`removeBite`). **Bite −1** in the rod sheet. Count derived from `BiteEvent` records
- Count never goes below zero
- Fish spotted registered via the rod sheet; optional GPS

## Catches

Catches link via `rodId` and `sessionSpotId`. **Catch** on a rod tile opens the catch sheet for that rod (rod, spot, bait and rig preselected); its **All details…** opens the full form with `rodId` / `sessionSpotId`.

## Rod tiles

`RodTileComponent` (`features/sessions/rod-tile`) shows one rod on the session screen. Inputs `rod`, `spotName`, `variant` (`live` | `compact`); outputs `bite`, `catchTap`, `open`. The session screen does the writes.

- Marker: rod number on `--rod-N` (`rodMarkerColor`, 1…6 repeating) with `--rod-glow` (bite-alarm LED look in Night bivvy)
- Name (+ spot), line "bait · cast HH:mm · N bites" (parts without data are left out)
- `live` (active rods of a live session): two 64px buttons, **Bite +1** (outline) and **Catch** (filled `--cta`)
- `compact` (rods taken out, all rods of a finished session): smaller row, greyed when inactive, a small **+1** bite button
- The name area and the ⋮ button open the rod sheet (edit, recast now, fish spotted, bite −1, take out / put back)

## Session screen

Live: rod tiles under the top strip; with no rods an inline "No rods yet" prompt with a stepper adds rods (`RodService.ensureRods`). Finished: compact tiles in the Rods section, rod totals and the rod summary. Timeline below. See [sessions.md](./sessions.md#session-screen-sessionsid).

## Legacy migration (Dexie v4)

Existing sessions receive:

```ts
session.sessionSpots ??= [];
session.rods ??= [];
```

Catches with legacy `spotId` get `sessionSpotId` snapshots where possible. Active sessions without rods show the inline "No rods yet" prompt on the session screen. Completed sessions are not auto-assigned rods.

## Rod sheet

`RodSheetComponent` (`shared/components/rod-sheet`) is a themed bottom sheet for one rod, opened with `openRodSheet(bottomSheet, theme, { session, rodId })`. It resolves to the latest `FishingSession` when anything was written (also after a backdrop dismiss), otherwise `undefined`.

- Header: rod marker (number, `--rod-N` colour), "Rod N", "x bites · y spotted · cast HH:mm".
- Quick actions: **Recast now** (`RodService.recast` with the current spot), **Fish spotted** (`FishSpottedEventService`), **Bite −1** (`BiteEventService.removeBite`, disabled at 0 bites). They write immediately.
- Edit fields: spot select (visible session spots, unassigned, **+ New spot…**), bait and rig (`option-combobox`), name, notes.
- **+ New spot…** asks a name with `promptForText`; the spot is created on **Save** via `RodService.addSessionSpot` (one `sessionRepo.modify` transaction; a visible spot with the same name is reused) and then assigned with `assignSpot`, so `RodSpotHistory` is kept and cancelling leaves no orphan spot.
- Footer: **Take rod out / Put rod back** (toggles `isActive` immediately) and **Save** (`updateRod` with only the changed fields; a spot change goes through `assignSpot`).

## Services

| Service | Role |
|---------|------|
| `RodService` | Rod CRUD, spot assignment, recast, count resize, add session spot |
| `BiteEventService` | Add/remove bites |
| `FishSpottedEventService` | Register spotted fish |
| `SessionEventService` | Timeline events |
