# Application Flow

## App startup

1. `APP_INITIALIZER` runs `AppStartupService.initialize()`.
2. Dexie database opens; `PinLockService` loads persisted lock state; weather monitor starts (idle until a mode + active session exist).
3. Startup splash displays until initialization completes.
4. `performInitialNavigation()` runs once:
   - Locked → `/pin/unlock` (stores return URL)
   - No PIN → `/pin/setup`
   - No fishing mode stored (first run or after full reset) → `/mode-select`
   - Valid deep link → preserve route (entities from other modes are not loaded)
   - Active session (current mode) + default entry → `/sessions/active` (redirects to `/sessions/<id>`)
   - Otherwise → `/`

## Fishing mode

1. After PIN unlock, user picks one mode on `/mode-select`: carper, catfish, pike, bass, feeder, or general. The picker replaces itself in history and can't be reopened once a mode is stored (`modeNotSelectedGuard`).
2. Choice is kept in memory and `localStorage` (`fish-tracker-fishing-mode`), so it is remembered across app restarts until a full application reset. A legacy `sessionStorage` value is adopted once on startup. `/mode-select` therefore only appears on first run or after a full reset.
3. Lakes, sessions, catches, user options, images, AI chats, and filter presets are scoped to that mode.
4. PIN, theme, units, language, and AI API key/config remain shared across modes.
5. Per-mode preferences (`lastLakeId`, `defaultLakeId`, `homepageImageId`, favorites) live in `AppSettings.modePreferences`.
6. Existing data from before this feature is migrated to **carper** (Dexie v7).
7. Shell shows a mode banner for the active mode. Switch modes in Settings → General → Fishing mode: after a confirm dialog the mode is set and the app navigates to `AppStartupService.resolveUnlockedDestination('/')` (active session of the new mode, or home). Data is per mode; an active session stays in its own mode.

## PIN unlock

1. User enters 6-digit PIN on `/pin/unlock`.
2. `PinLockService.verifyPin()` validates against PBKDF2 hash in settings.
3. On success, navigates via stored return URL / `AppStartupService.resolveInitialRoute()`. If no fishing mode is stored, the deep link is re-stored and the user lands on `/mode-select` first.

## Mode select

1. User chooses a fishing mode.
2. `FishingModeService.setMode()` persists the choice and seeds `modePreferences` defaults if needed.
3. `UserOptionService.ensureDefaultsForCurrentMode()` seeds defaults per option category that has never had rows in this mode. Deleted or renamed defaults are not re-added; Settings reset restores them. Defaults added in a later app version therefore only reach categories that are still empty (or after a reset).
4. Navigation uses `consumeReturnUrl()` then `resolveUnlockedDestination` (preserves deep links stored by the PIN/mode guards or startup, else active session in that mode, else home).

## Active session flow

1. Start session from dashboard or sessions list: one bottom sheet (lake, rods stepper, optional swim, more options) → optional pre-session backup. Only one **active** session per fishing mode; while one is active both screens show **Continue session** (`/sessions/active`) instead of Start.
2. `SessionService.start()` creates the active session with its rods, session spot and optional GPS/weather/cover (stamped with current `fishingMode`).
3. The user lands on `/sessions/:id`, the one session screen. While the session is active it is in **live mode**: top strip (lake/swim, timer, weather, catch count), one tile per rod with **Bite +1** and **Catch**, and a sticky action bar (Photo, Note, Recast, End). `/sessions/active` only redirects there.
4. End session via **End** in the action bar (confirm) → `SessionService.complete()`; the screen switches to **finished mode**.

## Add catch flow

1. **Catch** on a rod tile (live session): catch sheet (species chips from mode favourites, weight, length, photo, released) → `CatchService.create()` with the rod, its spot, bait and rig → IndexedDB → `updateSessionStats()` → liveQuery refreshes UI. Without a weight the catch is saved as "details pending".
2. **Full catch form** (`/sessions/:id/catches/new`): extended fields → same persistence path.

## End session flow

`SessionService.complete()` sets status `completed`, endDate, recalculates catch stats from DB.

## Image upload flow

`ImageService.processFile()` compresses, stores blob in IndexedDB (current mode), returns image ID linked to session or catch.

## Backup and restore flow

Settings → `BackupService.export()` downloads JSON with base64 images (**all modes**, each fishing row tagged with `fishingMode`). Import validates schema version and replaces tables; missing `fishingMode` defaults to `carper`. One active session allowed per mode on import.

## Reset flows (Settings)

| Action | Effect |
|--------|--------|
| Reset current fishing mode | Deletes lakes/sessions/catches/options/images/chats/events for the **active mode only**; reseeds mode defaults |
| Reset all settings | Shared preferences → defaults; **keeps** `modePreferences` for all modes (homepage/favorites per mode unchanged) and fishing data |

| Reset entire application | Wipes all IndexedDB + settings; clears fishing mode; navigates to `/mode-select` |
