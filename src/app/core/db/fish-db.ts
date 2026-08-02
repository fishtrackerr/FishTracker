import Dexie, { Table } from 'dexie';
import {
  BiteEvent,
  Catch,
  ChatMessage,
  ChatThread,
  FishSpottedEvent,
  FishingSession,
  Lake,
  ProfileDocument,
  RodSpotHistory,
  SessionEvent,
  SessionWeatherRecord,
  StoredImage,
  UserOption,
  UserProfile,
} from '../models';
import { DEFAULT_SETTINGS } from '../models/app-settings.model';
import { DEFAULT_FISHING_MODE } from '../models/fishing-mode.model';
import { generateId, nowIso } from '../utils';
import { migrateCarperToCatfish } from './migrate-carper-to-catfish';

const SETTINGS_KEY = 'fish-tracker-settings';

export class FishDb extends Dexie {
  sessions!: Table<FishingSession, string>;
  catches!: Table<Catch, string>;
  lakes!: Table<Lake, string>;
  images!: Table<StoredImage, string>;
  profiles!: Table<UserProfile, string>;
  profileDocuments!: Table<ProfileDocument, string>;
  biteEvents!: Table<BiteEvent, string>;
  fishSpottedEvents!: Table<FishSpottedEvent, string>;
  rodSpotHistory!: Table<RodSpotHistory, string>;
  sessionEvents!: Table<SessionEvent, string>;
  sessionWeather!: Table<SessionWeatherRecord, string>;
  userOptions!: Table<UserOption, string>;
  chatThreads!: Table<ChatThread, string>;
  chatMessages!: Table<ChatMessage, string>;

