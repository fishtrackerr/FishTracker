import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nService } from '../../../core/services/i18n.service';
import { ReleaseNotesData } from '../../../core/services/release-notes.service';
import { WhatsNewDialogComponent } from './whats-new-dialog.component';

describe('WhatsNewDialogComponent', () => {
  const close = vi.fn();
  const navigateByUrl = vi.fn().mockResolvedValue(true);
  const notes: ReleaseNotesData = {
    version: '0.0.28',
    date: '2026-08-01',
    sections: [
      {
        category: 'New Features',
        items: [{ message: 'Add whats new dialog' }],
      },
    ],
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [WhatsNewDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: notes },
        { provide: MatDialogRef, useValue: { close } },
        { provide: Router, useValue: { navigateByUrl } },
        {
          provide: I18nService,
          useValue: {
            t: (key: string, params?: Record<string, string | number>) =>
              params ? `${key}:${JSON.stringify(params)}` : key,
            language: signal('en'),
            dictionary: signal({}),
          },
        },
      ],
    }).compileComponents();
  });

  it('renders version title and change items', () => {
    const fixture = TestBed.createComponent(WhatsNewDialogComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.textContent).toContain('whatsNew.title');
    expect(root.textContent).toContain('Add whats new dialog');
    expect(root.textContent).toContain('New Features');
  });

  it('closes on dismiss', () => {
    const component = TestBed.createComponent(WhatsNewDialogComponent).componentInstance;
    component.dismiss();
    expect(close).toHaveBeenCalled();
  });

  it('navigates to changelog then closes', () => {
    const component = TestBed.createComponent(WhatsNewDialogComponent).componentInstance;
    component.viewChangelog();

    expect(close).toHaveBeenCalled();
    expect(navigateByUrl).toHaveBeenCalledWith('/release-notes');
  });
});
