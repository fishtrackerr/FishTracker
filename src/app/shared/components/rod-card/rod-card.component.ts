import { Component, Input, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Catch, FishingSession, SessionRod, SessionSpot } from '../../../core/models';
import { BiteEventService } from '../../../core/services/bite-event.service';
import { DialogService } from '../../../core/services/dialog.service';
import { FishSpottedEventService } from '../../../core/services/fish-spotted-event.service';
import { NotificationService } from '../../../core/services/notification.service';
import { I18nService } from '../../../core/services/i18n.service';
import { RodService } from '../../../core/services/rod.service';
import {
  RecastRodDialogComponent,
  RecastRodDialogResult,
} from '../recast-rod-dialog/recast-rod-dialog.component';
import { ExpandableSectionComponent } from '../expandable-section/expandable-section.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-rod-card',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ExpandableSectionComponent,
    TranslatePipe,
  ],
  templateUrl: './rod-card.component.html',
  styleUrl: './rod-card.component.css',
})
export class RodCardComponent {
  private readonly biteService = inject(BiteEventService);
  private readonly fishSpottedService = inject(FishSpottedEventService);
  private readonly rodService = inject(RodService);
  private readonly dialog = inject(DialogService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);

  @Input({ required: true }) session!: FishingSession;
  @Input({ required: true }) rod!: SessionRod;
  @Input() catches: Catch[] = [];
  @Input() sessionSpots: SessionSpot[] = [];

  readonly changed = output<void>();

  editing = false;
  editName = '';
  editBait = '';
  editRig = '';
  editNotes = '';
  editSpotId = '';

  get canRecast(): boolean {
    return this.session.status === 'active';
  }

  get spotName(): string {
    const spot = this.sessionSpots.find((s) => s.id === this.rod.sessionSpotId);
    return spot?.name ?? '—';
  }

  get catchCount(): number {
    return this.catches.filter((c) => c.rodId === this.rod.id).length;
  }

  startEdit(): void {
    this.editing = true;
    this.editName = this.rod.name;
    this.editBait = this.rod.bait ?? '';
    this.editRig = this.rod.rig ?? '';
    this.editNotes = this.rod.notes ?? '';
    this.editSpotId = this.rod.sessionSpotId ?? '';
  }

  async saveEdit(): Promise<void> {
    let updated = await this.rodService.updateRod(this.session, this.rod.id, {
      name: this.editName.trim() || this.rod.name,
      bait: this.editBait || undefined,
      rig: this.editRig || undefined,
      notes: this.editNotes || undefined,
    });
    if (this.editSpotId !== (this.rod.sessionSpotId ?? '')) {
      updated = await this.rodService.assignSpot(
        updated,
        this.rod.id,
        this.editSpotId || undefined,
      );
    }
    this.editing = false;
    this.changed.emit();
  }

  async addBite(): Promise<void> {
    await this.biteService.addBite(this.session.id, this.rod.id);
    this.changed.emit();
  }

  async removeBite(): Promise<void> {
    await this.biteService.removeBite(this.session.id, this.rod.id);
    this.changed.emit();
  }

  async markFishSpotted(): Promise<void> {
    await this.fishSpottedService.register({
      sessionId: this.session.id,
      rodId: this.rod.id,
    });
    this.changed.emit();
  }

  async addCatch(): Promise<void> {
    const queryParams: Record<string, string> = { rodId: this.rod.id };
    if (this.rod.sessionSpotId) {
      queryParams['sessionSpotId'] = this.rod.sessionSpotId;
    }
    await this.router.navigate(['/sessions', this.session.id, 'catches', 'new'], {
      queryParams,
    });
  }

  async recast(): Promise<void> {
    if (!this.canRecast) {
      return;
    }
    const ref = this.dialog.open(RecastRodDialogComponent, {
      width: '100%',
      maxWidth: '480px',
      data: { session: this.session, rodId: this.rod.id },
    });
    const result = (await firstValueFrom(ref.afterClosed())) as
      | RecastRodDialogResult
      | undefined;
    if (!result?.rodId) {
      return;
    }
    try {
      await this.rodService.recast(this.session, result.rodId, result.sessionSpotId);
      this.notifications.success(this.i18n.t('rod.recastSuccess'));
      this.changed.emit();
    } catch (error) {
      console.error('[RodCard] Failed to recast rod', error);
      this.notifications.error(this.i18n.t('rod.recastFailed'));
    }
  }

  async toggleActive(): Promise<void> {
    await this.rodService.updateRod(this.session, this.rod.id, {
      isActive: !this.rod.isActive,
    });
    this.changed.emit();
  }
}
