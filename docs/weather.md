# Weather

## Providers

Open-Meteo API for live forecasts. No API key required.

## Offline weather

`WeatherService.getCachedSnapshot()` returns last successful fetch from localStorage cache.

## Weather snapshots

`WeatherSnapshot` stored on sessions and optionally on catches: temperature, wind, pressure, humidity, sunrise/sunset, optional hourly/daily arrays.

## Session integration

Captured at session start when GPS available. **Refresh weather** on active session re-fetches for current/stored coordinates.

## Detailed forecast

When `detailedWeatherEnabled` in settings, dashboard and weather card show extended forecast.

## Error and fallback

GPS/weather failures are non-blocking. Session creation succeeds without weather. Cached or manual snapshots used when live fetch fails.

## Storm information

`stormWarning` and `thunderstormProbability` on snapshot when provided by API parsing.
