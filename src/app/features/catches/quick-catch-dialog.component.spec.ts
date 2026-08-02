import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QuickCatchDialogComponent } from './quick-catch-dialog.component';
import { FishingModeService } from '../../core/services/fishing-mode.service';
import { ThemeService } from '../../core/services/theme.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import type { FishingSession } from '../../core/models';

function createSession(overrides?: Partial<FishingSession>): FishingSession {
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
    rods: [
      {
        id: 'rod-1',
        sessionId: 'session-1',
        rodNumber: 1,
        name: 'Left Rod',
        bait: 'Boilie',
        rig: 'Combi',
        biteCount: 0,
        fishSpottedCount: 0,
        isActive: true,
      },
      {
        id: 'rod-2',
        sessionId: 'session-1',
        rodNumber: 2,
        name: 'Right Rod',
        bait: 'Pellet',
        rig: 'Hinged',
        biteCount: 0,
        fishSpottedCount: 0,
        isActive: true,
      },
    ],
    ...overrides,
  };
}

describe('QuickCatchDialogComponent', () => {
  const close = vi.fn();
  const pickImage = vi.fn<PhotoPickService['pickImage']>();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close,
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { session: createSession() },
        },
        {
          provide: FishingModeService,
          useValue: {
            getActivePreferences: () => ({
              favoriteSpecies: ['Carp', 'Pike'],
              favoriteBaits: [],
              favoriteRigs: [],
            }),
          },
        },
        {
          provide: ThemeService,
          useValue: {
            getSelectPanelClass: () => 'theme-dark-select-panel',
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

  it('builds species list from mode favorites plus Other', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());

    expect(component.speciesList).toEqual(['Carp', 'Pike', 'Other']);
    expect(component.selectPanelClass).toBe('theme-dark-select-panel');
    expect(component.rodId).toBe('rod-1');
    expect(component.bait).toBe('Boilie');
  });

  it('does not save without a non-empty species', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    component.species = '   ';

    component.save();

    expect(component.saving()).toBe(false);
    expect(close).not.toHaveBeenCalled();
  });

  it('does not save without a rod', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    component.species = 'Carp';
    component.rodId = '';

    component.save();

    expect(close).not.toHaveBeenCalled();
  });

  it('does not save if a save is already in progress', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    component.species = 'Carp';
    component.saving.set(true);

    component.save();

    expect(close).not.toHaveBeenCalled();
  });

  it('trims species and closes with normalized payload including rodId', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    component.species = '  Carp  ';
    component.rodId = 'rod-2';
    component.weightKg = 7.4;
    component.lengthCm = 82;
    component.bait = '';
    component.rig = 'Combi';
    component.notes = '';
    component.released = true;

    component.save();

    expect(component.saving()).toBe(true);
    expect(close).toHaveBeenCalledWith({
      species: 'Carp',
      rodId: 'rod-2',
      weightKg: 7.4,
      lengthCm: 82,
      bait: undefined,
      rig: 'Combi',
      released: true,
      photo: undefined,
      notes: undefined,
    });
  });

  it('stores selected photo when user picks an image', async () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    const file = new File(['image'], 'quick.jpg', { type: 'image/jpeg' });
    pickImage.mockResolvedValue(file);

    await component.pickPhoto(true);

    expect(pickImage).toHaveBeenCalledWith({ capture: true });
    expect(component.photo).toBe(file);
  });

  it('opens gallery picker without camera capture', async () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    pickImage.mockResolvedValue(null);

    await component.pickPhoto(false);

    expect(pickImage).toHaveBeenCalledWith({ capture: false });
  });
});
