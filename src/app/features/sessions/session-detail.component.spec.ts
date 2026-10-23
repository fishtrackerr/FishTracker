import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  FishingSession,
  SessionRod,
  SessionWeatherRecord,
  StoredImage,
  WeatherSnapshot,
} from '../../core/models';
import { BiteEventService } from '../../core/services/bite-event.service';
import { CatchService } from '../../core/services/catch.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { DialogService } from '../../core/services/dialog.service';
import { I18nService } from '../../core/services/i18n.service';
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { RodService } from '../../core/services/rod.service';
import { SessionWeatherService } from '../../core/services/session-weather.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { ThemeService } from '../../core/services/theme.service';
import { WeatherService } from '../../core/services/weather.service';
import { RodSheetComponent } from '../../shared/components/rod-sheet/rod-sheet.component';
import { CatchSheetComponent } from '../catches/catch-sheet/catch-sheet.component';
import { SessionDetailComponent } from './session-detail.component';


function rod(n: number, extra: Partial<SessionRod> = {}): SessionRod {
  return {
    id: `rod-${n}`,
    sessionId: 'session-1',
    rodNumber: n,
    name: `Rod ${n}`,
    biteCount: 0,
    fishSpottedCount: 0,
    isActive: true,
    ...extra,
  };
}

function weather(pressure: number, capturedAt: string): WeatherSnapshot {
  return {
    description: 'Clear',
    temperatureC: 14,
    windSpeedKmh: 10,
    windDirection: 180,
    airPressureHpa: pressure,
    humidity: 60,
    cloudCoverage: 10,
    rain: false,
    sunrise: '',
    sunset: '',
    moonPhase: '',
    capturedAt,
  };
}

function photo(id: string, type: 'session' | 'catch'): StoredImage {
  return {
    id,
    type,
    parentId: 'session-1',
    fileName: `${id}.jpg`,
    mimeType: 'image/jpeg',
    blob: new Blob(),
    thumbnailBlob: new Blob(),
    isFavorite: false,
    isHomepageImage: false,
    createdAt: '2026-07-23T09:00:00.000Z',
  };
}

