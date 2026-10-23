# Catches

Catches are scoped to the active **fishing mode** (via `fishingMode` on the record and mode-filtered repositories).

## Instant catch

One-tap button on the active session (`createInstant`):

- Saves immediately with placeholder species (`common.unknown`), current time, GPS, and a **deep-copied** weather snapshot
- Sets `detailsPending: true`
- Snackbar offers “Add details” → edit form
- No dialog — use when you do not have time to fill fields

## Quick Catch

Dialog on active session (`QuickCatchDialogComponent`):

- Primary: species (from **current mode** favorites + Other), weight, length, bait, rig, photo
- Collapsible: released, notes
- “Other” is shown translated (`quickCatch.otherSpecies`) but saved as the fixed value `Other`, so stored catches stay language-independent
- Saves via `CatchService.createQuick()`

## Catch sheet

Bottom sheet `CatchSheetComponent` (`features/catches/catch-sheet/`), opened with `openCatchSheet(bottomSheet, theme, { session, rodId? })`; resolves to the saved `Catch` (or `undefined`). Themed like the filter sheet. It is meant for per-rod "Catch" buttons and replaces the quick-catch dialog (which stays until it is removed).

- Header "Catch · Rod N" with the rod name, spot and bait; "Other rod" switches between visible rods
- Species chips from the mode favourites plus "Other…" (text prompt, any species). Preselected: species of the latest catch in the session, else the latest in the mode, else the first favourite
- Weight and length in the units from settings (stored as kg / cm); photo via camera or gallery; Released toggle (default on)
- Save uses `CatchService.create` with the rod, its `sessionSpotId`, bait and rig. Without a weight the catch is saved `detailsPending` ("log now, details later")
- Snackbar "species weight on rod N" with Undo (`CatchService.delete`)
- "All details…" closes the sheet and opens `/sessions/:id/catches/new?rodId=&sessionSpotId=&returnUrl=<current url>`

## Full catch form

- Create: `/sessions/:id/catches/new` — extended fields (hook, line, depth, rod, session spot, etc.)
- Edit: `/sessions/:id/catches/:catchId/edit` — same form; clears `detailsPending` on save; does **not** overwrite frozen `weather`, `caughtAt`, or GPS

Custom dropdown options via `option-combobox` and `UserOptionService` (mode-scoped). Query params `rodId` and `sessionSpotId` preselect from rod cards.

Catches store optional `rodId` and `sessionSpotId` links.

## Weather on catch

On every create, weather is copied from `session.weather` (or nearby cache) via `structuredClone` so later session weather refreshes do not mutate the catch’s snapshot. Live Open-Meteo is never awaited on the catch save path.

## Validation

Quick Catch / full form require species. Instant catch does not. Duplicate submission prevented with `saving` signals.

## Persistence

1. Generate catch ID and timestamps
2. Optional photo via `ImageService` (current mode)
3. `catchRepo.put()` (stamps `fishingMode`)
4. `updateSessionStats()` on parent session

## Catch visibility

Session detail and active session subscribe to `catchService.watchBySession(sessionId)` using Dexie `liveQuery`. Lists update immediately after insert without page refresh. Rows with `detailsPending` show a badge; tapping a row opens the edit form.

`getById` only returns catches for the active fishing mode.

## Catch statistics

Session-level stats (count, total weight, biggest) updated on every catch create/update/delete. Global statistics page aggregates only the current mode’s catches.

## Personal records

A catch is a personal record (PR) when it is the heaviest or the longest catch of its species **within the current mode** (ties count). `CatchService` re-evaluates the flags of the affected species after every create, edit and delete, so a deleted or edited record hands the flag to the next-best catch.
