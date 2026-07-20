# Statistics

## Available statistics

Dashboard (`StatisticsService.getDashboardStats()`):

- Total sessions, catches
- Biggest fish
- Favorite lake (most sessions)

Statistics page: filtered catch/session aggregates with charts and tables.

## Calculation rules

- Weights summed from catch records
- Biggest fish: max `weightKg` across catches
- Session filters applied before aggregation

## Filters

`FilterService` / `FilterPanelComponent`:

- Date range, species, session status
- Presets saved to localStorage

## Saved filter presets

Named presets via save/delete with confirmation on delete.

## Performance

Statistics page loads catches once per filter change. Session list uses liveQuery for reactive updates. Large datasets: prefer indexed queries over full scans where possible.
