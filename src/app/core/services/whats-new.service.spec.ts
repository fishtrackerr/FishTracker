import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LAST_SEEN_VERSION_KEY } from '../constants/storage-keys';
import { WhatsNewDialogComponent } from '../../shared/components/whats-new-dialog/whats-new-dialog.component';
import { DialogService } from './dialog.service';
import { ReleaseNotesData, ReleaseNotesService } from './release-notes.service';
import { WhatsNewService } from './whats-new.service';

describe('WhatsNewService', () => {
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

  let getReleaseNotes: ReturnType<typeof vi.fn>;
  let open: ReturnType<typeof vi.fn>;
  let afterClosed$: Subject<void>;

  beforeEach(() => {
    localStorage.removeItem(LAST_SEEN_VERSION_KEY);
    getReleaseNotes = vi.fn().mockResolvedValue(notes);
    afterClosed$ = new Subject<void>();
    open = vi.fn().mockReturnValue({
      afterClosed: () => afterClosed$.asObservable(),
    });

    TestBed.configureTestingModule({
      providers: [
        WhatsNewService,
        { provide: ReleaseNotesService, useValue: { getReleaseNotes } },
        { provide: DialogService, useValue: { open } },
      ],
    });
  });

  afterEach(() => {
    localStorage.removeItem(LAST_SEEN_VERSION_KEY);
  });

  it('seeds last-seen version on first visit without opening dialog', async () => {
    const service = TestBed.inject(WhatsNewService);

    await service.maybeShow();

    expect(open).not.toHaveBeenCalled();
    expect(localStorage.getItem(LAST_SEEN_VERSION_KEY)).toBe('0.0.28');
  });

  it('does not open when last-seen version matches current', async () => {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, '0.0.28');
    const service = TestBed.inject(WhatsNewService);

    await service.maybeShow();

    expect(open).not.toHaveBeenCalled();
  });

  it('opens dialog when version changed and persists on dismiss', async () => {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, '0.0.27');
    const service = TestBed.inject(WhatsNewService);

    const pending = service.maybeShow();
    await vi.waitFor(() => {
      expect(open).toHaveBeenCalledWith(
        WhatsNewDialogComponent,
        expect.objectContaining({ data: notes }),
      );
    });
    expect(localStorage.getItem(LAST_SEEN_VERSION_KEY)).toBe('0.0.27');

    afterClosed$.next();
    afterClosed$.complete();
    await pending;

    expect(localStorage.getItem(LAST_SEEN_VERSION_KEY)).toBe('0.0.28');
  });

  it('skips when release notes have no content', async () => {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, '0.0.27');
    getReleaseNotes.mockResolvedValue({
      version: '0.0.28',
      date: '2026-08-01',
      sections: [{ category: 'New Features', items: [] }],
    } satisfies ReleaseNotesData);
    const service = TestBed.inject(WhatsNewService);

    await service.maybeShow();

    expect(open).not.toHaveBeenCalled();
  });

  it('does not open a second dialog while one is already open', async () => {
    localStorage.setItem(LAST_SEEN_VERSION_KEY, '0.0.27');
    const service = TestBed.inject(WhatsNewService);

    const first = service.maybeShow();
    await vi.waitFor(() => expect(open).toHaveBeenCalledTimes(1));
    await service.maybeShow();

    expect(open).toHaveBeenCalledTimes(1);

    afterClosed$.next();
    afterClosed$.complete();
    await first;
  });
});
