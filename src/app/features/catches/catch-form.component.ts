import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CatchService } from '../../core/services/catch.service';
import { SessionService } from '../../core/services/session.service';
import { ImageService } from '../../core/services/image.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { UserOptionService } from '../../core/services/user-option.service';
import { OptionComboboxComponent } from '../../shared/components/option-combobox/option-combobox.component';
import { Catch, FishingSession } from '../../core/models';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-catch-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    OptionComboboxComponent,
    TranslatePipe,
  ],
  templateUrl: './catch-form.component.html',
  styleUrl: './catch-form.component.css',
})
export class CatchFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catchService = inject(CatchService);
  private readonly sessionService = inject(SessionService);
  private readonly imageService = inject(ImageService);
  private readonly photoPick = inject(PhotoPickService);
  private readonly userOptions = inject(UserOptionService);

  sessionId = this.route.snapshot.paramMap.get('id')!;
  catchId = this.route.snapshot.paramMap.get('catchId');
  readonly isEdit = !!this.catchId;
  session?: FishingSession;
  private existingCatch?: Catch;

  species = '';
  fishName = '';
  weightKg?: number;
  lengthCm?: number;
  bait = '';
  baitFlavor = '';
  rig = '';
  hookSize = '';
  line = '';
  method = '';
  weatherType = '';
  tagsInput = '';
  tags: string[] = [];
  rodId = '';
  sessionSpotId = '';
  distanceM?: number;
  waterDepthM?: number;
  waterTemperatureC?: number;
  notes = '';
  prebait = '';
  released = false;
  photo?: File;
  existingPhotoId?: string;

  rods: { id: string; name: string }[] = [];
  sessionSpots: { id: string; name: string }[] = [];
  readonly saving = signal(false);

  constructor() {
    void this.load();
  }

  async load(): Promise<void> {
    await this.userOptions.ensureDefaultsForCurrentMode();
    this.session = await this.sessionService.getById(this.sessionId);
    if (!this.session) {
      return;
    }
    this.rods = (this.session.rods ?? []).map((r) => ({ id: r.id, name: r.name }));
    this.sessionSpots = (this.session.sessionSpots ?? []).map((s) => ({
      id: s.id,
      name: s.name,
    }));

    if (this.isEdit && this.catchId) {
      const catchRecord = await this.catchService.getById(this.catchId);
      if (!catchRecord || catchRecord.sessionId !== this.sessionId) {
        return;
      }
      this.existingCatch = catchRecord;
      this.applyCatch(catchRecord);
      if (!this.rodId && this.rods[0]) {
        this.onRodChange(this.rods[0].id);
      }
      return;
    }

    const rodId = this.route.snapshot.queryParamMap.get('rodId');
    const sessionSpotId = this.route.snapshot.queryParamMap.get('sessionSpotId');
    if (rodId) {
      this.rodId = rodId;
      const rod = this.session.rods?.find((r) => r.id === rodId);
      if (rod) {
        this.bait = rod.bait ?? this.bait;
        this.rig = rod.rig ?? this.rig;
        this.sessionSpotId = sessionSpotId ?? rod.sessionSpotId ?? '';
      }
    } else if (this.rods[0]) {
      this.onRodChange(this.rods[0].id);
      if (sessionSpotId) {
        this.sessionSpotId = sessionSpotId;
      }
    } else if (sessionSpotId) {
      this.sessionSpotId = sessionSpotId;
    }

    this.waterTemperatureC = this.session.waterTemperatureC;
    this.prebait = this.session.prebait ?? '';
  }

  /** @deprecated Tests call loadSession — prefer load(). */
  async loadSession(): Promise<void> {
    await this.load();
  }

  private applyCatch(c: Catch): void {
    this.species = c.species;
    this.fishName = c.fishName ?? '';
    this.weightKg = c.weightKg;
    this.lengthCm = c.lengthCm;
    this.bait = c.bait ?? '';
    this.baitFlavor = c.baitFlavor ?? '';
    this.rig = c.rig ?? '';
    this.hookSize = c.hookSize ?? '';
    this.line = c.line ?? '';
    this.method = c.method ?? '';
    this.weatherType = c.weatherType ?? '';
    this.tags = [...(c.tags ?? [])];
    this.rodId = c.rodId ?? '';
    this.sessionSpotId = c.sessionSpotId ?? '';
    this.distanceM = c.distanceM;
    this.waterDepthM = c.waterDepthM;
    this.waterTemperatureC = c.waterTemperatureC;
    this.notes = c.notes ?? '';
    this.prebait = c.prebait ?? '';
    this.released = c.released ?? false;
    this.existingPhotoId = c.photoId;
  }

  addTag(): void {
    const tag = this.tagsInput.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.tagsInput = '';
  }

  async pickPhoto(useCamera: boolean): Promise<void> {
    this.photo = (await this.photoPick.pickImage({ capture: useCamera })) ?? undefined;
  }

  onRodChange(rodId: string): void {
    this.rodId = rodId;
    const rod = this.session?.rods?.find((r) => r.id === rodId);
    if (rod) {
      if (rod.bait) this.bait = rod.bait;
      if (rod.rig) this.rig = rod.rig;
      if (rod.sessionSpotId) this.sessionSpotId = rod.sessionSpotId;
    }
  }

  async save(): Promise<void> {
    if (!this.species.trim() || this.saving()) {
      return;
    }
    if (this.rods.length === 0 || !this.rodId) {
      return;
    }
    this.saving.set(true);
    try {
      if (this.isEdit && this.catchId) {
        let photoId = this.existingPhotoId;
        if (this.photo) {
          photoId = await this.imageService.processFile(this.photo, 'catch', this.sessionId);
        }
        await this.catchService.update(this.catchId, {
          species: this.species.trim(),
          fishName: this.fishName || undefined,
          weightKg: this.weightKg,
          lengthCm: this.lengthCm,
          bait: this.bait || undefined,
          baitFlavor: this.baitFlavor || undefined,
          rig: this.rig || undefined,
          hookSize: this.hookSize || undefined,
          line: this.line || undefined,
          method: this.method || undefined,
          weatherType: this.weatherType || undefined,
          tags: this.tags.length > 0 ? this.tags : undefined,
          rodId: this.rodId,
          sessionSpotId: this.sessionSpotId || undefined,
          distanceM: this.distanceM,
          waterDepthM: this.waterDepthM,
          waterTemperatureC: this.waterTemperatureC,
          notes: this.notes || undefined,
          prebait: this.prebait || undefined,
          released: this.released,
          photoId,
          detailsPending: false,
        });
      } else {
        await this.catchService.create(this.sessionId, {
          species: this.species.trim(),
          fishName: this.fishName || undefined,
          weightKg: this.weightKg,
          lengthCm: this.lengthCm,
          bait: this.bait || undefined,
          baitFlavor: this.baitFlavor || undefined,
          rig: this.rig || undefined,
          hookSize: this.hookSize || undefined,
          line: this.line || undefined,
          method: this.method || undefined,
          weatherType: this.weatherType || undefined,
          tags: this.tags.length > 0 ? this.tags : undefined,
          rodId: this.rodId,
          sessionSpotId: this.sessionSpotId || undefined,
          distanceM: this.distanceM,
          waterDepthM: this.waterDepthM,
          waterTemperatureC: this.waterTemperatureC,
          notes: this.notes || undefined,
          prebait: this.prebait || undefined,
          released: this.released,
          photo: this.photo,
        });
      }
      await this.router.navigate(['/sessions', this.sessionId]);
    } finally {
      this.saving.set(false);
    }
  }
}