# Catches

## Instant catch

One-tap button on the active session (`createInstant`):

- Saves immediately with placeholder species (`common.unknown`), current time, GPS, and a **deep-copied** weather snapshot
- Sets `detailsPending: true`
- Snackbar offers “Add details” → edit form
- No dialog — use when you do not have time to fill fields

## Quick Catch

Dialog on active session (`QuickCatchDialogComponent`):

- Primary: species, weight, length, bait, rig, photo
- Collapsible: released, notes
- Saves via `CatchService.createQuick()`

## Full catch form

- Create: `/sessions/:id/catches/new` — extended fields (hook, line, depth, rod, session spot, etc.)
- Edit: `/sessions/:id/catches/:catchId/edit` — same form; clears `detailsPending` on save; does **not** overwrite frozen `weather`, `caughtAt`, or GPS

Custom dropdown options via `option-combobox` and `UserOptionService`. Query params `rodId` and `sessionSpotId` preselect from rod cards.

Catches store optional `rodId` and `sessionSpotId` links.

## Weather on catch

On every create, weather is copied from `session.weather` (or nearby cache) via `structuredClone` so later session weather refreshes do not mutate the catch’s snapshot. Live Open-Meteo is never awaited on the catch save path.

## Validation

Quick Catch / full form require species. Instant catch does not. Duplicate submission prevented with `saving` signals.

## Persistence

1. Generate catch ID and timestamps
2. Optional photo via `ImageService`
3. `catchRepo.put()`
4. `updateSessionStats()` on parent session

## Catch visibility

Session detail and active session subscribe to `catchService.watchBySession(sessionId)` using Dexie `liveQuery`. Lists update immediately after insert without page refresh. Rows with `detailsPending` show a badge; tapping a row opens the edit form.

## Catch statistics

Session-level stats (count, total weight, biggest) updated on every catch create/update/delete.

## Personal records

`CatchService.checkPersonalRecord()` flags PR when weight exceeds prior records for species.
