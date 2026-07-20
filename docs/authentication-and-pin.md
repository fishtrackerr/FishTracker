# Authentication and PIN

## PIN creation

First launch redirects to `/pin/setup`. User enters 6-digit PIN twice. `PinLockService.setupPin()` stores PBKDF2 hash and salt in settings — never the raw PIN.

## PIN hashing

PBKDF2-SHA256, 100,000 iterations, 256-bit derived key, random 16-byte salt.

## Unlock state

`AppLockState` persisted in localStorage:

- `isLocked`, `unlockedAt`, `lastActivityAt`
- Restored on app load; expired sessions auto-lock based on `lockTimeoutMinutes`

## Auto-lock

Inactivity checked every 30 seconds. Activity tracked on pointer and keyboard events. Tab visibility change updates activity before checking timeout.

## Route guard behavior

Guards await startup initialization before evaluating lock state. Return URL stored in sessionStorage when redirecting to unlock.

## Lock navigation

`PinLockService.lock()` navigates to `/pin/unlock` and preserves current route for post-unlock restore.

## Security limitations

- Client-side PIN only; suitable for casual device privacy, not high-security scenarios
- No server authentication
- PIN hash in localStorage — device access implies offline attack surface

## Development logging

Lock state changes logged in dev mode only. PIN and hash are never logged.
