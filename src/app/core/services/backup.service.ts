import { Injectable, inject } from '@angular/core';
import { db } from '../db/fish-db';
import {
  BackupData,
  BackupPreview,
  BACKUP_EXPORT_VERSION,
  FishingMode,
  StoredImage,
  SUPPORTED_BACKUP_VERSIONS,
} from '../models';
import { DEFAULT_FISHING_MODE, isFishingMode } from '../models/fishing-mode.model';
import { blobToBase64, base64ToBlob, nowIso } from '../utils';
import { BiteEventRepository } from './bite-event.repository';
import { CatchRepository } from './catch.repository';
import { ChatRepository } from './chat.repository';
import { FishSpottedRepository } from './fish-spotted.repository';
import { ImageRepository } from './image.repository';
import { LakeRepository } from './lake.repository';
import { ProfileDocumentRepository } from './profile-document.repository';
import { ProfileRepository } from './profile.repository';
import { RodSpotHistoryRepository } from './rod-spot-history.repository';
import { SessionEventRepository } from './session-event.repository';
import { SessionRepository } from './session.repository';
import { SessionWeatherRepository } from './session-weather.repository';
import { UserOptionRepository } from './user-option.repository';

const MAX_BACKUP_IMAGES = 5000;
const ALLOWED_IMAGE_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

function hasStringId(entry: unknown): boolean {
  return !!entry && typeof entry === 'object' && typeof (entry as { id?: unknown }).id === 'string';
}

function ensureMode<T extends { fishingMode?: FishingMode | string }>(
  entity: T,
  fallback: FishingMode = DEFAULT_FISHING_MODE,
): T & { fishingMode: FishingMode } {
  return {
    ...entity,
    fishingMode: isFishingMode(entity.fishingMode) ? entity.fishingMode : fallback,
  };
}

