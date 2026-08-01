import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BackupService } from './backup.service';
import { ConfirmService } from './confirm.service';
import { DialogService } from './dialog.service';
import { FishingModeService } from './fishing-mode.service';
import { I18nService } from './i18n.service';
import { LakeService } from './lake.service';
import { NotificationService } from './notification.service';
import { RodSetupFlowService } from './rod-setup-flow.service';
import { SessionService } from './session.service';
import { SettingsService } from './settings.service';
import {
  SessionCreateDialogComponent,
  SessionCreateResult,
} from '../../features/sessions/session-create-dialog.component';

/**
 * Shared start-session dialog + create + navigate flow used by dashboard and sessions list.
 */
@Injectable({ providedIn: 'root' })
export class SessionStartFlowService {
  private readonly sessionService = inject(SessionService);
  private readonly lakeService = inject(LakeService);
  private readonly settings = inject(SettingsService);
  private readonly fishingMode = inject(FishingModeService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly dialog = inject(DialogService);
  private readonly rodSetupFlow = inject(RodSetupFlowService);
  private readonly backupService = inject(BackupService);
  private readonly confirm = inject(ConfirmService);

  readonly starting = signal(false);

  async start(): Promise<boolean> {
    if (this.starting()) {
      return false;
    }
    try {
      const lakes = this.lakeService.getSortedLakes(await this.lakeService.getAll());
      const lastId = this.fishingMode.getActivePreferences().lastLakeId;
      const defaultLake = lakes.find((l) => l.id === lastId);
      const defaultName = defaultLake
        ? this.i18n.t('sessions.defaultNameAtLake', { lake: defaultLake.name })
        : this.i18n.t('sessions.defaultName');

      const ref = this.dialog.open(SessionCreateDialogComponent, {
        data: {
          lakes,
          defaultLakeId: defaultLake?.id,
          defaultName,
        },
        disableClose: true,
      });

      const result = (await firstValueFrom(ref.afterClosed())) as SessionCreateResult | undefined;
      if (!result) {
        return false;
      }

      this.starting.set(true);
      const hadActive = !!(await this.sessionService.getActive());
      if (!hadActive) {
        const mayContinue = await this.exportPreSessionBackup();
        if (!mayContinue) {
          return false;
        }
      }

      const session = await this.sessionService.start(result);
      if (!hadActive) {
        await this.rodSetupFlow.promptAfterSessionCreate(session);
        await this.router.navigate(['/sessions', session.id], {
          queryParams: { setupRods: '1' },
        });
      } else {
        await this.router.navigate(['/sessions/active'], {
          queryParams: { id: session.id },
        });
      }
      this.notifications.success(this.i18n.t('sessions.sessionStarted'));
      return true;
    } catch (error) {
      console.error('[SessionStartFlow] start failed', error);
      this.notifications.error(this.i18n.t('sessions.createFailed'));
      return false;
    } finally {
      this.starting.set(false);
    }
  }

  /**
   * Downloads a full JSON backup before creating a new session.
   * Returns false if export failed and the user chose not to skip.
   */
  private async exportPreSessionBackup(): Promise<boolean> {
    this.notifications.info(this.i18n.t('sessions.backingUp'));
    try {
      const data = await this.backupService.export();
      const date = new Date().toISOString().slice(0, 10);
      this.backupService.downloadJson(data, `fish-tracker-pre-session-${date}.json`);
      this.notifications.success(this.i18n.t('sessions.backupSaved'));
      return true;
    } catch (error) {
      console.error('[SessionStartFlow] pre-session backup failed', error);
      return this.confirm.confirm({
        title: this.i18n.t('sessions.backupFailedTitle'),
        message: this.i18n.t('sessions.backupFailedMessage'),
        confirmLabel: this.i18n.t('sessions.startWithoutBackup'),
      });
    }
  }
}
