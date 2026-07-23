import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { LakeService } from '../../core/services/lake.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { ImageRepository } from '../../core/services/image.repository';
import { ImageService } from '../../core/services/image.service';
import { FishingSpot } from '../../core/models';
import { ImageThumbComponent } from '../../shared/components/image-thumb/image-thumb.component';
import { ImagePickerComponent } from '../../shared/components/image-picker/image-picker.component';
import {
  GalleryImageItem,
  ImageGalleryComponent,
} from '../../shared/components/image-gallery/image-gallery.component';
import { MapsLinkButtonComponent } from '../../shared/components/maps-link-button/maps-link-button.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-lake-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ImageThumbComponent,
    ImagePickerComponent,
    ImageGalleryComponent,
    MapsLinkButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './lake-detail.component.html',
  styleUrl: './lake-detail.component.css',
})
export class LakeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly lakeService = inject(LakeService);
  private readonly confirm = inject(ConfirmService);
  private readonly imageRepo = inject(ImageRepository);
  private readonly imageService = inject(ImageService);
  private readonly i18n = inject(I18nService);

  readonly lake = toSignal(
    this.route.paramMap.pipe(
      switchMap((p) => this.lakeService.watchById(p.get('id')!)),
    ),
  );

  readonly lakeImages = signal<GalleryImageItem[]>([]);
  readonly editingSpot = signal<FishingSpot | null>(null);
  spotName = '';
  spotDepth?: number;
  spotBottom = '';
  spotBait = '';
  spotNotes = '';

  constructor() {
    effect(() => {
      const l = this.lake();
      if (l) {
        void this.loadLakeImages();
      }
    });
  }

  async loadLakeImages(): Promise<void> {
    const l = this.lake();
    if (!l) return;
    const images = await this.imageRepo.getByType('lake');
    const lakeImages = images.filter((img) => img.parentId === l.id || l.photoIds.includes(img.id));
    const items: GalleryImageItem[] = await Promise.all(
      lakeImages.map(async (img) => ({
        ...img,
        url: (await this.imageService.getObjectUrl(img.id)) ?? undefined,
      })),
    );
    this.lakeImages.set(items);
  }

  async onImageUploaded(imageId: string): Promise<void> {
    const l = this.lake();
    if (!l) return;
    const photoIds = [...l.photoIds, imageId];
    const updates: { photoIds: string[]; coverImageId?: string } = { photoIds };
    if (!l.coverImageId) {
      updates.coverImageId = imageId;
    }
    await this.lakeService.update(l.id, updates);
    await this.loadLakeImages();
  }

  async setCoverImage(imageId: string): Promise<void> {
    const l = this.lake();
    if (!l) return;
    await this.lakeService.update(l.id, { coverImageId: imageId });
  }

  async saveLake(): Promise<void> {
    const l = this.lake();
    if (!l) return;
    await this.lakeService.update(l.id, {
      name: l.name,
      description: l.description,
      address: l.address,
      latitude: l.latitude,
      longitude: l.longitude,
      rules: l.rules,
      permitInformation: l.permitInformation,
      notes: l.notes,
      isFavorite: l.isFavorite,
      coverImageId: l.coverImageId,
      photoIds: l.photoIds,
    });
  }

  updateField(field: string, value: unknown): void {
    const l = this.lake();
    if (l) {
      (l as unknown as Record<string, unknown>)[field] = value;
    }
  }

  async addSpot(): Promise<void> {
    const l = this.lake();
    if (!l) return;
    await this.lakeService.addSpot(l.id, { name: this.i18n.t('lakes.newSpotDefaultName') });
  }

  editSpot(spot: FishingSpot): void {
    this.editingSpot.set(spot);
    this.spotName = spot.name;
    this.spotDepth = spot.waterDepthM;
    this.spotBottom = spot.bottomType ?? '';
    this.spotBait = spot.recommendedBait ?? '';
    this.spotNotes = spot.notes ?? '';
  }

  async saveSpot(): Promise<void> {
    const l = this.lake();
    const spot = this.editingSpot();
    if (!l || !spot) return;
    await this.lakeService.updateSpot(l.id, spot.id, {
      name: this.spotName,
      waterDepthM: this.spotDepth,
      bottomType: this.spotBottom || undefined,
      recommendedBait: this.spotBait || undefined,
      notes: this.spotNotes || undefined,
    });
    this.editingSpot.set(null);
  }

  async deleteSpot(spotId: string): Promise<void> {
    const l = this.lake();
    if (!l) return;
    const spot = l.spots.find((s) => s.id === spotId);
    const ok = await this.confirm.confirmDelete(this.i18n.t('lakes.deleteSpotQuestion'), spot?.name);
    if (ok) {
      await this.lakeService.deleteSpot(l.id, spotId);
    }
  }

  async deleteLake(): Promise<void> {
    const l = this.lake();
    if (!l) return;
    const ok = await this.confirm.confirmDelete(this.i18n.t('lakes.deleteLakeQuestion'), l.name);
    if (ok) {
      await this.lakeService.delete(l.id);
      history.back();
    }
  }
}
