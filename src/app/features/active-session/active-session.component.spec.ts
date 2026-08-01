import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CatchService } from '../../core/services/catch.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { DialogService } from '../../core/services/dialog.service';
import { I18nService } from '../../core/services/i18n.service';
import type { FishingSession, StoredImage } from '../../core/models';
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { NotificationService } from '../../core/services/notification.service';
import { RodService } from '../../core/services/rod.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { WeatherService } from '../../core/services/weather.service';
import { ActiveSessionComponent } from './active-session.component';

describe('ActiveSessionComponent', () => {
  const navigate = vi.fn<Router['navigate']>().mockResolvedValue(true);
  const activeSession: FishingSession = {
    id: 'session-1',
    name: 'Current Session',
    status: 'active',
    startDate: '2026-07-23T08:00:00.000Z',
    photoIds: [],
    catchCount: 0,
    totalCatchWeightKg: 0,
    createdAt: '2026-07-23T08:00:00.000Z',
    updatedAt: '2026-07-23T08:00:00.000Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate,
          },
        },
        {
          provide: SessionService,
          useValue: {
            watchActive: () => of(activeSession),
            getDurationMs: vi.fn().mockReturnValue(0),
            refreshWeather: vi.fn(),
            addSessionPhoto: vi.fn(),
            update: vi.fn(),
            complete: vi.fn(),
          },
        },
        {
          provide: CatchService,
          useValue: {
            watchBySession: vi.fn().mockReturnValue(of([])),
            createQuick: vi.fn(),
          },
        },
        {
          provide: RodService,
          useValue: {
            recast: vi.fn(),
          },
        },
        {
          provide: WeatherService,
          useValue: {
            getWarnings: vi.fn().mockReturnValue([]),
          },
        },
        {
          provide: SettingsService,
          useValue: {
            get: () => ({ showWeatherWarnings: true }),
          },
        },
        {
          provide: DialogService,
          useValue: {
            open: vi.fn(),
          },
        },
        {
          provide: ConfirmService,
          useValue: {
            confirm: vi.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            success: vi.fn(),
            error: vi.fn(),
          },
        },
        {
          provide: ImageRepository,
          useValue: {
            getByType: vi.fn().mockResolvedValue([]),
          },
        },
        {
          provide: ImageService,
          useValue: {
            getObjectUrl: vi.fn().mockResolvedValue(undefined),
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

  it('navigates to current session details', async () => {
    const component = TestBed.runInInjectionContext(() => new ActiveSessionComponent());

    await component.openDetails();

    expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1']);
  });

  it('navigates to current session edit page', async () => {
    const component = TestBed.runInInjectionContext(() => new ActiveSessionComponent());

    await component.openEdit();

    expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1', 'edit']);
  });

  it('loads session photos for the photo strip', async () => {
    const photo: StoredImage = {
      id: 'img-1',
      type: 'session',
      parentId: 'session-1',
      fileName: 'shot.jpg',
      mimeType: 'image/jpeg',
      blob: new Blob(),
      thumbnailBlob: new Blob(),
      isFavorite: false,
      isHomepageImage: false,
      createdAt: '2026-07-23T09:00:00.000Z',
    };
    const imageRepo = TestBed.inject(ImageRepository);
    vi.mocked(imageRepo.getByType).mockImplementation(async (type) =>
      type === 'session' ? [photo] : [],
    );

    const component = TestBed.runInInjectionContext(() => new ActiveSessionComponent());
    await component.loadSessionImages();

    expect(component.sessionImages()).toHaveLength(1);
    expect(component.sessionImages()[0].id).toBe('img-1');
  });
});
