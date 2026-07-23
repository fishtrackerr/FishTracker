# Theming and UI

## Themes

- **Dark** (default): orange primary on dark backgrounds
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

- Dialog surfaces use a `2px` active orange border (`--border-active`) in both themes
- Start Session dialog fields use orange outlined borders and orange labels for all three inputs
- Dialog cancel actions use stroked orange buttons; primary/confirm actions use orange filled buttons
- End Session confirm dialog body text is themed orange to match dialog emphasis

## Shared components

- `app-card`, `session-card`, `stat-card`, `weather-card`
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

Material Icons via `@angular/material/icon` only.

## Responsive rules

- Mobile-first layouts
- Filters collapsed by default on viewports ≤768px
- Session cards vertical stack, no horizontal scroll
- Bottom nav fixed with safe-area padding

## Buttons

- Primary: filled, `--primary` background
- Stroked: outline for secondary actions
- Delete: warn + confirmation dialog
- PIN unlock update check: small `mat-icon-button` with `refresh` icon in the top-right corner
