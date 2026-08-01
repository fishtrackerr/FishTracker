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
| `/assistant` | AssistantComponent | `pinLockGuard` |
| `/settings` | SettingsComponent | `pinLockGuard` |
| `/profile`, `/profile/documents` | Profile | `pinLockGuard` |
| `/release-notes` | ReleaseNotesComponent | `pinLockGuard` |
| `**` | redirect to `/` | — |

## Guard behavior

### `pinLockGuard`

Waits for `AppStartupService.waitUntilReady()`. Redirects to setup or unlock; stores the **navigation target** (`RouterStateSnapshot.url`) as the return URL when locking — not `router.url`, which is often still `/` during cold start/refresh.

### `pinSetupGuard` / `pinUnlockGuard`

Prevent accessing PIN screens when inappropriate (already configured / already unlocked).

### `activeSessionGuard`

Safety net: redirects to `/` if no active session exists.

## Startup redirects

Primary logic in `AppStartupService.resolveInitialRoute()`. Guards complement but do not duplicate startup navigation.

When an active session exists, startup may route `/` to `/sessions/active`. The shell bottom nav shows primary destinations (Home, Current when active, Assistant when fishing, Sessions, Lakes) plus a **More** menu for Gallery, Stats, Settings (and Assistant when idle).

## Deep links

Paths like `/sessions/:id`, `/settings`, `/lakes/:id` are preserved when unlocked unless the app is locked.

`/sessions/:id` also supports the query `setupRods=1` to enable a first-run rod setup mode after starting a new session.

`/sessions` displays current/history sections when active data exists; `/sessions/active` remains the focused live-session screen.

## PIN unlock redirect

After unlock, `consumeReturnUrl()` restores the intended destination or falls back to active session / home.
