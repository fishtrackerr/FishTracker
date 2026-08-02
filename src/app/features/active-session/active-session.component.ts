import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../core/services/dialog.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { switchMap, of } from 'rxjs';
import { SessionService } from '../../core/services/session.service';
import { CatchService } from '../../core/services/catch.service';
import { RodService } from '../../core/services/rod.service';
import { WeatherService } from '../../core/services/weather.service';
import { SettingsService } from '../../core/services/settings.service';
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { WeatherCardComponent } from '../../shared/components/weather-card/weather-card.component';
import { WeatherHistoryComponent } from '../../shared/components/weather-history/weather-history.component';
import {
  GalleryImageItem,
  ImageGalleryComponent,
} from '../../shared/components/image-gallery/image-gallery.component';
import { firstValueFrom } from 'rxjs';
import { QuickCatchDialogComponent } from '../catches/quick-catch-dialog.component';
import { QuickCatchInput } from '../../core/services/catch.service';
import {
  RecastRodDialogComponent,
  RecastRodDialogResult,
} from '../../shared/components/recast-rod-dialog/recast-rod-dialog.component';
import { formatDuration } from '../../core/utils';
import { FormatWeightPipe } from '../../core/pipes/format-units.pipe';
import { DatePipe } from '@angular/common';
import { MapsLinkButtonComponent } from '../../shared/components/maps-link-button/maps-link-button.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { I18nService } from '../../core/services/i18n.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { WeatherWarning } from '../../core/models';

