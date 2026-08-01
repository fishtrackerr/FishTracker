# Weather

## Providers

Open-Meteo API for live forecasts. No API key required. Requests force Celsius / km/h / mm and use `cache: 'no-store'` so browsers do not serve stale HTTP responses as live weather.

## Offline weather

`WeatherService.getCachedSnapshot()` / `getCachedSnapshotFor(lat, lng)` return the last successful fetch from localStorage. Entries are keyed by coordinates (~5 km tolerance). When online, live Open-Meteo data is always preferred; cache is only used if the request fails or the device is offline. Legacy caches without coordinates are not reused for a location-specific lookup.

## Weather snapshots

`WeatherSnapshot` stored on sessions and optionally on catches: temperature, wind, pressure, humidity, sunrise/sunset, optional hourly/daily arrays.

## Session weather history

Each refresh is also stored in the `sessionWeather` IndexedDB table (`SessionWeatherRecord`: id, sessionId, capturedAt, weather). `session.weather` remains the **latest** snapshot for cards and catch defaults. History is seeded from existing `session.weather` on Dexie v5 migration and on import of older backups.

## Session integration

Captured at session start when GPS available. **Refresh weather & GPS** re-queries current position (when `useGpsForWeather` is enabled), fetches weather for those coordinates, and appends a history record. When GPS-for-weather is off, refresh uses the session’s stored coordinates.

## Active session monitoring

`SessionWeatherMonitorService` starts at app init. While a session is `active` and `autoLoadWeather` is on, it refreshes weather every `weatherRefreshMinutes` (minimum 5). Warnings respect `showWeatherWarnings`.

- Sticky alert banner on the active session screen lists current warnings
- Snackbars (`NotificationService.weatherWarning`) fire only when a warning is **new** or **severity escalates** (e.g. wind warning → danger), not on every poll
- New **danger** alerts are also recorded as `sessionEvents` with type `weather` (e.g. “Weather alert: Storm conditions detected”)

## Warning rules

`WeatherService.getWarnings()` evaluates the snapshot for:

| Type | Trigger (summary) | Severity |
|------|-------------------|----------|
| storm / thunder | Current thunder/storm, hourly thunder in next ~3h, or thunder probability > 30% (deduped to one entry) | danger |
| wind | Sustained > 50 or gusts > 70 | warning |
| wind | Sustained > 70 or gusts > 90 | danger |
| rain | Amount > 5 mm or probability ≥ 70% | warning |
| temperature | ≤ −10°C or ≥ 35°C | warning |
| fire | Hot + dry + windy heuristic (e.g. ≥30°C, humidity ≤30%, wind ≥25) | warning / danger |

Fire risk is a **weather-condition heuristic** only — not live wildfire detections.

## Detailed forecast

When `detailedWeatherEnabled` in settings, dashboard and weather card show extended forecast.

## Error and fallback

GPS/weather failures are non-blocking. Session creation succeeds without weather. Nearby cached snapshots are used when live fetch fails or the app is offline.

## Storm information

`stormWarning` and `thunderstormProbability` on snapshot when provided by API parsing.

## Service worker

Open-Meteo responses use the `freshness` (network-first) strategy so online users get current conditions, with a timeout fallback to the SW cache when offline.
