import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PRIVACY_WELCOME_SEEN_KEY } from '../constants/storage-keys';
import { PrivacyWelcomeDialogComponent } from '../../shared/components/privacy-welcome-dialog/privacy-welcome-dialog.component';
import { DialogService } from './dialog.service';
import { PrivacyWelcomeService } from './privacy-welcome.service';

describe('PrivacyWelcomeService', () => {
  let open: ReturnType<typeof vi.fn>;
  let afterClosed$: Subject<void>;

  beforeEach(() => {
    localStorage.removeItem(PRIVACY_WELCOME_SEEN_KEY);
    afterClosed$ = new Subject<void>();
    open = vi.fn().mockReturnValue({
      afterClosed: () => afterClosed$.asObservable(),
    });

    TestBed.configureTestingModule({
      providers: [
        PrivacyWelcomeService,
        { provide: DialogService, useValue: { open } },
      ],
    });
  });

  afterEach(() => {
    localStorage.removeItem(PRIVACY_WELCOME_SEEN_KEY);
  });

  it('shows the welcome dialog on first open and marks it seen', async () => {
    const service = TestBed.inject(PrivacyWelcomeService);

    const pending = service.maybeShow();
    await vi.waitFor(() => {
      expect(open).toHaveBeenCalledWith(
        PrivacyWelcomeDialogComponent,
        expect.objectContaining({ disableClose: true }),
      );
    });

    afterClosed$.next();
    afterClosed$.complete();
    await pending;

    expect(localStorage.getItem(PRIVACY_WELCOME_SEEN_KEY)).toBe('1');
  });

  it('does not open again after the welcome was acknowledged', async () => {
    localStorage.setItem(PRIVACY_WELCOME_SEEN_KEY, '1');
    const service = TestBed.inject(PrivacyWelcomeService);

    await service.maybeShow();

    expect(open).not.toHaveBeenCalled();
  });

  it('does not open a second dialog while one is already open', async () => {
    const service = TestBed.inject(PrivacyWelcomeService);

    const first = service.maybeShow();
    await vi.waitFor(() => expect(open).toHaveBeenCalledTimes(1));
    await service.maybeShow();

    expect(open).toHaveBeenCalledTimes(1);

    afterClosed$.next();
    afterClosed$.complete();
    await first;
  });
});
