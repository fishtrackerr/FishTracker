# Sessions

## Session states

- **planned**: Future session
- **active**: Currently fishing (**at most one active session per fishing mode**)
- **completed**: Ended session with endDate

Every session has a `fishingMode`. Lists and “active session” checks are scoped to the mode selected for this app run.

## Session creation

Dashboard and sessions list start sessions via `SessionStartFlowService` (shared sheet + backup + create + navigate).
Both screens show **Start session** only when no session is active in the current mode; otherwise they show **Continue session**, which opens `/sessions/active`. `SessionStartFlowService.start()` guards the same way (navigates to the active session, no snackbar) and re-checks after the sheet closes.

One themed bottom sheet, `StartSessionSheetComponent` (`features/sessions/start-session-sheet/`, opened with `themedBottomSheetConfig`), collects:

- **Lake** — default is the current mode’s `lastLakeId`
- **Rods** stepper — 1 … `settings.maxRodCount`; default is the visible rod count of the most recent session in this mode, else 1
- **Swim** (optional) — chips for the chosen lake’s visible spots plus **+ New swim** (name asked with `promptForText`; a name matching an existing spot picks that spot)
- **More options** (collapsed) — session name, start date/time, prebait. Default names are i18n keys (`sessions.defaultName` / `sessions.defaultNameAtLake`) and follow the lake until edited

The flow turns the swim into a real session spot (`RodService.snapshotFromLakeSpot`, own id, saved on the session) and passes it as `sessionSpots` + `rodSpotId`, so all rods start on a saved `sessionSpotId`. A new swim is also added to the lake’s spots via `LakeService.addSpot` when a lake is chosen (session only when no lake). After the sheet is confirmed the swim is created; cancelling the sheet changes nothing.

`SessionService.start()` (`rodCount`, `sessionSpots`, `rodSpotId`, `prebait` are optional):

- Reuses existing active session **in the current mode** if one exists
- Captures GPS/weather/cover optionally; initial weather is stored as latest on the session and as the first `sessionWeather` history row
- Refresh weather appends another history snapshot (session.weather stays the latest)
- Sets status `active` and stamps `fishingMode`
- Updates mode `lastLakeId` when a lake is selected

After creating the session (with its rods) the app navigates to `/sessions/:id` and shows the “Session started” snackbar. Rod details (bait, rig, notes, active/inactive) are filled in on the rod cards there.

Before create (when none is active), a full JSON backup is downloaded; if export fails, the user can skip or cancel. See [backup-and-restore.md](./backup-and-restore.md).

## Session editing

Edit via `/sessions/:id/edit` (`SessionEditComponent`): name, lake, session spots, rod count, dates, status, GPS, weather refresh, notes, prebait, tags.

The **Edit** button on a session card navigates there itself, exactly once; parent pages do not add their own navigation for it.

`SessionService.updateSession()` validates:

- End date ≥ start date
- Only one active session at a time **within the current mode**
- Recalculates catchCount, totalWeight, biggestFish from catches
- Updates `updatedAt`; does not modify catch timestamps

Sessions belonging to another fishing mode are not returned by `getById` / `watchById`.

## Session deletion

`SessionService.delete()` removes catches for session then session record. Requires confirmation via `ConfirmService`.

## Active session behavior

- Startup navigates to `/sessions/active` when an active session exists **for the current mode**
- Footer navigation shows a dedicated **Current** tab while an active session exists; it opens `/sessions/active`
- Dashboard and sessions list show **Continue session** instead of Start while a session is active
- Active session page: timer, reactive catch list, Quick Catch, **Recast** (update rod spot / cast), notes, end session, session photo strip (session + catch images), and direct actions for **View session details** and **Edit session**
- Session detail (`/sessions/:id`) includes an images section (cover preview, picker, gallery) for session and catch photos
- Starting a session navigates straight to `/sessions/:id` (no setup mode)

## Sessions list behavior

- `/sessions` always remains the list/history entry point (current mode only)
- When an active session exists, the list page pins a **Current Session** section above **Session History**
- History section shows non-active sessions (completed/planned), still using existing search/filter/sort controls
- Current section remains visible during filtering unless `sessionStatus` explicitly excludes `active`

## Session statistics

Denormalized on session record, updated by `CatchService.updateSessionStats()` after each catch change.

## Session and catch relationship

Each catch has `sessionId`. Catches are never moved between sessions by date edits. Catches inherit the same fishing mode as their session on write.
