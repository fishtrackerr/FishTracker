import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FEEDBACK_PROMPT_DATE_KEY } from '../constants/storage-keys';
import { FeedbackPromptDialogComponent } from '../../shared/components/feedback-prompt-dialog/feedback-prompt-dialog.component';
import { DialogService } from './dialog.service';
import { FeedbackPromptService } from './feedback-prompt.service';

describe('FeedbackPromptService', () => {
  let open: ReturnType<typeof vi.fn>;
  let afterClosed$: Subject<void>;

  function localDateKey(date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  beforeEach(() => {
    localStorage.removeItem(FEEDBACK_PROMPT_DATE_KEY);
    afterClosed$ = new Subject<void>();
    open = vi.fn().mockReturnValue({
      afterClosed: () => afterClosed$.asObservable(),
    });

    TestBed.configureTestingModule({
      providers: [
        FeedbackPromptService,
        { provide: DialogService, useValue: { open } },
      ],
    });
  });

  afterEach(() => {
    localStorage.removeItem(FEEDBACK_PROMPT_DATE_KEY);
  });

  it('opens dialog on first visit when no date is stored', async () => {
    const service = TestBed.inject(FeedbackPromptService);

    const pending = service.maybeShow();
    await vi.waitFor(() => {
      expect(open).toHaveBeenCalledWith(
        FeedbackPromptDialogComponent,
        expect.objectContaining({
          maxWidth: '480px',
          width: 'calc(100vw - 32px)',
        }),
      );
    });

    afterClosed$.next();
    afterClosed$.complete();
    await pending;

    expect(localStorage.getItem(FEEDBACK_PROMPT_DATE_KEY)).toBe(localDateKey());
  });

  it('does not open when already shown today', async () => {
    localStorage.setItem(FEEDBACK_PROMPT_DATE_KEY, localDateKey());
    const service = TestBed.inject(FeedbackPromptService);

    await service.maybeShow();

    expect(open).not.toHaveBeenCalled();
  });

  it('opens again on a different calendar day', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    localStorage.setItem(FEEDBACK_PROMPT_DATE_KEY, localDateKey(yesterday));
    const service = TestBed.inject(FeedbackPromptService);

    const pending = service.maybeShow();
    await vi.waitFor(() => expect(open).toHaveBeenCalledTimes(1));

    afterClosed$.next();
    afterClosed$.complete();
    await pending;

    expect(localStorage.getItem(FEEDBACK_PROMPT_DATE_KEY)).toBe(localDateKey());
  });

  it('does not open a second dialog while one is already open', async () => {
    const service = TestBed.inject(FeedbackPromptService);

    const first = service.maybeShow();
    await vi.waitFor(() => expect(open).toHaveBeenCalledTimes(1));
    await service.maybeShow();

    expect(open).toHaveBeenCalledTimes(1);

    afterClosed$.next();
    afterClosed$.complete();
    await first;
  });
});
