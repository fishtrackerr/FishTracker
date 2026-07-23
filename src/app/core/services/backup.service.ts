import { Injectable } from '@angular/core';
import { db } from '../db/fish-db';
import { BackupData, StoredImage } from '../models';
import { blobToBase64, base64ToBlob, nowIso } from '../utils';
import { BiteEventRepository } from './bite-event.repository';
import { CatchRepository } from './catch.repository';
import { FishSpottedRepository } from './fish-spotted.repository';
import { ImageRepository } from './image.repository';
import { LakeRepository } from './lake.repository';
import { RodSpotHistoryRepository } from './rod-spot-history.repository';
import { SessionEventRepository } from './session-event.repository';
import { SessionRepository } from './session.repository';
import { UserOptionRepository } from './user-option.repository';

@Injectable({ providedIn: 'root' })
export class BackupService {
  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly catchRepo: CatchRepository,
    private readonly lakeRepo: LakeRepository,
    private readonly imageRepo: ImageRepository,
    private readonly biteEventRepo: BiteEventRepository,
    private readonly fishSpottedRepo: FishSpottedRepository,
    private readonly rodSpotHistoryRepo: RodSpotHistoryRepository,
    private readonly sessionEventRepo: SessionEventRepository,
    private readonly userOptionRepo: UserOptionRepository,
  ) {}

  async export(): Promise<BackupData> {
    const sessions = await this.sessionRepo.getAll();
    const catches = await this.catchRepo.getAll();
    const lakes = await this.lakeRepo.getAll();
    const images = await this.imageRepo.getAll();
    const biteEvents = await this.biteEventRepo.getAll();
    const fishSpottedEvents = await db.fishSpottedEvents.toArray();
    const rodSpotHistory = await db.rodSpotHistory.toArray();
    const sessionEvents = await db.sessionEvents.toArray();
    const userOptions = await this.userOptionRepo.getAll();

    const backupImages = await Promise.all(
      images.map(async (img) => ({
        id: img.id,
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
      version: 3,
      exportedAt: nowIso(),
      sessions,
      catches,
      lakes,
      images: backupImages,
      biteEvents,
      fishSpottedEvents,
      rodSpotHistory,
      sessionEvents,
      userOptions,
    };
  }

  async import(data: BackupData): Promise<void> {
    if (!data.version || !data.sessions || !data.catches || !data.lakes) {
      throw new Error('Invalid backup file');
    }

    const activeSessions = data.sessions.filter((s) => s.status === 'active');
    if (activeSessions.length > 1) {
      activeSessions.slice(1).forEach((s) => {
        s.status = 'completed';
        s.endDate = s.endDate ?? nowIso();
      });
    }

    await db.transaction(
      'rw',
      [
        db.sessions,
        db.catches,
        db.lakes,
        db.images,
        db.biteEvents,
        db.fishSpottedEvents,
        db.rodSpotHistory,
        db.sessionEvents,
        db.userOptions,
      ],
      async () => {
        await this.sessionRepo.clear();
        await this.catchRepo.clear();
        await this.lakeRepo.clear();
        await this.imageRepo.clear();
        await this.biteEventRepo.clear();
        await this.fishSpottedRepo.clear();
        await this.rodSpotHistoryRepo.clear();
        await this.sessionEventRepo.clear();
        await this.userOptionRepo.clear();

        for (const lake of data.lakes) {
          await this.lakeRepo.put(lake);
        }
        for (const session of data.sessions) {
          await this.sessionRepo.put({
            ...session,
            sessionSpots: session.sessionSpots ?? [],
            rods: session.rods ?? [],
          });
        }
        for (const catchRecord of data.catches) {
          await this.catchRepo.put(catchRecord);
        }
        for (const img of data.images ?? []) {
          await this.imageRepo.put({
            id: img.id,
            type: img.type as StoredImage['type'],
            parentId: img.parentId,
            fileName: img.fileName ?? `${img.id}.jpg`,
            blob: base64ToBlob(img.data, img.mimeType),
            thumbnailBlob: base64ToBlob(img.thumbnail, img.mimeType),
            mimeType: img.mimeType,
            createdAt: img.createdAt,
            isFavorite: img.isFavorite ?? false,
            isHomepageImage: img.isHomepageImage ?? false,
          });
        }
        for (const event of data.biteEvents ?? []) {
          await this.biteEventRepo.put(event);
        }
        for (const event of data.fishSpottedEvents ?? []) {
          await this.fishSpottedRepo.put(event);
        }
        for (const entry of data.rodSpotHistory ?? []) {
          await this.rodSpotHistoryRepo.put(entry);
        }
        for (const event of data.sessionEvents ?? []) {
          await this.sessionEventRepo.put(event);
        }
        for (const option of data.userOptions ?? []) {
          await this.userOptionRepo.put(option);
        }
      },
    );
  }

  downloadJson(data: BackupData): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fish-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
