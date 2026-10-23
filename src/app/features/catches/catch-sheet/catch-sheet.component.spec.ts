import { TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Catch, FishingSession } from '../../../core/models';
import { CatchService } from '../../../core/services/catch.service';
import { DialogService } from '../../../core/services/dialog.service';
import { FishingModeService } from '../../../core/services/fishing-mode.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PhotoPickService } from '../../../core/services/photo-pick.service';
import { SettingsService } from '../../../core/services/settings.service';
import { CatchSheetComponent } from './catch-sheet.component';

function rod(n: number, extra: Record<string, unknown> = {}) {
  return {
    id: `rod-${n}`,
    sessionId: 's1',
    rodNumber: n,
    name: `Rod ${n}`,
    bait: `Bait ${n}`,
    rig: `Rig ${n}`,
    biteCount: 0,
    fishSpottedCount: 0,
    isActive: true,
    ...extra,
  };
}

const session = {
  id: 's1',
  rods: [rod(1, { sessionSpotId: 'sp1' }), rod(2), rod(3, { visible: false })],
  sessionSpots: [{ id: 'sp1', name: 'Reeds' }],
} as unknown as FishingSession;

function c(id: string, species: string, caughtAt: string, extra: Partial<Catch> = {}): Catch {
  return { id, sessionId: 's1', species, caughtAt, ...extra } as Catch;
}

describe('CatchSheetComponent', () => {
  const dismiss = vi.fn();
  const create = vi.fn();
  const del = vi.fn();
  const withAction = vi.fn();
  const navigate = vi.fn();
  const watchBySession = vi.fn();
  const watchAll = vi.fn();
  let settings = { weightUnit: 'kg', lengthUnit: 'cm' };

  async function setup(data: { rodId?: string } = {}) {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatBottomSheetRef, useValue: { dismiss } },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: { session, ...data } },
        { provide: CatchService, useValue: { create, delete: del, watchBySession, watchAll } },
        {
          provide: FishingModeService,
          useValue: { getActivePreferences: () => ({ favoriteSpecies: ['Carp', 'Pike'] }) },
        },
        { provide: PhotoPickService, useValue: { pickImage: vi.fn() } },
        { provide: DialogService, useValue: {} },
        { provide: NotificationService, useValue: { withAction, error: vi.fn() } },
        { provide: SettingsService, useValue: { get: () => settings } },
        { provide: Router, useValue: { url: '/active', navigate } },
      ],
    });
    const fixture = TestBed.createComponent(CatchSheetComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve));
    return fixture.componentInstance;
  }

  beforeEach(() => {
    vi.clearAllMocks();
    settings = { weightUnit: 'kg', lengthUnit: 'cm' };
    watchBySession.mockReturnValue(of([]));
    watchAll.mockReturnValue(of([]));
    create.mockImplementation(
      async (_id: string, input: Record<string, unknown>) =>
        ({ id: 'new', species: input['species'], weightKg: input['weightKg'] }) as Catch,
    );
  });

  it('preselects the latest catch species of the session', async () => {
    watchBySession.mockReturnValue(of([c('1', 'Perch', '2026-01-01'), c('2', 'Tench', '2026-01-02')]));
    watchAll.mockReturnValue(of([c('9', 'Bream', '2026-01-03')]));
    const cmp = await setup();
    expect(cmp.species()).toBe('Tench');
    expect(cmp.speciesChips()).toContain('Tench');
  });

  it('falls back to the latest catch in the mode', async () => {
    watchAll.mockReturnValue(of([c('1', 'Bream', '2026-01-01'), c('2', 'Ide', '2026-01-05')]));
    expect((await setup()).species()).toBe('Ide');
  });

  it('falls back to the first favourite', async () => {
    expect((await setup()).species()).toBe('Carp');
  });

  it('defaults to the requested rod, lists visible rods only and switches rod', async () => {
    const cmp = await setup({ rodId: 'rod-2' });
    expect(cmp.rodId()).toBe('rod-2');
    expect(cmp.rods.map((r) => r.id)).toEqual(['rod-1', 'rod-2']);
    cmp.selectRod('rod-1');
    expect(cmp.rodId()).toBe('rod-1');
    expect(cmp.rodLine()).toBe('Rod 1 · Reeds · Bait 1');
  });

  it('saves details-pending when weight is empty', async () => {
    const cmp = await setup({ rodId: 'rod-1' });
    await cmp.save();
    const input = create.mock.calls[0][1];
    expect(create.mock.calls[0][0]).toBe('s1');
    expect(input).toMatchObject({
      species: 'Carp',
      rodId: 'rod-1',
      sessionSpotId: 'sp1',
      bait: 'Bait 1',
      rig: 'Rig 1',
      released: true,
      detailsPending: true,
    });
    expect(dismiss).toHaveBeenCalledWith(expect.objectContaining({ id: 'new' }));
  });

  it('saves without details-pending when weight is given (lbs converted to kg)', async () => {
    settings = { weightUnit: 'lbs', lengthUnit: 'cm' };
    const cmp = await setup();
    cmp.weight.set(22.0462);
    await cmp.save();
    const input = create.mock.calls[0][1];
    expect(input.weightKg).toBeCloseTo(10, 3);
    expect(input.detailsPending).toBeUndefined();
  });

  it('undo deletes the catch', async () => {
    const cmp = await setup();
    cmp.weight.set(5);
    await cmp.save();
    expect(withAction).toHaveBeenCalled();
    const onUndo = withAction.mock.calls[0][2] as () => void;
    onUndo();
    expect(del).toHaveBeenCalledWith('new');
  });

  it('all details navigates to the new catch form with rod and return url', async () => {
    const cmp = await setup({ rodId: 'rod-1' });
    cmp.openAllDetails();
    expect(dismiss).toHaveBeenCalledWith(undefined);
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's1', 'catches', 'new'], {
      queryParams: { rodId: 'rod-1', sessionSpotId: 'sp1', returnUrl: '/active' },
    });
  });
});
