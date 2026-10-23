import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, map, of, switchMap } from 'rxjs';
import {
  FishingSession,
  SessionRod,
  SessionWeatherRecord,
  WeatherWarning,
} from '../../core/models';
import {
  FormatLengthPipe,
  FormatTempPipe,
  FormatWeightPipe,
} from '../../core/pipes/format-units.pipe';
import { BiteEventService } from '../../core/services/bite-event.service';
import { CatchService } from '../../core/services/catch.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { DialogService } from '../../core/services/dialog.service';
import { I18nService } from '../../core/services/i18n.service';
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { RodService } from '../../core/services/rod.service';
import { SessionWeatherService } from '../../core/services/session-weather.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { ThemeService } from '../../core/services/theme.service';
import { WeatherService } from '../../core/services/weather.service';
import { formatDuration } from '../../core/utils';
import {
  GalleryImageItem,
  ImageGalleryComponent,
} from '../../shared/components/image-gallery/image-gallery.component';
import { ImagePickerComponent } from '../../shared/components/image-picker/image-picker.component';
import { ImageThumbComponent } from '../../shared/components/image-thumb/image-thumb.component';
import { MapsLinkButtonComponent } from '../../shared/components/maps-link-button/maps-link-button.component';
import {
  RecastRodDialogComponent,
  RecastRodDialogResult,
} from '../../shared/components/recast-rod-dialog/recast-rod-dialog.component';
import { openRodSheet } from '../../shared/components/rod-sheet/rod-sheet.component';
import { RodSummaryComponent } from '../../shared/components/rod-summary/rod-summary.component';
import { SessionTimelineComponent } from '../../shared/components/session-timeline/session-timeline.component';
import { WeatherCardComponent } from '../../shared/components/weather-card/weather-card.component';
import { WeatherHistoryComponent } from '../../shared/components/weather-history/weather-history.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { openCatchSheet } from '../catches/catch-sheet/open-catch-sheet';
import { RodTileComponent } from './rod-tile/rod-tile.component';

export type PressureTrend = 'rising' | 'falling' | 'steady';

/** hPa change between the last two snapshots that counts as rising / falling. */
const PRESSURE_TREND_THRESHOLD_HPA = 1;

/**
 * The one session screen (`/sessions/:id`). Live mode (status `active`): top strip
 * with timer, rod tiles (Bite +1 / Catch) and a sticky action bar. Finished mode:
 * the same sections without timer, tiles and action bar.
 */
