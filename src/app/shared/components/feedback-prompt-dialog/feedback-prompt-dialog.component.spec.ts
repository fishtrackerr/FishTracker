import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nService } from '../../../core/services/i18n.service';
import { FeedbackPromptDialogComponent } from './feedback-prompt-dialog.component';

describe('FeedbackPromptDialogComponent', () => {
  const close = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [FeedbackPromptDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close } },
        {
          provide: I18nService,
          useValue: {
            t: (key: string) => key,
            language: signal('en'),
            dictionary: signal({}),
          },
        },
      ],
    }).compileComponents();
  });

  it('renders title and message', () => {
    const fixture = TestBed.createComponent(FeedbackPromptDialogComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.textContent).toContain('feedbackPrompt.title');
    expect(root.textContent).toContain('feedbackPrompt.message');
    expect(root.textContent).toContain('feedbackPrompt.send');
    expect(root.textContent).toContain('feedbackPrompt.notNow');
  });

  it('closes on dismiss', () => {
    const component = TestBed.createComponent(FeedbackPromptDialogComponent).componentInstance;
    component.dismiss();
    expect(close).toHaveBeenCalledWith();
  });

  it('closes with send intent and opens mailto', () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);
    const component = TestBed.createComponent(FeedbackPromptDialogComponent).componentInstance;

    component.sendFeedback();

    expect(close).toHaveBeenCalledWith('send');
    expect(open).toHaveBeenCalledWith(
      `mailto:erwin.torrenga@live.nl?subject=${encodeURIComponent('settings.feedbackSubject')}`,
      '_self',
    );

    vi.unstubAllGlobals();
  });
});
