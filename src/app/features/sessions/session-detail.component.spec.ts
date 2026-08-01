import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FishingSession, StoredImage } from '../../core/models';
import { CatchService } from '../../core/services/catch.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { SessionService } from '../../core/services/session.service';
import { SessionDetailComponent } from './session-detail.component';

describe('SessionDetailComponent', () => {
  const update = vi.fn<SessionService['update']>().mockResolvedValue(undefined);
  const getByType = vi.fn<ImageRepository['getByType']>().mockResolvedValue([]);
  const getObjectUrl = vi.fn<ImageService['getObjectUrl']>().mockResolvedValue('blob:thumb');
  const getById = vi.fn<ImageRepository['getById']>().mockResolvedValue(undefined);

  let session: FishingSession;

  beforeEach(() => {
    vi.clearAllMocks();
    session = {
      id: 'session-1',
      name: 'Morning session',
      status: 'completed',
      startDate: '2026-07-23T08:00:00.000Z',
      photoIds: [],
      catchCount: 0,
      totalCatchWeightKg: 0,
      createdAt: '2026-07-23T08:00:00.000Z',
      updatedAt: '2026-07-23T08:00:00.000Z',
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'session-1' })),
            queryParamMap: of(convertToParamMap({})),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn().mockResolvedValue(true),
          },
        },
        {
          provide: SessionService,
          useValue: {
            watchById: () => of(session),
            update,
            getDurationMs: vi.fn().mockReturnValue(0),
            complete: vi.fn(),
            delete: vi.fn(),
          },
        },
        {
          provide: CatchService,
          useValue: {
            watchBySession: () => of([]),
            update: vi.fn(),
          },
        },
        {
          provide: LakeService,
          useValue: {
            getById: vi.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ConfirmService,
          useValue: {
            confirmDelete: vi.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            success: vi.fn(),
          },
        },
        {
          provide: ImageRepository,
          useValue: {
            getByType,
            getById,
          },
        },
        {
          provide: ImageService,
          useValue: {
            getObjectUrl,
          },
        },
        {
          provide: I18nService,
          useValue: {
            t: (key: string) => key,
            language: signal('en'),
            dictionary: signal({}),
          },
        },
      ],
    });
  });

  it('loads session and catch images into the gallery', async () => {
    const sessionPhoto: StoredImage = {
      id: 'img-session',
      type: 'session',
      parentId: 'session-1',
      fileName: 'session.jpg',
      mimeType: 'image/jpeg',
      blob: new Blob(),
      thumbnailBlob: new Blob(),
      isFavorite: false,
      isHomepageImage: false,
      createdAt: '2026-07-23T09:00:00.000Z',
    };
    const catchPhoto: StoredImage = {
      id: 'img-catch',
      type: 'catch',
      parentId: 'session-1',
      fileName: 'catch.jpg',
      mimeType: 'image/jpeg',
      blob: new Blob(),
      thumbnailBlob: new Blob(),
      isFavorite: false,
      isHomepageImage: false,
      createdAt: '2026-07-23T10:00:00.000Z',
    };
    getByType.mockImplementation(async (type) => {
      if (type === 'session') return [sessionPhoto];
      if (type === 'catch') return [catchPhoto];
      return [];
    });

    const component = TestBed.runInInjectionContext(() => new SessionDetailComponent());
    await component.loadSessionImages();

    expect(component.sessionImages().map((i) => i.id)).toEqual(['img-session', 'img-catch']);
    expect(getObjectUrl).toHaveBeenCalled();
  });

  it('appends uploaded image ids to session photoIds', async () => {
    const component = TestBed.runInInjectionContext(() => new SessionDetailComponent());

    await component.onImageUploaded('new-photo');

    expect(update).toHaveBeenCalledWith('session-1', {
      photoIds: ['new-photo'],
    });
  });
});
