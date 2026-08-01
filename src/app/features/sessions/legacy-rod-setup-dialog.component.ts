import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FishingSession, SessionSpot } from '../../core/models';
import { I18nService } from '../../core/services/i18n.service';
import { RodService } from '../../core/services/rod.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { LakeService } from '../../core/services/lake.service';
import { ThemeService } from '../../core/services/theme.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

export interface LegacyRodSetupData {
  session: FishingSession;
  isNewSession?: boolean;
}

@Component({
  selector: 'app-legacy-rod-setup-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">{{ 'rodSetup.title' | tr }}</h2>
    <mat-dialog-content>
      <p>{{ introText }}</p>
      <mat-form-field appearance="outline" class="full">
        <mat-label>{{ 'sessionEdit.numberOfRods' | tr }}</mat-label>
        <input matInput type="number" [(ngModel)]="rodCount" [min]="1" [max]="maxRodCount" />
      </mat-form-field>
      @if (sessionSpots.length > 0) {
        <mat-form-field appearance="outline" class="full">
          <mat-label>{{ 'rodSetup.defaultSpotOptional' | tr }}</mat-label>
          <mat-select [(ngModel)]="defaultSpotId" [panelClass]="selectPanelClass">
            <mat-option value="">{{ 'common.none' | tr }}</mat-option>
            @for (spot of sessionSpots; track spot.id) {
              <mat-option [value]="spot.id">{{ spot.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close type="button">{{ 'rodSetup.skipForNow' | tr }}</button>
      <button mat-flat-button type="button" (click)="save()">{{ 'rodSetup.setUp' | tr }}</button>
    </mat-dialog-actions>
  `,
  styles: `
    :host {
      display: block;
      color: var(--text-primary);
      background: var(--background-card);
    }
    .dialog-title { text-align: center; width: 100%; }
    .full { width: 100%; }
    mat-dialog-content { color: var(--text-primary); }
  `,
})
export class LegacyRodSetupDialogComponent implements OnInit {
  readonly data = inject<LegacyRodSetupData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<LegacyRodSetupDialogComponent>);
  private readonly sessionService = inject(SessionService);
  private readonly rodService = inject(RodService);
  private readonly settings = inject(SettingsService);
  private readonly lakeService = inject(LakeService);
  private readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);

  rodCount = Math.max(1, this.data.session.rods?.length ?? 1);
  defaultSpotId = '';
  maxRodCount = this.settings.get().maxRodCount ?? 10;
  sessionSpots: SessionSpot[] = this.data.session.sessionSpots ?? [];
  readonly selectPanelClass = this.theme.getSelectPanelClass();

  get introText(): string {
    return this.data.isNewSession
      ? this.i18n.t('rodSetup.introNew')
      : this.i18n.t('rodSetup.introExisting');
  }

  async ngOnInit(): Promise<void> {
    if (this.sessionSpots.length === 0 && this.data.session.lakeId) {
      const lake = await this.lakeService.getById(this.data.session.lakeId);
      if (lake?.spots.length) {
        this.sessionSpots = lake.spots.map((spot) =>
          this.rodService.snapshotFromLakeSpot(spot),
        );
      }
    }
  }

  async save(): Promise<void> {
    const count = Math.max(1, Math.min(this.rodCount, this.maxRodCount));
    let session = this.data.session;
    session = await this.sessionService.updateSession(session.id, { rodCount: count }, true);
    if (this.defaultSpotId && session.rods) {
      for (const rod of session.rods) {
        session = await this.rodService.assignSpot(session, rod.id, this.defaultSpotId);
      }
    }
    this.ref.close(true);
  }
}
