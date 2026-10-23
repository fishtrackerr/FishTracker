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
- Snackbar "species weight on rod N" with Undo (`CatchService.delete`, which also removes the catch photo, see Deleting a catch)
- "All details…" closes the sheet and opens `/sessions/:id/catches/new?rodId=&sessionSpotId=&returnUrl=<current url>`

## Full catch form

- Create: `/sessions/:id/catches/new` — extended fields (hook, line, depth, rod, session spot, etc.)
- Edit: `/sessions/:id/catches/:catchId/edit` — same form; clears `detailsPending` on save; does **not** overwrite frozen `weather`, `caughtAt`, or GPS

`returnUrl` query param: after **Save** or **Cancel** the form navigates there; it is validated with `safeReturnUrlParam` (`core/utils/return-url.ts`: same-app relative paths only, no absolute/protocol-relative/backslash URLs, no `/pin/*`, no `/mode-select`) and falls back to `/sessions/:id`. The session screen and the catch sheet pass their current URL.

### Deleting a catch

In edit mode the form has a **Delete catch** button (warn): `ConfirmService.confirmDelete` → `CatchService.delete` → snackbar → back to `returnUrl` (fallback `/sessions/:id`). `CatchService.delete` recomputes personal records and session stats, and soft-deletes the catch photo (`ImageService.delete`) so it leaves the session photos and the gallery, unless that image is still used by another catch or listed in the session's `photoIds`. The catch sheet's **Undo** uses the same method, so an undone catch leaves no photo behind. There is no delete action on the session screen's catch rows (open the row, then delete).

Custom dropdown options via `option-combobox` and `UserOptionService` (mode-scoped). Query params `rodId` and `sessionSpotId` preselect the rod (catch sheet **All details…**).

Catches store optional `rodId` and `sessionSpotId` links.

## Timeline event

`CatchService.create` records a `catch` session event: "<species> caught" (`activeSession.catchEvent`) when a real species is given, also for a catch saved without weight ("details pending"). Only `createInstant` (species "Unknown") keeps the generic "Quick catch logged" text.

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
