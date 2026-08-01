import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CatchFormComponent } from './catch-form.component';
import { CatchService } from '../../core/services/catch.service';
import { SessionService } from '../../core/services/session.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import type { FishingSession } from '../../core/models';

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
  const createCatch = vi.fn(
    async (..._args: Parameters<CatchService['create']>) =>
      ({ id: 'catch-1' } as Awaited<ReturnType<CatchService['create']>>),
  );
  const getById = vi.fn<SessionService['getById']>().mockResolvedValue(createSession());
  const pickImage = vi.fn<PhotoPickService['pickImage']>();

  const routeStub = {
    snapshot: {
      paramMap: createParamMap({ id: 'session-1' }),
      queryParamMap: createParamMap({ rodId: 'rod-1', sessionSpotId: 'spot-2' }),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    routeStub.snapshot.queryParamMap = createParamMap({ rodId: 'rod-1', sessionSpotId: 'spot-2' });

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeStub,
        },
        {
          provide: Router,
          useValue: {
            navigate,
          },
        },
        {
          provide: CatchService,
          useValue: {
            create: createCatch,
          },
        },
        {
          provide: SessionService,
          useValue: {
            getById,
          },
        },
        {
          provide: PhotoPickService,
          useValue: {
            pickImage,
          },
        },
      ],
    });
  });

  it('loads session defaults from selected rod and query params', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());

    await component.loadSession();

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

  it('uses sessionSpotId query param when no rod is selected', async () => {
    routeStub.snapshot.queryParamMap = createParamMap({ sessionSpotId: 'spot-2' });
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());

    await component.loadSession();

    expect(component.rodId).toBe('');
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
    await component.loadSession();

    component.bait = 'Old Bait';
    component.rig = 'Old Rig';
    component.sessionSpotId = '';

    component.onRodChange('rod-1');

    expect(component.bait).toBe('Boilie');
    expect(component.rig).toBe('Combi');
    expect(component.sessionSpotId).toBe('spot-1');
  });

  it('normalizes optional values and navigates after save', async () => {
    const component = TestBed.runInInjectionContext(() => new CatchFormComponent());

    component.species = 'Carp';
    component.fishName = '';
    component.bait = '';
    component.rig = 'Spinner';
    component.tags = ['Night'];
    component.rodId = '';
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
        rodId: undefined,
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
});
