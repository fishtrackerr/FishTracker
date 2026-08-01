# Authentication and PIN

## PIN creation

First launch redirects to `/pin/setup`. User enters 6-digit PIN twice. `PinLockService.setupPin()` stores PBKDF2 hash and salt in settings — never the raw PIN.

## PIN hashing

PBKDF2-SHA256, 100,000 iterations, 256-bit derived key, random 16-byte salt.

## Unlock state

`AppLockState` persisted in localStorage:

- `isLocked`, `unlockedAt`, `lastActivityAt`
- A separate `fish-tracker-unlock-session` flag in **sessionStorage** proves a successful PIN unlock in this browser tab
- Cold start (no unlock session) always requires PIN — localStorage `isLocked: false` alone is not trusted
- Expired sessions auto-lock based on `lockTimeoutMinutes`

## Auto-lock

Inactivity checked every 30 seconds. Activity tracked on pointer and keyboard events. On tab visibility → visible, inactivity is checked **before** refreshing activity so backgrounded tabs still lock.

## Route guard behavior

Guards await startup initialization before evaluating lock state. Return URL stored in sessionStorage when redirecting to unlock.

## Lock navigation

`PinLockService.lock()` navigates to `/pin/unlock` and preserves current route for post-unlock restore.

## Settings logout behavior

- The Settings `Logout` action is a lock-only flow that calls `PinLockService.lock()`
- It does not delete data, clear preferences, or remove the configured PIN

## Security limitations

- Client-side PIN only; suitable for casual shoulder-surfing privacy, **not** high-security scenarios
- IndexedDB fishing data is **not encrypted**; device/DevTools access can read catches, GPS, and photos without the PIN
- PIN hash in localStorage — device access implies offline attack surface
- In-app copy on PIN setup and Settings explains these limits

## Development logging

Lock state changes logged in dev mode only. PIN and hash are never logged.
