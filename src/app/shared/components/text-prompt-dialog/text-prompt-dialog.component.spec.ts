import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DialogService } from '../../../core/services/dialog.service';
import {
  TextPromptDialogComponent,
  TextPromptDialogData,
  promptForText,
} from './text-prompt-dialog.component';

describe('TextPromptDialogComponent', () => {
  const close = vi.fn();

  function setup(data: TextPromptDialogData) {
    TestBed.configureTestingModule({
      imports: [TextPromptDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close } },
      ],
    });
    const fixture = TestBed.createComponent(TextPromptDialogComponent);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title, label and custom button labels', () => {
    const fixture = setup({
      title: 'Rename',
      label: 'Name',
      confirmLabel: 'Apply',
      cancelLabel: 'Back',
    });
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('h2')?.textContent).toContain('Rename');
    expect(root.querySelector('mat-label')?.textContent).toContain('Name');
    const buttons = root.querySelectorAll('button');
    expect(buttons[0]?.textContent).toContain('Back');
    expect(buttons[1]?.textContent).toContain('Apply');
  });

  it('starts with the initial value', () => {
    const fixture = setup({ title: 'Rename', initialValue: 'Carp' });

    expect(fixture.componentInstance.value).toBe('Carp');
  });

  it('closes with the trimmed value on confirm', () => {
    const fixture = setup({ title: 'Add' });
    fixture.componentInstance.value = '  Tench  ';

    fixture.componentInstance.confirm();

    expect(close).toHaveBeenCalledWith('Tench');
  });

  it('does not confirm a blank value', () => {
    const fixture = setup({ title: 'Add' });
    fixture.componentInstance.value = '   ';

    fixture.componentInstance.confirm();

    expect(fixture.componentInstance.canConfirm()).toBe(false);
    expect(close).not.toHaveBeenCalled();
  });
});

describe('promptForText', () => {
  it('opens the dialog through DialogService and returns the trimmed result', async () => {
    const open = vi.fn().mockReturnValue({ afterClosed: () => of(' Bream ') });
    const dialog = { open } as unknown as DialogService;

    const result = await promptForText(dialog, { title: 'Add' });

    expect(open).toHaveBeenCalledWith(
      TextPromptDialogComponent,
      expect.objectContaining({ data: { title: 'Add' } }),
    );
    expect(result).toBe('Bream');
  });

  it('returns undefined when cancelled', async () => {
    const dialog = { open: vi.fn().mockReturnValue({ afterClosed: () => of(undefined) }) } as unknown as DialogService;

    await expect(promptForText(dialog, { title: 'Add' })).resolves.toBeUndefined();
  });
});
