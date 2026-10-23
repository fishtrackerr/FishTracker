# Routing

Defined in `src/app/app.routes.ts`.

## Routes

| Path | Component | Guards |
|------|-----------|--------|
| `/pin/setup` | PinSetupComponent | `pinSetupGuard` |
| `/pin/unlock` | PinUnlockComponent | `pinUnlockGuard` |
| `/mode-select` | ModeSelectComponent | `pinLockGuard`, `modeNotSelectedGuard` (redirects to the unlocked destination once a mode is set) |
| `/` | DashboardComponent | `pinLockGuard`, `fishingModeGuard` |
| `/sessions` | SessionsListComponent | `pinLockGuard`, `fishingModeGuard` |
| `/sessions/active` | — (redirect only) | `pinLockGuard`, `fishingModeGuard`, `activeSessionRedirectGuard` |
| `/sessions/:id/summary` | SessionSummaryComponent (end-of-session summary, opened by **End**) | `pinLockGuard`, `fishingModeGuard` |
| `/sessions/:id` | SessionDetailComponent (the one session screen: live or finished) | `pinLockGuard`, `fishingModeGuard` |
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

Requires a fishing mode stored (`FishingModeService`). When missing, stores the intended deep link as the return URL and redirects to `/mode-select`. Also re-checks PIN lock (stores return URL and redirects to unlock when locked).

### `pinSetupGuard` / `pinUnlockGuard`

Prevent accessing PIN screens when inappropriate (already configured / already unlocked).

### `activeSessionRedirectGuard`

`/sessions/active` has no screen of its own; it is a stable entry point that always redirects (`core/guards/active-session.guard.ts`):

- `?id=<id>` naming an **active** session in the current fishing mode → `/sessions/<id>`
- otherwise the active session of the current mode → `/sessions/<id>`
- no active session → `/`

So every caller that still navigates to `/sessions/active` (startup `resolveUnlockedDestination`, dashboard / sessions list **Continue session**, session card **Continue**, `SessionStartFlowService`, Settings mode switch) lands on the session screen.

## `returnUrl` query param

`/sessions/:id/catches/new`, `/sessions/:id/catches/:catchId/edit` and `/sessions/:id/edit` accept an optional `returnUrl` (the session screen passes its own URL). Save, Cancel and (catch form) Delete navigate there when it passes `safeReturnUrlParam`; otherwise they go to `/sessions/:id`. This is separate from the post-unlock return URL stored in `sessionStorage`.

## Startup redirects

Primary logic in `AppStartupService.resolveInitialRoute()`. Guards complement but do not duplicate startup navigation.

Flow after unlock: no mode → `/mode-select` (deep link kept in return URL) → pick mode → restore return URL or active session (current mode) or home. Mode choice is kept in `localStorage` and remembered across restarts; it can be changed in Settings.

When an active session exists for the current mode, startup may route `/` to `/sessions/active`, which redirects to `/sessions/<id>`. The shell bottom nav always shows five items (Home, Sessions, Gallery, Stats, More); the **More** menu holds Lakes, Assistant, WhatsApp share and Settings. While a session is active, the camo header's mode chip becomes a **LIVE · mode** link straight to `/sessions/<active id>` (no Current/Assistant tabs).

## Deep links

Paths like `/sessions/:id`, `/settings`, `/lakes/:id` are preserved when unlocked unless the app is locked. After mode select, the stored return URL is restored when valid. Entities belonging to another fishing mode are not returned by repositories (`getById` / `watchById`).

`/sessions` displays current/history sections when active data exists; `/sessions/:id` is the session screen for both live and finished sessions.

## PIN unlock redirect

After unlock, `consumeReturnUrl()` restores the intended destination or falls back to mode-select / active session / home.
