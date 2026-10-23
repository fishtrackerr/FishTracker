# Sessions

## Session states

- **planned**: Future session
- **active**: Currently fishing (**at most one active session per fishing mode**)
- **completed**: Ended session with endDate

Every session has a `fishingMode`. Lists and “active session” checks are scoped to the mode selected for this app run.

## Session creation

Dashboard and sessions list start sessions via `SessionStartFlowService` (shared sheet + backup + create + navigate).
Both screens show **Start session** only when no session is active in the current mode; otherwise they show **Continue session**, which opens `/sessions/active` (redirects to the session screen `/sessions/<id>`). `SessionStartFlowService.start()` guards the same way (navigates to the active session, no snackbar) and re-checks after the sheet closes.

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

After creating the session (with its rods) the app navigates to `/sessions/:id` and shows the “Session started” snackbar. Rod details (bait, rig, notes, spot, in/out of the water) are edited in the rod sheet, opened from a rod tile.

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

- Startup navigates to `/sessions/active` when an active session exists **for the current mode**; that route only redirects to `/sessions/<id>` (see [routing.md](./routing.md))
- Footer navigation shows a dedicated **Current** tab while an active session exists; it links to `/sessions/<active id>`
- Dashboard and sessions list show **Continue session** instead of Start while a session is active
- Starting a session navigates straight to `/sessions/:id` (no setup mode)

## Session screen (`/sessions/:id`)

One screen, `SessionDetailComponent` (`features/sessions/session-detail.component.*`), for every session. It has two modes.

### Live mode (`status === 'active'`)

- **Weather-alert banner** (sticky) when `showWeatherWarnings` is on and the latest weather has warnings
- **Top strip**: lake name (+ swim when all rods share one spot), live timer `HH:mm:ss`, compact weather (temperature, wind, pressure with a ↑ / ↓ / → trend from the last two `sessionWeather` snapshots, ±1 hPa), catch count, total weight and best fish
- **Rod tiles** (`features/sessions/rod-tile`), one per visible rod, see [rods-and-spots.md](./rods-and-spots.md#rod-tiles). Active rods get big **Bite +1** and **Catch** buttons; rods taken out are small and greyed. Tapping the name or ⋮ opens the rod sheet
- **No rods yet**: inline prompt with a rod-count stepper (1 … `settings.maxRodCount`) and **Add rods** (`RodService.ensureRods`, revives hidden rods first)
- **Sticky action bar** above the bottom nav:
  - **Photo** → menu Camera / Gallery (`PhotoPickService` + `SessionService.addSessionPhoto`)
  - **Note** → scrolls to and focuses the notes field
  - **Recast** (only with rods) → `RecastRodDialogComponent` (pick rod + spot) → `RodService.recast`
  - **End** → `ConfirmService` confirm → `SessionService.complete` → `endSession()` navigates to `/sessions/:id` (finished mode). `endSession()` is the one place to change when a summary route is added

### Both modes (below the tiles in live mode)

- **Catches** (liveQuery): photo, species, details-pending badge, PR badge, weight · length · time · spot, maps link; tap → `/sessions/:id/catches/:catchId/edit`. **Add catch** opens the full form `/sessions/:id/catches/new`
- **Session images**: cover preview, `image-picker`, `image-gallery` (favourite, set as homepage cover, delete; deleted ids are pruned from the session and its catches). Loading is keyed on the photo ids (`sessionImageKey` + `ImageService.getSessionImages`) so other session writes do not reload thumbnails
- **Prebait** and **Notes**, saved on blur. Fields are only refreshed from storage when the stored value changes, so a bite or weather write does not wipe text being typed
- **Weather card** (live: always, with **Refresh weather & GPS**; finished: when weather exists) and **weather history**
- **GPS** coordinates + maps / directions link
- **Rods**: totals (rods, active, bites, spotted); in finished mode compact rod tiles (small **+1** bite, tap → rod sheet to edit after the fact) and the rod summary (per rod start spot, moves, bites, spotted, catches; best rod / spot)
- **Session timeline**
- **Edit session** (`/sessions/:id/edit`) and **Delete** (`ConfirmService.confirmDelete`)

### Finished mode (completed / planned)

Header with name, lake, start – end date, duration, status badge and stats (catches, total weight, best). No timer, live tiles, weather banner or action bar.

## Sessions list behavior

- `/sessions` always remains the list/history entry point (current mode only)
- When an active session exists, the list page pins a **Current Session** section above **Session History**
- History section shows non-active sessions (completed/planned), still using existing search/filter/sort controls
- Current section remains visible during filtering unless `sessionStatus` explicitly excludes `active`

## Session statistics

Denormalized on session record, updated by `CatchService.updateSessionStats()` after each catch change.

## Session and catch relationship

Each catch has `sessionId`. Catches are never moved between sessions by date edits. Catches inherit the same fishing mode as their session on write.
