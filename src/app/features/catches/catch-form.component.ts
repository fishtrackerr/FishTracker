import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CatchService } from '../../core/services/catch.service';
import { SessionService } from '../../core/services/session.service';
import { OptionComboboxComponent } from '../../shared/components/option-combobox/option-combobox.component';
import { FishingSession } from '../../core/models';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-catch-form',
  standalone: true,
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

  sessionId = this.route.snapshot.paramMap.get('id')!;
  session?: FishingSession;

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

  rods: { id: string; name: string }[] = [];
  sessionSpots: { id: string; name: string }[] = [];

  constructor() {
    void this.loadSession();
  }

  async loadSession(): Promise<void> {
    this.session = await this.sessionService.getById(this.sessionId);
    if (!this.session) {
      return;
    }
    this.rods = (this.session.rods ?? []).map((r) => ({ id: r.id, name: r.name }));
    this.sessionSpots = (this.session.sessionSpots ?? []).map((s) => ({
      id: s.id,
      name: s.name,
    }));

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
    } else if (sessionSpotId) {
      this.sessionSpotId = sessionSpotId;
    }

    this.waterTemperatureC = this.session.waterTemperatureC;
    this.prebait = this.session.prebait ?? '';
  }

  addTag(): void {
    const tag = this.tagsInput.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.tagsInput = '';
  }

  pickPhoto(useCamera: boolean): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    if (useCamera) {
      input.capture = 'environment';
    }
    input.onchange = () => {
      this.photo = input.files?.[0];
    };
    input.click();
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
    await this.catchService.create(this.sessionId, {
      species: this.species,
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
      rodId: this.rodId || undefined,
      sessionSpotId: this.sessionSpotId || undefined,
      distanceM: this.distanceM,
      waterDepthM: this.waterDepthM,
      waterTemperatureC: this.waterTemperatureC,
      notes: this.notes || undefined,
      prebait: this.prebait || undefined,
      released: this.released,
      photo: this.photo,
    });
    await this.router.navigate(['/sessions', this.sessionId]);
  }
}
