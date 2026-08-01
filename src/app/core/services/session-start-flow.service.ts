import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DialogService } from './dialog.service';
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
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly dialog = inject(DialogService);
  private readonly rodSetupFlow = inject(RodSetupFlowService);

  readonly starting = signal(false);

  async start(): Promise<boolean> {
    if (this.starting()) {
      return false;
    }
    try {
      const lakes = this.lakeService.getSortedLakes(await this.lakeService.getAll());
      const lastId = this.settings.get().lastLakeId;
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
}
