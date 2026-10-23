import { TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DialogService } from '../../../core/services/dialog.service';
import { I18nService } from '../../../core/services/i18n.service';
import { ThemeService } from '../../../core/services/theme.service';
import {
  StartSessionSheetComponent,
  StartSessionSheetData,
  StartSessionSheetResult,
} from './start-session-sheet.component';

describe('StartSessionSheetComponent', () => {
  const dismiss = vi.fn();
  const openDialog = vi.fn();

  const lakes = [
    {
      id: 'l1',
      name: 'Lake One',
      isFavorite: false,
      spots: [
        { id: 's1', name: 'Reeds', isFavorite: false },
        { id: 's2', name: 'Hidden', isFavorite: false, visible: false },
      ],
    },
    { id: 'l2', name: 'Lake Two', isFavorite: false, spots: [{ id: 's3', name: 'Dam' }] },
  ];

  function create(data: Partial<StartSessionSheetData> = {}): StartSessionSheetComponent {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: { lakes, defaultRodCount: 1, maxRodCount: 4, ...data },
        },
        { provide: MatBottomSheetRef, useValue: { dismiss } },
        { provide: DialogService, useValue: { open: openDialog } },
        { provide: ThemeService, useValue: { getSelectPanelClass: () => 'sel' } },
        {
          provide: I18nService,
          useValue: {
            t: vi.fn((key: string, params?: { lake?: string }) =>
              params?.lake ? `${key}:${params.lake}` : key,
            ),
          },
        },
      ],
    });
    return TestBed.runInInjectionContext(() => new StartSessionSheetComponent());
  }

  function answerPrompt(value: string | undefined): void {
    openDialog.mockReturnValue({ afterClosed: () => of(value) });
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('defaults to the last used lake, its name and the given rod count', () => {
    const sheet = create({ defaultLakeId: 'l2', defaultRodCount: 3 });

    expect(sheet.lakeId()).toBe('l2');
    expect(sheet.rodCount()).toBe(3);
    expect(sheet.name).toBe('sessions.defaultNameAtLake:Lake Two');
    expect(sheet.lakeSpots().map((s) => s.name)).toEqual(['Dam']);
    expect(sheet.swim()).toBeUndefined();
  });

  it('defaults to no lake and the generic name', () => {
    const sheet = create();

    expect(sheet.lakeId()).toBe('');
    expect(sheet.name).toBe('sessions.defaultName');
    expect(sheet.lakeSpots()).toEqual([]);
  });

  it('keeps the rod stepper between 1 and the maximum', () => {
    const sheet = create({ defaultRodCount: 9 });
    expect(sheet.rodCount()).toBe(4);

    sheet.incrementRods();
    expect(sheet.rodCount()).toBe(4);

    for (let i = 0; i < 6; i++) {
      sheet.decrementRods();
    }
    expect(sheet.rodCount()).toBe(1);
  });

  it('lists only visible lake spots and resets the swim when the lake changes', () => {
    const sheet = create({ defaultLakeId: 'l1' });
    expect(sheet.lakeSpots().map((s) => s.name)).toEqual(['Reeds']);

    sheet.toggleSpot(sheet.lakeSpots()[0]);
    expect(sheet.swim()).toEqual({ lakeSpotId: 's1' });

    sheet.onLakeChange('l2');
    expect(sheet.swim()).toBeUndefined();
    expect(sheet.lakeSpots().map((s) => s.name)).toEqual(['Dam']);
  });

  it('toggles a spot chip off again', () => {
    const sheet = create({ defaultLakeId: 'l1' });
    const spot = sheet.lakeSpots()[0];

    sheet.toggleSpot(spot);
    sheet.toggleSpot(spot);

    expect(sheet.swim()).toBeUndefined();
  });

  it('only follows the lake in the name until the name is edited', () => {
    const sheet = create({ defaultLakeId: 'l1' });
    sheet.onLakeChange('l2');
    expect(sheet.name).toBe('sessions.defaultNameAtLake:Lake Two');

    sheet.onNameChange('My trip');
    sheet.onLakeChange('l1');
    expect(sheet.name).toBe('My trip');
  });

  it('adds a new swim through the text prompt', async () => {
    const sheet = create({ defaultLakeId: 'l1' });
    answerPrompt('  The Point ');

    await sheet.addSwim();

    expect(sheet.swim()).toEqual({ newName: 'The Point' });
  });

  it('picks the existing swim instead of duplicating a name', async () => {
    const sheet = create({ defaultLakeId: 'l1' });
    answerPrompt('reeds');

    await sheet.addSwim();

    expect(sheet.swim()).toEqual({ lakeSpotId: 's1' });
  });

  it('keeps the current swim when the prompt is cancelled', async () => {
    const sheet = create({ defaultLakeId: 'l1' });
    sheet.toggleSpot(sheet.lakeSpots()[0]);
    answerPrompt(undefined);

    await sheet.addSwim();

    expect(sheet.swim()).toEqual({ lakeSpotId: 's1' });
  });

  it('submits the chosen values', () => {
    const sheet = create({ defaultLakeId: 'l1', defaultRodCount: 2 });
    sheet.incrementRods();
    sheet.toggleSpot(sheet.lakeSpots()[0]);
    sheet.prebait = ' Boilies ';
    sheet.startDateLocal = '2026-08-01T08:30';

    sheet.start();

    expect(dismiss).toHaveBeenCalledOnce();
    const result = dismiss.mock.calls[0][0] as StartSessionSheetResult;
    expect(result).toEqual({
      name: 'sessions.defaultNameAtLake:Lake One',
      startDate: new Date('2026-08-01T08:30').toISOString(),
      lakeId: 'l1',
      rodCount: 3,
      prebait: 'Boilies',
      swim: { lakeSpotId: 's1' },
    });
  });

  it('submits without lake, swim or prebait by default', () => {
    const sheet = create();

    sheet.start();

    const result = dismiss.mock.calls[0][0] as StartSessionSheetResult;
    expect(result.lakeId).toBeUndefined();
    expect(result.swim).toBeUndefined();
    expect(result.prebait).toBeUndefined();
    expect(result.rodCount).toBe(1);
  });

  it('does not submit without a name and close dismisses with nothing', () => {
    const sheet = create();
    sheet.onNameChange('   ');

    expect(sheet.canStart()).toBe(false);
    sheet.start();
    expect(dismiss).not.toHaveBeenCalled();

    sheet.close();
    expect(dismiss).toHaveBeenCalledWith();
  });
});
