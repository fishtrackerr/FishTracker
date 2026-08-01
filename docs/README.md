# Fishing Register Documentation

Offline-first Angular PWA for logging fishing sessions, catches, lakes, and statistics. All data is stored locally in IndexedDB, partitioned by **fishing mode** (carper, catfish, pike, bass, feeder, general).

## Documentation index

| Document | Description |
|----------|-------------|
| [architecture.md](./architecture.md) | System architecture and layers |
| [application-flow.md](./application-flow.md) | User flows, startup, fishing mode |
| [routing.md](./routing.md) | Routes and guards |
| [data-model.md](./data-model.md) | TypeScript interfaces |
| [storage.md](./storage.md) | IndexedDB schema and migrations |
| [sessions.md](./sessions.md) | Session lifecycle |
| [catches.md](./catches.md) | Catch creation and visibility |
| [lakes.md](./lakes.md) | Lake and spot management |
| [images.md](./images.md) | Image storage and compression |
| [weather.md](./weather.md) | Weather integration |
| [authentication-and-pin.md](./authentication-and-pin.md) | PIN security model |
| [theming-and-ui.md](./theming-and-ui.md) | Design system and Material theming |
| [statistics.md](./statistics.md) | Stats and filters |
| [backup-and-restore.md](./backup-and-restore.md) | Export/import |
| [error-handling.md](./error-handling.md) | Errors and logging |
| [testing.md](./testing.md) | Test strategy |
| [release-notes.md](./release-notes.md) | Release notes process |
| [development-guidelines.md](./development-guidelines.md) | Repository rules |
| [maps.md](./maps.md) | Google Maps URLs and geolocation |
| [rods-and-spots.md](./rods-and-spots.md) | Rods, session spots, bites, timeline |
| [assistant.md](./assistant.md) | Ask-your-data chat (local insights + optional AI) |
| [google-play.md](./google-play.md) | Capacitor Android + Google Play prep (signing, Data safety, listing) |
| [google-play-remaining.md](./google-play-remaining.md) | Checklist of Play steps still left (Pages deploy still works) |

## Main architecture decisions

- **Offline-first**: Dexie/IndexedDB for all app data; localStorage/sessionStorage for settings, lock state, fishing mode, and filter presets.
- **Fishing modes**: One mode selected per app run after PIN unlock; lakes, sessions, catches, options, images, and AI chats are isolated per mode. PIN, theme, units, and AI key stay shared.
- **Standalone Angular components**: No NgModules; feature folders under `src/app/features/`.
- **Reactive data**: Dexie `liveQuery` exposed via RxJS observables and `toSignal`.
- **Central startup**: `AppStartupService` resolves initial route (PIN → mode select → active session or home).
- **Zoneless change detection**: Angular 21 zoneless mode.

## Keeping documentation updated

When changing logic, update the relevant doc in this folder. Keep `data-model.md` synchronized with interfaces in `src/app/core/models/`. Update `release-notes.md` and `public/assets/release-notes.json` for user-visible changes.

See also [AGENTS.md](../AGENTS.md) for AI-assisted development rules.
