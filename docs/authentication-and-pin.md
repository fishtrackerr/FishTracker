# Authentication and PIN

## PIN creation

First launch redirects to `/pin/setup`. User enters 6-digit PIN twice. `PinLockService.setupPin()` stores PBKDF2 hash and salt in settings — never the raw PIN.

## PIN hashing

PBKDF2-SHA256, 100,000 iterations, 256-bit derived key, random 16-byte salt.

## Unlock state

`AppLockState` persisted in localStorage:

- `isLocked`, `unlockedAt`, `lastActivityAt`
- `failedAttempts`, `lockoutUntil`, `lockoutCount` for brute-force backoff
- A separate `fish-tracker-unlock-session` flag in **sessionStorage** proves a successful PIN unlock in this browser tab
- Cold start (no unlock session) always requires PIN — localStorage `isLocked: false` alone is not trusted
- Expired sessions auto-lock based on `lockTimeoutMinutes`

## Attempt lockout

After **5** consecutive failed unlock attempts, a lockout is applied starting at **30 seconds**, doubling with each subsequent lockout up to **5 minutes**. Successful unlock resets the counters. While locked out, further guesses are rejected without hashing.

## Unlock state and secrets

On successful unlock, `SecretVaultService.unlockWithPin()` derives an AES-GCM wrapping key from the PIN and decrypts the AI API key into memory (and a tab-scoped sessionStorage copy for in-tab refresh). `lock()` clears both.

## Auto-lock

Inactivity checked every 30 seconds. Activity tracked on pointer and keyboard events. On tab visibility → visible, inactivity is checked **before** refreshing activity so backgrounded tabs still lock.

## Route guard behavior

Guards await startup initialization before evaluating lock state. Return URL stored in sessionStorage when redirecting to unlock. Only same-app relative paths are accepted (`/…`, not `//…` or absolute URLs).

After unlock, if no fishing mode is selected for this app run, navigation goes to `/mode-select` before shell routes. See [routing.md](./routing.md) and [application-flow.md](./application-flow.md).

## Lock navigation

`PinLockService.lock()` navigates to `/pin/unlock` and preserves current route for post-unlock restore.

## Settings logout behavior

- The Settings `Logout` action is a lock-only flow that calls `PinLockService.lock()`
- It does not delete data, clear preferences, or remove the configured PIN

## Security limitations

- Client-side PIN only; suitable for casual shoulder-surfing privacy, **not** high-security scenarios
- IndexedDB fishing data is **not encrypted**; device/DevTools access can read catches, GPS, and photos without the PIN
- PIN hash in localStorage — device access implies offline attack surface
- AI API key is encrypted at rest with the PIN; plaintext exists only while unlocked (memory + tab sessionStorage)
- In-app copy on PIN setup and Settings explains these limits

## Development logging

Lock state changes logged in dev mode only. PIN and hash are never logged.
