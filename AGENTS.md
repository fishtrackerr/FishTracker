# AGENTS.md — Fishing Register (FishTracker)

Rules for AI-assisted changes to this repository.

## Architecture

- Reuse existing services and components under `src/app/core/` and `src/app/shared/`
- Do not create duplicate storage logic; use repositories
- Do not bypass repositories or access `db` from components
- Keep business logic in services, not templates
- Use typed interfaces from `src/app/core/models/`
- Avoid `any`
- Offline-first: IndexedDB via Dexie; no backend unless requested

## UI

- Use shared components: `session-card`, `filter-panel`, `expandable-section`, `page-title`
- Follow active theme via CSS variables in `src/styles/tokens.css`
- Open dialogs with `DialogService`, not raw `MatDialog` with hardcoded classes
- Never use default Material blue in dark mode
- All delete actions use `ConfirmService`
- Page titles centered
- Input padding via Material overrides
- Test at mobile widths (≤768px)

## Storage

- IndexedDB for data and images
- localStorage for settings, lock state, filter presets only
- Schema changes require Dexie version migration in `fish-db.ts`
- Optional fields must not block entity creation

## Sessions and catches

- One catch → one session (`sessionId`)
- Startup navigation via `AppStartupService`
- Catch lists use `watchBySession()` liveQuery
- `SessionService.updateSession()` for edits with validation
- Editing sessions must not remove or re-timestamp catches
- Session edit page: `/sessions/:id/edit`
- Rods and session spots are embedded on `FishingSession`; bite/fish-spotted events in IndexedDB

## Maps

- Validate coordinates before opening Google Maps
- Never hardcode location; use `MapsService`
- Use safe external URLs (`noopener,noreferrer`)
- Handle denied geolocation permission with readable snackbar errors

## Rods and spots

- Every rod belongs to one session
- A rod has at most one current spot (`sessionSpotId`)
- Spot changes preserve history in `RodSpotHistory` when assigned via `RodService`
- Bite count cannot go negative; prefer event-derived counts
- Catches from rod cards must preserve `rodId` and `sessionSpotId`

## User options

- Normalize custom values (trim)
- Prevent case-insensitive duplicates via `UserOptionService`
- Keep defaults recoverable via Settings reset
- Reuse one shared `UserOptionService` / `option-combobox`

## Reset actions

- Every reset requires `ConfirmService` confirmation
- Full reset requires typing `RESET` plus final confirm
- Offer export before deleting all data
- Settings reset must not delete fishing records

## Security

- Never store or log the raw PIN (PBKDF2 hash + salt in settings is expected)
- PIN unlock has attempt lockout / exponential backoff
- AI API key is PIN-wrapped at rest (`SecretVaultService`); plaintext only while unlocked
- `PinLockService` persists lock state; guards await startup init
- Preserve return URL after unlock (same-app relative paths only)
- Backup import validates size, ids, and image mime types
- Static CSP meta in `index.html` for GitHub Pages hosting

## Documentation

- **Always** update the relevant `/docs/*.md` file after any behavioral change to a service, component, or feature
- After any model interface change → sync `docs/data-model.md`
- After any route added, removed, or renamed → update `docs/routing.md`
- After any session or catch behavior change → update `docs/sessions.md` or `docs/catches.md`
- After any storage or DB schema change → update `docs/storage.md`
- After any UI/theme change → update `docs/theming-and-ui.md`
- See [docs/README.md](./docs/README.md) for the full index

## Testing

- **Always** review and update the `.spec.ts` file for every component or service that is changed
- New `@Input()`, `@Output()`, or public methods on a component require matching test cases in the spec
- If no `.spec.ts` exists for a changed component, create one alongside it
- After spec changes, run `ng test` and confirm no regressions before completing the task
- Run `ng build` before completing any task to catch compile errors
- Spec files for components live next to the component file; for services under `src/app/core/services/`

## Key entry points

| Concern | File |
|---------|------|
| Startup | `src/app/core/services/app-startup.service.ts` |
| Routes | `src/app/app.routes.ts` |
| Database | `src/app/core/db/fish-db.ts` |
| Theme | `src/app/core/services/theme.service.ts` |
| Dialogs | `src/app/core/services/dialog.service.ts` |
