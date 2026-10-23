import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSpot, Lake } from '../../core/models';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { LakeGeocodingService } from '../../core/services/lake-geocoding.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { ThemeService } from '../../core/services/theme.service';
import { LakeDetailComponent } from './lake-detail.component';

describe('LakeDetailComponent', () => {
  const update = vi.fn<LakeService['update']>().mockResolvedValue(undefined);
  const lookupCoordinates = vi
    .fn<LakeGeocodingService['lookupCoordinates']>()
    .mockResolvedValue({ status: 'not-found' });

  let lake: Lake;
  let lake$: BehaviorSubject<Lake>;

  beforeEach(() => {
    vi.clearAllMocks();
    lake = {
      id: 'lake-1',
      name: 'River Lake',
      address: 'Amsterdam',
      isFavorite: false,
      spots: [] as FishingSpot[],
      photoIds: [],
      createdAt: '2026-07-23T00:00:00.000Z',
      updatedAt: '2026-07-23T00:00:00.000Z',
    };
    lake$ = new BehaviorSubject<Lake>(lake);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: new BehaviorSubject(convertToParamMap({ id: 'lake-1' })),
          },
        },
        {
          provide: LakeService,
          useValue: {
            watchById: () => lake$,
            update,
            addSpot: vi.fn(),
            updateSpot: vi.fn(),
            deleteSpot: vi.fn(),
            delete: vi.fn(),
          },
        },
        {
          provide: ConfirmService,
          useValue: {
            confirmDelete: vi.fn(),
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
          provide: LakeGeocodingService,
          useValue: {
            lookupCoordinates,
          },
        },
        {
          provide: NotificationService,
          useValue: {
            success: vi.fn(),
            info: vi.fn(),
            warning: vi.fn(),
            error: vi.fn(),
            offline: vi.fn(),
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
        {
          provide: ThemeService,
          useValue: {
            getSelectPanelClass: () => 'theme-light-select-panel',
          },
        },
      ],
    });
  });

  it('looks up and saves coordinates when geocoding succeeds', async () => {
    lookupCoordinates.mockResolvedValue({
      status: 'success',
      latitude: 52.378,
      longitude: 4.9,
      displayName: 'Amsterdam',
    });

    const component = TestBed.runInInjectionContext(() => new LakeDetailComponent());
    await component.lookupCoordinates();

    expect(lookupCoordinates).toHaveBeenCalledWith('Amsterdam');
    expect(update).toHaveBeenCalled();
  });

  it('does not save when query is empty', async () => {
    lake.address = '';
    lake.name = '';

    const component = TestBed.runInInjectionContext(() => new LakeDetailComponent());
    await component.lookupCoordinates();

    expect(lookupCoordinates).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it('keeps edits in a draft without mutating the live lake object', async () => {
    const component = TestBed.runInInjectionContext(() => new LakeDetailComponent());

    component.updateField('notes', 'Deep margins');

    expect(component.draft().notes).toBe('Deep margins');
    expect(lake.notes).toBeUndefined();

    lake$.next({ ...lake, updatedAt: '2026-07-24T00:00:00.000Z' });
    expect(component.draft().notes).toBe('Deep margins');

    await component.saveLake();
    expect(update).toHaveBeenCalledWith('lake-1', expect.objectContaining({ notes: 'Deep margins' }));
  });

  it('rehydrates the draft when the lake id changes', () => {
    const component = TestBed.runInInjectionContext(() => new LakeDetailComponent());
    component.updateField('name', 'Edited');

    lake$.next({ ...lake, id: 'lake-2', name: 'Other Lake' });

    expect(component.draft().name).toBe('Other Lake');
  });
});
