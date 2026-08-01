# FishTracker

Offline-first Angular 21 PWA for logging fishing sessions, catches, lakes, gallery photos, and statistics. All data stays on the device (Dexie/IndexedDB). Deployed as a static site to GitHub Pages.

## Documentation

- Full docs index: [docs/README.md](./docs/README.md)
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
| `npm run build` / `build-prod` | Static production build (does **not** bump version) |
| `npm run lint` | ESLint (TypeScript) |
| `npm run icons` | Generate PWA PNG icons + favicon from the SVG logo |
| `npm run deploy` | Bump version, icons, release notes, prod build, gh-pages |

## Architecture (short)

- Standalone Angular components, zoneless change detection, Material UI
- Repositories + services over Dexie; no backend
- Optional online AI chat (allowlisted providers) and Open-Meteo weather
- Client PIN lock (shoulder-surfing protection; data is not encrypted at rest)

## Testing

See [docs/testing.md](./docs/testing.md). CI runs install → lint → test → build on pull requests (`.github/workflows/ci.yml`).

## Deploy

Static build (`outputMode: static`) with `--base-href=/FishTracker/`. SSR/Express scaffolding was removed; the app is client-only.
