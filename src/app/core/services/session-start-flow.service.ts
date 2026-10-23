import { Injectable, inject, signal } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BackupSaveCancelledError, BackupService } from './backup.service';
import { ConfirmService } from './confirm.service';
import { FishingModeService } from './fishing-mode.service';
import { I18nService } from './i18n.service';
import { LakeService } from './lake.service';
import { NotificationService } from './notification.service';
import { RodService } from './rod.service';
import { SessionService } from './session.service';
import { SettingsService } from './settings.service';
import { ThemeService } from './theme.service';
import { FishingSession, SessionSpot } from '../models';
import { generateId, onlyVisibleRecords } from '../utils';
import {
  StartSessionSheetComponent,
  StartSessionSheetData,
  StartSessionSheetResult,
  StartSessionSwim,
} from '../../features/sessions/start-session-sheet/start-session-sheet.component';
import { themedBottomSheetConfig } from '../../shared/utils/themed-bottom-sheet';

/**
 * Shared start-session sheet + create + navigate flow used by dashboard and sessions list.
 */
@Injectable({ providedIn: 'root' })
export class SessionStartFlowService {
  private readonly sessionService = inject(SessionService);
  private readonly lakeService = inject(LakeService);
  private readonly rodService = inject(RodService);
  private readonly settings = inject(SettingsService);
  private readonly fishingMode = inject(FishingModeService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly theme = inject(ThemeService);
  private readonly backupService = inject(BackupService);
  private readonly confirm = inject(ConfirmService);

  readonly starting = signal(false);

  async start(): Promise<boolean> {
    if (this.starting()) {
      return false;
    }
    try {
      if (await this.goToActiveSession()) {
        return false;
      }

      const lakes = this.lakeService.getSortedLakes(await this.lakeService.getAll());
      const lastId = this.fishingMode.getActivePreferences().lastLakeId;
      const defaultLake = lakes.find((l) => l.id === lastId);
      const maxRodCount = this.settings.get().maxRodCount ?? 10;

      const ref = this.bottomSheet.open<
        StartSessionSheetComponent,
        StartSessionSheetData,
        StartSessionSheetResult | undefined
      >(
        StartSessionSheetComponent,
        themedBottomSheetConfig(this.theme.resolvedTheme(), {
          lakes,
          defaultLakeId: defaultLake?.id,
          defaultRodCount: await this.lastRodCount(maxRodCount),
          maxRodCount,
        }),
      );
      const result = await firstValueFrom(ref.afterDismissed());
      if (!result) {
        return false;
      }

      this.starting.set(true);
      if (this.settings.get().backupBeforeSession) {
        const mayContinue = await this.exportPreSessionBackup();
        if (!mayContinue) {
          return false;
        }
      }
      // Another start may have won while the sheet or the backup step was open
      // (the backup can wait on the user): continue it instead of starting a second one.
      if (await this.goToActiveSession()) {
        return false;
      }

      const { swim, ...options } = result;
      const swimSpot = await this.resolveSwim(result.lakeId, swim);
      const session = await this.sessionService.start({
        ...options,
        sessionSpots: swimSpot ? [swimSpot] : undefined,
        rodSpotId: swimSpot?.id,
      });
      if (swim?.newName && swimSpot && result.lakeId) {
        await this.saveNewSwimOnLake(session, swimSpot, result.lakeId);
      }
      await this.router.navigate(['/sessions', session.id]);
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

  /** Navigates to the active session of this mode, if any. Returns true when it did. */
  private async goToActiveSession(): Promise<boolean> {
    const active = await this.sessionService.getActive();
    if (!active) {
      return false;
    }
    await this.router.navigate(['/sessions/active'], { queryParams: { id: active.id } });
    return true;
  }

  /** Rod count of the most recent session in this mode, else 1. */
  private async lastRodCount(maxRodCount: number): Promise<number> {
    const sessions = await firstValueFrom(this.sessionService.watchAll());
    const latest = [...sessions].sort((a, b) => b.startDate.localeCompare(a.startDate))[0];
    const count = onlyVisibleRecords(latest?.rods ?? []).length;
    return Math.min(Math.max(1, count), maxRodCount);
  }

  /**
   * Turns the swim picked in the sheet into a real session spot (own id, saved with the
   * session). A new swim becomes a lake spot only after the session started
   * ({@link saveNewSwimOnLake}), so a failed start leaves the lake untouched.
   */
  private async resolveSwim(lakeId: string | undefined, swim?: StartSessionSwim) {
    if (!swim) {
      return undefined;
    }
    if (swim.lakeSpotId) {
      const lake = lakeId ? await this.lakeService.getById(lakeId) : undefined;
      const lakeSpot = lake?.spots.find((spot) => spot.id === swim.lakeSpotId);
      return lakeSpot ? this.rodService.snapshotFromLakeSpot(lakeSpot) : undefined;
    }
    const name = swim.newName?.trim();
    if (!name) {
      return undefined;
    }
    return { id: generateId(), name, visible: true } satisfies SessionSpot;
  }

  /** Adds the new swim to the lake's spots and links the session spot to it. Never fails the start. */
  private async saveNewSwimOnLake(
    session: FishingSession,
    swimSpot: SessionSpot,
    lakeId: string,
  ): Promise<void> {
    try {
      const lakeSpot = await this.lakeService.addSpot(lakeId, { name: swimSpot.name });
      if (!lakeSpot) {
        return;
      }
      const current = session.sessionSpots?.length ? session.sessionSpots : [swimSpot];
      await this.sessionService.update(session.id, {
        sessionSpots: current.map((spot) =>
          spot.id === swimSpot.id ? { ...spot, lakeSpotId: lakeSpot.id } : spot,
        ),
      });
    } catch (error) {
      console.error('[SessionStartFlow] could not save the new swim on the lake', error);
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
      await this.backupService.saveToFile(data, `fish-tracker-pre-session-${date}.json`);
      this.notifications.success(this.i18n.t('sessions.backupSaved'));
      return true;
    } catch (error) {
      const cancelled = error instanceof BackupSaveCancelledError;
      if (!cancelled) {
        console.error('[SessionStartFlow] pre-session backup failed', error);
      }
      return this.confirm.confirm({
        title: this.i18n.t(
          cancelled ? 'sessions.backupSkippedTitle' : 'sessions.backupFailedTitle',
        ),
        message: this.i18n.t(
          cancelled ? 'sessions.backupSkippedMessage' : 'sessions.backupFailedMessage',
        ),
        confirmLabel: this.i18n.t('sessions.startWithoutBackup'),
      });
    }
  }
}
