import { Injectable, inject, signal, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { db } from '../db/fish-db';
import { PinLockService } from './pin-lock.service';
import { SessionRepository } from './session.repository';
import { SessionWeatherMonitorService } from './session-weather-monitor.service';
import { consumePersistedReturnUrl, persistReturnUrl } from '../utils/return-url';

export type DbRecoveryKind = 'versionMismatch' | 'upgradeFailed' | 'unknown';

@Injectable({ providedIn: 'root' })
export class AppStartupService {
  private readonly pinLock = inject(PinLockService);
  private readonly sessionRepo = inject(SessionRepository);
  private readonly weatherMonitor = inject(SessionWeatherMonitorService);
  private readonly router = inject(Router);

  private readonly readySignal = signal(false);
  private readonly dbOpenErrorSignal = signal<string | null>(null);
  private readonly dbRecoveryKindSignal = signal<DbRecoveryKind | null>(null);
  private readonly dbRetryingSignal = signal(false);
  private initialNavigationDone = false;
  private postOpenInitDone = false;
  /** Shared across guard + startup so return URL is only consumed once. */
  private pinScreenRedirect?: Promise<string>;

  readonly isReady = this.readySignal.asReadonly();
  readonly dbOpenError = this.dbOpenErrorSignal.asReadonly();
  readonly dbRecoveryKind = this.dbRecoveryKindSignal.asReadonly();
  readonly dbRetrying = this.dbRetryingSignal.asReadonly();

  /**
   * Opens IndexedDB and finishes startup. On open failure, records recovery state and
   * resolves without throwing so the app can still bootstrap and show recovery UI.
   */
  async initialize(): Promise<void> {
    const opened = await this.tryOpenDb();
    if (!opened) {
      return;
    }
    this.finishPostOpenInit();
  }

  /** Retries IndexedDB open after a previous failure. Returns true when ready. */
  async retryOpenDb(): Promise<boolean> {
    if (this.readySignal()) {
      return true;
    }
    this.dbRetryingSignal.set(true);
    try {
      const opened = await this.tryOpenDb();
      if (!opened) {
        return false;
      }
      this.finishPostOpenInit();
      return true;
    } finally {
      this.dbRetryingSignal.set(false);
    }
  }

  private async tryOpenDb(): Promise<boolean> {
    try {
      await db.open();
      this.dbOpenErrorSignal.set(null);
      this.dbRecoveryKindSignal.set(null);
      return true;
    } catch (err) {
      const kind = this.classifyDbOpenError(err);
      const message = err instanceof Error ? err.message : String(err);
      this.dbRecoveryKindSignal.set(kind);
      this.dbOpenErrorSignal.set(message);
      if (isDevMode()) {
        console.error('[AppStartup] db.open failed', kind, err);
      }
      return false;
    }
  }

  private classifyDbOpenError(err: unknown): DbRecoveryKind {
    const name = err instanceof Error ? err.name : '';
    if (name === 'VersionError') {
      return 'versionMismatch';
    }
    if (name === 'UpgradeError') {
      return 'upgradeFailed';
    }
    return 'unknown';
  }

  private finishPostOpenInit(): void {
    if (this.postOpenInitDone) {
      this.readySignal.set(true);
      return;
    }
    this.postOpenInitDone = true;
    this.pinLock.initializeFromStorage();
    this.weatherMonitor.start();
    // Navigation on lock is handled by PinLockService.lock(); only reset redirect cache here.
    this.pinLock.subscribeToLockChanges((locked) => {
      if (locked) {
        this.pinScreenRedirect = undefined;
      }
    });
    this.readySignal.set(true);
    if (isDevMode()) {
      console.debug('[AppStartup] initialized');
    }
  }

  async performInitialNavigation(): Promise<void> {
    if (this.initialNavigationDone) {
      return;
    }
    this.initialNavigationDone = true;

    const intendedPath = this.getIntendedPath();
    const target = await this.resolveInitialRoute(intendedPath);

    if (isDevMode()) {
      console.debug('[AppStartup] initial navigation', { intendedPath, target });
    }

    const current = this.router.url.split('?')[0];
    if (current !== target.split('?')[0]) {
      await this.router.navigateByUrl(target);
    }
  }

  async resolveInitialRoute(intendedUrl?: string): Promise<string> {
    const path = intendedUrl ?? '/';

    const hasPin = this.pinLock.hasPinConfigured();
    const isLocked = this.pinLock.isAppLocked();

    if (path.startsWith('/pin/')) {
      if (path.startsWith('/pin/setup')) {
        if (!hasPin) {
          return '/pin/setup';
        }
        if (isLocked) {
          return '/pin/unlock';
        }
        return this.resolveAfterLeavingPinScreen();
      }

      if (path.startsWith('/pin/unlock')) {
        if (!hasPin) {
          return '/pin/setup';
        }
        if (isLocked) {
          return '/pin/unlock';
        }
        return this.resolveAfterLeavingPinScreen();
      }
    }

    if (!hasPin) {
      return '/pin/setup';
    }

    if (isLocked) {
      this.storeReturnUrl(path);
      this.pinScreenRedirect = undefined;
      return '/pin/unlock';
    }

    return this.resolveUnlockedDestination(path);
  }

  storeReturnUrl(url: string): void {
    persistReturnUrl(url);
    this.pinScreenRedirect = undefined;
  }

  consumeReturnUrl(): string {
    return consumePersistedReturnUrl();
  }

  waitUntilReady(): Promise<void> {
    if (this.readySignal()) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const check = (): void => {
        if (this.readySignal()) {
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }

  private getIntendedPath(): string {
    const path = window.location.pathname;
    if (path && path !== '/') {
      return path + window.location.search;
    }
    return '/';
  }

  private resolveAfterLeavingPinScreen(): Promise<string> {
    if (!this.pinScreenRedirect) {
      this.pinScreenRedirect = this.resolveUnlockedDestination(this.consumeReturnUrl());
    }
    return this.pinScreenRedirect;
  }

  private async resolveUnlockedDestination(path: string): Promise<string> {
    if (path.startsWith('/pin/')) {
      path = '/';
    }

    if (this.isPreservableDeepLink(path)) {
      return path;
    }

    const active = await this.getActiveSession();
    if (active) {
      return '/sessions/active';
    }

    return '/';
  }

  private isPreservableDeepLink(path: string): boolean {
    const base = path.split('?')[0];
    if (base === '/' || base === '') {
      return false;
    }
    if (base === '/sessions/active') {
      return true;
    }
    const shellRoutes = [
      '/sessions',
      '/lakes',
      '/gallery',
      '/statistics',
      '/settings',
      '/profile',
      '/release-notes',
      '/privacy',
    ];
    if (shellRoutes.some((r) => base === r || base.startsWith(r + '/'))) {
      return true;
    }
    return false;
  }

  private async getActiveSession() {
    const allActive = await this.sessionRepo.getAllActive();
    if (allActive.length === 0) {
      return undefined;
    }
    if (allActive.length > 1) {
      console.warn(
        '[AppStartup] Multiple active sessions found; using most recently updated',
        allActive.map((s) => s.id),
      );
      allActive.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }
    return allActive[0];
  }
}
