import { Component, OnInit, ChangeDetectionStrategy, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ImageRepository } from '../../core/services/image.repository';
import { CatchRepository } from '../../core/services/catch.repository';
import { SessionRepository } from '../../core/services/session.repository';
import { LakeRepository } from '../../core/services/lake.repository';
import { Catch } from '../../core/models';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import {
  GalleryImageItem,
  ImageGalleryComponent,
} from '../../shared/components/image-gallery/image-gallery.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-gallery',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    EmptyStateComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    PageTitleComponent,
    ImageGalleryComponent,
    TranslatePipe,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  private readonly imageRepo = inject(ImageRepository);
  private readonly catchRepo = inject(CatchRepository);
  private readonly sessionRepo = inject(SessionRepository);
  private readonly lakeRepo = inject(LakeRepository);

  readonly images = toSignal(this.imageRepo.watchGallery(), { initialValue: [] });
  readonly items = signal<GalleryImageItem[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  selectedLake = '';
  selectedSpecies = '';
  readonly favoritesOnly = signal(false);
  readonly personalOnly = signal(false);

  lakes: { id: string; name: string }[] = [];
  species: string[] = [];

  constructor() {
    effect(() => {
      // Rebuild metadata when liveQuery images change (URLs loaded lazily in gallery).
      this.images();
      void this.buildItems();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadFilters();
  }

  async loadFilters(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      const [lakes, catches] = await Promise.all([
        this.lakeRepo.getAll(),
        this.catchRepo.getAll(),
      ]);
      this.lakes = lakes.map((l) => ({ id: l.id, name: l.name }));
      this.species = [...new Set(catches.map((c) => c.species))];
      await this.buildItems();
    } catch {
      this.loadError.set('gallery.loadError');
    } finally {
      this.loading.set(false);
    }
  }

  async buildItems(): Promise<void> {
    try {
      const images = this.images();
      const catches = await this.catchRepo.getAll();
      const sessions = await this.sessionRepo.getAll();
      const lakes = await this.lakeRepo.getAll();

      const catchByPhoto = new Map<string, Catch>();
      catches.forEach((c) => {
        if (c.photoId) catchByPhoto.set(c.photoId, c);
      });

      const sessionLake = new Map(sessions.map((s) => [s.id, s.lakeId]));
      const lakeNames = new Map(lakes.map((l) => [l.id, l.name]));

      // Metadata only — thumbnails load via IntersectionObserver in image-gallery.
      let items: GalleryImageItem[] = images.map((img) => {
        const catchRecord = catchByPhoto.get(img.id);
        const lakeId = catchRecord
          ? sessionLake.get(catchRecord.sessionId)
          : img.parentId
            ? sessionLake.get(img.parentId) ?? img.parentId
            : undefined;
        const lakeName =
          typeof lakeId === 'string' && lakeNames.has(lakeId)
            ? lakeNames.get(lakeId)
            : lakes.find((l) => l.id === lakeId)?.name;
        return {
          ...img,
          species: catchRecord?.species,
          lakeName,
        };
      });

      if (this.selectedLake) {
        const lakeName = lakes.find((l) => l.id === this.selectedLake)?.name;
        items = items.filter((i) => i.lakeName === lakeName || i.parentId === this.selectedLake);
      }
      if (this.selectedSpecies) {
        items = items.filter((i) => i.species === this.selectedSpecies);
      }
      if (this.favoritesOnly()) {
        items = items.filter((i) => i.isFavorite);
      }
      if (this.personalOnly()) {
        const prPhotoIds = new Set(
          catches.filter((c) => c.isPersonalRecord && c.photoId).map((c) => c.photoId!),
        );
        items = items.filter((i) => prPhotoIds.has(i.id));
      }

      this.items.set(items);
      this.loadError.set(null);
    } catch {
      this.loadError.set('gallery.loadError');
    }
  }

  async onFilterChange(): Promise<void> {
    await this.buildItems();
  }
}
