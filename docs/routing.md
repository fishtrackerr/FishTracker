# Routing

Defined in `src/app/app.routes.ts`.

## Routes

| Path | Component | Guards |
|------|-----------|--------|
| `/pin/setup` | PinSetupComponent | `pinSetupGuard` |
| `/pin/unlock` | PinUnlockComponent | `pinUnlockGuard` |
| `/mode-select` | ModeSelectComponent | `pinLockGuard` |
| `/` | DashboardComponent | `pinLockGuard`, `fishingModeGuard` |
| `/sessions` | SessionsListComponent | `pinLockGuard`, `fishingModeGuard` |
| `/sessions/active` | ActiveSessionComponent | `pinLockGuard`, `fishingModeGuard`, `activeSessionGuard` |
| `/sessions/:id` | SessionDetailComponent | `pinLockGuard`, `fishingModeGuard` |
| `/sessions/:id/catches/new` | CatchFormComponent | `pinLockGuard`, `fishingModeGuard` |
| `/lakes`, `/lakes/:id` | Lakes list/detail | `pinLockGuard`, `fishingModeGuard` |
| `/gallery` | GalleryComponent | `pinLockGuard`, `fishingModeGuard` |
| `/statistics` | StatisticsComponent | `pinLockGuard`, `fishingModeGuard` |
| `/assistant` | AssistantComponent | `pinLockGuard`, `fishingModeGuard` |
| `/settings` | SettingsComponent | `pinLockGuard`, `fishingModeGuard` |
| `/profile`, `/profile/documents` | Profile | `pinLockGuard`, `fishingModeGuard` |
| `/release-notes` | ReleaseNotesComponent | `pinLockGuard`, `fishingModeGuard` |
| `**` | redirect to `/` | — |

Shell child routes inherit `pinLockGuard` + `fishingModeGuard` from the shell parent.

## Guard behavior

### `pinLockGuard`

Waits for `AppStartupService.waitUntilReady()`. Redirects to setup or unlock; stores the **navigation target** (`RouterStateSnapshot.url`) as the return URL when locking — not `router.url`, which is often still `/` during cold start/refresh.

### `fishingModeGuard`

Requires a fishing mode selected for this app run (`FishingModeService`). When missing, stores the intended deep link as the return URL and redirects to `/mode-select`. Also re-checks PIN lock (stores return URL and redirects to unlock when locked).

### `pinSetupGuard` / `pinUnlockGuard`

Prevent accessing PIN screens when inappropriate (already configured / already unlocked).

### `activeSessionGuard`

Safety net: redirects to `/` if no active session exists **in the current fishing mode**.

## Startup redirects

Primary logic in `AppStartupService.resolveInitialRoute()`. Guards complement but do not duplicate startup navigation.

Flow after unlock: no mode → `/mode-select` (deep link kept in return URL) → pick mode → restore return URL or active session (current mode) or home. Mode choice is kept in `sessionStorage` until process restart.

When an active session exists for the current mode, startup may route `/` to `/sessions/active`. The shell bottom nav shows primary destinations (Home, Current when active, Assistant when fishing, Sessions, Lakes) plus a **More** menu for Gallery, Stats, Settings (and Assistant when idle).

## Deep links

Paths like `/sessions/:id`, `/settings`, `/lakes/:id` are preserved when unlocked unless the app is locked. After mode select, the stored return URL is restored when valid. Entities belonging to another fishing mode are not returned by repositories (`getById` / `watchById`).

`/sessions/:id` also supports the query `setupRods=1` to enable a first-run rod setup mode after starting a new session.

`/sessions` displays current/history sections when active data exists; `/sessions/active` remains the focused live-session screen.

## PIN unlock redirect

After unlock, `consumeReturnUrl()` restores the intended destination or falls back to mode-select / active session / home.
