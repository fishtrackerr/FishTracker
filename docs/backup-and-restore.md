# Backup and Restore

## Export format

JSON file via `BackupService.export()`:

```typescript
interface BackupData {
  version: number; // current export version: 5
  exportedAt: string;
  sessions: FishingSession[];
  catches: Catch[];
  lakes: Lake[];
  images: BackupImage[]; // base64 encoded blobs
  biteEvents?: BiteEvent[];
  fishSpottedEvents?: FishSpottedEvent[];
  rodSpotHistory?: RodSpotHistory[];
  sessionEvents?: SessionEvent[];
  sessionWeather?: SessionWeatherRecord[];
  userOptions?: UserOption[];
  chatThreads?: ChatThread[];
  chatMessages?: ChatMessage[];
}
```

## Import validation

`BackupService.import()` checks version compatibility and required arrays before writing.

## Image backup

Images exported as base64; restored to IndexedDB blobs on import.

## Schema compatibility

Backup `version` must match supported versions. Schema migrations apply on next app load after import.

## Restore errors

Invalid files throw; UI should surface error via notification. Partial imports are not supported — full replace strategy.

## Recommendations

- Export before major updates or device changes
- Store backup files outside the app
- Test restore on a non-production device periodically