@Component({
  selector: 'app-active-session',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    WeatherCardComponent,
    WeatherHistoryComponent,
    ImageGalleryComponent,
    FormatWeightPipe,
    MapsLinkButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './active-session.component.html',
  styleUrl: './active-session.component.css',
})
export class ActiveSessionComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);
  private readonly catchService = inject(CatchService);
  private readonly rodService = inject(RodService);
  private readonly weatherService = inject(WeatherService);
  private readonly settings = inject(SettingsService);
  private readonly dialog = inject(DialogService);
  private readonly confirm = inject(ConfirmService);
  private readonly notifications = inject(NotificationService);
  private readonly imageRepo = inject(ImageRepository);
  private readonly imageService = inject(ImageService);
  private readonly i18n = inject(I18nService);
  private readonly photoPick = inject(PhotoPickService);

  readonly session = toSignal(
    this.route.paramMap.pipe(
      switchMap(() => this.sessionService.watchActive()),
    ),
  );

  readonly catches = toSignal(
    toObservable(this.session).pipe(
      switchMap((s) => (s ? this.catchService.watchBySession(s.id) : of([]))),
    ),
    { initialValue: [] },
  );

  readonly weatherAlerts = computed<WeatherWarning[]>(() => {
    if (!this.settings.get().showWeatherWarnings) {
      return [];
    }
    const weather = this.session()?.weather;
    if (!weather) {
      return [];
    }
    return this.weatherService.getWarnings(weather);
  });

  readonly timer = signal('00:00:00');
  readonly showNotes = signal(false);
  readonly sessionImages = signal<GalleryImageItem[]>([]);
  notes = '';
  private intervalId?: ReturnType<typeof setInterval>;
  private notesSessionId = '';

  constructor() {
    effect(() => {
      const s = this.session();
      if (s && s.id !== this.notesSessionId) {
        this.notesSessionId = s.id;
        this.notes = s.notes ?? '';
      }
    });

    effect(() => {
      const s = this.session();
      this.catches();
      if (s) {
        void this.loadSessionImages();
      } else {
        this.sessionImages.set([]);
      }
    });
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
    this.updateTimer();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  async loadSessionImages(): Promise<void> {
    const s = this.session();
    if (!s) return;
    const catchPhotoIds = this.catches()
      .map((c) => c.photoId)
      .filter((id): id is string => !!id);
    const [sessionType, catchType] = await Promise.all([
      this.imageRepo.getByType('session'),
      this.imageRepo.getByType('catch'),
    ]);
    const linked = new Set([...s.photoIds, ...catchPhotoIds]);
    const matched = [...sessionType, ...catchType].filter(
      (img) => img.parentId === s.id || linked.has(img.id),
    );
    const byId = new Map(matched.map((img) => [img.id, img]));
    const items: GalleryImageItem[] = await Promise.all(
      [...byId.values()].map(async (img) => ({
        ...img,
        url: (await this.imageService.getObjectUrl(img.id)) ?? undefined,
      })),
    );
    items.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    this.sessionImages.set(items);
  }

  updateTimer(): void {
    const s = this.session();
    if (s) {
      this.timer.set(formatDuration(this.sessionService.getDurationMs(s)));
    }
  }

  async refreshWeather(): Promise<void> {
    const s = this.session();
    if (!s) return;
    try {
      await this.sessionService.refreshWeather(s.id);
      this.notifications.success(this.i18n.t('weather.updated'));
    } catch {
      this.notifications.error(this.i18n.t('weather.refreshFailed'));
    }
  }

  async quickCatch(): Promise<void> {
    const s = this.session();
    if (!s) return;
    const ref = this.dialog.open(QuickCatchDialogComponent, {
      width: '100%',
      maxWidth: '480px',
      data: { session: s },
    });
    const result = await firstValueFrom(ref.afterClosed()) as QuickCatchInput | undefined;
    if (result?.species) {
      try {
        await this.catchService.createQuick(s.id, result);
      } catch (error) {
        console.error('[ActiveSession] Failed to log quick catch', error);
        this.notifications.error(this.i18n.t('activeSession.instantCatchFailed'));
      }
    }
  }

  private instantSaving = false;

  async instantCatch(): Promise<void> {
    const s = this.session();
    if (!s || this.instantSaving) return;
    if (!s.rods?.length) {
      this.notifications.error(this.i18n.t('catchForm.rodRequired'));
      return;
    }
    this.instantSaving = true;
    try {
      const created = await this.catchService.createInstant(s.id, s.rods[0].id);
      this.notifications.withAction(
        this.i18n.t('activeSession.instantCatchLogged'),
        this.i18n.t('activeSession.addDetails'),
        () => {
          void this.router.navigate(['/sessions', s.id, 'catches', created.id, 'edit']);
        },
        'success',
        5000,
      );
    } catch (error) {
      console.error('[ActiveSession] Failed to log instant catch', error);
      this.notifications.error(this.i18n.t('activeSession.instantCatchFailed'));
    } finally {
      this.instantSaving = false;
    }
  }

  openCatch(catchId: string): void {
    const s = this.session();
    if (!s) return;
    void this.router.navigate(['/sessions', s.id, 'catches', catchId, 'edit']);
  }

  get hasRods(): boolean {
    return (this.session()?.rods?.length ?? 0) > 0;
  }

  async recastRod(): Promise<void> {
    const s = this.session();
    if (!s?.rods?.length) {
      return;
    }
    const ref = this.dialog.open(RecastRodDialogComponent, {
      width: '100%',
      maxWidth: '480px',
      data: { session: s },
    });
    const result = (await firstValueFrom(ref.afterClosed())) as
      | RecastRodDialogResult
      | undefined;
    if (!result?.rodId) {
      return;
    }
    try {
      await this.rodService.recast(s, result.rodId, result.sessionSpotId);
      this.notifications.success(this.i18n.t('rod.recastSuccess'));
    } catch (error) {
      console.error('[ActiveSession] Failed to recast rod', error);
      this.notifications.error(this.i18n.t('rod.recastFailed'));
    }
  }

  async addSessionPhoto(useCamera: boolean): Promise<void> {
    const s = this.session();
    if (!s) return;
    const file = await this.photoPick.pickImage({ capture: useCamera });
    if (file) {
      await this.sessionService.addSessionPhoto(s.id, file);
      await this.loadSessionImages();
    }
  }

  async openDetails(): Promise<void> {
    const s = this.session();
    if (!s) return;
    await this.router.navigate(['/sessions', s.id]);
  }

  async openEdit(): Promise<void> {
    const s = this.session();
    if (!s) return;
    await this.router.navigate(['/sessions', s.id, 'edit']);
  }

  toggleNotes(): void {
    this.showNotes.update((v) => !v);
  }

  async saveNotes(): Promise<void> {
    const s = this.session();
    if (s) await this.sessionService.update(s.id, { notes: this.notes });
  }

  async complete(): Promise<void> {
    const s = this.session();
    if (!s) return;

    const confirmed = await this.confirm.confirm({
      title: this.i18n.t('activeSession.endSession'),
      message: this.i18n.t('activeSession.endSessionConfirm') || 'End this fishing session?',
      confirmLabel: this.i18n.t('activeSession.endSession'),
    });

    if (!confirmed) return;

    try {
      await this.sessionService.complete(s.id);
      this.notifications.success(this.i18n.t('activeSession.sessionEnded') || 'Session ended');
      await this.router.navigate(['/sessions']);
    } catch (error) {
      console.error('[ActiveSession] Failed to complete session', error);
      this.notifications.error(this.i18n.t('activeSession.endFailed') || 'Failed to end session');
    }
  }
}
