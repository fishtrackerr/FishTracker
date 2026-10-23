import { TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSession } from '../../../core/models';
import { BiteEventService } from '../../../core/services/bite-event.service';
import { DialogService } from '../../../core/services/dialog.service';
import { FishSpottedEventService } from '../../../core/services/fish-spotted-event.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RodService } from '../../../core/services/rod.service';
import { ThemeService } from '../../../core/services/theme.service';
import { NEW_SPOT_VALUE, RodSheetComponent } from './rod-sheet.component';

const PROMPT_VALUE = '__prompt__';

function makeSession(biteCount = 2): FishingSession {
  return {
    id: 's-1',
    name: 'Night',
    status: 'active',
    startDate: '2026-01-01T10:00:00.000Z',
    sessionSpots: [
      { id: 'sp-1', name: 'Reeds', visible: true },
      { id: 'sp-hidden', name: 'Gone', visible: false },
    ],
    rods: [
      {
        id: 'r-1',
        sessionId: 's-1',
        rodNumber: 2,
        name: 'Rod 2',
        biteCount,
        fishSpottedCount: 1,
        isActive: true,
        sessionSpotId: 'sp-1',
        bait: 'Boilie',
        visible: true,
      },
    ],
  } as FishingSession;
}

describe('RodSheetComponent', () => {
  const dismiss = vi.fn();
  const onSessionChange = vi.fn();
  let rodService: Record<string, ReturnType<typeof vi.fn>>;
  let biteService: { removeBite: ReturnType<typeof vi.fn> };
  let spotted: { register: ReturnType<typeof vi.fn> };
  let dialog: { open: ReturnType<typeof vi.fn> };

  function create(session = makeSession()) {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: { session, rodId: 'r-1', onSessionChange } },
        { provide: MatBottomSheetRef, useValue: { dismiss } },
        { provide: RodService, useValue: rodService },
        { provide: BiteEventService, useValue: biteService },
        { provide: FishSpottedEventService, useValue: spotted },
        { provide: DialogService, useValue: dialog },
        { provide: NotificationService, useValue: { success: vi.fn(), error: vi.fn() } },
        { provide: ThemeService, useValue: { getSelectPanelClass: () => 'panel' } },
      ],
    });
    const fixture = TestBed.createComponent(RodSheetComponent);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
    rodService = {
      recast: vi.fn(async (s: FishingSession) => s),
      updateRod: vi.fn(async (s: FishingSession) => s),
      assignSpot: vi.fn(async (s: FishingSession) => s),
      addSessionSpot: vi.fn(),
    };
    biteService = { removeBite: vi.fn(async () => makeSession(1)) };
    spotted = { register: vi.fn(async () => makeSession()) };
    dialog = { open: vi.fn() };
  });

  it('recasts with the current spot', async () => {
    const component = create().componentInstance;
    await component.recastNow();
    expect(rodService['recast']).toHaveBeenCalledWith(expect.anything(), 'r-1', 'sp-1');
  });

  it('registers fish spotted for the rod', async () => {
    const component = create().componentInstance;
    await component.markFishSpotted();
    expect(spotted.register).toHaveBeenCalledWith({ sessionId: 's-1', rodId: 'r-1' });
  });

  it('removes a bite and uses the returned session', async () => {
    const component = create().componentInstance;
    await component.removeBite();
    expect(biteService.removeBite).toHaveBeenCalledWith('s-1', 'r-1');
    expect(component.rod()?.biteCount).toBe(1);
    expect(onSessionChange).toHaveBeenCalled();
  });

  it('disables bite -1 at zero bites', async () => {
    const fixture = create(makeSession(0));
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      '.bite-minus-btn',
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    await fixture.componentInstance.removeBite();
    expect(biteService.removeBite).not.toHaveBeenCalled();
  });

  it('enables bite -1 when there are bites', () => {
    const button = (create().nativeElement as HTMLElement).querySelector(
      '.bite-minus-btn',
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });

  it('offers only visible spots', () => {
    expect(create().componentInstance.spots().map((s) => s.id)).toEqual(['sp-1']);
  });

  it('saves nothing when no field changed', async () => {
    const component = create().componentInstance;
    await component.save();
    expect(rodService['updateRod']).not.toHaveBeenCalled();
    expect(rodService['assignSpot']).not.toHaveBeenCalled();
    expect(dismiss).toHaveBeenCalled();
  });

  it('saves only the changed fields', async () => {
    const component = create().componentInstance;
    component.editNotes = 'Near the lilies';
    await component.save();
    expect(rodService['updateRod']).toHaveBeenCalledTimes(1);
    expect(rodService['updateRod']).toHaveBeenCalledWith(expect.anything(), 'r-1', {
      notes: 'Near the lilies',
    });
    expect(rodService['assignSpot']).not.toHaveBeenCalled();
  });

  it('creates a new spot from the prompt on save and assigns it', async () => {
    dialog.open.mockReturnValue({ afterClosed: () => of('Island') });
    const withSpot = {
      ...makeSession(),
      sessionSpots: [...(makeSession().sessionSpots ?? []), { id: 'sp-new', name: 'Island' }],
    } as FishingSession;
    rodService['addSessionSpot'].mockResolvedValue({
      session: withSpot,
      spot: { id: 'sp-new', name: 'Island' },
    });
    const component = create().componentInstance;
    await component.onSpotChange(PROMPT_VALUE);
    expect(component.editSpotId()).toBe(NEW_SPOT_VALUE);
    expect(rodService['addSessionSpot']).not.toHaveBeenCalled();

    await component.save();
    expect(rodService['addSessionSpot']).toHaveBeenCalledWith(expect.anything(), 'Island');
    expect(rodService['assignSpot']).toHaveBeenCalledWith(expect.anything(), 'r-1', 'sp-new');
  });

  it('keeps the previous spot when the new-spot prompt is cancelled', async () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(undefined) });
    const component = create().componentInstance;
    await component.onSpotChange(PROMPT_VALUE);
    expect(component.editSpotId()).toBe('sp-1');
    await component.save();
    expect(rodService['addSessionSpot']).not.toHaveBeenCalled();
    expect(rodService['assignSpot']).not.toHaveBeenCalled();
  });

  it('passes maxLength 60 to the new-spot prompt', async () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(undefined) });
    const component = create().componentInstance;
    await component.onSpotChange(PROMPT_VALUE);
    expect(dialog.open.mock.calls[0][1].data.maxLength).toBe(60);
  });

  it('visibly restores the select after a cancelled new-spot prompt', async () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(undefined) });
    const fixture = create();
    const component = fixture.componentInstance;
    await fixture.whenStable();
    const select = component.spotSelect()!;
    expect(select.value).toBe('sp-1');
    // The user picked the "+ New spot…" entry: the control shows it.
    select.writeValue(PROMPT_VALUE);
    expect(select.value).toBe(PROMPT_VALUE);
    await component.onSpotChange(PROMPT_VALUE);
    fixture.detectChanges();
    expect(select.value).toBe('sp-1');
    expect(select.triggerValue).toBe('Reeds');
  });

  it('unassigns the spot through assignSpot', async () => {
    const component = create().componentInstance;
    await component.onSpotChange('');
    await component.save();
    expect(rodService['assignSpot']).toHaveBeenCalledWith(expect.anything(), 'r-1', undefined);
  });

  it('takes the rod out', async () => {
    const component = create().componentInstance;
    await component.toggleActive();
    expect(rodService['updateRod']).toHaveBeenCalledWith(expect.anything(), 'r-1', {
      isActive: false,
    });
  });
});
