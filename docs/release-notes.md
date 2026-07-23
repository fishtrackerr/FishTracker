# Release Notes

## Generation

Script: `scripts/generate-release-notes.mjs` produces `public/assets/release-notes.json`.

The script reads commit subjects from git log and groups conventional commit types into sections.

## Conventional commits

Categorize changes:

- feat: new features
- fix: bug fixes
- docs: documentation
- style: UI/theming
- refactor: code structure

## Versioning

Follow semver in `package.json` for releases.

## Generated output

JSON consumed by `ReleaseNotesComponent` at `/release-notes`.

Items can include commit metadata:

- `message`: human-readable change text
- `shortHash`: short commit hash shown in UI
- `commitUrl`: external commit link (GitHub) when `remote.origin.url` can be resolved

Legacy string-only items are still supported.

## UI integration

Release notes are loaded from `/assets/release-notes.json` at runtime and shown as **Changelog** in Settings.

When commit metadata is present, the changelog shows a clickable hash next to each item.

## User-visible changes

Document navigation fixes, session editing, theme improvements, and catch visibility fixes in release notes when shipping.
