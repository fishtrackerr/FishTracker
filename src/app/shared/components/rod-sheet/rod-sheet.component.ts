import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FishingSession, SessionRod, SessionSpot } from '../../../core/models';
import { onlyVisibleRecords } from '../../../core/utils';
import { BiteEventService } from '../../../core/services/bite-event.service';
import { DialogService } from '../../../core/services/dialog.service';
import { FishSpottedEventService } from '../../../core/services/fish-spotted-event.service';
import { I18nService } from '../../../core/services/i18n.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RodService, UpdateRodOptions } from '../../../core/services/rod.service';
import { ThemeService } from '../../../core/services/theme.service';
import { restoreSelectValue } from '../../utils/restore-select';
import { themedBottomSheetConfig } from '../../utils/themed-bottom-sheet';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { OptionComboboxComponent } from '../option-combobox/option-combobox.component';
import { promptForText } from '../text-prompt-dialog/text-prompt-dialog.component';

export interface RodSheetData {
  session: FishingSession;
  rodId: string;
  /** Set by {@link openRodSheet}: receives the latest session after every successful write. */
  onSessionChange?: (session: FishingSession) => void;
}

/** Select value for the "+ New spot…" entry (a pending, not yet created spot). */
export const NEW_SPOT_VALUE = '__new__';

/**
 * Bottom sheet for one rod: header, quick actions (recast, fish spotted, bite −1),
 * edit fields (spot, bait, rig, name, notes) and take-out / save.
 * Open it with {@link openRodSheet}.
 */
@Component({
  selector: 'app-rod-sheet',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    OptionComboboxComponent,
    TranslatePipe,
  ],
  template: `
    @if (rod(); as r) {
      <div class="sheet">
        <div class="sheet-header">
          <span class="rod-marker" [style.--rod-color]="rodColor()">{{ r.rodNumber }}</span>
          <div class="rod-heading">
            <h3>{{ 'rod.sheetTitle' | tr: { n: r.rodNumber } }}</h3>
            <p class="stats">{{ statsLine() }}</p>
          </div>
          <button mat-button type="button" (click)="close()">{{ 'common.close' | tr }}</button>
        </div>

        <div class="quick-actions">
          @if (canRecast()) {
            <button
              mat-stroked-button
              type="button"
              class="recast-btn"
              [disabled]="busy()"
              (click)="recastNow()"
            >
              {{ 'rod.recastNow' | tr }}
            </button>
          }
          <button
            mat-stroked-button
            type="button"
            class="spotted-btn"
            [disabled]="busy()"
            (click)="markFishSpotted()"
          >
            {{ 'rod.markFishSpotted' | tr }}
          </button>
          <button
            mat-stroked-button
            type="button"
            class="bite-minus-btn"
            [disabled]="busy() || r.biteCount <= 0"
            (click)="removeBite()"
          >
            {{ 'rod.biteMinusOne' | tr }}
          </button>
        </div>

        <mat-form-field appearance="outline" class="full">
          <mat-label>{{ 'rod.spot' | tr }}</mat-label>
          <mat-select
            #spotSelect
            [ngModel]="editSpotId()"
            (ngModelChange)="onSpotChange($event)"
            [panelClass]="selectPanelClass"
          >
            <mat-option value="">{{ 'rod.unassigned' | tr }}</mat-option>
            @for (spot of spots(); track spot.id) {
              <mat-option [value]="spot.id">{{ spot.name }}</mat-option>
            }
            @if (pendingSpotName()) {
              <mat-option [value]="newSpotValue">
                {{ pendingSpotName() }} {{ 'rod.newSpotSuffix' | tr }}
              </mat-option>
            }
            <mat-option class="new-spot-option" [value]="newSpotPromptValue">
              {{ 'rod.newSpot' | tr }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <app-option-combobox category="bait" [label]="'rod.bait' | tr" [(value)]="editBait" />
        <app-option-combobox category="rig" [label]="'rod.rig' | tr" [(value)]="editRig" />

        <mat-form-field appearance="outline" class="full">
          <mat-label>{{ 'common.name' | tr }}</mat-label>
          <input matInput name="rodName" [(ngModel)]="editName" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>{{ 'common.notes' | tr }}</mat-label>
          <textarea matInput rows="2" name="rodNotes" [(ngModel)]="editNotes"></textarea>
        </mat-form-field>

        <div class="sheet-actions">
          <button
            mat-stroked-button
            type="button"
            class="toggle-btn"
            [disabled]="busy()"
            (click)="toggleActive()"
          >
            {{ (r.isActive ? 'rod.takeOut' : 'rod.putBack') | tr }}
          </button>
          <button
            mat-flat-button
            type="button"
            class="save-btn"
            [disabled]="busy()"
            (click)="save()"
          >
            {{ 'common.save' | tr }}
          </button>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    .sheet {
      padding: var(--spacing-md);
      max-height: 80vh;
      overflow-y: auto;
      color: var(--text-primary);
      background: var(--background-card);
    }
    .sheet-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }
    .rod-heading {
      flex: 1;
      min-width: 0;
    }
    .rod-heading h3 {
      margin: 0;
      font-family: var(--font-label);
      text-transform: var(--label-transform);
      color: var(--primary);
    }
    .stats {
      margin: 0;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    .rod-marker {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      background: var(--rod-color, var(--primary));
      color: var(--rod-marker-text);
      box-shadow: var(--rod-glow) var(--rod-color, transparent);
      font-family: var(--font-label);
      font-weight: 700;
      font-size: 1.05rem;
    }
    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }
    .quick-actions button {
      flex: 1 1 30%;
      min-height: 44px;
      color: var(--primary);
      font-family: var(--font-label);
      text-transform: var(--label-transform);
    }
    .full {
      width: 100%;
    }
    .sheet-actions {
      display: flex;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
    }
    .sheet-actions button {
      flex: 1;
      min-height: 44px;
    }
  `,
})
export class RodSheetComponent {
  private readonly data = inject<RodSheetData>(MAT_BOTTOM_SHEET_DATA);
  private readonly sheetRef = inject(MatBottomSheetRef<RodSheetComponent, FishingSession>);
  private readonly rodService = inject(RodService);
  private readonly biteService = inject(BiteEventService);
  private readonly fishSpottedService = inject(FishSpottedEventService);
  private readonly dialog = inject(DialogService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);

