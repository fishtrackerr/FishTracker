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

## Shared components

- `app-card`, `session-card`, `stat-card`, `weather-card`
- `expandable-section` — consistent expand/collapse with `aria-expanded`
- `page-title` — centered titles
- `filter-panel` — desktop expandable / mobile bottom sheet

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
