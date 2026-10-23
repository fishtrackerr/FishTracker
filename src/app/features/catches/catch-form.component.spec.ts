import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CatchFormComponent } from './catch-form.component';
import { CatchService } from '../../core/services/catch.service';
import { SessionService } from '../../core/services/session.service';
import { ImageService } from '../../core/services/image.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { NotificationService } from '../../core/services/notification.service';
import { UserOptionService } from '../../core/services/user-option.service';
import type { Catch, FishingSession } from '../../core/models';

function createParamMap(values: Record<string, string | undefined>) {
  return {
    get: (key: string) => values[key] ?? null,
  };
}

function createSession(): FishingSession {
  return {
    id: 'session-1',
    name: 'Night Session',
    status: 'active',
    startDate: '2026-07-23T08:00:00.000Z',
    photoIds: [],
    catchCount: 0,
    totalCatchWeightKg: 0,
    createdAt: '2026-07-23T08:00:00.000Z',
    updatedAt: '2026-07-23T08:00:00.000Z',
    waterTemperatureC: 18.5,
    prebait: 'Corn',
    rods: [
      {
        id: 'rod-1',
        sessionId: 'session-1',
        rodNumber: 1,
        name: 'Left Rod',
        bait: 'Boilie',
        rig: 'Combi',
        sessionSpotId: 'spot-1',
        biteCount: 0,
        fishSpottedCount: 0,
        isActive: true,
      },
      {
        id: 'rod-2',
        sessionId: 'session-1',
        rodNumber: 2,
        name: 'Right Rod',
        biteCount: 0,
        fishSpottedCount: 0,
        isActive: true,
      },
    ],
    sessionSpots: [
      {
        id: 'spot-1',
        name: 'Near Margin',
      },
      {
        id: 'spot-2',
        name: 'Far Bank',
      },
    ],
  };
}