  /** Value of the pending (created on Save) spot option. */
  readonly newSpotValue = NEW_SPOT_VALUE;
  /** Value of the "+ New spot…" action option (opens the name prompt). */
  readonly newSpotPromptValue = '__prompt__';
  readonly selectPanelClass = this.theme.getSelectPanelClass();

  readonly session = signal<FishingSession>(this.data.session);
  /** Recasting only makes sense while fishing; a finished session keeps its last cast. */
  readonly canRecast = computed(() => this.session().status === 'active');
  readonly busy = signal(false);
  readonly spotSelect = viewChild<MatSelect>('spotSelect');
  readonly pendingSpotName = signal('');
  readonly editSpotId = signal('');

  readonly rod = computed<SessionRod | undefined>(() =>
    (this.session().rods ?? []).find((r) => r.id === this.data.rodId),
  );
  readonly spots = computed<SessionSpot[]>(() =>
    onlyVisibleRecords(this.session().sessionSpots ?? []),
  );
  readonly rodColor = computed(() => {
    const index = ((Math.max(1, this.rod()?.rodNumber ?? 1) - 1) % 6) + 1;
    return `var(--rod-${index})`;
  });
  readonly statsLine = computed(() => {
    const rod = this.rod();
    if (!rod) {
      return '';
    }
    let line = this.i18n.t('rod.sheetStats', {
      bites: rod.biteCount,
      spotted: rod.fishSpottedCount,
    });
    if (rod.castAt) {
      const time = new Date(rod.castAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      line += this.i18n.t('rod.sheetCast', { time });
    }
    return line;
  });

  editName = '';
  editBait = '';
  editRig = '';
  editNotes = '';

  constructor() {
    const rod = this.rod();
    if (rod) {
      this.editName = rod.name;
      this.editBait = rod.bait ?? '';
      this.editRig = rod.rig ?? '';
      this.editNotes = rod.notes ?? '';
      this.editSpotId.set(rod.sessionSpotId ?? '');
    }
  }

  async recastNow(): Promise<void> {
    if (!this.canRecast()) {
      return;
    }
    await this.run(async () => {
      const rod = this.rod();
      if (!rod) {
        return;
      }
      this.apply(await this.rodService.recast(this.session(), rod.id, rod.sessionSpotId));
      this.notifications.success(this.i18n.t('rod.recastSuccess'));
    }, 'rod.recastFailed');
  }

  async markFishSpotted(): Promise<void> {
    await this.run(async () => {
      const updated = await this.fishSpottedService.register({
        sessionId: this.session().id,
        rodId: this.data.rodId,
      });
      this.apply(updated);
      this.notifications.success(this.i18n.t('rod.spottedRegistered'));
    });
  }

  async removeBite(): Promise<void> {
    if ((this.rod()?.biteCount ?? 0) <= 0) {
      return;
    }
    await this.run(async () => {
      this.apply(await this.biteService.removeBite(this.session().id, this.data.rodId));
    });
  }

  async toggleActive(): Promise<void> {
    await this.run(async () => {
      const rod = this.rod();
      if (!rod) {
        return;
      }
      this.apply(
        await this.rodService.updateRod(this.session(), rod.id, { isActive: !rod.isActive }),
      );
    });
  }

  async onSpotChange(value: string): Promise<void> {
    if (value !== this.newSpotPromptValue) {
      this.editSpotId.set(value);
      return;
    }
    const previous = this.editSpotId();
    const name = await promptForText(this.dialog, {
      title: this.i18n.t('rod.newSpotTitle'),
      label: this.i18n.t('rod.newSpotName'),
      initialValue: this.pendingSpotName(),
      maxLength: 60,
    });
    if (name) {
      this.pendingSpotName.set(name);
      this.editSpotId.set(NEW_SPOT_VALUE);
    } else {
      // The select itself shows the picked "+ New spot…" entry: put it back visibly.
      this.editSpotId.set(previous);
      restoreSelectValue(this.spotSelect(), previous);
    }
  }

  /**
   * Saves only the fields that differ from the stored rod. A pending new spot is
   * created now (so cancelling leaves no orphan spot) and assigned via assignSpot.
   */
  async save(): Promise<void> {
    await this.run(async () => {
      const rod = this.rod();
      if (!rod) {
        return;
      }
      const changes: UpdateRodOptions = {};
      const name = this.editName.trim();
      if (name && name !== rod.name) {
        changes.name = name;
      }
      if (this.editBait !== (rod.bait ?? '')) {
        changes.bait = this.editBait || undefined;
      }
      if (this.editRig !== (rod.rig ?? '')) {
        changes.rig = this.editRig || undefined;
      }
      if (this.editNotes !== (rod.notes ?? '')) {
        changes.notes = this.editNotes || undefined;
      }

      let nextSpotId = this.editSpotId();
      if (nextSpotId === NEW_SPOT_VALUE) {
        const created = await this.rodService.addSessionSpot(
          this.session(),
          this.pendingSpotName(),
        );
        this.apply(created.session);
        nextSpotId = created.spot.id;
        this.pendingSpotName.set('');
        this.editSpotId.set(nextSpotId);
      }

      if (Object.keys(changes).length > 0) {
        this.apply(await this.rodService.updateRod(this.session(), rod.id, changes));
      }
      if (nextSpotId !== (rod.sessionSpotId ?? '')) {
        this.apply(
          await this.rodService.assignSpot(this.session(), rod.id, nextSpotId || undefined),
        );
      }
      this.notifications.success(this.i18n.t('rod.sheetSaved'));
      this.close();
    });
  }

  close(): void {
    this.sheetRef.dismiss(this.session());
  }

  private apply(updated: FishingSession | undefined): void {
    if (updated) {
      this.session.set(updated);
      this.data.onSessionChange?.(updated);
    }
  }

  private async run(action: () => Promise<void>, failedKey = 'rod.sheetFailed'): Promise<void> {
    if (this.busy()) {
      return;
    }
    this.busy.set(true);
    try {
      await action();
    } catch (error) {
      console.error('[RodSheet] action failed', error);
      this.notifications.error(this.i18n.t(failedKey));
    } finally {
      this.busy.set(false);
    }
  }
}

/**
 * Opens the rod sheet. Resolves to the latest session when anything was written
 * (also when the sheet is closed via the backdrop), otherwise undefined.
 */
export async function openRodSheet(
  bottomSheet: MatBottomSheet,
  theme: ThemeService,
  data: { session: FishingSession; rodId: string },
): Promise<FishingSession | undefined> {
  let latest: FishingSession | undefined;
  const ref = bottomSheet.open<RodSheetComponent, RodSheetData, FishingSession>(
    RodSheetComponent,
    themedBottomSheetConfig(theme.resolvedTheme(), {
      ...data,
      onSessionChange: (session: FishingSession) => (latest = session),
    }),
  );
  await new Promise<void>((resolve) => {
    ref.afterDismissed().subscribe(() => resolve());
  });
  return latest;
}
