# Sessions

## Session states

- **planned**: Future session
- **active**: Currently fishing (only one should be active)
- **completed**: Ended session with endDate

## Session creation

`SessionCreateDialogComponent` collects name, start datetime, optional lake. `SessionService.start()`:

- Reuses existing active session if one exists
- Captures GPS/weather/cover optionally
- Sets status `active`

After creating a brand-new session (no previously active session), the app prompts for rod count, then opens `/sessions/:id?setupRods=1` so users can immediately fill rod details (bait, rig, notes, active/inactive) on rod cards before switching to active-session view.

## Session editing

Edit via `/sessions/:id/edit` (`SessionEditComponent`): name, lake, session spots, rod count, dates, status, GPS, weather refresh, notes, prebait, tags.

`SessionEditDialogComponent` is deprecated; list/detail navigate to the edit route.

Legacy sessions without rods show a setup prompt on active session detail.

`SessionService.updateSession()` validates:

- End date ≥ start date
- Only one active session at a time
- Recalculates catchCount, totalWeight, biggestFish from catches
- Updates `updatedAt`; does not modify catch timestamps

## Session deletion

`SessionService.delete()` removes catches for session then session record. Requires confirmation via `ConfirmService`.

## Active session behavior

- Startup navigates to `/sessions/active` when an active session exists
- Footer navigation shows a dedicated **Current** tab while an active session exists; it opens `/sessions/active`
- Dashboard shows **Continue Active Session**
- Active session page: timer, reactive catch list, Quick Catch, notes, end session
- New-session startup flow routes through session detail setup mode first (`/sessions/:id?setupRods=1`), with a finish action that navigates to `/sessions/active?id=:id`

## Sessions list behavior

- `/sessions` always remains the list/history entry point
- When an active session exists, the list page pins a **Current Session** section above **Session History**
- History section shows non-active sessions (completed/planned), still using existing search/filter/sort controls
- Current section remains visible during filtering unless `sessionStatus` explicitly excludes `active`

## Session statistics

Denormalized on session record, updated by `CatchService.updateSessionStats()` after each catch change.

## Session and catch relationship

Each catch has `sessionId`. Catches are never moved between sessions by date edits.
