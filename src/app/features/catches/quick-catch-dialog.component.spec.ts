import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QuickCatchDialogComponent } from './quick-catch-dialog.component';
import { SettingsService } from '../../core/services/settings.service';
import { ThemeService } from '../../core/services/theme.service';

describe('QuickCatchDialogComponent', () => {
  const close = vi.fn();

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
          provide: SettingsService,
          useValue: {
            get: () => ({
              favoriteSpecies: ['Carp', 'Pike'],
            }),
          },
        },
        {
          provide: ThemeService,
          useValue: {
            getSelectPanelClass: () => 'theme-dark-select-panel',
          },
        },
      ],
    });
  });

  it('builds species list from favorites plus defaults', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());

    expect(component.speciesList).toEqual([
      'Carp',
      'Pike',
      'Catfish',
      'Zander',
      'Tench',
      'Other',
    ]);
    expect(component.selectPanelClass).toBe('theme-dark-select-panel');
  });

  it('does not save without a non-empty species', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    component.species = '   ';

    component.save();

    expect(component.saving()).toBe(false);
    expect(close).not.toHaveBeenCalled();
  });

  it('does not save if a save is already in progress', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    component.species = 'Carp';
    component.saving.set(true);

    component.save();

    expect(close).not.toHaveBeenCalled();
  });

  it('trims species and closes with normalized payload', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    component.species = '  Carp  ';
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
      weightKg: 7.4,
      lengthCm: 82,
      bait: undefined,
      rig: 'Combi',
      released: true,
      photo: undefined,
      notes: undefined,
    });
  });

  it('stores selected photo when user picks an image', () => {
    const component = TestBed.runInInjectionContext(() => new QuickCatchDialogComponent());
    const file = new File(['image'], 'quick.jpg', { type: 'image/jpeg' });
    const fakeInput = document.createElement('input');
    Object.defineProperty(fakeInput, 'files', {
      value: [file],
      configurable: true,
    });
    const clickSpy = vi.spyOn(fakeInput, 'click').mockImplementation(() => undefined);

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(fakeInput);

    component.pickPhoto();
    if (fakeInput.onchange) {
      fakeInput.onchange(new Event('change'));
    }

    expect(clickSpy).toHaveBeenCalled();
    expect(component.photo).toBe(file);
    clickSpy.mockRestore();
    createElementSpy.mockRestore();
  });
});
