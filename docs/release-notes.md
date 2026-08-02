# Release Notes

## Generation

Script: `scripts/generate-release-notes.mjs` produces `public/assets/release-notes.json`.

It walks **all** `v*` git tags (oldest → newest), collects conventional commits in each tag range, and writes:

- `version` / `date` / `sections` — notes for the **current** `package.json` version only (may be empty)
- `releases` — full history, newest first (versions with no conventional commits are omitted)

Re-running after tagging no longer wipes history or replaces it with a placeholder.

## Conventional commits

Categorize changes:

- feat: new features
- fix: bug fixes
- docs: documentation
- style: UI/theming
- refactor: code structure

Versions without matching commits are skipped in `releases` (deploy-only bumps).

## Versioning

Follow semver in `package.json` for releases. `npm run deploy` creates an annotated `v{version}` tag after generating notes. Push tags with `git push --tags` after committing the release files.

Prefer committing real changes before deploy so each tag range has notes.

## Generated output

JSON consumed by `ReleaseNotesComponent` at `/release-notes`.

Items can include commit metadata:

- `message`: human-readable change text
- `shortHash`: short commit hash shown in UI
- `commitUrl`: external commit link (GitHub) when `remote.origin.url` can be resolved

Legacy string-only items are still supported. Older JSON without `releases` still renders as a single entry.

## UI integration

Release notes are loaded from `/assets/release-notes.json` at runtime and shown as **Changelog** in Settings (all `releases`).

When commit metadata is present, the changelog shows a clickable hash next to each item.

After unlock, `WhatsNewService` compares the notes `version` to `fish-tracker-last-seen-version` in `localStorage`. It only opens when the **current** version has real `sections` content. First visit seeds the key without showing the dialog.

## User-visible changes

Document navigation fixes, session editing, theme improvements, fishing-mode changes, and catch visibility fixes in release notes when shipping.
