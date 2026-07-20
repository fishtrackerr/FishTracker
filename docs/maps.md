# Google Maps integration

FishTracker opens locations in Google Maps via external URLs. There is no embedded map UI.

## Service

`MapsService` (`src/app/core/services/maps.service.ts`):

- `isValidCoordinate(lat, lng)` — finite values within geographic bounds
- `buildLocationUrl` / `openLocation` — search URL for a coordinate pair
- `buildDirectionsUrl` / `openDirections` — directions between origin and destination
- `openCurrentLocation()` — uses `GeolocationService`; shows readable error on denial or failure
- `openDirectionsFromCurrent(destination)` — directions from current position; falls back to destination-only if GPS unavailable

URLs open with `window.open(url, '_blank', 'noopener,noreferrer')`.

## UI

`app-maps-link-button` is shown when coordinates are valid. Used on:

- Active session GPS
- Session detail GPS and catch locations
- Lake detail (lake + spots with coordinates)

Tooltips and `aria-label` describe the action. Directions mode requests current location permission.

## Geolocation errors

`GeolocationService.getCurrentPositionDetailed()` returns:

- `denied` — permission blocked
- `timeout` — request timed out
- `unavailable` — API missing or position unknown

`MapsService` maps these to user-facing snackbar messages via `NotificationService.error()`.

## Missing coordinates

When latitude/longitude are missing or invalid, the maps button is hidden.
