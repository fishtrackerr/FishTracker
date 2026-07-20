# Release Notes

## Generation

Script: `scripts/generate-release-notes.mjs` produces `public/assets/release-notes.json`.

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

## UI integration

Release notes loaded from `/assets/release-notes.json` at runtime.

## User-visible changes

Document navigation fixes, session editing, theme improvements, and catch visibility fixes in release notes when shipping.
