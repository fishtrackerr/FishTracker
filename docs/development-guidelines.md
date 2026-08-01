# Development Guidelines

## Architecture

- Reuse existing services and components
- Do not duplicate storage logic or bypass repositories
- Keep feature logic out of presentation components
- Use typed interfaces; avoid `any`
- Keep async flows explicit
- Do not introduce a backend unless explicitly requested

## UI

- Use shared UI components and design tokens
- Prefer `SessionStartFlowService` for starting sessions and `PhotoPickService` for image file inputs
- Follow active theme; never hardcode default blue in dark mode
- All dialogs via `DialogService`; overlays must be themed
- All delete actions require confirmation
- Page titles centered via `PageTitleComponent`
- Cards use consistent borders and spacing from tokens
- Inputs use Material overrides (12px padding)
- Test mobile layouts at narrow widths
- Use Material Icons only

## Storage

- IndexedDB for app data and images
- localStorage for settings, lock state, filter presets only
- Handle write errors; schema changes require Dexie migrations
- Optional fields must not block creation
- No direct `db` access from components

## Sessions and catches

- One catch belongs to exactly one session
- Active session navigation via `AppStartupService`
- Adding a catch must update session stats and reactive lists
- Session edits preserve catches and catch timestamps
- Session creation works without weather, GPS, or images

## Security

- Never store or log the raw PIN (PBKDF2 hash storage is expected)
- Guards wait for startup initialization
- Auto-lock must be deterministic
- Preserve intended route after unlock via return URL

## Documentation

- Update `/docs` when logic changes
- Keep `data-model.md` synchronized with TypeScript interfaces
- Update release notes for user-visible changes

## Testing

- Add regression tests for fixed bugs
- Test empty states, offline mode, dark/light themes, mobile layouts
- Test PWA reload with and without active session

## Code quality

- Follow lint and formatting rules
- No unresolved TypeScript errors or unhandled promises
- No silent catch blocks
- Meaningful names; focused components
- Prefer pure functions for calculations
