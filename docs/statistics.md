# Statistics

Statistics and dashboard aggregates use only data for the **current fishing mode**.

## Available statistics

Dashboard (`StatisticsService.getDashboardStats()`):

- Total sessions, catches
- Biggest fish
- Favorite lake (most sessions)

Statistics page: filtered catch/session aggregates with charts and tables.

## Calculation rules

- Weights summed from catch records (current mode)
- Biggest fish: max `weightKg` across catches
- Session filters applied before aggregation

## Filters

`FilterService` / `FilterPanelComponent`:

- Date range, species, session status, and related fields
- Active filter is in-memory for the app run
- The panel edits its own copy of the `filter` input and emits a new object via `filterChange`; it never mutates the parent's object. Session status and the active count resync whenever the input changes
- Presets saved to localStorage under `fish-tracker-filter-presets:<fishingMode>`

## Saved filter presets

Named presets via save/delete with confirmation on delete. The preset name is asked in the themed text prompt dialog (`TextPromptDialogComponent`), not `window.prompt`. Presets are **per fishing mode** so lake/species values from one mode do not appear in another.

Option rename rewrites matching values only in the active mode’s presets and `modePreferences`.

## Performance

Statistics page loads catches once per filter change. Each load gets a request token; only the latest load applies its results, so a slower earlier load cannot overwrite a newer filter. A failed load shows the `statistics.loadError` notification instead of leaving the page silently empty. Session list uses liveQuery for reactive updates. Large datasets: prefer indexed queries over full scans where possible.
