# Application Flow

## App startup

1. `APP_INITIALIZER` runs `AppStartupService.initialize()`.
2. Dexie database opens; `PinLockService` loads persisted lock state.
3. Startup splash displays until initialization completes.
4. `performInitialNavigation()` runs once:
   - Locked → `/pin/unlock` (stores return URL)
   - No PIN → `/pin/setup`
   - Valid deep link → preserve route
   - Active session + default entry → `/sessions/active`
   - Otherwise → `/`

## PIN unlock

1. User enters 6-digit PIN on `/pin/unlock`.
2. `PinLockService.verifyPin()` validates against PBKDF2 hash in settings.
3. On success, navigates to stored return URL or resolves via `AppStartupService.resolveInitialRoute()`.

## Active session flow

1. Start session from dashboard or sessions list (create dialog).
2. `SessionService.start()` creates active session with optional GPS/weather/cover.
3. User lands on `/sessions/active` with timer, weather, catch list, Quick Catch.
4. End session via **End Session** → `SessionService.complete()`.

## Add catch flow

1. **Quick Catch** (active session): dialog → `CatchService.createQuick()` → IndexedDB → `updateSessionStats()` → liveQuery refreshes UI.
2. **Full catch form** (`/sessions/:id/catches/new`): extended fields → same persistence path.

## End session flow

`SessionService.complete()` sets status `completed`, endDate, recalculates catch stats from DB.

## Image upload flow

`ImageService.processFile()` compresses, stores blob in IndexedDB, returns image ID linked to session or catch.

## Backup and restore flow

Settings → `BackupService.export()` downloads JSON with base64 images. Import validates schema version and replaces tables.
