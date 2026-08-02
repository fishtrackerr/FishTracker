import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { isNativeApp } from '../utils/platform';
import { hardReloadApp } from './app-version.service';
import { I18nService } from './i18n.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly notifier = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly checkIntervalMs = 5 * 60 * 1000;
  private updatePromptOpen = false;

  constructor() {
    if (!isPlatformBrowser(this.platformId) || isNativeApp() || !this.swUpdate.isEnabled) {
      if (isPlatformBrowser(this.platformId) && isNativeApp()) {
        void this.unregisterStaleServiceWorkers();
      }
      return;
    }

    void this.checkForUpdatesNow();

    interval(this.checkIntervalMs).subscribe(() => {
      void this.checkForUpdatesNow();
    });

    this.swUpdate.versionUpdates.subscribe((event) => {
      this.handleVersionEvent(event);
    });
  }

  /** Returns whether the SW reported that an update check ran (enabled). */
  public async checkForUpdatesNow(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId) || isNativeApp() || !this.swUpdate.isEnabled) {
      return false;
    }

    try {
      await this.swUpdate.checkForUpdate();
      return true;
    } catch (err) {
      console.error('[SW] update check failed', err);
      return false;
    }
  }

  private handleVersionEvent(event: VersionEvent): void {
    if (event.type === 'VERSION_READY') {
      if (this.updatePromptOpen) {
        return;
      }
      this.updatePromptOpen = true;
      this.notifier.withAction(
        this.i18n.t('pwa.updateAvailable'),
        this.i18n.t('pwa.updateNow'),
        () => {
          void this.applyUpdate();
        },
        'info',
        0,
      );
      return;
    }

    if (event.type === 'VERSION_INSTALLATION_FAILED') {
      console.error('[SW] version installation failed', event.error);
      this.notifier.warning(this.i18n.t('pwa.updateFailed'));
    }
  }

  private async applyUpdate(): Promise<void> {
    try {
      const activated = await this.swUpdate.activateUpdate();
      if (!activated) {
        this.updatePromptOpen = false;
        this.notifier.warning(this.i18n.t('pwa.updateFailed'));
        return;
      }
      // Give the new SW time to claim before navigation (avoids blank Android screens).
      await new Promise((resolve) => setTimeout(resolve, 250));
      hardReloadApp();
    } catch (err) {
      this.updatePromptOpen = false;
      console.error('[SW] update activation failed', err);
      this.notifier.warning(this.i18n.t('pwa.updateFailed'));
    }
  }

  /** Capacitor builds must not keep a browser SW controlling the WebView. */
  private async unregisterStaleServiceWorkers(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
    } catch (err) {
      console.warn('[SW] failed to clear native service workers', err);
    }
  }
}
