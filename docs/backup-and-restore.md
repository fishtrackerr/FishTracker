# Backup and Restore

## When backups are created

- **Settings → Export JSON Backup** — manual export (`fish-tracker-backup-YYYY-MM-DD.json`).
- **Start Session** — before creating a new fishing session (when none is active **in the current mode**), the app saves a full backup as `fish-tracker-pre-session-YYYY-MM-DD.json`. If export fails or the share sheet is dismissed, the user can skip and start anyway, or cancel. Restore remains **Settings → Import JSON Backup**.
- **Full application reset** — optionally exports first. If that export fails or is cancelled, the reset stops.

## Saving the file

`BackupService.saveToFile(data, filename?)`:

- **Web / PWA:** browser download of a `Blob`.
- **Android app (Capacitor):** writes the file to the app cache (`backups/`) with `@capacitor/filesystem`, then opens the Android share sheet (`@capacitor/share`) so the user can save it to Files, Drive, mail, etc. Dismissing the sheet throws `BackupSaveCancelledError`.

The JSON is built in fragments (`serializeBackup`, one per record, no indentation) so large galleries never have to fit in one string.

## Export format

JSON file via `BackupService.export()` — exports **all fishing modes** in one file. Fishing entities include `fishingMode`; images may include `fishingMode` as well.

```typescript
interface BackupData {
  version: number; // current export version: 8
  exportedAt: string;
  sessions: FishingSession[];
  catches: Catch[];
  lakes: Lake[];
  images: BackupImage[]; // base64 encoded blobs; optional fishingMode and visible
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

- `version` must be in `SUPPORTED_BACKUP_VERSIONS` (4, 5, 6, 7, 8)
- `sessions`, `catches`, `lakes` must be arrays; optional collections must be arrays when present
- Session, catch, lake, and image entries must include a string `id`
- Image count capped at 5000; mime types limited to `image/jpeg`, `image/png`, `image/webp`
- Settings import rejects files larger than ~50 MB before parsing
- Returns a `BackupPreview` (counts) for the Settings confirm dialog

`BackupService.import()` calls `validate()` then fully replaces IndexedDB data (including profiles/documents).

On import:

- Backups **before version 8**: `carper` and missing `fishingMode` restore into **`catfish`** (same as the Dexie v8 migration)
- Version 8+: missing `fishingMode` defaults to **`carper`**
- At most **one active session per fishing mode** (extras completed); soft-deleted sessions don't count
- Soft-deleted images (`visible: false`) stay hidden; older backups without the flag restore as visible
- Legacy backups without weather history still seed from embedded `session.weather`

## Image backup

Images exported as base64; restored to IndexedDB blobs on import. Entries without `data`/`thumbnail` strings are rejected.

## Schema compatibility

Backup `version` must match supported versions. Schema migrations apply on next app load after import when needed.

## Restore errors

Invalid files throw; UI surfaces error via notification. Partial imports are not supported — full replace strategy.

## Privacy note

Backup JSON contains GPS coordinates and catch history in cleartext. Store files securely outside the app.

## Recommendations

- Export before major updates or device changes
- Store backup files outside the app
- Test restore on a non-production device periodically