describe('SessionDetailComponent (session screen)', () => {
  const navigate = vi.fn<Router['navigate']>().mockResolvedValue(true);
  const update = vi.fn<SessionService['update']>().mockResolvedValue(undefined);
  const getSessionImages = vi.fn<ImageService['getSessionImages']>().mockResolvedValue([]);
  const imageGetById = vi.fn<ImageRepository['getById']>().mockResolvedValue(undefined);

  let session$: BehaviorSubject<FishingSession | undefined>;
  let weather$: BehaviorSubject<SessionWeatherRecord[]>;
  let settings: { showWeatherWarnings: boolean; maxRodCount: number };

  const sessionService = {
    watchById: vi.fn(() => session$.asObservable()),
    update,
    getDurationMs: vi.fn().mockReturnValue(3_723_000),
    complete: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    resolveCoverImageId: vi.fn().mockResolvedValue(undefined),
    refreshWeather: vi.fn().mockResolvedValue(undefined),
    addSessionPhoto: vi.fn().mockResolvedValue(undefined),
  };
  const biteService = {
    addBite: vi.fn().mockResolvedValue(undefined),
    removeBite: vi.fn().mockResolvedValue(undefined),
  };
  const rodService = {
    ensureRods: vi.fn().mockResolvedValue(undefined),
    recast: vi.fn().mockResolvedValue(undefined),
  };
  const confirm = {
    confirm: vi.fn().mockResolvedValue(true),
    confirmDelete: vi.fn().mockResolvedValue(true),
  };
  const notify = {
    success: vi.fn(),
    error: vi.fn(),
    withAction: vi.fn(),
  };
  const dialog = { open: vi.fn() };
  const photoPick = { pickImage: vi.fn().mockResolvedValue(null) };
  const weatherService = { getWarnings: vi.fn().mockReturnValue([]) };
  const bottomSheet = {
    open: vi.fn(() => ({ afterDismissed: () => of(undefined) })),
  };

  function baseSession(extra: Partial<FishingSession> = {}): FishingSession {
    return {
      id: 'session-1',
      name: 'Morning session',
      status: 'active',
      startDate: '2026-07-23T08:00:00.000Z',
      photoIds: [],
      catchCount: 0,
      totalCatchWeightKg: 0,
      createdAt: '2026-07-23T08:00:00.000Z',
      updatedAt: '2026-07-23T08:00:00.000Z',
      ...extra,
    };
  }

  const create = () => TestBed.runInInjectionContext(() => new SessionDetailComponent());

  beforeEach(() => {
    vi.clearAllMocks();
    session$ = new BehaviorSubject<FishingSession | undefined>(baseSession());
    weather$ = new BehaviorSubject<SessionWeatherRecord[]>([]);
    settings = { showWeatherWarnings: true, maxRodCount: 6 };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'session-1' })),
            queryParamMap: of(convertToParamMap({})),
          },
        },
        { provide: Router, useValue: { navigate, url: '/sessions/session-1' } },
        { provide: SessionService, useValue: sessionService },
        {
          provide: CatchService,
          useValue: { watchBySession: () => of([]), update: vi.fn() },
        },
        { provide: LakeService, useValue: { getById: vi.fn().mockResolvedValue({ name: 'Lake A' }) } },
        { provide: RodService, useValue: rodService },
        { provide: BiteEventService, useValue: biteService },
        { provide: WeatherService, useValue: weatherService },
        { provide: SessionWeatherService, useValue: { watchBySession: () => weather$.asObservable() } },
        { provide: SettingsService, useValue: { get: () => settings } },
        { provide: ConfirmService, useValue: confirm },
        { provide: NotificationService, useValue: notify },
        { provide: ImageRepository, useValue: { getById: imageGetById } },
        {
          provide: ImageService,
          useValue: { getObjectUrl: vi.fn().mockResolvedValue('blob:thumb'), getSessionImages },
        },
        { provide: PhotoPickService, useValue: photoPick },
        { provide: DialogService, useValue: dialog },
        { provide: MatBottomSheet, useValue: bottomSheet },
        { provide: ThemeService, useValue: { resolvedTheme: signal('light') } },
        {
          provide: I18nService,
          useValue: {
            t: (key: string, params?: Record<string, unknown>) =>
              params ? `${key} ${JSON.stringify(params)}` : key,
            language: signal('en'),
            dictionary: signal({}),
          },
        },
      ],
    });
  });

  describe('modes', () => {
    it('is live for an active session and finished for a completed one', () => {
      const component = create();
      expect(component.isLive()).toBe(true);

      session$.next(baseSession({ status: 'completed', endDate: '2026-07-23T12:00:00.000Z' }));
      expect(component.isLive()).toBe(false);
    });

    it('is undefined when the session does not exist (not-found state)', () => {
      const pending$ = new BehaviorSubject<FishingSession | undefined>(undefined);
      sessionService.watchById.mockReturnValueOnce(pending$.asObservable());
      const component = create();
      expect(component.session()).toBeUndefined();
    });

    it('formats the timer as HH:mm:ss', () => {
      const component = create();
      expect(component.timer()).toBe('01:02:03');
    });

    it('splits visible rods into active (tiles) and inactive (compact), sorted by number', () => {
      session$.next(
        baseSession({ rods: [rod(3), rod(1, { isActive: false }), rod(2)] }),
      );
      const component = create();
      expect(component.activeRods().map((r) => r.id)).toEqual(['rod-2', 'rod-3']);
      expect(component.inactiveRods().map((r) => r.id)).toEqual(['rod-1']);
    });

    it('shows the swim in the top strip only when all rods share one spot', () => {
      const spots = [
        { id: 'sp-1', name: 'Swim 4' },
        { id: 'sp-2', name: 'Swim 5' },
      ] as FishingSession['sessionSpots'];
      session$.next(
        baseSession({
          sessionSpots: spots,
          rods: [rod(1, { sessionSpotId: 'sp-1' }), rod(2, { sessionSpotId: 'sp-1' })],
        }),
      );
      const component = create();
      expect(component.sharedSwim()).toBe('Swim 4');

      session$.next(
        baseSession({
          sessionSpots: spots,
          rods: [rod(1, { sessionSpotId: 'sp-1' }), rod(2, { sessionSpotId: 'sp-2' })],
        }),
      );
      expect(component.sharedSwim()).toBe('');
    });

    it('summarises rods (total, active, bites, spotted)', () => {
      session$.next(
        baseSession({
          rods: [rod(1, { biteCount: 2, fishSpottedCount: 1 }), rod(2, { isActive: false, biteCount: 1 })],
        }),
      );
      const component = create();
      expect(component.rodSummary()).toEqual({ total: 2, active: 1, bites: 3, spotted: 1 });
    });
  });

  describe('weather', () => {
    it('shows weather alerts only while live and when warnings are enabled', () => {
      const warning = { type: 'wind', message: 'Strong wind', severity: 'warning' } as const;
      weatherService.getWarnings.mockReturnValue([warning]);
      session$.next(baseSession({ weather: weather(1013, '2026-07-23T08:00:00.000Z') }));
      const component = create();
      expect(component.weatherAlerts()).toEqual([warning]);

      settings.showWeatherWarnings = false;
      session$.next(baseSession({ weather: weather(1013, '2026-07-23T08:05:00.000Z') }));
      expect(component.weatherAlerts()).toEqual([]);

      settings.showWeatherWarnings = true;
      session$.next(
        baseSession({ status: 'completed', weather: weather(1013, '2026-07-23T08:10:00.000Z') }),
      );
      expect(component.weatherAlerts()).toEqual([]);
    });

    it('derives the pressure trend from the last two weather snapshots', () => {
      const record = (id: string, hpa: number, at: string): SessionWeatherRecord => ({
        id,
        sessionId: 'session-1',
        capturedAt: at,
        weather: weather(hpa, at),
      });
      const component = create();
      expect(component.pressureTrend()).toBeUndefined();

      weather$.next([
        record('b', 1010, '2026-07-23T10:00:00.000Z'),
        record('a', 1014, '2026-07-23T09:00:00.000Z'),
      ]);
      expect(component.pressureTrend()).toBe('falling');

      weather$.next([
        record('a', 1010, '2026-07-23T09:00:00.000Z'),
        record('b', 1012, '2026-07-23T10:00:00.000Z'),
      ]);
      expect(component.pressureTrend()).toBe('rising');

      weather$.next([
        record('a', 1010, '2026-07-23T09:00:00.000Z'),
        record('b', 1010.4, '2026-07-23T10:00:00.000Z'),
      ]);
      expect(component.pressureTrend()).toBe('steady');
    });

    it('refreshes weather and GPS with a success snackbar', async () => {
      const component = create();
      await component.refreshWeather();
      expect(sessionService.refreshWeather).toHaveBeenCalledWith('session-1');
      expect(notify.success).toHaveBeenCalledWith('weather.updated');
    });

    it('shows an error snackbar when the weather refresh fails', async () => {
      sessionService.refreshWeather.mockRejectedValueOnce(new Error('offline'));
      const component = create();
      await component.refreshWeather();
      expect(notify.error).toHaveBeenCalledWith('weather.refreshFailed');
    });
  });

  describe('rods', () => {
    it('Bite +1 adds a bite and offers Undo that removes it again', async () => {
      const r = rod(2);
      session$.next(baseSession({ rods: [r] }));
      const component = create();

      await component.addBite(r);

      expect(biteService.addBite).toHaveBeenCalledWith('session-1', 'rod-2');
      expect(notify.withAction).toHaveBeenCalledWith(
        'sessionScreen.biteLogged {"n":2}',
        'sessionScreen.undo',
        expect.any(Function),
        'success',
        5000,
      );
      const undo = notify.withAction.mock.calls[0][2] as () => void;
      undo();
      expect(biteService.removeBite).toHaveBeenCalledWith('session-1', 'rod-2');
    });

    it('Catch opens the catch sheet for that rod (replaces instant / quick catch)', async () => {
      const r = rod(1);
      session$.next(baseSession({ rods: [r] }));
      const component = create();

      await component.openCatch(r);

      expect(bottomSheet.open).toHaveBeenCalledWith(
        CatchSheetComponent,
        expect.objectContaining({
          data: { rodId: 'rod-1', session: expect.objectContaining({ id: 'session-1' }) },
        }),
      );
    });

    it('opens the rod sheet for a rod', async () => {
      const r = rod(3);
      session$.next(baseSession({ rods: [r] }));
      const component = create();

      await component.openRod(r);

      expect(bottomSheet.open).toHaveBeenCalledWith(
        RodSheetComponent,
        expect.objectContaining({
          data: expect.objectContaining({
            session: expect.objectContaining({ id: 'session-1' }),
            rodId: 'rod-3',
          }),
        }),
      );
    });

    it('adds rods from the "No rods yet" stepper (clamped to 1…maxRodCount)', async () => {
      const component = create();
      component.changeNewRodCount(-5);
      expect(component.newRodCount()).toBe(1);
      component.changeNewRodCount(10);
      expect(component.newRodCount()).toBe(6);
      component.changeNewRodCount(-3);

      await component.addRods();

      expect(rodService.ensureRods).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'session-1' }),
        3,
      );
      expect(notify.success).toHaveBeenCalledWith('sessionScreen.rodsAdded');
    });

    it('recasts the rod picked in the recast dialog', async () => {
      session$.next(baseSession({ rods: [rod(1), rod(2)] }));
      dialog.open.mockReturnValue({ afterClosed: () => of({ rodId: 'rod-2', sessionSpotId: 'sp-9' }) });
      const component = create();

      await component.recastRod();

      expect(rodService.recast).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'session-1' }),
        'rod-2',
        'sp-9',
      );
      expect(notify.success).toHaveBeenCalledWith('rod.recastSuccess');
    });

    it('does nothing when the recast dialog is cancelled', async () => {
      session$.next(baseSession({ rods: [rod(1)] }));
      dialog.open.mockReturnValue({ afterClosed: () => of(undefined) });
      const component = create();

      await component.recastRod();

      expect(rodService.recast).not.toHaveBeenCalled();
    });
  });

  describe('photos', () => {
    it('loads session and catch images into the gallery', async () => {
      getSessionImages.mockResolvedValue([photo('img-session', 'session'), photo('img-catch', 'catch')]);

      const component = create();
      await vi.waitFor(() =>
        expect(component.sessionImages().map((i) => i.id)).toEqual(['img-session', 'img-catch']),
      );
      expect(getSessionImages).toHaveBeenCalledWith('session-1', expect.any(Array));
    });

    it('appends uploaded image ids to session photoIds', async () => {
      const component = create();

      await component.onImageUploaded('new-photo');

      expect(update).toHaveBeenCalledWith('session-1', { photoIds: ['new-photo'] });
    });

    it('adds a camera photo from the action bar and reloads the photos', async () => {
      const file = new File(['x'], 'shot.jpg', { type: 'image/jpeg' });
      photoPick.pickImage.mockResolvedValueOnce(file);
      const component = create();
      getSessionImages.mockClear();

      await component.addSessionPhoto(true);

      expect(photoPick.pickImage).toHaveBeenCalledWith({ capture: true });
      expect(sessionService.addSessionPhoto).toHaveBeenCalledWith('session-1', file);
      expect(getSessionImages).toHaveBeenCalled();
    });

    it('does not add a photo when the picker is cancelled', async () => {
      const component = create();

      await component.addSessionPhoto(false);

      expect(photoPick.pickImage).toHaveBeenCalledWith({ capture: false });
      expect(sessionService.addSessionPhoto).not.toHaveBeenCalled();
    });

    it('prunes deleted photo ids after a gallery delete', async () => {
      session$.next(baseSession({ photoIds: ['keep', 'gone'] }));
      imageGetById.mockImplementation(async (id: string) =>
        id === 'keep' ? photo('keep', 'session') : undefined,
      );
      const component = create();

      await component.onImagesChanged();

      expect(update).toHaveBeenCalledWith('session-1', { photoIds: ['keep'] });
    });
  });

  describe('notes', () => {
    it('hydrates notes and prebait, saves both on blur', async () => {
      session$.next(baseSession({ notes: 'windy', prebait: 'boilies' }));
      const component = create();
      TestBed.tick();
      expect(component.notes()).toBe('windy');
      expect(component.prebait()).toBe('boilies');

      component.notes.set('windy, then calm');
      await component.saveNotes();

      expect(update).toHaveBeenCalledWith('session-1', {
        notes: 'windy, then calm',
        prebait: 'boilies',
      });
    });

    it('keeps typed notes when another session write (e.g. a bite) arrives', () => {
      session$.next(baseSession({ notes: 'a' }));
      const component = create();
      TestBed.tick();
      component.notes.set('a, typing…');

      session$.next(baseSession({ notes: 'a', rods: [rod(1, { biteCount: 1 })] }));
      TestBed.tick();

      expect(component.notes()).toBe('a, typing…');
    });
  });

  describe('session actions', () => {
    it('navigates to the session edit page', () => {
      const component = create();
      component.editSession();
      expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1', 'edit'], {
        queryParams: { returnUrl: '/sessions/session-1' },
      });
    });

    it('opens a catch for editing', () => {
      const component = create();
      component.editCatch('c-1');
      expect(navigate).toHaveBeenCalledWith(
        ['/sessions', 'session-1', 'catches', 'c-1', 'edit'],
        { queryParams: { returnUrl: '/sessions/session-1' } },
      );
    });

    it('ends the session after confirm and opens the summary', async () => {
      const component = create();

      await component.endSession();

      expect(confirm.confirm).toHaveBeenCalled();
      expect(sessionService.complete).toHaveBeenCalledWith('session-1');
      expect(notify.success).toHaveBeenCalledWith('activeSession.sessionEnded');
      expect(navigate).toHaveBeenCalledWith(['/sessions', 'session-1', 'summary'], {
        replaceUrl: true,
      });
    });

    it('does not end the session when the confirm is cancelled', async () => {
      confirm.confirm.mockResolvedValueOnce(false);
      const component = create();

      await component.endSession();

      expect(sessionService.complete).not.toHaveBeenCalled();
    });

    it('shows an error when ending the session fails', async () => {
      sessionService.complete.mockRejectedValueOnce(new Error('db'));
      const component = create();

      await component.endSession();

      expect(notify.error).toHaveBeenCalledWith('activeSession.endFailed');
    });

    it('deletes the session after confirm and returns to the list', async () => {
      const component = create();

      await component.deleteSession();

      expect(confirm.confirmDelete).toHaveBeenCalledWith(
        'sessionDetail.deleteSessionQuestion',
        'Morning session',
      );
      expect(sessionService.delete).toHaveBeenCalledWith('session-1');
      expect(navigate).toHaveBeenCalledWith(['/sessions']);
    });
  });
});
