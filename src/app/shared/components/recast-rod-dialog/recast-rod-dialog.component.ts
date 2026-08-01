import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FishingSession, SessionRod, SessionSpot } from '../../../core/models';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface RecastRodDialogData {
  session: FishingSession;
  /** When set, rod select is hidden and this rod is used. */
  rodId?: string;
}

export interface RecastRodDialogResult {
  rodId: string;
  sessionSpotId?: string;
}

@Component({
  selector: 'app-recast-rod-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslatePipe,
  ],
  templateUrl: './recast-rod-dialog.component.html',
  styleUrl: './recast-rod-dialog.component.css',
  host: {
    class: 'themed-dialog-host',
  },
})
export class RecastRodDialogComponent {
  private readonly ref = inject(MatDialogRef<RecastRodDialogComponent, RecastRodDialogResult>);
  readonly data = inject<RecastRodDialogData>(MAT_DIALOG_DATA);
  readonly theme = inject(ThemeService);

  readonly rods: SessionRod[] = this.data.session.rods ?? [];
  readonly sessionSpots: SessionSpot[] = this.data.session.sessionSpots ?? [];
  readonly rodLocked = !!this.data.rodId;
  readonly selectPanelClass = this.theme.getSelectPanelClass();

  rodId = this.data.rodId ?? this.rods[0]?.id ?? '';
  spotId = this.initialSpotId();

  private initialSpotId(): string {
    const rod = this.rods.find((r) => r.id === this.rodId);
    return rod?.sessionSpotId ?? '';
  }

  onRodChange(): void {
    this.spotId = this.initialSpotId();
  }

  confirm(): void {
    if (!this.rodId) {
      return;
    }
    this.ref.close({
      rodId: this.rodId,
      sessionSpotId: this.spotId || undefined,
    });
  }
}
