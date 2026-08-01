import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_PUBLIC_URL } from '../constants/app-public-url';
import { I18nService } from './i18n.service';
import { ShareService } from './share.service';

describe('ShareService', () => {
  const open = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('open', open);
    TestBed.configureTestingModule({
      providers: [
        ShareService,
        {
          provide: I18nService,
          useValue: {
            t: (_key: string, params?: Record<string, string>) =>
              `Check out Fish Tracker: ${params?.['url'] ?? ''}`,
          },
        },
      ],
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('opens WhatsApp with the public deploy URL in the message', () => {
    const service = TestBed.inject(ShareService);

    service.shareAppViaWhatsApp();

    expect(open).toHaveBeenCalledTimes(1);
    const [href, target, features] = open.mock.calls[0] as [string, string, string];
    expect(target).toBe('_blank');
    expect(features).toBe('noopener,noreferrer');
    expect(href.startsWith('https://wa.me/?text=')).toBe(true);
    expect(decodeURIComponent(href.slice('https://wa.me/?text='.length))).toContain(APP_PUBLIC_URL);
  });
});
