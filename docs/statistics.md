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
- Presets saved to localStorage under `fish-tracker-filter-presets:<fishingMode>`

## Saved filter presets

Named presets via save/delete with confirmation on delete. Presets are **per fishing mode** so lake/species values from one mode do not appear in another.

Option rename rewrites matching values only in the active mode’s presets and `modePreferences`.

## Performance

Statistics page loads catches once per filter change. Session list uses liveQuery for reactive updates. Large datasets: prefer indexed queries over full scans where possible.
