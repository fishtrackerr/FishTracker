import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { AppStartupService } from './core/services/app-startup.service';
import { ThemeService } from './core/services/theme.service';
import { I18nService } from './core/services/i18n.service';
import { SwUpdateService } from './core/services/sw-update.service';
import { VersionCheckService } from './core/services/version-check.service';
import { PwaInstallService } from './core/services/pwa-install.service';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: AppStartupService,
          useValue: {
            isReady: signal(true).asReadonly(),
            dbRecoveryKind: signal(null).asReadonly(),
            dbOpenError: signal(null).asReadonly(),
            dbRetrying: signal(false).asReadonly(),
            performInitialNavigation: vi.fn(),
            retryOpenDb: vi.fn(),
          },
        },
        {
          provide: ThemeService,
          useValue: {},
        },
        {
          provide: I18nService,
          useValue: {},
        },
        {
          provide: SwUpdateService,
          useValue: { checkForUpdatesNow: vi.fn() },
        },
        {
          provide: VersionCheckService,
          useValue: {},
        },
        {
          provide: PwaInstallService,
          useValue: {
            canInstall: signal(false).asReadonly(),
            showIosHint: signal(false).asReadonly(),
            promptInstall: vi.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows router outlet when startup is ready', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
});
