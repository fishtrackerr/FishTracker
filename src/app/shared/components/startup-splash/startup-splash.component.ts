import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { fetchWithTimeout } from '../../../core/utils';
import { AppStartupService } from '../../../core/services/app-startup.service';
import { hardReloadApp } from '../../../core/services/app-version.service';
import { SwUpdateService } from '../../../core/services/sw-update.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-startup-splash',
  standalone: true,
  imports: [TranslatePipe, MatButtonModule],
  template: `
    <div
      class="splash"
      role="status"
      aria-live="polite"
      [attr.aria-label]="
        recoveryKind() ? ('dbRecovery.title' | tr) : ('splash.loading' | tr)
      "
    >
      <img class="logo" src="icons/icon-192x192.png" [alt]="'splash.logoAlt' | tr" />
      <p class="label">{{ 'splash.appName' | tr }}</p>
      <p class="version">v{{ version() }}</p>

      @if (recoveryKind(); as kind) {
        <div class="recovery" role="alert">
          <p class="recovery-title">{{ 'dbRecovery.title' | tr }}</p>
          @if (kind === 'versionMismatch') {
            <p class="recovery-body">{{ 'dbRecovery.versionMismatch' | tr }}</p>
            <p class="recovery-hint">{{ 'dbRecovery.dataSafe' | tr }}</p>
          } @else if (kind === 'upgradeFailed') {
            <p class="recovery-body">{{ 'dbRecovery.upgradeFailed' | tr }}</p>
          } @else {
            <p class="recovery-body">{{ 'dbRecovery.unknown' | tr }}</p>
          }
          @if (detail()) {
            <p class="recovery-detail">{{ detail() }}</p>
          }
          <div class="recovery-actions">
            @if (kind === 'versionMismatch') {
              <button
                mat-flat-button
                type="button"
                color="primary"
                [disabled]="checkingUpdates() || retrying()"
                (click)="checkForUpdates()"
              >
                {{
                  checkingUpdates()
                    ? ('dbRecovery.checkingUpdates' | tr)
                    : ('dbRecovery.checkForUpdates' | tr)
                }}
              </button>
            } @else {
              <button
                mat-flat-button
                type="button"
                color="primary"
                [disabled]="retrying() || checkingUpdates()"
                (click)="retry()"
              >
                {{ retrying() ? ('dbRecovery.retrying' | tr) : ('dbRecovery.retry' | tr) }}
              </button>
            }
            <button
              mat-stroked-button
              type="button"
              [disabled]="retrying() || checkingUpdates()"
              (click)="reload()"
            >
              {{ 'dbRecovery.reload' | tr }}
            </button>
          </div>
        </div>
      } @else {
        <div class="spinner" aria-hidden="true"></div>
      }
    </div>
  `,
  styles: `
    .splash {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100dvh;
      background: var(--background-primary, #0b0b0b);
      color: var(--text-primary, #fff);
      gap: 12px;
      padding: 24px;
      box-sizing: border-box;
    }
    .logo {
      width: 84px;
      height: 84px;
      border-radius: var(--radius-lg);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    }
    .label {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary, #ff6b00);
      margin: 0;
    }
    .version {
      font-size: 0.8rem;
      color: var(--text-secondary, #bbb);
      margin: 0;
      letter-spacing: 0.02em;
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--border-primary, #333);
      border-top-color: var(--primary, #ff6b00);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-top: 8px;
    }
    .recovery {
      max-width: 28rem;
      text-align: center;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .recovery-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
    .recovery-body,
    .recovery-hint {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-secondary, #bbb);
      line-height: 1.4;
    }
    .recovery-detail {
      margin: 0;
      font-size: 0.75rem;
      color: var(--text-secondary, #888);
      word-break: break-word;
    }
    .recovery-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-top: 8px;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
})
export class StartupSplashComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly startup = inject(AppStartupService);
  private readonly swUpdate = inject(SwUpdateService);

  readonly version = signal('0.0.0');
  readonly checkingUpdates = signal(false);

  readonly recoveryKind = this.startup.dbRecoveryKind;
  readonly detail = this.startup.dbOpenError;
  readonly retrying = this.startup.dbRetrying;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.loadVersion();
    }
  }

  async retry(): Promise<void> {
    await this.startup.retryOpenDb();
  }

  async checkForUpdates(): Promise<void> {
    this.checkingUpdates.set(true);
    try {
      await this.swUpdate.checkForUpdatesNow();
      await this.loadVersion(false);
    } finally {
      this.checkingUpdates.set(false);
    }
  }

  reload(): void {
    hardReloadApp();
  }

  private async loadVersion(bypassSw = false): Promise<void> {
    try {
      const url = bypassSw
        ? `assets/version.json?ngsw-bypass=true&t=${Date.now()}`
        : `assets/version.json?t=${Date.now()}`;
      const response = await fetchWithTimeout(url, {
        cache: 'no-store',
      });
      if (!response.ok) {
        return;
      }
      const payload = (await response.json()) as { version?: unknown };
      if (typeof payload.version === 'string' && payload.version.trim()) {
        this.version.set(payload.version);
      }
    } catch {
      // Keep default fallback when version file is unavailable.
    }
  }
}
