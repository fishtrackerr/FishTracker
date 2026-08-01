# Data Model

Interfaces live in `src/app/core/models/`.

## FishingMode

```typescript
type FishingMode = 'carper' | 'catfish' | 'pike' | 'bass' | 'feeder' | 'general';
```

Defaults for species/bait/rig per mode: `MODE_DEFAULT_PREFERENCES` in `fishing-mode.model.ts`.

## FishingSession

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | UUID |
| fishingMode | FishingMode | yes* | Mode partition; stamped on write / migrated |
| name | string | yes | Display name |
| lakeId | string | no | Reference to Lake |
| status | `planned` \| `active` \| `completed` | yes | Session state |
| startDate | string (ISO) | yes | Session start |
| endDate | string (ISO) | no | Session end |
| latitude, longitude | number | no | GPS |
| weather | WeatherSnapshot | no | Latest snapshot (history in sessionWeather table) |
| waterTemperatureC | number | no | Water temp |
| prebait, notes | string | no | Text fields |
| tags | string[] | no | Session tags |
| sessionSpots | SessionSpot[] | no | Spot snapshots for this session |
| rods | SessionRod[] | no | Rods used in session |
| coverImageId | string | no | Cover image reference |
| photoIds | string[] | yes | Session photos |
| catchCount | number | yes | Denormalized count |
| biggestFishKg | number | no | Denormalized |
| totalCatchWeightKg | number | yes | Denormalized |
| createdAt, updatedAt | string (ISO) | yes | Timestamps |

\*Required after Dexie v7 / on write; optional on the TypeScript interface for legacy create payloads.

## Catch

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | UUID |
| fishingMode | FishingMode | yes* | Mode partition |
| sessionId | string | yes | Parent session |
| rodId | string | no | Rod that caught the fish |
| sessionSpotId | string | no | Session spot snapshot |
| species | string | yes | Fish species |
| caughtAt | string (ISO) | yes | Catch time |
| weightKg, lengthCm | number | no | Measurements |
| bait, baitFlavor, rig, hookSize, line, method | string | no | Tackle |
| weatherType, tags | string / string[] | no | Optional metadata |
| spotId | string | no | Legacy lake spot reference |
| photoId | string | no | Catch photo |
| released | boolean | no | Catch and release |
| weather | WeatherSnapshot | no | Optional snapshot |
| detailsPending | boolean | no | Instant catch awaiting details |

## Lake

Includes `fishingMode`, `spots: FishingSpot[]` embedded array, cover image, favorites flag.

## SessionWeatherRecord

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | UUID |
| fishingMode | FishingMode | yes* | Mode partition |
| sessionId | string | yes | Parent session |
| capturedAt | string (ISO) | yes | When snapshot was taken |
| weather | WeatherSnapshot | yes | Full conditions at capture |

## StoredImage / UserOption / ChatThread / BiteEvent / …

Mode-scoped fishing entities include optional `fishingMode` on the interface; repositories stamp the active mode on write. See model files under `src/app/core/models/`.

## SessionSpot, SessionRod, FishSpottedEvent, SessionEvent

See [rods-and-spots.md](./rods-and-spots.md) and model files in `src/app/core/models/`.

## AppSettings

Stored in localStorage:

- Shared: theme, units, language, PIN hash/salt, lock timeout, weather preferences, AI chat (`aiChatEnabled`, `aiApiKeyEncrypted` / `aiApiKeyIv` / `aiKeySalt`, `aiBaseUrl`, `aiModel`)
- Per mode: `modePreferences[FishingMode]` with `lastLakeId`, `defaultLakeId`, `homepageImageId`, `favoriteSpecies`, `favoriteBaits`, `favoriteRigs`
- Deprecated top-level `lastLakeId` / `favoriteSpecies` / etc. remain mirrored for the **active** mode via `FishingModeService.syncLegacyFavorites` (on mode restore, `setMode`, and preference updates). Settings load seeds carper into top-level fields until a mode is active.

Plaintext `aiApiKey` is legacy-only and stripped once ciphertext exists.

## ChatThread / ChatMessage

Ask-your-data assistant history in IndexedDB. Threads carry `fishingMode`. See [assistant.md](./assistant.md).

## AppLockState

Stored in localStorage (`fish-tracker-lock-state`):

```typescript
interface AppLockState {
  isLocked: boolean;
  unlockedAt?: string;
  lockExpiresAt?: string;
  lastActivityAt?: string;
}
```

## Relationships

- Fishing data is partitioned by `fishingMode` (carper, catfish, pike, bass, feeder, general).
- At most one `active` session per fishing mode.
- One session has many catches (`catch.sessionId`).
- One lake may be referenced by many sessions (`session.lakeId`).
- Images reference parent via `type` and `parentId`.
- Profile / profile documents are shared across modes.

## Rename / related-data sync

`RelatedDataSyncService` keeps denormalized copies in sync (within the current mode’s lists):

| Change | Cascades to |
|--------|-------------|
| Lake name | Matching default session titles for that `lakeId` |
| Lake spot fields | `SessionSpot` rows with matching `lakeSpotId` |
| `UserOption` rename | Catch / rod / lake-spot bait / **active mode** favorites / **active mode** filter presets (exact string match) |

Timeline `SessionEvent.description` strings are not rewritten (audit trail).
