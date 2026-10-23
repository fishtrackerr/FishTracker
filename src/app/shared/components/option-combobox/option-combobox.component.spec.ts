import { SimpleChange } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserOptionService } from '../../../core/services/user-option.service';
import { OptionComboboxComponent } from './option-combobox.component';

describe('OptionComboboxComponent', () => {
  const options = [{ id: 'o1', value: 'Corn', isFavorite: true }];
  let getSortedOptions: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getSortedOptions = vi.fn().mockResolvedValue(options);
    TestBed.configureTestingModule({
      providers: [{ provide: UserOptionService, useValue: { getSortedOptions, saveOption: vi.fn() } }],
    });
  });

  it('loads options only once the category input is set', async () => {
    const component = TestBed.runInInjectionContext(() => new OptionComboboxComponent());
    expect(getSortedOptions).not.toHaveBeenCalled();

    component.category = 'bait';
    component.ngOnChanges({ category: new SimpleChange(undefined, 'bait', true) });

    await vi.waitFor(() => expect(component.options()).toEqual(options));
    expect(getSortedOptions).toHaveBeenCalledWith('bait');
    expect(component.filteredOptions()).toEqual(options);
  });

  it('ignores changes to other inputs', () => {
    const component = TestBed.runInInjectionContext(() => new OptionComboboxComponent());
    component.ngOnChanges({ label: new SimpleChange(undefined, 'Bait', true) });
    expect(getSortedOptions).not.toHaveBeenCalled();
  });
});
