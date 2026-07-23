# Routing

Defined in `src/app/app.routes.ts`.

## Routes

| Path | Component | Guards |
|------|-----------|--------|
| `/pin/setup` | PinSetupComponent | `pinSetupGuard` |
| `/pin/unlock` | PinUnlockComponent | `pinUnlockGuard` |
| `/` | DashboardComponent | `pinLockGuard` |
| `/sessions` | SessionsListComponent | `pinLockGuard` |
| `/sessions/active` | ActiveSessionComponent | `pinLockGuard`, `activeSessionGuard` |
| `/sessions/:id` | SessionDetailComponent | `pinLockGuard` |
| `/sessions/:id/catches/new` | CatchFormComponent | `pinLockGuard` |
| `/lakes`, `/lakes/:id` | Lakes list/detail | `pinLockGuard` |
| `/gallery` | GalleryComponent | `pinLockGuard` |
| `/statistics` | StatisticsComponent | `pinLockGuard` |
| `/settings` | SettingsComponent | `pinLockGuard` |
| `/profile`, `/profile/documents` | Profile | `pinLockGuard` |
| `/release-notes` | ReleaseNotesComponent | `pinLockGuard` |
| `**` | redirect to `/` | — |

## Guard behavior

### `pinLockGuard`

Waits for `AppStartupService.waitUntilReady()`. Redirects to setup or unlock; stores return URL when locking.

### `pinSetupGuard` / `pinUnlockGuard`

Prevent accessing PIN screens when inappropriate (already configured / already unlocked).

### `activeSessionGuard`

Safety net: redirects to `/` if no active session exists.

## Startup redirects

Primary logic in `AppStartupService.resolveInitialRoute()`. Guards complement but do not duplicate startup navigation.

When an active session exists, startup may route `/` to `/sessions/active`. The shell footer also exposes a dedicated **Current** tab (conditional), while **Sessions** continues to point to `/sessions` for list/history access.

## Deep links

Paths like `/sessions/:id`, `/settings`, `/lakes/:id` are preserved when unlocked unless the app is locked.

`/sessions/:id` also supports the query `setupRods=1` to enable a first-run rod setup mode after starting a new session.

`/sessions` displays current/history sections when active data exists; `/sessions/active` remains the focused live-session screen.

## PIN unlock redirect

After unlock, `consumeReturnUrl()` restores the intended destination or falls back to active session / home.
