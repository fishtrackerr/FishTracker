# Theming and UI

## Shell

- Fixed bottom navigation with active states
- **Camo header** under the offline banner (when a fishing mode is selected): inline SVG camo pattern coloured by `--camo-*` tokens, the stencil `FishTracker` wordmark and a fishing-mode chip
- Offline connectivity banner above content (dismissible for the session; reappears when going offline again)
- Content area scrolls; bottom padding clears the nav
- Safe-area insets for notched devices

## Themes

- **Woodland camo** (`themeMode: 'light'`, default): sand ground (`#e4ddc8`), army olive text/outline colour (`--primary`), hunter-orange filled actions (`--cta`), dark bottom nav, Saira Stencil One titles, Barlow / Barlow Condensed text and uppercase labels, 8px corners
- **Night bivvy** (`themeMode: 'dark'`): deep forest green (`#0e130f`), bivvy-green actions, faint dark camo header, Rajdhani titles/labels, IBM Plex Sans text, pill buttons; each rod marker uses a bite-alarm LED colour (`--rod-1` … `--rod-6`: red, blue, green, amber, purple, white) with a glow
- **Follow device** (`system`): Woodland by light preference, Night bivvy by dark preference

`ThemeService` sets `data-theme` on `<html>`, syncs CDK `OverlayContainer` classes and sets `<meta name="theme-color">` to the camo header colour of the active theme.

Fonts are self-hosted with `@fontsource` (Latin subset only), like the icons: no Google Fonts CDN (CSP and offline use).

## CSS variables

Defined in `src/styles/tokens.css`: backgrounds, primary, text, borders, spacing, radii, input/button heights, plus:

- `--primary` — text, outline and icon colour (passes 4.5:1 on the backgrounds); `--cta` / `--text-on-cta` — fill of main action buttons and badges (orange in Woodland is too light to use as text)
- `--heading-color`, `--font-display`, `--font-label`, `--label-transform`, `--label-spacing`
- `--camo-base`, `--camo-1` … `--camo-4`, `--header-text`, `--header-chip-bg`
- `--nav-bg`, `--nav-text`, `--nav-active`
- `--rod-1` … `--rod-6`, `--rod-glow`, `--rod-marker-text` (rod marker on rod tiles and the rod sheet)

## Angular Material

Overrides in `src/styles/material-overrides.css`:

- Form fields with 12px input padding
- Themed dialogs, selects, menus, datepicker, snackbar (`app-snackbar` classes), bottom sheet. All bottom sheets (filters, start session, catch sheet, rod sheet) take their config from `themedBottomSheetConfig`
- A `mat-select` bound one-way with `[ngModel]` does not re-render when a pick is rejected (cancelled confirm or prompt): reset it with `restoreSelectValue(viewChild(MatSelect), value)` (`shared/utils/restore-select.ts`), as Settings → fishing mode and the rod sheet's "+ New spot…" do
- UI copy: **Catch**, **Bite**, **Fish spotted**, **End session**; the session card button that opens a session is **Session**
- Flat (`mat-flat-button`) = main action, filled with `--cta`; stroked / text buttons = outline in `--primary`; all button labels use `--font-label` and `--label-transform`
- Form fields: neutral `--border-strong` outline, `--primary` when focused, `--background-input` fill; floated labels uppercase

## Dialogs

Use `DialogService.open()` for automatic `themed-dialog` panel class. Never hardcode `dark-dialog`.

- Dialog surfaces use a `2px` `--border-strong` border and `--radius-lg`
- Dialog body text uses `--text-primary`; titles use `--heading-color` in the label font
- Form fields inside dialogs use shared Material overrides (`--border-primary` outline, `--text-secondary` labels)
- Cancel actions use stroked buttons; primary/confirm actions use filled (`--cta`) buttons
- Single text input (add/rename option, preset name): `promptForText(dialogService, data)` opens `TextPromptDialogComponent` and resolves to the trimmed value or `undefined`. Do not use `window.prompt`
- Bottom sheets (e.g. mobile filters) should include `themed-bottom-sheet` plus `theme-dark|theme-light` and a themed backdrop class, matching `DialogService`. Use `themedBottomSheetConfig(resolvedTheme, data)` (`shared/utils/themed-bottom-sheet.ts`) instead of repeating the class lists (filter sheet, start-session sheet)

## Shared components

- Shared cards via CSS class `.app-card` plus components: `session-card`, `stat-card`, `weather-card`
- Loading / error / empty: `LoadingStateComponent`, `ErrorStateComponent`, `EmptyStateComponent`
- `expandable-section` — consistent expand/collapse with `aria-expanded`; the screen-reader text is translated (`common.expandSection` / `common.collapseSection`), so pass a translated `label`
- `maps-link-button` — tooltip and `aria-label` are translated (`maps.*`); pass a translated `label`
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

Material Icons via `@angular/material/icon` only; no emoji in buttons or labels (use `<mat-icon class="inline-icon">` next to text). Icons are self-hosted (`material-icons` package, `filled.css` only) — do not load Google Fonts CDN. Production PWA prefetches `/media/*.woff2` via the service worker; Capacitor Android builds omit the SW and use APK assets. Critical CSS inlining is disabled (`inlineCritical: false`) so the full stylesheet (including Material Icons `@font-face`) loads under CSP without a blocked `onload` handler.

## Responsive rules

- Mobile-first layouts
- Filters collapsed by default on viewports ≤768px
- Session cards vertical stack, no horizontal scroll
- Bottom nav fixed with safe-area padding

## Buttons

- Corner radius: `var(--radius-button)` (8px Woodland, pill in Night bivvy)
- Primary: filled, `--cta` background with `--text-on-cta`
- Stroked: outline for secondary actions
- Delete: warn + confirmation dialog
- `mat-icon-button` stays circular (do not apply `--radius-button`)
- PIN unlock update check: small `mat-icon-button` with `refresh` icon in the top-right corner
- Shape is set globally in `material-overrides.css`; feature CSS should not hardcode button `border-radius`

## Session screen

- Rod tiles: big **Bite +1** (outline `--primary`) and **Catch** (filled `--cta`) buttons, 64px high, for wet or cold hands; markers use `--rod-N` + `--rod-glow`; inactive rods are greyed (`--background-raised`, no glow)
- Live action bar: fixed just above the bottom nav (`bottom: 64px + safe-area`), plain token-styled buttons ≥ 56px (Photo, Note, Recast, End = `--cta` fill); the page adds bottom padding so content is not hidden behind it
- Weather-alert banner and details-pending badge use `color-mix` on `--warning` / `--danger` (no hardcoded colours)
