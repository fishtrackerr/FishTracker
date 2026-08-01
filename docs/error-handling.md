# Error Handling

## Global error handler

`GlobalErrorHandler` registered in `app.config.ts` catches unhandled errors and logs in development.

## User-facing messages

`NotificationService` shows Material snackbars:

- `success()` — green panel class
- `error()` — error panel class
- `info()` — neutral

## Development logging

Prefixed debug logs in:

- `AppStartupService` — navigation decisions (PIN / mode select / active session); `db.open` failures in development
- `PinLockService` — lock/unlock (never PIN values)
- `FishingModeService` — mode selection for the app run

## Async error rules

- Services throw or return undefined; components catch and notify
- Optional features (GPS, weather, cover image) fail silently with fallbacks
- Session/catch writes show user errors on failure

## IndexedDB open failures

`AppStartupService.initialize()` catches `db.open()` errors (does not reject `APP_INITIALIZER`) and exposes `dbRecoveryKind` / `dbOpenError`. The startup splash shows a data-preserving recovery UI:

- **versionMismatch** (`VersionError`) — check for updates / reload (local DB is newer than this build)
- **upgradeFailed** / **unknown** — retry open / reload

No automatic wipe. Settings full reset remains a manual last resort.

## Retry behavior

Dashboard and weather support manual retry. Startup DB recovery offers manual retry. No automatic retry loops for API calls.

## Known patterns

- `SessionValidationError` for edit validation failures
- Backup import throws `Error('Invalid backup file')`
- Dexie errors propagate from repositories after a successful open
