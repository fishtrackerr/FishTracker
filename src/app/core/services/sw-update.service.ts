import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { NotificationService } from './notification.service';
import { I18nService } from './i18n.service';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly notifier = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly checkIntervalMs = 5 * 60 * 1000;
  private updatePromptOpen = false;

  constructor() {
    if (!isPlatformBrowser(this.platformId) || !this.swUpdate.isEnabled) {
      return;
    }

    this.checkForUpdatesNow();

    interval(this.checkIntervalMs).subscribe(() => {
      this.checkForUpdatesNow();
    });

    this.swUpdate.versionUpdates.subscribe((event) => {
      this.handleVersionEvent(event);
    });
  }

  public checkForUpdatesNow(): void {
    this.swUpdate
      .checkForUpdate()
      .catch((err) => {
        console.error('[SW] update check failed', err);
      });
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
          this.swUpdate
            .activateUpdate()
            .then(() => {
              window.location.reload();
            })
            .catch((err) => {
              this.updatePromptOpen = false;
              console.error('[SW] update activation failed', err);
              this.notifier.warning(this.i18n.t('pwa.updateFailed'));
            });
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
}
