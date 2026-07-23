import { DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { SessionService } from '../../core/services/session.service';
import { CatchService } from '../../core/services/catch.service';
import { LakeService } from '../../core/services/lake.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { WeatherCardComponent } from '../../shared/components/weather-card/weather-card.component';
import { ImageThumbComponent } from '../../shared/components/image-thumb/image-thumb.component';
import { FormatWeightPipe, FormatLengthPipe } from '../../core/pipes/format-units.pipe';
import { formatDuration } from '../../core/utils';
import { FishingSession } from '../../core/models';
import { MapsLinkButtonComponent } from '../../shared/components/maps-link-button/maps-link-button.component';
import { RodCardComponent } from '../../shared/components/rod-card/rod-card.component';
import { SessionTimelineComponent } from '../../shared/components/session-timeline/session-timeline.component';
import { RodSummaryComponent } from '../../shared/components/rod-summary/rod-summary.component';
import { ExpandableSectionComponent } from '../../shared/components/expandable-section/expandable-section.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-session-detail',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    WeatherCardComponent,
    ImageThumbComponent,
    FormatWeightPipe,
    FormatLengthPipe,
    MapsLinkButtonComponent,
    RodCardComponent,
    SessionTimelineComponent,
    RodSummaryComponent,
    ExpandableSectionComponent,
    TranslatePipe,
  ],
  templateUrl: './session-detail.component.html',
  styleUrl: './session-detail.component.css',
})
export class SessionDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);
  private readonly catchService = inject(CatchService);
  private readonly lakeService = inject(LakeService);
  private readonly confirm = inject(ConfirmService);
  private readonly notify = inject(NotificationService);
  private readonly i18n = inject(I18nService);

  readonly session = toSignal(
    this.route.paramMap.pipe(
      switchMap((p) => this.sessionService.watchById(p.get('id')!)),
    ),
  );
  readonly catches = toSignal(
    this.route.paramMap.pipe(
      switchMap((p) => this.catchService.watchBySession(p.get('id')!)),
    ),
    { initialValue: [] },
  );
  readonly setupRodsMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('setupRods') === '1'),
    ),
    { initialValue: false },
  );

  readonly lakeName = signal('');
  readonly durationText = signal('—');
  notes = '';
  prebait = '';
  private durationIntervalId?: ReturnType<typeof setInterval>;

  constructor() {
    effect((onCleanup) => {
      const s = this.session();
      if (this.durationIntervalId) {
        clearInterval(this.durationIntervalId);
        this.durationIntervalId = undefined;
      }
      if (!s) {
        this.durationText.set('—');
        return;
      }
      const tick = () => {
        this.durationText.set(formatDuration(this.sessionService.getDurationMs(s)));
      };
      tick();
      if (s.status === 'active') {
        this.durationIntervalId = setInterval(tick, 1000);
        onCleanup(() => {
          if (this.durationIntervalId) {
            clearInterval(this.durationIntervalId);
            this.durationIntervalId = undefined;
          }
        });
      }
    });

    effect(() => {
      const s = this.session();
      if (s) {
        void this.hydrateFromSession(s);
      }
    });
  }

  async hydrateFromSession(s: FishingSession): Promise<void> {
    if (s.lakeId) {
      const lake = await this.lakeService.getById(s.lakeId);
      this.lakeName.set(lake?.name ?? this.i18n.t('common.unknown'));
    } else {
      this.lakeName.set('—');
    }
    this.notes = s.notes ?? '';
    this.prebait = s.prebait ?? '';
  }

  async saveNotes(): Promise<void> {
    const s = this.session();
    if (s) {
      await this.sessionService.update(s.id, { notes: this.notes, prebait: this.prebait });
    }
  }

  editSession(): void {
    const s = this.session();
    if (!s) return;
    void this.router.navigate(['/sessions', s.id, 'edit']);
  }

  async complete(): Promise<void> {
    const s = this.session();
    if (s) {
      await this.sessionService.complete(s.id);
      await this.router.navigate(['/sessions']);
    }
  }

  async finishRodSetup(): Promise<void> {
    const s = this.session();
    if (!s) {
      return;
    }
    await this.router.navigate(['/sessions/active'], {
      queryParams: { id: s.id },
    });
  }

  onRodChanged(): void {
    // liveQuery refreshes session and catches automatically
  }

  spotName(sessionSpotId?: string): string {
    const s = this.session();
    if (!s || !sessionSpotId) return '';
    return s.sessionSpots?.find((sp) => sp.id === sessionSpotId)?.name ?? '';
  }

  get rodSummary() {
    const s = this.session();
    if (!s?.rods) return null;
    return {
      total: s.rods.length,
      active: s.rods.filter((r) => r.isActive).length,
      bites: s.rods.reduce((sum, r) => sum + r.biteCount, 0),
      spotted: s.rods.reduce((sum, r) => sum + r.fishSpottedCount, 0),
    };
  }

  async deleteSession(): Promise<void> {
    const s = this.session();
    if (!s) return;
    const ok = await this.confirm.confirmDelete(this.i18n.t('sessionDetail.deleteSessionQuestion'), s.name);
    if (ok) {
      await this.sessionService.delete(s.id);
      this.notify.success(this.i18n.t('sessionDetail.sessionDeleted'));
      await this.router.navigate(['/sessions']);
    }
  }
}
