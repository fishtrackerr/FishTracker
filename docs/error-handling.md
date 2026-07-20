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

- `AppStartupService` — navigation decisions
- `PinLockService` — lock/unlock (never PIN values)

## Async error rules

- Services throw or return undefined; components catch and notify
- Optional features (GPS, weather, cover image) fail silently with fallbacks
- Session/catch writes show user errors on failure

## Retry behavior

Dashboard and weather support manual retry. No automatic retry loops for API calls.

## Known patterns

- `SessionValidationError` for edit validation failures
- Backup import throws `Error('Invalid backup file')`
- Dexie errors propagate from repositories
