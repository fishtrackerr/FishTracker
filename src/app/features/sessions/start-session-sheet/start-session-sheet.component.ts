import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FishingSpot, Lake } from '../../../core/models';
import { DialogService } from '../../../core/services/dialog.service';
import { I18nService } from '../../../core/services/i18n.service';
import { ThemeService } from '../../../core/services/theme.service';
import { nowIso, onlyVisibleRecords, toLocalDatetimeInput } from '../../../core/utils';
import { promptForText } from '../../../shared/components/text-prompt-dialog/text-prompt-dialog.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

export interface StartSessionSheetData {
  lakes: Lake[];
  defaultLakeId?: string;
  defaultRodCount: number;
  maxRodCount: number;
}

/** Swim chosen in the sheet: an existing lake spot, or a name that is created on start. */
export interface StartSessionSwim {
  lakeSpotId?: string;
  newName?: string;
}

export interface StartSessionSheetResult {
  name: string;
  startDate: string;
  lakeId?: string;
  rodCount: number;
  prebait?: string;
  swim?: StartSessionSwim;
}

const SWIM_NAME_MAX_LENGTH = 60;

@Component({
  selector: 'app-start-session-sheet',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
  ],
  templateUrl: './start-session-sheet.component.html',
  styleUrl: './start-session-sheet.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class StartSessionSheetComponent {
  readonly data = inject<StartSessionSheetData>(MAT_BOTTOM_SHEET_DATA);
  private readonly ref = inject(
    MatBottomSheetRef<StartSessionSheetComponent, StartSessionSheetResult | undefined>,
  );
  private readonly i18n = inject(I18nService);
  private readonly dialog = inject(DialogService);
  private readonly theme = inject(ThemeService);

  readonly selectPanelClass = this.theme.getSelectPanelClass();

  readonly lakeId = signal(this.data.defaultLakeId ?? '');
  readonly rodCount = signal(this.clampRods(this.data.defaultRodCount));
  readonly swim = signal<StartSessionSwim | undefined>(undefined);
  readonly moreOpen = signal(false);

  name = this.defaultNameFor(this.lakeId());
  startDateLocal = toLocalDatetimeInput(nowIso());
  prebait = '';
  private nameEdited = false;

  readonly lakeSpots = computed<FishingSpot[]>(() => {
    const lake = this.data.lakes.find((l) => l.id === this.lakeId());
    return onlyVisibleRecords(lake?.spots ?? []);
  });

  onLakeChange(lakeId: string): void {
    this.lakeId.set(lakeId);
    this.swim.set(undefined);
    if (!this.nameEdited) {
      this.name = this.defaultNameFor(lakeId);
    }
  }

  onNameChange(value: string): void {
    this.name = value;
    this.nameEdited = true;
  }

  incrementRods(): void {
    this.rodCount.set(this.clampRods(this.rodCount() + 1));
  }

  decrementRods(): void {
    this.rodCount.set(this.clampRods(this.rodCount() - 1));
  }

  toggleSpot(spot: FishingSpot): void {
    this.swim.set(this.swim()?.lakeSpotId === spot.id ? undefined : { lakeSpotId: spot.id });
  }

  async addSwim(): Promise<void> {
    const name = await promptForText(this.dialog, {
      title: this.i18n.t('startSheet.newSwimTitle'),
      label: this.i18n.t('startSheet.newSwimLabel'),
      confirmLabel: this.i18n.t('common.save'),
      maxLength: SWIM_NAME_MAX_LENGTH,
    });
    if (!name) {
      return;
    }
    const trimmed = name.trim().slice(0, SWIM_NAME_MAX_LENGTH);
    // Re-pick an existing swim instead of creating a duplicate with the same name.
    const existing = this.lakeSpots().find(
      (spot) => spot.name.trim().toLowerCase() === trimmed.toLowerCase(),
    );
    this.swim.set(existing ? { lakeSpotId: existing.id } : { newName: trimmed });
  }

  canStart(): boolean {
    return this.name.trim().length > 0 && this.startDateLocal.length > 0;
  }

  start(): void {
    if (!this.canStart()) {
      return;
    }
    const result: StartSessionSheetResult = {
      name: this.name.trim(),
      startDate: new Date(this.startDateLocal).toISOString(),
      lakeId: this.lakeId() || undefined,
      rodCount: this.rodCount(),
      prebait: this.prebait.trim() || undefined,
      swim: this.swim(),
    };
    this.ref.dismiss(result);
  }

  close(): void {
    this.ref.dismiss();
  }

  private clampRods(count: number): number {
    return Math.max(1, Math.min(Math.floor(count) || 1, Math.max(1, this.data.maxRodCount)));
  }

  private defaultNameFor(lakeId: string): string {
    const lake = this.data.lakes.find((l) => l.id === lakeId);
    return lake
      ? this.i18n.t('sessions.defaultNameAtLake', { lake: lake.name })
      : this.i18n.t('sessions.defaultName');
  }
}
