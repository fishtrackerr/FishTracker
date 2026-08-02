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
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { WeatherCardComponent } from '../../shared/components/weather-card/weather-card.component';
import { WeatherHistoryComponent } from '../../shared/components/weather-history/weather-history.component';
import { ImageThumbComponent } from '../../shared/components/image-thumb/image-thumb.component';
import { ImagePickerComponent } from '../../shared/components/image-picker/image-picker.component';
import {
  GalleryImageItem,
  ImageGalleryComponent,
} from '../../shared/components/image-gallery/image-gallery.component';
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
    WeatherHistoryComponent,
    ImageThumbComponent,
    ImagePickerComponent,
    ImageGalleryComponent,
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
  private readonly imageRepo = inject(ImageRepository);
  private readonly imageService = inject(ImageService);
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
  readonly sessionImages = signal<GalleryImageItem[]>([]);
  readonly coverImageId = signal<string | undefined>(undefined);
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

    effect(() => {
      const s = this.session();
      this.catches();
      if (s) {
        void this.loadSessionImages();
        void this.refreshCover(s);
      } else {
        this.sessionImages.set([]);
        this.coverImageId.set(undefined);
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

  private async refreshCover(s: FishingSession): Promise<void> {
    this.coverImageId.set(await this.sessionService.resolveCoverImageId(s));
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

  async onImageUploaded(imageId: string): Promise<void> {
    const s = this.session();
    if (!s) return;
    if (s.photoIds.includes(imageId)) {
      await this.loadSessionImages();
      return;
    }
    await this.sessionService.update(s.id, {
      photoIds: [...s.photoIds, imageId],
    });
    await this.loadSessionImages();
  }

  async onImagesChanged(): Promise<void> {
    await this.pruneDeletedPhotoRefs();
    await this.loadSessionImages();
  }

  private async pruneDeletedPhotoRefs(): Promise<void> {
    const s = this.session();
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

  editCatch(catchId: string): void {
    const s = this.session();
    if (!s) return;
    void this.router.navigate(['/sessions', s.id, 'catches', catchId, 'edit']);
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
