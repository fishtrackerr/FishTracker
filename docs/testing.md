# Testing

## Framework

Vitest via `ng test` (Angular 21 unit test builder). Config: `tsconfig.spec.json`.

## Existing tests

- `app.spec.ts` — app bootstrap smoke
- `session.service.spec.ts` — session start, duplicate active guard
- `image.service.spec.ts` — cover image failure

## Recommended coverage

| Area | Tests |
|------|-------|
| Startup | Route resolution: home, active session, PIN |
| PIN | Persisted unlock, inactivity, no false lock on visibility |
| Catches | Insert, stats update, watchBySession |
| Themes | resolvedTheme, overlay class sync |
| Session edit | Date validation, catches preserved |
| Filters | Active count, apply/clear |

## IndexedDB tests

Use Dexie in-memory or mock repositories for unit tests.

## Route guard tests

Test guard functions with `TestBed.runInInjectionContext`.

## Theme tests

Verify `document.documentElement` and overlay container attributes after theme change.

## Mobile / PWA

Manual testing at 375px width. PWA reload with active session should land on `/sessions/active`.

## Regression tests

Add a test for every fixed bug per [development-guidelines.md](./development-guidelines.md).
