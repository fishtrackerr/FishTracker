# Testing

## Framework

Vitest via `ng test` (`@angular/build:unit-test`, jsdom). Config: `tsconfig.spec.json`.

## Coverage today

About **37** `*.spec.ts` files across:

- Core services: session, catch, weather, theme, filter, search, statistics, pin-lock, settings, maps, geolocation, rods, bites, user-options, local insights, startup, lake geocoding, image, session-weather-monitor
- Guards / utils: pin-lock guard, return-url, fetch-with-timeout
- Features: active-session, sessions list/detail/create dialog, catches (form + quick catch), assistant, settings, lake detail, pin-unlock, release notes, shell, expandable-section, confirm-dialog
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
| Startup | Route resolution: home, active session, PIN |
| PIN | Cold-start lock without sessionStorage; inactivity; visibility checks timeout before activity |
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

Manual testing at 375px width. PWA reload with active session should land on `/sessions/active`.

## CI

GitHub Actions (`.github/workflows/ci.yml`): `npm ci` → lint → `ng test` → production build → icon generation.

## Regression tests

Add a test for every fixed bug per [development-guidelines.md](./development-guidelines.md).
