# FishTracker

Offline-first Angular 21 PWA for logging fishing sessions, catches, lakes, gallery photos, and statistics. Data is stored on the device (Dexie/IndexedDB) and partitioned by **fishing mode** (carper, catfish, pike, bass, feeder, general). Deployed as a static site to GitHub Pages, and packaged for Google Play via Capacitor (Android).

## Documentation

- Full docs index: [docs/README.md](./docs/README.md)
- Google Play / Android: [docs/google-play.md](./docs/google-play.md)
- Play remaining TODO: [docs/google-play-remaining.md](./docs/google-play-remaining.md)
- Store listing assets: [store/README.md](./store/README.md)
- AI/repo rules: [AGENTS.md](./AGENTS.md)

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server |
| `npm test` | Unit tests (Vitest via `ng test`) |
| `npm run build` / `build-prod` | Static production build for GitHub Pages (`baseHref` `/FishTracker/`; does **not** bump version) |
| `npm run build-android` | Android Capacitor build (`baseHref` `/`) + `cap sync` |
| `npm run cap:open` | Open the Android project in Android Studio |
| `npm run lint` | ESLint (TypeScript) |
| `npm run icons` | Generate PWA PNG icons + favicon from the SVG logo |
| `npm run store-assets` | Generate Play feature graphic + copy phone screenshots into `store/` |
| `npm run deploy` | Bump version, icons, release notes, tag, `ng deploy` → gh-pages |
| `npm run tag-version` | Create annotated `v{version}` tag for current `package.json` version |

## Architecture (short)

- Standalone Angular components, zoneless change detection, Material UI
- Repositories + services over Dexie; fishing data scoped by fishing mode; no backend
- Optional online AI chat (allowlisted providers) and Open-Meteo weather
- Client PIN lock (shoulder-surfing protection; data is not encrypted at rest)
- Capacitor Android shell for Play Store (`android/`, app id `com.fishtrackerr.fishtracker`)

## Testing

See [docs/testing.md](./docs/testing.md). CI runs install → lint → test → build on pull requests (`.github/workflows/ci.yml`), plus an Android web-sync job.

## Android / Google Play

See [docs/google-play.md](./docs/google-play.md) for signing, permissions, Data safety answers, and Play Console steps.

```bash
npm run build-android
npm run cap:open
```

Release AAB (after creating `android/keystore.properties` from the example):

```bash
cd android
.\gradlew.bat bundleRelease
```

## Deploy (GitHub Pages)

Static client build (`outputMode: static`) published to **GitHub Pages** via `angular-cli-ghpages` (`ng deploy`). Production `baseHref` is `/FishTracker/` (project site URL: `https://<user>.github.io/FishTracker/`).

### Prerequisites

- Repo **Settings → Pages** source set to the `gh-pages` branch (root)
- Local git credentials with push access to the remote (SSH or HTTPS token)
- `angular-cli-ghpages` creates `.nojekyll` and copies `index.html` → `404.html` for SPA deep links

### `npm run deploy` steps

1. Patch-bump `package.json` and write `public/assets/version.json`
2. Regenerate PWA icons
3. Generate `public/assets/release-notes.json` from commits since the latest git tag
4. Create annotated tag `v{version}` (so the next release’s commit range is correct)
5. `ng deploy` — production build + push to `gh-pages`

### After deploy

Commit the mutated files on your working branch (`package.json`, `package-lock.json` if touched, `public/assets/version.json`, `public/assets/release-notes.json`) and push tags:

```bash
git add package.json public/assets/version.json public/assets/release-notes.json
git commit -m "chore: release vX.Y.Z"
git push
git push --tags
```
