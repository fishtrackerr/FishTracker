# Storage

## IndexedDB (Dexie)

Database name: `FishTrackerDb`. Schema in `src/app/core/db/fish-db.ts`.

### Tables

| Store | Indexes | Content |
|-------|---------|---------|
| sessions | id, status, lakeId, startDate | FishingSession |
| catches | id, sessionId, rodId, sessionSpotId, species, caughtAt | Catch |
| lakes | id, name, isFavorite | Lake |
| images | id, type, parentId, isFavorite, isHomepageImage | StoredImage blobs |
| profiles | id | UserProfile |
| profileDocuments | id, type, title | ProfileDocument |
| biteEvents | id, sessionId, rodId, occurredAt | BiteEvent |
| fishSpottedEvents | id, sessionId, rodId, spottedAt | FishSpottedEvent |
| rodSpotHistory | id, rodId, changedAt | RodSpotHistory |
| sessionEvents | id, sessionId, type, occurredAt | SessionEvent |
| userOptions | id, category, value | UserOption |

### Schema versions

- **v1**: Core tables
- **v2**: Image metadata (fileName, favorites, homepage flag)
- **v3**: Profile and profile documents
- **v4**: Rods/spots on sessions, bite/fish-spotted/session events, user options; legacy catch spot migration

Migrations run in `.upgrade()` handlers; always add migrations for schema changes.

## localStorage keys

| Key | Purpose |
|-----|---------|
| `fish-tracker-settings` | AppSettings JSON |
| `fish-tracker-lock-state` | AppLockState |
| `fish-tracker-return-url` | sessionStorage — post-unlock navigation |
| `fish-tracker-filter-presets` | Saved filter presets |

## Transactions

Repositories use Dexie `put`, `delete`, `bulkPut`. Catch creation updates session stats in a separate write after catch insert.

## Image storage

Binary blobs in `images` store with thumbnails. See [images.md](./images.md).

## Cache strategy

Weather snapshots cached by coordinates in `WeatherService`. Homepage image flag on `StoredImage`.

## Error handling

Repository failures propagate to services; UI shows notifications via `NotificationService`.