describe('CatchFormComponent', () => {
  const navigate = vi.fn<Router['navigate']>().mockResolvedValue(true);
  const navigateByUrl = vi.fn<Router['navigateByUrl']>().mockResolvedValue(true);
  const confirmDelete = vi.fn().mockResolvedValue(true);
  const deleteCatchFn = vi.fn().mockResolvedValue(undefined);
  const notifySuccess = vi.fn();
  const createCatch = vi.fn(
    async (..._args: Parameters<CatchService['create']>) =>
      ({ id: 'catch-1' } as Awaited<ReturnType<CatchService['create']>>),
  );
  const updateCatch = vi.fn(
    async (..._args: Parameters<CatchService['update']>) =>
      ({ id: 'catch-1' } as Awaited<ReturnType<CatchService['update']>>),
  );
  const getCatchById = vi.fn<CatchService['getById']>();
  const getById = vi.fn<SessionService['getById']>().mockResolvedValue(createSession());
  const pickImage = vi.fn<PhotoPickService['pickImage']>();
  const processFile = vi.fn<ImageService['processFile']>();

  const routeStub = {
    snapshot: {
      paramMap: createParamMap({ id: 'session-1' }),
      queryParamMap: createParamMap({ rodId: 'rod-1', sessionSpotId: 'spot-2' }),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    routeStub.snapshot.paramMap = createParamMap({ id: 'session-1' });
    routeStub.snapshot.queryParamMap = createParamMap({ rodId: 'rod-1', sessionSpotId: 'spot-2' });
    confirmDelete.mockResolvedValue(true);

    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: vi.fn() } },
        {
          provide: ActivatedRoute,
          useValue: routeStub,
        },
        {
          provide: Router,
          useValue: {
            navigate,
            navigateByUrl,
          },
        },
        {
          provide: CatchService,
          useValue: {
            create: createCatch,
            update: updateCatch,
            getById: getCatchById,
            delete: deleteCatchFn,
          },
        },
        { provide: ConfirmService, useValue: { confirmDelete } },
        { provide: I18nService, useValue: { t: (key: string) => key } },
        { provide: NotificationService, useValue: { success: notifySuccess } },
        {
          provide: SessionService,
          useValue: {
            getById,
          },
        },
        {
          provide: ImageService,
          useValue: {
            processFile,
          },
        },
        {
          provide: PhotoPickService,
          useValue: {
            pickImage,
          },
        },
        {
          provide: UserOptionService,
          useValue: {
            ensureDefaultsForCurrentMode: vi.fn().mockResolvedValue(undefined),
          },
        },
      ],
    });
  });

  it('loads session defaults from selected rod and query params', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());

    await component.load();

    expect(getById).toHaveBeenCalledWith('session-1');
    expect(component.rods).toEqual([
      { id: 'rod-1', name: 'Left Rod' },
      { id: 'rod-2', name: 'Right Rod' },
    ]);
    expect(component.sessionSpots).toEqual([
      { id: 'spot-1', name: 'Near Margin' },
      { id: 'spot-2', name: 'Far Bank' },
    ]);
    expect(component.rodId).toBe('rod-1');
    expect(component.bait).toBe('Boilie');
    expect(component.rig).toBe('Combi');
    expect(component.sessionSpotId).toBe('spot-2');
    expect(component.waterTemperatureC).toBe(18.5);
    expect(component.prebait).toBe('Corn');
  });

  it('refreshes the OnPush view after loading and picking a photo', async () => {
    const markForCheck = TestBed.inject(ChangeDetectorRef).markForCheck as ReturnType<typeof vi.fn>;
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    await component.load();
    markForCheck.mockClear();

    await component.pickPhoto(false);

    expect(markForCheck).toHaveBeenCalled();
  });

  it('defaults to the first rod when no rod query param is set', async () => {
    routeStub.snapshot.queryParamMap = createParamMap({ sessionSpotId: 'spot-2' });
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());

    await component.load();

    expect(component.rodId).toBe('rod-1');
    expect(component.bait).toBe('Boilie');
    expect(component.sessionSpotId).toBe('spot-2');
  });

  it('adds trimmed unique tags and clears input', () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());

    component.tagsInput = '  River  ';
    component.addTag();
    component.tagsInput = 'River';
    component.addTag();

    expect(component.tags).toEqual(['River']);
    expect(component.tagsInput).toBe('');
  });

  it('updates bait, rig, and spot when rod changes', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    await component.load();

    component.bait = 'Old Bait';
    component.rig = 'Old Rig';
    component.sessionSpotId = '';

    component.onRodChange('rod-1');

    expect(component.bait).toBe('Boilie');
    expect(component.rig).toBe('Combi');
    expect(component.sessionSpotId).toBe('spot-1');
  });

  it('does not save without a selected rod', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    await component.load();

    component.species = 'Carp';
    component.rodId = '';

    await component.save();

    expect(createCatch).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('normalizes optional values and navigates after save', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    await component.load();

    component.species = 'Carp';
    component.fishName = '';
    component.bait = '';
    component.rig = 'Spinner';
    component.tags = ['Night'];
    component.rodId = 'rod-2';
    component.sessionSpotId = 'spot-1';
    component.notes = '';
    component.prebait = '';
    component.released = true;

    await component.save();

    expect(createCatch).toHaveBeenCalledWith(
      'session-1',
      expect.objectContaining({
        species: 'Carp',
        fishName: undefined,
        bait: undefined,
        rig: 'Spinner',
        tags: ['Night'],
        rodId: 'rod-2',
        sessionSpotId: 'spot-1',
        notes: undefined,
        prebait: undefined,
        released: true,
      }),
    );
    expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1']);
  });

  it('stores selected photo when user picks from camera', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    const file = new File(['image'], 'photo.jpg', { type: 'image/jpeg' });
    pickImage.mockResolvedValue(file);

    await component.pickPhoto(true);

    expect(pickImage).toHaveBeenCalledWith({ capture: true });
    expect(component.photo).toBe(file);
  });

  it('opens gallery picker without camera capture', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    pickImage.mockResolvedValue(null);

    await component.pickPhoto(false);

    expect(pickImage).toHaveBeenCalledWith({ capture: false });
  });

  it('clears selected photo when no file is chosen', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    component.photo = new File(['old'], 'old.jpg', { type: 'image/jpeg' });
    pickImage.mockResolvedValue(null);

    await component.pickPhoto(false);

    expect(component.photo).toBeUndefined();
  });

  it('loads existing catch and clears detailsPending on edit save', async () => {
    const existing: Catch = {
      id: 'catch-99',
      sessionId: 'session-1',
      species: 'Unknown',
      caughtAt: '2026-07-15T10:00:00.000Z',
      weightKg: undefined,
      detailsPending: true,
      weather: {
        description: 'Sunny',
        temperatureC: 22,
        windSpeedKmh: 5,
        windDirection: 90,
        airPressureHpa: 1012,
        humidity: 50,
        cloudCoverage: 10,
        rain: false,
        sunrise: '',
        sunset: '',
        moonPhase: 'Waxing',
        capturedAt: '2026-07-15T10:00:00.000Z',
      },
      createdAt: '2026-07-15T10:00:00.000Z',
      updatedAt: '2026-07-15T10:00:00.000Z',
    };
    routeStub.snapshot.paramMap = createParamMap({ id: 'session-1', catchId: 'catch-99' });
    getCatchById.mockResolvedValue(existing);

    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());
    await component.load();

    expect(component.isEdit).toBe(true);
    expect(component.species).toBe('Unknown');
    expect(getCatchById).toHaveBeenCalledWith('catch-99');

    component.species = 'Carp';
    component.weightKg = 3.5;
    component.rodId = 'rod-1';
    await component.save();

    expect(updateCatch).toHaveBeenCalledWith(
      'catch-99',
      expect.objectContaining({
        species: 'Carp',
        weightKg: 3.5,
        rodId: 'rod-1',
        detailsPending: false,
      }),
    );
    expect(createCatch).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1']);
  });

  describe('returnUrl, cancel and delete', () => {
    const existing = {
      id: 'catch-99',
      sessionId: 'session-1',
      species: 'Carp',
      caughtAt: '2026-07-15T10:00:00.000Z',
      rodId: 'rod-1',
      createdAt: '2026-07-15T10:00:00.000Z',
      updatedAt: '2026-07-15T10:00:00.000Z',
    } as Catch;

    function withQuery(values: Record<string, string>, editing = false) {
      routeStub.snapshot.queryParamMap = createParamMap(values);
      if (editing) {
        routeStub.snapshot.paramMap = createParamMap({ id: 'session-1', catchId: 'catch-99' });
        getCatchById.mockResolvedValue(existing);
      }
      return TestBed.runInInjectionContext(() => new CatchFormComponent());
    }

    it('returns to a safe returnUrl after saving a new catch', async () => {
      const component = withQuery({ rodId: 'rod-1', returnUrl: '/sessions/session-1?x=1' });
      await component.load();
      component.species = 'Carp';
      await component.save();
      expect(navigateByUrl).toHaveBeenCalledWith('/sessions/session-1?x=1');
      expect(navigate).not.toHaveBeenCalled();
    });

    it.each(['https://evil.example/', '//evil.example', '/pin/unlock', '/mode-select', '/\\evil'])(
      'ignores the unsafe returnUrl %s',
      async (returnUrl) => {
        const component = withQuery({ rodId: 'rod-1', returnUrl });
        expect(component.returnUrl).toBeUndefined();
        await component.cancel();
        expect(navigateByUrl).not.toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1']);
      },
    );

    it('cancel goes to the returnUrl without saving', async () => {
      const component = withQuery({ returnUrl: '/sessions/session-1' });
      await component.cancel();
      expect(navigateByUrl).toHaveBeenCalledWith('/sessions/session-1');
      expect(createCatch).not.toHaveBeenCalled();
    });

    it('deletes the catch after confirm and navigates back', async () => {
      const component = withQuery({ returnUrl: '/sessions/session-1' }, true);
      await component.load();
      await component.deleteCatch();
      expect(confirmDelete).toHaveBeenCalled();
      expect(deleteCatchFn).toHaveBeenCalledWith('catch-99');
      expect(notifySuccess).toHaveBeenCalled();
      expect(navigateByUrl).toHaveBeenCalledWith('/sessions/session-1');
    });

    it('falls back to the session screen after deleting without a returnUrl', async () => {
      const component = withQuery({}, true);
      await component.load();
      await component.deleteCatch();
      expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1']);
    });

    it('keeps the catch when the delete is not confirmed', async () => {
      confirmDelete.mockResolvedValueOnce(false);
      const component = withQuery({}, true);
      await component.load();
      await component.deleteCatch();
      expect(deleteCatchFn).not.toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalled();
    });

    it('cannot delete in create mode', async () => {
      const component = withQuery({ rodId: 'rod-1' });
      await component.deleteCatch();
      expect(confirmDelete).not.toHaveBeenCalled();
      expect(deleteCatchFn).not.toHaveBeenCalled();
    });
  });
});