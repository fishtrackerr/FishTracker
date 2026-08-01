# Backup and Restore

## Export format

JSON file via `BackupService.export()`:

```typescript
interface BackupData {
  version: number; // current export version: 6
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
  profiles?: UserProfile[];
  profileDocuments?: ProfileDocument[];
}
```

## Import validation

`BackupService.validate()` runs before any write:

- `version` must be in `SUPPORTED_BACKUP_VERSIONS` (4, 5, 6)
- `sessions`, `catches`, `lakes` must be arrays; optional collections must be arrays when present
- Session entries must include an `id`
- Returns a `BackupPreview` (counts) for the Settings confirm dialog

`BackupService.import()` calls `validate()` then fully replaces IndexedDB data (including profiles/documents).

## Image backup

Images exported as base64; restored to IndexedDB blobs on import. Entries without `data`/`thumbnail` strings are rejected.

## Schema compatibility

Backup `version` must match supported versions. Schema migrations apply on next app load after import.

## Restore errors

Invalid files throw; UI surfaces error via notification. Partial imports are not supported — full replace strategy.

## Privacy note

Backup JSON contains GPS coordinates and catch history in cleartext. Store files securely outside the app.

## Recommendations

- Export before major updates or device changes
- Store backup files outside the app
- Test restore on a non-production device periodically
