# Theming and UI

## Shell

- Fixed bottom navigation with active states
- **Mode banner** under the offline banner (when a fishing mode is selected) showing the current mode label
- Offline connectivity banner above content (dismissible for the session; reappears when going offline again)
- Content area scrolls; bottom padding clears the nav
- Safe-area insets for notched devices

## Themes

- **Dark** (default): orange primary accents on dark backgrounds; body text uses light warm neutrals (`--text-primary: #f2e6d8`) for readable contrast on `#0b0b0b`
- **Light**: blue primary on light backgrounds
- **System**: follows `prefers-color-scheme`

`ThemeService` sets `data-theme` on `<html>` and syncs CDK `OverlayContainer` classes.

## CSS variables

Defined in `src/styles/tokens.css`: backgrounds, primary, text, borders, spacing, radii, input/button heights.

## Angular Material

Overrides in `src/styles/material-overrides.css`:

- Form fields with 12px input padding
- Themed dialogs, selects, menus, datepicker, snackbar (`app-snackbar` classes), bottom sheet
- Primary buttons use `--primary` token

## Dialogs

Use `DialogService.open()` for automatic `themed-dialog` panel class. Never hardcode `dark-dialog`.

- Dialog surfaces use a `2px` border with `--border-active` (orange in dark, blue in light)
- Dialog body text uses `--text-primary`; titles use `--primary`
- Form fields inside dialogs use shared Material overrides (`--border-primary` outline, `--text-secondary` labels)
- Cancel actions use stroked buttons; primary/confirm actions use filled buttons — both follow `--primary`
- Bottom sheets (e.g. mobile filters) should include `themed-bottom-sheet` plus `theme-dark|theme-light` and a themed backdrop class, matching `DialogService`

## Shared components

- Shared cards via CSS class `.app-card` plus components: `session-card`, `stat-card`, `weather-card`
- Loading / error / empty: `LoadingStateComponent`, `ErrorStateComponent`, `EmptyStateComponent`
- `expandable-section` — consistent expand/collapse with `aria-expanded`
- `page-title` — centered titles
- `filter-panel` — desktop expandable / mobile bottom sheet

## Settings screen

- Settings options are grouped into collapsible submenus using `expandable-section`
- Expand/collapse state persists per submenu with localStorage-backed keys
- Security and reset actions remain grouped and reachable on mobile without long scrolling
- Appearance uses a single language selector (dropdown) to avoid duplicate controls
- A dedicated **Changelog** submenu links to `/release-notes`

## Navigation focus behavior

- Shell route transitions reset the scroll position of the main content container to the top
- After each navigation, focus moves to the top content region for consistent keyboard/screen-reader flow

## Icons

Material Icons via `@angular/material/icon` only. Icons are self-hosted (`material-icons` package, `filled.css` only) — do not load Google Fonts CDN. Production PWA prefetches `/media/*.woff2` via the service worker; Capacitor Android builds omit the SW and use APK assets. Critical CSS inlining is disabled (`inlineCritical: false`) so the full stylesheet (including Material Icons `@font-face`) loads under CSP without a blocked `onload` handler.

## Responsive rules

- Mobile-first layouts
- Filters collapsed by default on viewports ≤768px
- Session cards vertical stack, no horizontal scroll
- Bottom nav fixed with safe-area padding

## Buttons

- Corner radius: `var(--radius-button)` (aliased to `--radius-md` / 12px — same as weather-card and `.app-card`)
- Primary: filled, `--primary` background
- Stroked: outline for secondary actions
- Delete: warn + confirmation dialog
- `mat-icon-button` stays circular (do not apply `--radius-button`)
- PIN unlock update check: small `mat-icon-button` with `refresh` icon in the top-right corner
- Shape is set globally in `material-overrides.css`; feature CSS should not hardcode button `border-radius`
