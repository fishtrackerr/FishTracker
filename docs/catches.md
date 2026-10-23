# Catches

Catches are scoped to the active **fishing mode** (via `fishingMode` on the record and mode-filtered repositories).

## Instant catch / Quick Catch (removed from the UI)

The one-tap **Instant catch** button and the **Quick Catch** dialog (`QuickCatchDialogComponent`) were on the old `/sessions/active` page. Both are replaced by the per-rod **Catch** button on the session screen, which opens the catch sheet; saving it without a weight logs the catch as `detailsPending` ("log now, details later"). `CatchService.createInstant()` / `createQuick()` remain in the service.

## Catch sheet

Bottom sheet `CatchSheetComponent` (`features/catches/catch-sheet/`), opened with `openCatchSheet(bottomSheet, theme, { session, rodId? })`; resolves to the saved `Catch` (or `undefined`). Themed like the filter sheet. Opened by the **Catch** button on each rod tile of the session screen.

- Header "Catch · Rod N" with the rod name, spot and bait; "Other rod" switches between visible rods
- Species chips from the mode favourites plus "Other…" (text prompt, any species). Preselected: species of the latest catch in the session, else the latest in the mode, else the first favourite
- Weight and length in the units from settings (stored as kg / cm); photo via camera or gallery; Released toggle (default on)
- Save uses `CatchService.create` with the rod, its `sessionSpotId`, bait and rig. Without a weight the catch is saved `detailsPending` ("log now, details later")
- Snackbar "species weight on rod N" with Undo (`CatchService.delete`)
- "All details…" closes the sheet and opens `/sessions/:id/catches/new?rodId=&sessionSpotId=&returnUrl=<current url>`

## Full catch form

- Create: `/sessions/:id/catches/new` — extended fields (hook, line, depth, rod, session spot, etc.)
- Edit: `/sessions/:id/catches/:catchId/edit` — same form; clears `detailsPending` on save; does **not** overwrite frozen `weather`, `caughtAt`, or GPS

Custom dropdown options via `option-combobox` and `UserOptionService` (mode-scoped). Query params `rodId` and `sessionSpotId` preselect the rod (catch sheet **All details…**).

Catches store optional `rodId` and `sessionSpotId` links.

## Weather on catch

On every create, weather is copied from `session.weather` (or nearby cache) via `structuredClone` so later session weather refreshes do not mutate the catch’s snapshot. Live Open-Meteo is never awaited on the catch save path.

## Validation

The catch sheet and the full form require a species. Duplicate submission prevented with `saving` signals.

## Persistence

1. Generate catch ID and timestamps
2. Optional photo via `ImageService` (current mode)
3. `catchRepo.put()` (stamps `fishingMode`)
4. `updateSessionStats()` on parent session

## Catch visibility

The session screen subscribes to `catchService.watchBySession(sessionId)` using Dexie `liveQuery`. Lists update immediately after insert without page refresh. Rows with `detailsPending` show a badge; tapping a row opens the edit form.

`getById` only returns catches for the active fishing mode.

## Catch statistics

Session-level stats (count, total weight, biggest) updated on every catch create/update/delete. Global statistics page aggregates only the current mode’s catches.

## Personal records

A catch is a personal record (PR) when it is the heaviest or the longest catch of its species **within the current mode** (ties count). `CatchService` re-evaluates the flags of the affected species after every create, edit and delete, so a deleted or edited record hands the flag to the next-best catch.
