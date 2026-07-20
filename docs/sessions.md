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
- Dashboard shows **Continue Active Session**
- Active session page: timer, reactive catch list, Quick Catch, notes, end session

## Session statistics

Denormalized on session record, updated by `CatchService.updateSessionStats()` after each catch change.

## Session and catch relationship

Each catch has `sessionId`. Catches are never moved between sessions by date edits.
