import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { switchMap } from 'rxjs';
import {
  SessionService,
  SessionValidationError,
  UpdateSessionOptions,
} from '../../core/services/session.service';
import { LakeService } from '../../core/services/lake.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { RodService } from '../../core/services/rod.service';
import { SettingsService } from '../../core/services/settings.service';
import { FishingSession, FishingSpot, Lake, SessionSpot, SessionStatus } from '../../core/models';
import { fromLocalDatetimeInput, toLocalDatetimeInput } from '../../core/utils';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { MapsLinkButtonComponent } from '../../shared/components/maps-link-button/maps-link-button.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-session-edit',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    PageTitleComponent,
    MapsLinkButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './session-edit.component.html',
  styleUrl: './session-edit.component.css',
})
export class SessionEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);
  private readonly lakeService = inject(LakeService);
  private readonly confirm = inject(ConfirmService);
  private readonly notify = inject(NotificationService);
  private readonly rodService = inject(RodService);
  private readonly settings = inject(SettingsService);
  private readonly i18n = inject(I18nService);

  readonly session = toSignal(
    this.route.paramMap.pipe(
      switchMap((p) => this.sessionService.watchById(p.get('id')!)),
    ),
  );
  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] as Lake[] });

  readonly statuses: SessionStatus[] = ['planned', 'active', 'completed'];
  readonly maxRodCount = computed(() => this.settings.settings().maxRodCount ?? 10);

  name = '';
  lakeId = '';
  status: SessionStatus = 'active';
  startDateLocal = '';
  endDateLocal = '';
  prebait = '';
  notes = '';
  tagsInput = '';
  tags: string[] = [];
  rodCount = 1;
  latitude?: number;
  longitude?: number;
  waterTemperatureC?: number;

  selectedSpotIds = signal<string[]>([]);
  availableLakeSpots = signal<FishingSpot[]>([]);
  sessionSpots = signal<SessionSpot[]>([]);
  private previousLakeId = '';
  readonly saving = signal(false);
  readonly isLoading = signal(true);
  readonly loaded = signal(false);
  readonly forceRodResize = signal(false);

  constructor() {
    effect(() => {
      const s = this.session();
      this.isLoading.set(false);
      if (s && !this.loaded()) {
        this.hydrate(s);
        this.loaded.set(true);
      }
    });
  }

  private hydrate(s: FishingSession): void {
    this.name = s.name;
    this.lakeId = s.lakeId ?? '';
    this.previousLakeId = this.lakeId;
    this.status = s.status;
    this.startDateLocal = toLocalDatetimeInput(s.startDate);
    this.endDateLocal = s.endDate ? toLocalDatetimeInput(s.endDate) : '';
    this.prebait = s.prebait ?? '';
    this.notes = s.notes ?? '';
    this.tags = s.tags ?? [];
    this.rodCount = s.rods?.length ?? 1;
    this.latitude = s.latitude;
    this.longitude = s.longitude;
    this.waterTemperatureC = s.waterTemperatureC;
    this.sessionSpots.set(s.sessionSpots ?? []);
    this.selectedSpotIds.set((s.sessionSpots ?? []).map((sp) => sp.id));
    void this.loadLakeSpots(this.lakeId);
  }

  async onLakeChange(newLakeId: string): Promise<void> {
    if (this.previousLakeId && newLakeId !== this.previousLakeId && this.sessionSpots().length > 0) {
      const ok = await this.confirm.confirm({
        title: this.i18n.t('sessionEdit.changeLakeTitle'),
        message: this.i18n.t('sessionEdit.changeLakeMessage'),
        confirmLabel: this.i18n.t('sessionEdit.changeLakeConfirm'),
      });
      if (!ok) {
        this.lakeId = this.previousLakeId;
        return;
      }
      this.sessionSpots.set([]);
      this.selectedSpotIds.set([]);
    }
    this.previousLakeId = newLakeId;
    await this.loadLakeSpots(newLakeId);
  }

  async loadLakeSpots(lakeId: string): Promise<void> {
    if (!lakeId) {
      this.availableLakeSpots.set([]);
      return;
    }
    const lake = await this.lakeService.getById(lakeId);
    this.availableLakeSpots.set(lake?.spots ?? []);
  }

  toggleSpot(spot: FishingSpot, selected: boolean): void {
    const current = this.sessionSpots();
    if (selected) {
      if (current.some((s) => s.lakeSpotId === spot.id)) {
        return;
      }
      const snapshot = this.rodService.snapshotFromLakeSpot(spot);
      this.sessionSpots.set([...current, snapshot]);
      this.selectedSpotIds.set([...this.selectedSpotIds(), snapshot.id]);
    } else {
      const snapshot = current.find((s) => s.lakeSpotId === spot.id);
      if (snapshot) {
        this.sessionSpots.set(current.filter((s) => s.id !== snapshot.id));
        this.selectedSpotIds.set(this.selectedSpotIds().filter((id) => id !== snapshot.id));
      }
    }
  }

  isSpotSelected(spot: FishingSpot): boolean {
    return this.sessionSpots().some((s) => s.lakeSpotId === spot.id);
  }

  async addNewLakeSpot(): Promise<void> {
    if (!this.lakeId) {
      return;
    }
    const spot = await this.lakeService.addSpot(this.lakeId, { name: this.i18n.t('sessionEdit.newSpotDefaultName') });
    if (spot) {
      await this.loadLakeSpots(this.lakeId);
      this.toggleSpot(spot, true);
    }
  }

  addTag(): void {
    const tag = this.tagsInput.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags = [...this.tags, tag];
    }
    this.tagsInput = '';
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  canSave(): boolean {
    if (!this.name.trim() || !this.startDateLocal) {
      return false;
    }
    if (this.endDateLocal) {
      const start = new Date(this.startDateLocal).getTime();
      const end = new Date(this.endDateLocal).getTime();
      if (end < start) {
        return false;
      }
    }
    return true;
  }

  get dateErrorMessage(): string {
    if (!this.endDateLocal || !this.startDateLocal) {
      return '';
    }
    const start = new Date(this.startDateLocal).getTime();
    const end = new Date(this.endDateLocal).getTime();
    if (end < start) {
      return this.i18n.t('sessionEdit.endDateBeforeStart');
    }
    return '';
  }

  async save(): Promise<void> {
    const s = this.session();
    if (!s || !this.canSave()) {
      return;
    }
    this.saving.set(true);
    const options: UpdateSessionOptions = {
      name: this.name.trim(),
      lakeId: this.lakeId || undefined,
      status: this.status,
      startDate: fromLocalDatetimeInput(this.startDateLocal)!,
      endDate: fromLocalDatetimeInput(this.endDateLocal),
      prebait: this.prebait || undefined,
      notes: this.notes || undefined,
      tags: this.tags.length > 0 ? this.tags : undefined,
      sessionSpots: this.sessionSpots(),
      rodCount: this.rodCount,
      latitude: this.latitude,
      longitude: this.longitude,
      waterTemperatureC: this.waterTemperatureC,
    };
    try {
      await this.sessionService.updateSession(s.id, options, this.forceRodResize());
      this.notify.success(this.i18n.t('sessionEdit.sessionUpdated'));
      await this.router.navigate(['/sessions', s.id]);
    } catch (err) {
      if (err instanceof SessionValidationError && err.message.includes('Confirm')) {
        const ok = await this.confirm.confirm({
          title: this.i18n.t('sessionEdit.reduceRodCountTitle'),
          message: this.i18n.t('sessionEdit.reduceRodCountMessage'),
          confirmLabel: this.i18n.t('sessionEdit.reduceAnyway'),
        });
        if (ok) {
          this.forceRodResize.set(true);
          await this.save();
        }
      } else {
        const msg = err instanceof SessionValidationError ? err.message : this.i18n.t('sessionEdit.updateFailed');
        this.notify.error(msg);
      }
    } finally {
      this.saving.set(false);
      this.forceRodResize.set(false);
    }
  }

  async cancel(): Promise<void> {
    const s = this.session();
    if (s) {
      await this.router.navigate(['/sessions', s.id]);
    } else {
      await this.router.navigate(['/sessions']);
    }
  }

  async refreshWeather(): Promise<void> {
    const s = this.session();
    if (s) {
      await this.sessionService.refreshWeather(s.id);
      const updated = await this.sessionService.getById(s.id);
      if (updated) {
        this.latitude = updated.latitude;
        this.longitude = updated.longitude;
      }
      this.notify.success(this.i18n.t('sessionEdit.weatherRefreshed'));
    }
  }
}
