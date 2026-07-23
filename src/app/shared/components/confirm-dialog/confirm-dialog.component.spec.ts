import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  const close = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'End Session',
            message: 'Are you sure?',
            confirmLabel: 'End Session',
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close,
          },
        },
      ],
    }).compileComponents();
  });

  it('renders cancel as stroked button and confirm as flat button', () => {
    const fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const cancelButton = root.querySelector('button.cancel-btn');
    const confirmButton = root.querySelector('button.confirm-btn');

    expect(cancelButton).toBeTruthy();
    expect(confirmButton).toBeTruthy();
  });

  it('closes true when confirm is triggered', () => {
    const component = TestBed.createComponent(ConfirmDialogComponent).componentInstance;

    component.confirm();

    expect(close).toHaveBeenCalledWith(true);
  });
});
