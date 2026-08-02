import { PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PinUnlockComponent } from './pin-unlock.component';
import { AppStartupService } from '../../core/services/app-startup.service';
import { AppVersionService } from '../../core/services/app-version.service';
import { I18nService } from '../../core/services/i18n.service';
import { PinLockService } from '../../core/services/pin-lock.service';
import { Router } from '@angular/router';
import { SwUpdateService } from '../../core/services/sw-update.service';

describe('PinUnlockComponent', () => {
  const translations: Record<string, string> = {
    'pin.unlock': 'Unlock',
    'pin.enterPin': 'Enter your 6-digit PIN',
    'pin.appVersion': 'App version',
    'pin.checkForUpdates': 'Check for updates',
    'pin.checkingForUpdates': 'Checking for updates...',
    'pin.incorrectPin': 'Incorrect PIN',
  };

  let swUpdateService: { checkForUpdatesNow: ReturnType<typeof vi.fn> };
  let appVersion: { version: ReturnType<typeof signal>; refreshInstalledVersion: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    swUpdateService = {
      checkForUpdatesNow: vi.fn().mockResolvedValue(true),
    };
    appVersion = {
      version: signal('2.3.4'),
      refreshInstalledVersion: vi.fn().mockResolvedValue('2.3.4'),
    };

    await TestBed.configureTestingModule({
      imports: [PinUnlockComponent],
      providers: [
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: vi.fn().mockResolvedValue(true),
          },
        },
        {
          provide: PinLockService,
          useValue: {
            verifyPin: vi.fn().mockResolvedValue({ ok: true }),
            getLockoutRemainingMs: vi.fn().mockReturnValue(0),
            hasPinConfigured: vi.fn(),
            isAppLocked: vi.fn(),
          },
        },
        {
          provide: AppStartupService,
          useValue: {
            consumeReturnUrl: vi.fn().mockReturnValue('/'),
            resolveInitialRoute: vi.fn().mockResolvedValue('/'),
          },
        },
        {
          provide: I18nService,
          useValue: {
            language: signal('en'),
            dictionary: signal({}),
            t: (key: string) => translations[key] ?? key,
          },
        },
        {
          provide: SwUpdateService,
          useValue: swUpdateService,
        },
        {
          provide: AppVersionService,
          useValue: appVersion,
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the installed version and checks for updates without remote bypass label', async () => {
    const fixture = TestBed.createComponent(PinUnlockComponent);
    fixture.detectChanges();

    await fixture.componentInstance.checkForUpdates();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.version').textContent).toContain('v2.3.4');

    const button = fixture.nativeElement.querySelector('button.update-refresh') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Check for updates');

    expect(swUpdateService.checkForUpdatesNow).toHaveBeenCalledTimes(1);
    expect(appVersion.refreshInstalledVersion).toHaveBeenCalled();
  });

  it('invokes the update check when the button is pressed', async () => {
    const fixture = TestBed.createComponent(PinUnlockComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.update-refresh') as HTMLButtonElement;
    const refreshSpy = vi
      .spyOn(fixture.componentInstance, 'checkForUpdates')
      .mockResolvedValue(undefined);

    button.click();

    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });
});
