# Storage

## IndexedDB (Dexie)

Database name: `FishTrackerDb`. Schema in `src/app/core/db/fish-db.ts`.

### Tables

| Store | Indexes | Content |
|-------|---------|---------|
| sessions | id, fishingMode, [fishingMode+status], lakeId, startDate | FishingSession |
| catches | id, fishingMode, sessionId, rodId, sessionSpotId, species, caughtAt | Catch |
| lakes | id, fishingMode, name, isFavorite | Lake |
| images | id, fishingMode, type, parentId, isFavorite, isHomepageImage | StoredImage blobs |
| profiles | id | UserProfile (shared across modes) |
| profileDocuments | id, type, title | ProfileDocument (shared) |
| biteEvents | id, fishingMode, sessionId, rodId, occurredAt | BiteEvent |
| fishSpottedEvents | id, fishingMode, sessionId, rodId, spottedAt | FishSpottedEvent |
| rodSpotHistory | id, fishingMode, rodId, changedAt | RodSpotHistory |
| sessionEvents | id, fishingMode, sessionId, type, occurredAt | SessionEvent |
| sessionWeather | id, fishingMode, sessionId, capturedAt | SessionWeatherRecord |
| userOptions | id, fishingMode, [fishingMode+category], category, value | UserOption |
| chatThreads | id, fishingMode, updatedAt | ChatThread |
| chatMessages | id, threadId, createdAt | ChatMessage |

### Schema versions

- **v1**: Core tables
- **v2**: Image metadata (fileName, favorites, homepage flag)
- **v3**: Profile and profile documents
- **v4**: Rods/spots on sessions, bite/fish-spotted/session events, user options; legacy catch spot migration
- **v5**: Session weather history table; seeds from existing `session.weather`
- **v6**: Chat threads and messages for Ask-your-data assistant
- **v7**: `fishingMode` on fishing data tables; existing rows stamped `carper`

Migrations run in `.upgrade()` handlers; always add migrations for schema changes. Upgrades preserve existing data.

### Fishing modes

App run selects one mode (`carper` | `catfish` | `pike` | `bass` | `feeder` | `general`). Repositories filter list/read by active mode and stamp it on write. PIN, theme, units, and AI key stay shared in settings.

### Open failure recovery

`AppStartupService` opens IndexedDB on startup. If `db.open()` fails:

| Case | Recovery UI | Data |
|------|-------------|------|
| Older DB + newer app | Silent Dexie upgrade on open | Kept |
| Newer DB + older app (`VersionError`) | Splash: check for updates / reload | Kept in browser |
| Upgrade / other open error | Splash: retry / reload | Not wiped |

Do not clear site data or use Settings full reset unless you have a backup — wipe is a last resort only.

## localStorage / sessionStorage keys

| Key | Purpose |
|-----|---------|
| `fish-tracker-settings` | AppSettings JSON (includes `modePreferences`) |
| `fish-tracker-lock-state` | AppLockState |
| `fish-tracker-return-url` | sessionStorage — post-unlock / post-mode-select navigation |
| `fish-tracker-unlock-session` | sessionStorage — proves PIN unlock in this tab |
| `fish-tracker-fishing-mode` | sessionStorage — active fishing mode for this process |
| `fish-tracker-filter-presets:<mode>` | Saved filter presets per fishing mode |
| `fish-tracker-weather-cache` | Multi-slot Open-Meteo weather snapshots (up to 8 locations) |
| `fish-tracker-geocode-cache` | Nominatim forward/reverse lookup cache (up to 50 entries) |
| `fish-tracker-last-seen-version` | What’s New dialog version seed |
| `fish-tracker-feedback-prompt-date` | Last local date the feedback prompt was shown |

## Transactions

Repositories use Dexie `put`, `delete`, `bulkPut`. Catch creation updates session stats in a separate write after catch insert.

## Image storage

Binary blobs in `images` store with thumbnails. See [images.md](./images.md).

## Cache strategy

Weather snapshots cached by coordinates in `WeatherService` (multi-slot). Geocode results cached in `LakeGeocodingService`. Homepage image flag on `StoredImage`.

## Error handling

Repository failures propagate to services; UI shows notifications via `NotificationService`. IndexedDB open failures are handled separately at startup (see recovery section above).
