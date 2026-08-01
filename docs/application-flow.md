# Application Flow

## App startup

1. `APP_INITIALIZER` runs `AppStartupService.initialize()`.
2. Dexie database opens; `PinLockService` loads persisted lock state; weather monitor starts (idle until a mode + active session exist).
3. Startup splash displays until initialization completes.
4. `performInitialNavigation()` runs once:
   - Locked → `/pin/unlock` (stores return URL)
   - No PIN → `/pin/setup`
   - No fishing mode for this app run → `/mode-select`
   - Valid deep link → preserve route (entities from other modes are not loaded)
   - Active session (current mode) + default entry → `/sessions/active`
   - Otherwise → `/`

## Fishing mode

1. After PIN unlock, user picks one mode on `/mode-select`: carper, catfish, pike, bass, feeder, or general.
2. Choice is kept in memory and `sessionStorage` (`fish-tracker-fishing-mode`) until the app process restarts (or full application reset). Soft browser refresh keeps the mode.
3. Lakes, sessions, catches, user options, images, AI chats, and filter presets are scoped to that mode.
4. PIN, theme, units, language, and AI API key/config remain shared across modes.
5. Per-mode preferences (`lastLakeId`, `defaultLakeId`, `homepageImageId`, favorites) live in `AppSettings.modePreferences`.
6. Existing data from before this feature is migrated to **carper** (Dexie v7).
7. Shell shows a mode banner for the active mode. Switching modes requires restarting the app (or clearing mode via full reset).

## PIN unlock

1. User enters 6-digit PIN on `/pin/unlock`.
2. `PinLockService.verifyPin()` validates against PBKDF2 hash in settings.
3. On success, navigates via stored return URL / `AppStartupService.resolveInitialRoute()`. If no fishing mode is set for this run, the deep link is re-stored and the user lands on `/mode-select` first.

## Mode select

1. User chooses a fishing mode.
2. `FishingModeService.setMode()` persists the choice and seeds `modePreferences` defaults if needed.
3. `UserOptionService.ensureDefaultsForCurrentMode()` seeds species/bait/rig options when the mode has none.
4. Navigation uses `consumeReturnUrl()` then `resolveUnlockedDestination` (preserves deep links stored by the PIN/mode guards or startup, else active session in that mode, else home).

## Active session flow

1. Start session from dashboard or sessions list (create dialog). Only one **active** session per fishing mode.
2. `SessionService.start()` creates active session with optional GPS/weather/cover (stamped with current `fishingMode`).
3. User lands on `/sessions/active` with timer, weather, catch list, Quick Catch.
4. End session via **End Session** → `SessionService.complete()`.

## Add catch flow

1. **Quick Catch** (active session): dialog species list from mode favorites → `CatchService.createQuick()` → IndexedDB → `updateSessionStats()` → liveQuery refreshes UI.
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