@Component({
  selector: 'app-session-detail',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    WeatherCardComponent,
    WeatherHistoryComponent,
    ImageThumbComponent,
    ImagePickerComponent,
    ImageGalleryComponent,
    FormatWeightPipe,
    FormatLengthPipe,
    FormatTempPipe,
    MapsLinkButtonComponent,
    SessionTimelineComponent,
    RodSummaryComponent,
    RodTileComponent,
    TranslatePipe,
  ],
  templateUrl: './session-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './session-detail.component.css',
})
export class SessionDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);
  private readonly catchService = inject(CatchService);
  private readonly lakeService = inject(LakeService);
  private readonly rodService = inject(RodService);
  private readonly biteService = inject(BiteEventService);
  private readonly weatherService = inject(WeatherService);
  private readonly sessionWeather = inject(SessionWeatherService);
  private readonly settings = inject(SettingsService);
  private readonly confirm = inject(ConfirmService);
  private readonly notify = inject(NotificationService);
  private readonly imageRepo = inject(ImageRepository);
  private readonly imageService = inject(ImageService);
  private readonly i18n = inject(I18nService);
  private readonly photoPick = inject(PhotoPickService);
  private readonly dialog = inject(DialogService);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly theme = inject(ThemeService);

  private readonly sessionId$ = this.route.paramMap.pipe(map((p) => p.get('id') ?? ''));

  /** `null` while loading, `undefined` when not found (or in another fishing mode). */
  readonly session = toSignal<FishingSession | undefined | null>(
    this.sessionId$.pipe(switchMap((id) => this.sessionService.watchById(id))),
    { initialValue: null },
  );
  readonly catches = toSignal(
    this.sessionId$.pipe(switchMap((id) => this.catchService.watchBySession(id))),
    { initialValue: [] },
  );
  private readonly weatherRecords = toSignal(
    this.sessionId$.pipe(
      switchMap((id) => (id ? this.sessionWeather.watchBySession(id) : of([]))),
    ),
    { initialValue: [] as SessionWeatherRecord[] },
  );

  readonly isLive = computed(() => this.session()?.status === 'active');
  readonly rods = computed<SessionRod[]>(() =>
    [...(this.session()?.rods ?? [])].sort((a, b) => a.rodNumber - b.rodNumber),
  );
  readonly activeRods = computed(() => this.rods().filter((r) => r.isActive));
  readonly inactiveRods = computed(() => this.rods().filter((r) => !r.isActive));

  /** Swim name when every rod is on the same spot, else ''. */
  readonly sharedSwim = computed(() => {
    const rods = this.rods();
    const spotId = rods[0]?.sessionSpotId;
    if (!spotId || rods.some((r) => r.sessionSpotId !== spotId)) {
      return '';
    }
    return this.spotName(spotId);
  });

  readonly weatherAlerts = computed<WeatherWarning[]>(() => {
    if (!this.isLive() || !this.settings.get().showWeatherWarnings) {
      return [];
    }
    const weather = this.session()?.weather;
    return weather ? this.weatherService.getWarnings(weather) : [];
  });

  /** Pressure trend from the last two weather snapshots; undefined with fewer than two. */
  readonly pressureTrend = computed<PressureTrend | undefined>(() => {
    const records = [...this.weatherRecords()].sort((a, b) =>
      a.capturedAt.localeCompare(b.capturedAt),
    );
    if (records.length < 2) {
      return undefined;
    }
    const diff =
      records[records.length - 1].weather.airPressureHpa -
      records[records.length - 2].weather.airPressureHpa;
    if (diff >= PRESSURE_TREND_THRESHOLD_HPA) return 'rising';
    if (diff <= -PRESSURE_TREND_THRESHOLD_HPA) return 'falling';
    return 'steady';
  });

  /** Ticks every second while the session is live so the timer recomputes. */
  private readonly now = signal(Date.now());
  /** HH:mm:ss — live timer, or the total duration of a finished session. */
  readonly timer = computed(() => {
    this.now();
    const s = this.session();
    return s ? formatDuration(this.sessionService.getDurationMs(s)) : '00:00:00';
  });

  readonly rodSummary = computed(() => {
    const rods = this.rods();
    if (rods.length === 0) return null;
    return {
      total: rods.length,
      active: rods.filter((r) => r.isActive).length,
      bites: rods.reduce((sum, r) => sum + r.biteCount, 0),
      spotted: rods.reduce((sum, r) => sum + r.fishSpottedCount, 0),
    };
  });

  readonly maxRodCount = Math.max(1, this.settings.get().maxRodCount ?? 10);
  /** Rod count for the "No rods yet" stepper. */
  readonly newRodCount = signal(Math.min(2, this.maxRodCount));

  readonly lakeName = signal('');
  readonly sessionImages = signal<GalleryImageItem[]>([]);
  readonly coverImageId = signal<string | undefined>(undefined);
  /** Changes only when the session's photo ids change, not on every session write. */
  private readonly sessionImageKey = computed(() => {
    const s = this.session();
    if (!s) return '';
    const catchPhotoIds = this.catches()
      .map((c) => c.photoId)
      .filter((id): id is string => !!id);
    return JSON.stringify({ sessionId: s.id, linkedIds: [...s.photoIds, ...catchPhotoIds] });
  });
  private readonly lakeKey = computed(() => {
    const s = this.session();
    return s ? `${s.id}|${s.lakeId ?? ''}` : '';
  });

  readonly notes = signal('');
  readonly prebait = signal('');
  /** Stored values last copied into the fields, so other session writes (bites…) do not clobber typing. */
  private notesSource: string | undefined;
  private prebaitSource: string | undefined;
  private hydratedSessionId = '';

  private readonly notesField = viewChild<ElementRef<HTMLTextAreaElement>>('notesField');

  constructor() {
    effect((onCleanup) => {
      if (!this.isLive()) return;
      const id = setInterval(() => this.now.set(Date.now()), 1000);
      onCleanup(() => clearInterval(id));
    });

    effect(() => {
      if (!this.lakeKey()) return;
      const lakeId = untracked(() => this.session()?.lakeId);
      void untracked(() => this.loadLakeName(lakeId));
    });

    effect(() => {
      const s = this.session();
      if (s) untracked(() => this.hydrateFields(s));
    });

    effect(() => {
      const s = this.session();
      this.catches();
      if (s) {
        void untracked(() => this.refreshCover(s));
      } else {
        this.coverImageId.set(undefined);
      }
    });

    effect(() => {
      if (this.sessionImageKey()) {
        void untracked(() => this.loadSessionImages());
      } else {
        this.sessionImages.set([]);
      }
    });
  }

  private async loadLakeName(lakeId: string | undefined): Promise<void> {
    if (!lakeId) {
      this.lakeName.set('—');
      return;
    }
    const lake = await this.lakeService.getById(lakeId);
    this.lakeName.set(lake?.name ?? this.i18n.t('common.unknown'));
  }

  private hydrateFields(s: FishingSession): void {
    const newSession = s.id !== this.hydratedSessionId;
    this.hydratedSessionId = s.id;
    if (newSession || (s.notes ?? '') !== this.notesSource) {
      this.notesSource = s.notes ?? '';
      this.notes.set(this.notesSource);
    }
    if (newSession || (s.prebait ?? '') !== this.prebaitSource) {
      this.prebaitSource = s.prebait ?? '';
      this.prebait.set(this.prebaitSource);
    }
  }

  private async refreshCover(s: FishingSession): Promise<void> {
    this.coverImageId.set(await this.sessionService.resolveCoverImageId(s));
  }

  private current(): FishingSession | undefined {
    return this.session() ?? undefined;
  }

  // --- Rods -------------------------------------------------------------------

  spotName(sessionSpotId?: string): string {
    const s = this.current();
    if (!s || !sessionSpotId) return '';
    return s.sessionSpots?.find((sp) => sp.id === sessionSpotId)?.name ?? '';
  }

  /** Bite +1 on a rod, with an Undo snackbar that removes the bite again. */
  async addBite(rod: SessionRod): Promise<void> {
    const s = this.current();
    if (!s) return;
    try {
      await this.biteService.addBite(s.id, rod.id);
      this.notify.withAction(
        this.i18n.t('sessionScreen.biteLogged', { n: rod.rodNumber }),
        this.i18n.t('sessionScreen.undo'),
        () => {
          void this.biteService.removeBite(s.id, rod.id);
        },
        'success',
        5000,
      );
    } catch (error) {
      console.error('[SessionScreen] Failed to add bite', error);
      this.notify.error(this.i18n.t('rod.sheetFailed'));
    }
  }

  /** Opens the catch sheet for a rod (log now, details later). */
  async openCatch(rod?: SessionRod): Promise<void> {
    const s = this.current();
    if (!s) return;
    await openCatchSheet(this.bottomSheet, this.theme, { session: s, rodId: rod?.id });
  }

  /** Opens the rod sheet (edit, recast, spotted, bite −1, take out / put back). */
  async openRod(rod: SessionRod): Promise<void> {
    const s = this.current();
    if (!s) return;
    await openRodSheet(this.bottomSheet, this.theme, { session: s, rodId: rod.id });
  }

  changeNewRodCount(delta: number): void {
    this.newRodCount.update((n) => Math.min(this.maxRodCount, Math.max(1, n + delta)));
  }

  /** "No rods yet" prompt: creates (or revives) rods up to the chosen count. */
  async addRods(): Promise<void> {
    const s = this.current();
    if (!s) return;
    try {
      await this.rodService.ensureRods(s, this.newRodCount());
      this.notify.success(this.i18n.t('sessionScreen.rodsAdded'));
    } catch (error) {
      console.error('[SessionScreen] Failed to add rods', error);
      this.notify.error(this.i18n.t('rod.sheetFailed'));
    }
  }

  /** Action bar Recast: rod picker + spot via the recast dialog. */
  async recastRod(): Promise<void> {
    const s = this.current();
    if (!s?.rods?.length) return;
    const ref = this.dialog.open(RecastRodDialogComponent, {
      width: '100%',
      maxWidth: '480px',
      data: { session: s },
    });
    const result = (await firstValueFrom(ref.afterClosed())) as RecastRodDialogResult | undefined;
    if (!result?.rodId) return;
    try {
      await this.rodService.recast(s, result.rodId, result.sessionSpotId);
      this.notify.success(this.i18n.t('rod.recastSuccess'));
    } catch (error) {
      console.error('[SessionScreen] Failed to recast rod', error);
      this.notify.error(this.i18n.t('rod.recastFailed'));
    }
  }

  // --- Weather ----------------------------------------------------------------

  async refreshWeather(): Promise<void> {
    const s = this.current();
    if (!s) return;
    try {
      await this.sessionService.refreshWeather(s.id);
      this.notify.success(this.i18n.t('weather.updated'));
    } catch {
      this.notify.error(this.i18n.t('weather.refreshFailed'));
    }
  }

  // --- Photos -----------------------------------------------------------------

  async loadSessionImages(): Promise<void> {
    const key = this.sessionImageKey();
    if (!key) return;
    const { sessionId, linkedIds } = JSON.parse(key) as { sessionId: string; linkedIds: string[] };
    const items = await this.imageService.getSessionImages(sessionId, linkedIds);
    // Ignore a slower, older load when the photos changed meanwhile.
    if (key === this.sessionImageKey()) {
      this.sessionImages.set(items);
    }
  }

  /** Action bar Photo → camera or gallery. */
  async addSessionPhoto(useCamera: boolean): Promise<void> {
    const s = this.current();
    if (!s) return;
    const file = await this.photoPick.pickImage({ capture: useCamera });
    if (file) {
      await this.sessionService.addSessionPhoto(s.id, file);
      await this.loadSessionImages();
    }
  }

  async onImageUploaded(imageId: string): Promise<void> {
    const s = this.current();
    if (!s) return;
    if (s.photoIds.includes(imageId)) {
      await this.loadSessionImages();
      return;
    }
    await this.sessionService.update(s.id, { photoIds: [...s.photoIds, imageId] });
    await this.loadSessionImages();
  }

  async onImagesChanged(): Promise<void> {
    await this.pruneDeletedPhotoRefs();
    await this.loadSessionImages();
  }

  private async pruneDeletedPhotoRefs(): Promise<void> {
    const s = this.current();
    if (!s) return;

    const photoIds: string[] = [];
    for (const id of s.photoIds) {
      if (await this.imageRepo.getById(id)) {
        photoIds.push(id);
      }
    }

    const updates: { photoIds?: string[]; coverImageId?: string } = {};
    if (photoIds.length !== s.photoIds.length) {
      updates.photoIds = photoIds;
    }
    if (s.coverImageId && !(await this.imageRepo.getById(s.coverImageId))) {
      updates.coverImageId = undefined;
    }
    if (Object.keys(updates).length > 0) {
      await this.sessionService.update(s.id, updates);
    }

    for (const c of this.catches()) {
      if (c.photoId && !(await this.imageRepo.getById(c.photoId))) {
        await this.catchService.update(c.id, { photoId: undefined });
      }
    }
  }

  // --- Notes ------------------------------------------------------------------

  /** Action bar Note: scroll to and focus the notes field. */
  focusNotes(): void {
    const field = this.notesField()?.nativeElement;
    if (!field) return;
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    field.focus({ preventScroll: true });
  }

  async saveNotes(): Promise<void> {
    const s = this.current();
    if (!s) return;
    this.notesSource = this.notes();
    this.prebaitSource = this.prebait();
    await this.sessionService.update(s.id, { notes: this.notes(), prebait: this.prebait() });
  }

  // --- Navigation and session actions ------------------------------------------

  editSession(): void {
    const s = this.current();
    if (!s) return;
    void this.router.navigate(['/sessions', s.id, 'edit'], {
      queryParams: { returnUrl: this.currentUrl() },
    });
  }

  /** This screen's URL, passed as `returnUrl` so edit pages come back here. */
  currentUrl(): string {
    return this.router.url;
  }

  editCatch(catchId: string): void {
    const s = this.current();
    if (!s) return;
    void this.router.navigate(['/sessions', s.id, 'catches', catchId, 'edit'], {
      queryParams: { returnUrl: this.currentUrl() },
    });
  }

  /** Ends the live session (with confirm) and opens its summary. */
  async endSession(): Promise<void> {
    const s = this.current();
    if (!s) return;
    const confirmed = await this.confirm.confirm({
      title: this.i18n.t('activeSession.endSession'),
      message: this.i18n.t('activeSession.endSessionConfirm'),
      confirmLabel: this.i18n.t('activeSession.endSession'),
    });
    if (!confirmed) return;
    try {
      await this.sessionService.complete(s.id);
      this.notify.success(this.i18n.t('activeSession.sessionEnded'));
      await this.router.navigate(['/sessions', s.id, 'summary'], { replaceUrl: true });
    } catch (error) {
      console.error('[SessionScreen] Failed to complete session', error);
      this.notify.error(this.i18n.t('activeSession.endFailed'));
    }
  }

  async deleteSession(): Promise<void> {
    const s = this.current();
    if (!s) return;
    const ok = await this.confirm.confirmDelete(
      this.i18n.t('sessionDetail.deleteSessionQuestion'),
      s.name,
    );
    if (ok) {
      await this.sessionService.delete(s.id);
      this.notify.success(this.i18n.t('sessionDetail.sessionDeleted'));
      await this.router.navigate(['/sessions']);
    }
  }
}
