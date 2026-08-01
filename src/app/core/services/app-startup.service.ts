import { Injectable, inject, signal, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { db } from '../db/fish-db';
import { PinLockService } from './pin-lock.service';
import { SessionRepository } from './session.repository';
import { SessionWeatherMonitorService } from './session-weather-monitor.service';
import { consumePersistedReturnUrl, persistReturnUrl } from '../utils/return-url';

@Injectable({ providedIn: 'root' })
export class AppStartupService {
  private readonly pinLock = inject(PinLockService);
  private readonly sessionRepo = inject(SessionRepository);
  private readonly weatherMonitor = inject(SessionWeatherMonitorService);
  private readonly router = inject(Router);

  private readonly readySignal = signal(false);
  private initialNavigationDone = false;
  /** Shared across guard + startup so return URL is only consumed once. */
  private pinScreenRedirect?: Promise<string>;

  readonly isReady = this.readySignal.asReadonly();

  async initialize(): Promise<void> {
    await db.open();
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