@Injectable({ providedIn: 'root' })
export class BackupService {
  private readonly profileRepo = inject(ProfileRepository);
  private readonly profileDocumentRepo = inject(ProfileDocumentRepository);

  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly catchRepo: CatchRepository,
    private readonly lakeRepo: LakeRepository,
    private readonly imageRepo: ImageRepository,
    private readonly biteEventRepo: BiteEventRepository,
    private readonly fishSpottedRepo: FishSpottedRepository,
    private readonly rodSpotHistoryRepo: RodSpotHistoryRepository,
    private readonly sessionEventRepo: SessionEventRepository,
    private readonly sessionWeatherRepo: SessionWeatherRepository,
    private readonly userOptionRepo: UserOptionRepository,
    private readonly chatRepo: ChatRepository,
  ) {}

  async export(): Promise<BackupData> {
    const sessions = await this.sessionRepo.getAllAcrossModes();
    const catches = await this.catchRepo.getAllAcrossModes();
    const lakes = await this.lakeRepo.getAllAcrossModes();
    const images = await this.imageRepo.getAllAcrossModes();
    const biteEvents = await this.biteEventRepo.getAllAcrossModes();
    const fishSpottedEvents = await this.fishSpottedRepo.getAllAcrossModes();
    const rodSpotHistory = await this.rodSpotHistoryRepo.getAllAcrossModes();
    const sessionEvents = await this.sessionEventRepo.getAllAcrossModes();
    const sessionWeather = await this.sessionWeatherRepo.getAllAcrossModes();
    const userOptions = await this.userOptionRepo.getAllAcrossModes();
    const chatThreads = await this.chatRepo.getAllThreadsAcrossModes();
    const chatMessages = await this.chatRepo.getAllMessagesAcrossModes();
    const profile = await this.profileRepo.get();
    const profileDocuments = await this.profileDocumentRepo.getAll();

    const backupImages = await Promise.all(
      images.map(async (img) => ({
        id: img.id,
        fishingMode: img.fishingMode,
        type: img.type,
        parentId: img.parentId,
        fileName: img.fileName,
        mimeType: img.mimeType,
        data: await blobToBase64(img.blob),
        thumbnail: await blobToBase64(img.thumbnailBlob),
        createdAt: img.createdAt,
        isFavorite: img.isFavorite,
        isHomepageImage: img.isHomepageImage,
      })),
    );

    return {
      version: BACKUP_EXPORT_VERSION,
      exportedAt: nowIso(),
      sessions,
      catches,
      lakes,
      images: backupImages,
      biteEvents,
      fishSpottedEvents,
      rodSpotHistory,
      sessionEvents,
      sessionWeather,
      userOptions,
      chatThreads,
      chatMessages,
      profiles: [profile],
      profileDocuments,
    };
  }

  /**
   * Validates structure/version and returns a preview. Throws on invalid backup.
   * Does not write to the database.
   */
  validate(data: unknown): BackupPreview {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid backup file');
    }
    const backup = data as BackupData;
    if (typeof backup.version !== 'number') {
      throw new Error('Invalid backup file: missing version');
    }
    if (!(SUPPORTED_BACKUP_VERSIONS as readonly number[]).includes(backup.version)) {
      throw new Error(
        `Unsupported backup version ${backup.version}. Supported: ${SUPPORTED_BACKUP_VERSIONS.join(', ')}`,
      );
    }
    if (!Array.isArray(backup.sessions) || !Array.isArray(backup.catches) || !Array.isArray(backup.lakes)) {
      throw new Error('Invalid backup file: sessions, catches, and lakes must be arrays');
    }
    if (backup.images !== undefined && !Array.isArray(backup.images)) {
      throw new Error('Invalid backup file: images must be an array');
    }
    if ((backup.images?.length ?? 0) > MAX_BACKUP_IMAGES) {
      throw new Error(`Invalid backup file: too many images (max ${MAX_BACKUP_IMAGES})`);
    }
    for (const optional of [
      'biteEvents',
      'fishSpottedEvents',
      'rodSpotHistory',
      'sessionEvents',
      'sessionWeather',
      'userOptions',
      'chatThreads',
      'chatMessages',
      'profiles',
      'profileDocuments',
    ] as const) {
      const value = backup[optional];
      if (value !== undefined && !Array.isArray(value)) {
        throw new Error(`Invalid backup file: ${optional} must be an array`);
      }
    }
    for (const session of backup.sessions) {
      if (!hasStringId(session)) {
        throw new Error('Invalid backup file: session entries must have an id');
      }
    }
    for (const catchRecord of backup.catches) {
      if (!hasStringId(catchRecord)) {
        throw new Error('Invalid backup file: catch entries must have an id');
      }
    }
    for (const lake of backup.lakes) {
      if (!hasStringId(lake)) {
        throw new Error('Invalid backup file: lake entries must have an id');
      }
    }
    for (const img of backup.images ?? []) {
      if (!hasStringId(img)) {
        throw new Error('Invalid backup file: image entries must have an id');
      }
      const mime = (img as { mimeType?: unknown }).mimeType;
      if (typeof mime === 'string' && mime && !ALLOWED_IMAGE_MIME.has(mime)) {
        throw new Error('Invalid backup file: unsupported image mime type');
      }
    }

    return {
      version: backup.version,
      exportedAt: typeof backup.exportedAt === 'string' ? backup.exportedAt : undefined,
      sessionCount: backup.sessions.length,
      catchCount: backup.catches.length,
      lakeCount: backup.lakes.length,
      imageCount: backup.images?.length ?? 0,
      profileCount: backup.profiles?.length ?? 0,
      profileDocumentCount: backup.profileDocuments?.length ?? 0,
    };
  }

  async import(data: BackupData): Promise<BackupPreview> {
    const preview = this.validate(data);

    // Allow one active session per fishing mode.
    const activeByMode = new Map<string, number>();
    for (const session of data.sessions) {
      if (session.status !== 'active') {
        continue;
      }
      const mode = isFishingMode(session.fishingMode)
        ? session.fishingMode
        : DEFAULT_FISHING_MODE;
      const count = activeByMode.get(mode) ?? 0;
      if (count >= 1) {
        session.status = 'completed';
        session.endDate = session.endDate ?? nowIso();
      } else {
        activeByMode.set(mode, count + 1);
      }
    }

    await db.transaction(
      'rw',
      [
        db.sessions,
        db.catches,
        db.lakes,
        db.images,
        db.profiles,
        db.profileDocuments,
        db.biteEvents,
        db.fishSpottedEvents,
        db.rodSpotHistory,
        db.sessionEvents,
        db.sessionWeather,
        db.userOptions,
        db.chatThreads,
        db.chatMessages,
      ],
      async () => {
        await this.sessionRepo.clear();
        await this.catchRepo.clear();
        await this.lakeRepo.clear();
        await this.imageRepo.clear();
        await db.profiles.clear();
        await db.profileDocuments.clear();
        await this.biteEventRepo.clear();
        await this.fishSpottedRepo.clear();
        await this.rodSpotHistoryRepo.clear();
        await this.sessionEventRepo.clear();
        await this.sessionWeatherRepo.clear();
        await this.userOptionRepo.clear();
        await this.chatRepo.clear();

        for (const lake of data.lakes) {
          await this.lakeRepo.put(ensureMode(lake));
        }
        for (const session of data.sessions) {
          await this.sessionRepo.put(
            ensureMode({
              ...session,
              sessionSpots: session.sessionSpots ?? [],
              rods: session.rods ?? [],
            }),
          );
        }
        for (const catchRecord of data.catches) {
          await this.catchRepo.put(ensureMode(catchRecord));
        }
        for (const img of data.images ?? []) {
          if (typeof img.data !== 'string' || typeof img.thumbnail !== 'string') {
            throw new Error('Invalid backup file: image entries require data and thumbnail');
          }
          const mimeType =
            typeof img.mimeType === 'string' && ALLOWED_IMAGE_MIME.has(img.mimeType)
              ? img.mimeType
              : 'image/jpeg';
          await this.imageRepo.put(
            ensureMode({
              id: img.id,
              fishingMode: img.fishingMode as FishingMode | undefined,
              type: img.type as StoredImage['type'],
              parentId: img.parentId,
              fileName: img.fileName ?? `${img.id}.jpg`,
              blob: base64ToBlob(img.data, mimeType),
              thumbnailBlob: base64ToBlob(img.thumbnail, mimeType),
              mimeType,
              createdAt: img.createdAt,
              isFavorite: img.isFavorite ?? false,
              isHomepageImage: img.isHomepageImage ?? false,
            }),
          );
        }
        for (const event of data.biteEvents ?? []) {
          await this.biteEventRepo.put(ensureMode(event));
        }
        for (const event of data.fishSpottedEvents ?? []) {
          await this.fishSpottedRepo.put(ensureMode(event));
        }
        for (const entry of data.rodSpotHistory ?? []) {
          await this.rodSpotHistoryRepo.put(ensureMode(entry));
        }
        for (const event of data.sessionEvents ?? []) {
          await this.sessionEventRepo.put(ensureMode(event));
        }
        const weatherRecords = data.sessionWeather ?? [];
        if (weatherRecords.length > 0) {
          for (const record of weatherRecords) {
            await this.sessionWeatherRepo.put(ensureMode(record));
          }
        } else {
          // Legacy backups: seed history from embedded session.weather
          for (const session of data.sessions) {
            if (!session.weather) {
              continue;
            }
            await this.sessionWeatherRepo.put(
              ensureMode({
                id: session.id + '-weather-seed',
                fishingMode: session.fishingMode,
                sessionId: session.id,
                capturedAt:
                  session.weather.capturedAt ?? session.updatedAt ?? session.createdAt,
                weather: session.weather,
              }),
            );
          }
        }
        for (const option of data.userOptions ?? []) {
          await this.userOptionRepo.put(ensureMode(option));
        }
        for (const thread of data.chatThreads ?? []) {
          await this.chatRepo.putThread(ensureMode(thread));
        }
        for (const message of data.chatMessages ?? []) {
          await this.chatRepo.putMessage(message);
        }
        for (const profile of data.profiles ?? []) {
          if (profile && typeof profile.id === 'string') {
            await this.profileRepo.put(profile);
          }
        }
        for (const doc of data.profileDocuments ?? []) {
          if (doc && typeof doc.id === 'string') {
            await this.profileDocumentRepo.put(doc);
          }
        }
      },
    );

    return preview;
  }

  downloadJson(data: BackupData, filename?: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      filename ?? `fish-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