  constructor() {
    super('FishTrackerDb');
    this.version(1).stores({
      sessions: 'id, status, lakeId, startDate',
      catches: 'id, sessionId, species, caughtAt',
      lakes: 'id, name, isFavorite',
      images: 'id, type, parentId',
    });

    this.version(2)
      .stores({
        sessions: 'id, status, lakeId, startDate',
        catches: 'id, sessionId, species, caughtAt',
        lakes: 'id, name, isFavorite',
        images: 'id, type, parentId, isFavorite, isHomepageImage',
      })
      .upgrade(async (tx) => {
        const images = await tx.table('images').toArray();
        for (const img of images) {
          await tx.table('images').update(img.id, {
            fileName: img.fileName ?? `${img.id}.jpg`,
            isFavorite: img.isFavorite ?? false,
            isHomepageImage: img.isHomepageImage ?? false,
          });
        }
      });

    this.version(3).stores({
      sessions: 'id, status, lakeId, startDate',
      catches: 'id, sessionId, species, caughtAt',
      lakes: 'id, name, isFavorite',
      images: 'id, type, parentId, isFavorite, isHomepageImage',
      profiles: 'id',
      profileDocuments: 'id, type, title',
    });

    this.version(4)
      .stores({
        sessions: 'id, status, lakeId, startDate',
        catches: 'id, sessionId, rodId, sessionSpotId, species, caughtAt',
        lakes: 'id, name, isFavorite',
        images: 'id, type, parentId, isFavorite, isHomepageImage',
        profiles: 'id',
        profileDocuments: 'id, type, title',
        biteEvents: 'id, sessionId, rodId, occurredAt',
        fishSpottedEvents: 'id, sessionId, rodId, spottedAt',
        rodSpotHistory: 'id, rodId, changedAt',
        sessionEvents: 'id, sessionId, type, occurredAt',
        userOptions: 'id, category, value',
      })
      .upgrade(async (tx) => {
        const sessions = await tx.table('sessions').toArray();
        for (const session of sessions) {
          const updates: Partial<FishingSession> = {
            sessionSpots: session.sessionSpots ?? [],
            rods: session.rods ?? [],
          };

          if (
            session.legacySpotName &&
            (!updates.sessionSpots || updates.sessionSpots.length === 0)
          ) {
            updates.sessionSpots = [
              {
                id: generateId(),
                name: session.legacySpotName,
                latitude: session.legacySpotLatitude,
                longitude: session.legacySpotLongitude,
              },
            ];
          }

          await tx.table('sessions').update(session.id, updates);
        }

        const lakes = await tx.table('lakes').toArray();
        const lakeSpotMap = new Map<string, { lakeId: string; spot: Lake['spots'][0] }>();
        for (const lake of lakes) {
          for (const spot of lake.spots ?? []) {
            lakeSpotMap.set(spot.id, { lakeId: lake.id, spot });
          }
        }

        const catches = await tx.table('catches').toArray();
        for (const catchRecord of catches) {
          if (catchRecord.spotId && !catchRecord.sessionSpotId) {
            const mapped = lakeSpotMap.get(catchRecord.spotId);
            if (mapped) {
              const session = sessions.find((s) => s.id === catchRecord.sessionId);
              if (session) {
                let sessionSpot = (session.sessionSpots ?? []).find(
                  (sp: { lakeSpotId?: string }) => sp.lakeSpotId === catchRecord.spotId,
                );
                if (!sessionSpot) {
                  sessionSpot = {
                    id: generateId(),
                    lakeSpotId: mapped.spot.id,
                    name: mapped.spot.name,
                    latitude: mapped.spot.latitude,
                    longitude: mapped.spot.longitude,
                    depth: mapped.spot.waterDepthM,
                    bottomType: mapped.spot.bottomType,
                    notes: mapped.spot.notes,
                  };
                  const existingSpots = session.sessionSpots ?? [];
                  await tx.table('sessions').update(session.id, {
                    sessionSpots: [...existingSpots, sessionSpot],
                  });
                  session.sessionSpots = [...existingSpots, sessionSpot];
                }
                await tx.table('catches').update(catchRecord.id, {
                  sessionSpotId: sessionSpot.id,
                });
              }
            }
          }
        }

        const existingOptions = await tx.table('userOptions').count();
        if (existingOptions === 0) {
          const settings = loadSettingsFromStorage();
          const now = nowIso();
          const seeds: Array<{ category: UserOption['category']; values: string[] }> = [
            { category: 'species', values: settings.favoriteSpecies },
            { category: 'bait', values: settings.favoriteBaits },
            { category: 'rig', values: settings.favoriteRigs },
          ];
          for (const seed of seeds) {
            for (const value of seed.values) {
              await tx.table('userOptions').add({
                id: generateId(),
                category: seed.category,
                value,
                isFavorite: false,
                isDefault: true,
                createdAt: now,
                updatedAt: now,
              });
            }
          }
        }
      });

    this.version(5)
      .stores({
        sessions: 'id, status, lakeId, startDate',
        catches: 'id, sessionId, rodId, sessionSpotId, species, caughtAt',
        lakes: 'id, name, isFavorite',
        images: 'id, type, parentId, isFavorite, isHomepageImage',
        profiles: 'id',
        profileDocuments: 'id, type, title',
        biteEvents: 'id, sessionId, rodId, occurredAt',
        fishSpottedEvents: 'id, sessionId, rodId, spottedAt',
        rodSpotHistory: 'id, rodId, changedAt',
        sessionEvents: 'id, sessionId, type, occurredAt',
        sessionWeather: 'id, sessionId, capturedAt',
        userOptions: 'id, category, value',
      })
      .upgrade(async (tx) => {
        const sessions = await tx.table('sessions').toArray();
        for (const session of sessions) {
          if (!session.weather) {
            continue;
          }
          const weather = session.weather;
          await tx.table('sessionWeather').add({
            id: generateId(),
            sessionId: session.id,
            capturedAt: weather.capturedAt ?? session.updatedAt ?? session.createdAt,
            weather,
          });
        }
      });

    this.version(6).stores({
      sessions: 'id, status, lakeId, startDate',
      catches: 'id, sessionId, rodId, sessionSpotId, species, caughtAt',
      lakes: 'id, name, isFavorite',
      images: 'id, type, parentId, isFavorite, isHomepageImage',
      profiles: 'id',
      profileDocuments: 'id, type, title',
      biteEvents: 'id, sessionId, rodId, occurredAt',
      fishSpottedEvents: 'id, sessionId, rodId, spottedAt',
      rodSpotHistory: 'id, rodId, changedAt',
      sessionEvents: 'id, sessionId, type, occurredAt',
      sessionWeather: 'id, sessionId, capturedAt',
      userOptions: 'id, category, value',
      chatThreads: 'id, updatedAt',
      chatMessages: 'id, threadId, createdAt',
    });

    this.version(7)
      .stores({
        sessions: 'id, fishingMode, [fishingMode+status], lakeId, startDate',
        catches: 'id, fishingMode, sessionId, rodId, sessionSpotId, species, caughtAt',
        lakes: 'id, fishingMode, name, isFavorite',
        images: 'id, fishingMode, type, parentId, isFavorite, isHomepageImage',
        profiles: 'id',
        profileDocuments: 'id, type, title',
        biteEvents: 'id, fishingMode, sessionId, rodId, occurredAt',
        fishSpottedEvents: 'id, fishingMode, sessionId, rodId, spottedAt',
        rodSpotHistory: 'id, fishingMode, rodId, changedAt',
        sessionEvents: 'id, fishingMode, sessionId, type, occurredAt',
        sessionWeather: 'id, fishingMode, sessionId, capturedAt',
        userOptions: 'id, fishingMode, [fishingMode+category], category, value',
        chatThreads: 'id, fishingMode, updatedAt',
        chatMessages: 'id, threadId, createdAt',
      })
      .upgrade(async (tx) => {
        const mode = DEFAULT_FISHING_MODE;
        const tables = [
          'sessions',
          'catches',
          'lakes',
          'images',
          'biteEvents',
          'fishSpottedEvents',
          'rodSpotHistory',
          'sessionEvents',
          'sessionWeather',
          'userOptions',
          'chatThreads',
        ] as const;
        for (const tableName of tables) {
          const rows = await tx.table(tableName).toArray();
          for (const row of rows) {
            if (!row.fishingMode) {
              await tx.table(tableName).update(row.id, { fishingMode: mode });
            }
          }
        }
      });

    // One-time: move all carper-scoped data into catfish (indexes unchanged).
    this.version(8)
      .stores({
        sessions: 'id, fishingMode, [fishingMode+status], lakeId, startDate',
        catches: 'id, fishingMode, sessionId, rodId, sessionSpotId, species, caughtAt',
        lakes: 'id, fishingMode, name, isFavorite',
        images: 'id, fishingMode, type, parentId, isFavorite, isHomepageImage',
        profiles: 'id',
        profileDocuments: 'id, type, title',
        biteEvents: 'id, fishingMode, sessionId, rodId, occurredAt',
        fishSpottedEvents: 'id, fishingMode, sessionId, rodId, spottedAt',
        rodSpotHistory: 'id, fishingMode, rodId, changedAt',
        sessionEvents: 'id, fishingMode, sessionId, type, occurredAt',
        sessionWeather: 'id, fishingMode, sessionId, capturedAt',
        userOptions: 'id, fishingMode, [fishingMode+category], category, value',
        chatThreads: 'id, fishingMode, updatedAt',
        chatMessages: 'id, threadId, createdAt',
      })
      .upgrade(async (tx) => {
        await migrateCarperToCatfish(tx);
      });
  }
}

function loadSettingsFromStorage(): typeof DEFAULT_SETTINGS {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export const db = new FishDb();
