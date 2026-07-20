# Catches

## Quick Catch

Dialog on active session (`QuickCatchDialogComponent`):

- Primary: species, weight, length, bait, rig, photo
- Collapsible: released, notes
- Saves via `CatchService.createQuick()`

## Full catch form

Route `/sessions/:id/catches/new` — extended fields (hook, line, depth, rod, session spot, etc.).

Custom dropdown options via `option-combobox` and `UserOptionService`. Query params `rodId` and `sessionSpotId` preselect from rod cards.

Catches store optional `rodId` and `sessionSpotId` links.

## Validation

Quick Catch requires species. Duplicate submission prevented with `saving` signal.

## Persistence

1. Generate catch ID and timestamps
2. Optional photo via `ImageService`
3. `catchRepo.put()`
4. `updateSessionStats()` on parent session

## Catch visibility

Session detail and active session subscribe to `catchService.watchBySession(sessionId)` using Dexie `liveQuery`. Lists update immediately after insert without page refresh.

## Catch statistics

Session-level stats (count, total weight, biggest) updated on every catch create/update/delete.

## Personal records

`CatchService.checkPersonalRecord()` flags PR when weight exceeds prior records for species.
