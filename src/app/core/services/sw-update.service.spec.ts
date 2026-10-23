import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { I18nService } from './i18n.service';
import { NotificationService } from './notification.service';
import { SwUpdateService } from './sw-update.service';

describe('SwUpdateService update prompt', () => {
  afterEach(() => vi.useRealTimers());

  it('shows the prompt again when another snackbar replaced it', () => {
    vi.useFakeTimers();
    const withAction = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        // Disabled SW keeps the constructor from polling; events are fed directly.
        { provide: SwUpdate, useValue: { isEnabled: false } },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: NotificationService, useValue: { withAction } },
        { provide: I18nService, useValue: { t: (key: string) => key } },
      ],
    });
    const service = TestBed.inject(SwUpdateService) as unknown as {
      handleVersionEvent(event: VersionEvent): void;
    };
    const ready = { type: 'VERSION_READY' } as VersionEvent;

    service.handleVersionEvent(ready);
    service.handleVersionEvent(ready);
    expect(withAction).toHaveBeenCalledTimes(1);

    const onDismissWithoutAction = withAction.mock.calls[0][5] as () => void;
    onDismissWithoutAction();
    vi.advanceTimersByTime(10_000);

    expect(withAction).toHaveBeenCalledTimes(2);
  });
});
