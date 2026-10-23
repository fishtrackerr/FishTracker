# Testing

## Framework

Vitest via `ng test` (`@angular/build:unit-test`, jsdom). Config: `tsconfig.spec.json`.

## Coverage today

About **40+** `*.spec.ts` files across:

- Core services: session, catch, weather, theme, filter, search, statistics, pin-lock, settings, maps, geolocation, rods, bites, user-options, local insights, startup, fishing mode, lake geocoding, image, session-weather-monitor
- Guards / utils: pin-lock guard, return-url, fetch-with-timeout
- Guards: `active-session.guard.spec.ts` (`/sessions/active` redirect: `?id=`, active session, home)
- Features: session screen (`session-detail.component.spec.ts`: live/finished mode, timer, swim, weather alerts + pressure trend + refresh, Bite +1 with Undo, catch sheet / rod sheet open, add rods, recast, photos load/upload/camera/prune, notes, end with confirm, delete), rod tile, sessions list, start-session sheet, catches (form + catch sheet), assistant, settings, lake detail, pin-unlock, mode-select, release notes, shell (Current tab links to the session), expandable-section, confirm-dialog
- App bootstrap smoke (`app.spec.ts`)

## Priority gaps

| Area | Why |
|------|-----|
| `BackupService` | Destructive import / version allowlist |
| `LlmService` / `ChatService` | URL allowlist, offline errors |
| Gallery | Lazy thumbnails / revoke full URLs |
| `SessionStartFlowService` | Shared start-session path |
| `PhotoPickService` | Shared file picker |
| Dashboard / lakes list / statistics / profile | Feature UI smoke |

## Recommended coverage (ongoing)

| Area | Tests |
|------|-------|
| Startup | Route resolution: PIN → mode select → home / active session (per mode) |
| PIN | Cold-start lock without sessionStorage; inactivity; visibility checks timeout before activity |
| Fishing mode | Mode select, localStorage persistence, mode-scoped lists, one active session per mode |
| Catches | Insert, stats update, watchBySession |
| Themes | resolvedTheme, overlay class sync |
| Session edit | Date validation, catches preserved |
| Filters | Active count, apply/clear |
| Backup | validate rejects bad version; import includes profiles |

## IndexedDB tests

Use Dexie in-memory or mock repositories for unit tests.

## Route guard tests

Test guard functions with `TestBed.runInInjectionContext`.

## Theme tests

Verify `document.documentElement` and overlay container attributes after theme change.

## Mobile / PWA

Manual testing at 375px width. PWA reload with active session should land on the session screen `/sessions/<id>` (via the `/sessions/active` redirect).

After install or update on Android (PWA or Capacitor), confirm bottom-nav and mode-picker icons are real glyphs — not clipped ligature scraps (`ho`, `ev`, `wa`, `me`). Those scraps mean the Material Icons font failed to load.

## CI

GitHub Actions (`.github/workflows/ci.yml`): `npm ci` → lint → `ng test` → production build → icon generation.

## Regression tests

Add a test for every fixed bug per [development-guidelines.md](./development-guidelines.md).
