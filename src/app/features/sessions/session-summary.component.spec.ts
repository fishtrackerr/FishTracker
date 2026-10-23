import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Catch, FishingSession } from '../../core/models';
import { CatchService } from '../../core/services/catch.service';
import { I18nService } from '../../core/services/i18n.service';
import { LakeService } from '../../core/services/lake.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { SessionSummaryComponent } from './session-summary.component';

function makeSession(extra: Partial<FishingSession> = {}): FishingSession {
  return {
    id: 's-1',
    name: 'Night',
    lakeId: 'lake-1',
    status: 'completed',
    startDate: '2026-08-01T18:00:00.000Z',
    endDate: '2026-08-02T06:30:00.000Z',
    notes: 'Windy',
    sessionSpots: [{ id: 'sp-1', name: 'Reeds', visible: true }],
    rods: [
      {
        id: 'r-2',
        sessionId: 's-1',
        rodNumber: 2,
        name: 'Rod 2',
        biteCount: 1,
        fishSpottedCount: 0,
        isActive: true,
        sessionSpotId: 'sp-1',
        bait: 'Corn',
      },
      {
        id: 'r-1',
        sessionId: 's-1',
        rodNumber: 1,
        name: 'Rod 1',
        biteCount: 3,
        fishSpottedCount: 0,
        isActive: true,
        sessionSpotId: 'sp-1',
        bait: 'Boilie',
      },
    ],
    ...extra,
  } as FishingSession;
}

function makeCatch(id: string, rodId: string, weightKg?: number, extra: Partial<Catch> = {}): Catch {
  return {
    id,
    sessionId: 's-1',
    rodId,
    species: 'Carp',
    caughtAt: '2026-08-01T22:15:00.000Z',
    weightKg,
    ...extra,
  } as Catch;
}

describe('SessionSummaryComponent', () => {
  const navigate = vi.fn().mockResolvedValue(true);
  const update = vi.fn().mockResolvedValue(undefined);
  let session$: BehaviorSubject<FishingSession | undefined>;
  let catches$: BehaviorSubject<Catch[]>;

  function configure(): void {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 's-1' })) },
        },
        { provide: Router, useValue: { navigate } },
        {
          provide: SessionService,
          useValue: {
            watchById: () => session$,
            update,
            getDurationMs: () => 12.5 * 3600 * 1000,
          },
        },
        { provide: CatchService, useValue: { watchBySession: () => catches$ } },
        { provide: LakeService, useValue: { getById: vi.fn().mockResolvedValue({ name: 'Lake A' }) } },
        { provide: SettingsService, useValue: { get: () => ({ weightUnit: 'kg' }) } },
        {
          provide: I18nService,
          useValue: { t: (key: string) => key, language: () => 'en', dictionary: () => ({}) },
        },
      ],
    });
  }

  function create(): SessionSummaryComponent {
    configure();
    const component = TestBed.runInInjectionContext(() => new SessionSummaryComponent());
    TestBed.tick();
    return component;
  }

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
    session$ = new BehaviorSubject<FishingSession | undefined>(makeSession());
    catches$ = new BehaviorSubject<Catch[]>([
      makeCatch('c-1', 'r-1', 4.2),
      makeCatch('c-2', 'r-1', 9.8, { isPersonalRecord: true }),
      makeCatch('c-3', 'r-2'),
    ]);
  });

  it('computes the stat tiles and the biggest fish', () => {
    const c = create();
    expect(c.catchCount()).toBe(3);
    expect(c.biteCount()).toBe(4);
    expect(c.totalWeightKg()).toBeCloseTo(14, 5);
    expect(c.biggest()?.id).toBe('c-2');
    expect(c.biggestRod()?.rodNumber).toBe(1);
    expect(c.duration()).toBe('12:30:00');
  });

  it('has no biggest fish when no catch has a weight', () => {
    catches$.next([makeCatch('c-1', 'r-1')]);
    expect(create().biggest()).toBeUndefined();
  });

  it('lists rods in order with spot, bait, bites and fish', () => {
    const rows = create().rodRows();
    expect(rows.map((r) => r.rod.rodNumber)).toEqual([1, 2]);
    expect(rows[0]).toMatchObject({ spot: 'Reeds', bait: 'Boilie', bites: 3, fish: 2 });
    expect(rows[1]).toMatchObject({ bait: 'Corn', bites: 1, fish: 1 });
  });

  it('shows the swim when all rods share one spot', () => {
    expect(create().swim()).toBe('Reeds');
  });

  it('prefills the notes and saves only changed notes', async () => {
    const c = create();
    expect(c.notes()).toBe('Windy');
    await c.saveNotes();
    expect(update).not.toHaveBeenCalled();
    c.notes.set('Windy, rain at dawn');
    await c.saveNotes();
    expect(update).toHaveBeenCalledWith('s-1', { notes: 'Windy, rain at dawn' });
  });

  it('Open session saves the notes and opens the session screen', async () => {
    const c = create();
    c.notes.set('Last words');
    await c.openSession();
    expect(update).toHaveBeenCalledWith('s-1', { notes: 'Last words' });
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's-1']);
  });

  it('Done saves the notes and goes home', async () => {
    const c = create();
    c.notes.set('Bye');
    await c.done();
    expect(update).toHaveBeenCalledWith('s-1', { notes: 'Bye' });
    expect(navigate).toHaveBeenCalledWith(['/']);
  });

  it('shows the live session screen instead when the session is still active', async () => {
    session$.next(makeSession({ status: 'active' }));
    configure();
    const fixture = TestBed.createComponent(SessionSummaryComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's-1'], { replaceUrl: true });
  });
});
