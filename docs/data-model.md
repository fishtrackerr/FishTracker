# Data Model

Interfaces live in `src/app/core/models/`.

## FishingSession

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | UUID |
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

## Catch

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | UUID |
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

## Lake

Includes `spots: FishingSpot[]` embedded array, cover image, favorites flag.

## SessionWeatherRecord

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | UUID |
| sessionId | string | yes | Parent session |
| capturedAt | string (ISO) | yes | When snapshot was taken |
| weather | WeatherSnapshot | yes | Full conditions at capture |

## SessionSpot, SessionRod, BiteEvent, FishSpottedEvent, SessionEvent, UserOption

See [rods-and-spots.md](./rods-and-spots.md) and model files in `src/app/core/models/`.

## AppSettings

Stored in localStorage: theme, units, favorite species, PIN hash/salt, lock timeout, weather preferences, optional AI chat (`aiChatEnabled`, `aiApiKey`, `aiBaseUrl`, `aiModel`).

## ChatThread / ChatMessage

Ask-your-data assistant history in IndexedDB. See [assistant.md](./assistant.md).

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

- One session has many catches (`catch.sessionId`).
- One lake may be referenced by many sessions (`session.lakeId`).
- Images reference parent via `type` and `parentId`.
