# Sessions

## Session states

- **planned**: Future session
- **active**: Currently fishing (**at most one active session per fishing mode**)
- **completed**: Ended session with endDate

Every session has a `fishingMode`. Lists and “active session” checks are scoped to the mode selected for this app run.

## Session creation

Dashboard and sessions list start sessions via `SessionStartFlowService` (shared dialog + create + navigate).
`SessionCreateDialogComponent` collects name, start datetime, optional lake. Default names are i18n keys
(`sessions.defaultName` / `sessions.defaultNameAtLake`). Default lake comes from the current mode’s `lastLakeId` / preferences. `SessionService.start()`:

- Reuses existing active session **in the current mode** if one exists
- Captures GPS/weather/cover optionally; initial weather is stored as latest on the session and as the first `sessionWeather` history row
- Refresh weather appends another history snapshot (session.weather stays the latest)
- Sets status `active` and stamps `fishingMode`
- Updates mode `lastLakeId` when a lake is selected

After creating a brand-new session (no previously active session), the app prompts for rod count, then opens `/sessions/:id?setupRods=1` so users can immediately fill rod details (bait, rig, notes, active/inactive) on rod cards before switching to active-session view.

Before create (when none is active), a full JSON backup is downloaded; if export fails, the user can skip or cancel. See [backup-and-restore.md](./backup-and-restore.md).

## Session editing

Edit via `/sessions/:id/edit` (`SessionEditComponent`): name, lake, session spots, rod count, dates, status, GPS, weather refresh, notes, prebait, tags.

Legacy sessions without rods show a setup prompt on active session detail.

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
- Dashboard shows **Continue Active Session**
- Active session page: timer, reactive catch list, Quick Catch, **Recast** (update rod spot / cast), notes, end session, session photo strip (session + catch images), and direct actions for **View session details** and **Edit session**
- Session detail (`/sessions/:id`) includes an images section (cover preview, picker, gallery) for session and catch photos
- New-session startup flow routes through session detail setup mode first (`/sessions/:id?setupRods=1`), with a finish action that navigates to `/sessions/active?id=:id`

## Sessions list behavior

- `/sessions` always remains the list/history entry point (current mode only)
- When an active session exists, the list page pins a **Current Session** section above **Session History**
- History section shows non-active sessions (completed/planned), still using existing search/filter/sort controls
- Current section remains visible during filtering unless `sessionStatus` explicitly excludes `active`

## Session statistics

Denormalized on session record, updated by `CatchService.updateSessionStats()` after each catch change.

## Session and catch relationship

Each catch has `sessionId`. Catches are never moved between sessions by date edits. Catches inherit the same fishing mode as their session on write.
