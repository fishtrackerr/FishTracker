import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';
import { ThemeService } from '../../core/services/theme.service';
import { QuickCatchInput } from '../../core/services/catch.service';
import { ExpandableSectionComponent } from '../../shared/components/expandable-section/expandable-section.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-quick-catch-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ExpandableSectionComponent,
    TranslatePipe,
  ],
  templateUrl: './quick-catch-dialog.component.html',
  styleUrl: './quick-catch-dialog.component.css',
  host: {
    class: 'themed-dialog-host',
  },
})
export class QuickCatchDialogComponent {
  private readonly ref = inject(MatDialogRef<QuickCatchDialogComponent>);
  private readonly settings = inject(SettingsService);
  readonly theme = inject(ThemeService);

  species = '';
  weightKg?: number;
  lengthCm?: number;
  bait = '';
  rig = '';
  released = false;
  notes = '';
  photo?: File;
  readonly saving = signal(false);

  readonly speciesList = [
    ...this.settings.get().favoriteSpecies,
    'Catfish',
    'Zander',
    'Tench',
    'Other',
  ];

  readonly selectPanelClass = this.theme.getSelectPanelClass();

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

  save(): void {
    if (!this.species.trim() || this.saving()) {
      return;
    }
    this.saving.set(true);
    const result: QuickCatchInput = {
      species: this.species.trim(),
      weightKg: this.weightKg,
      lengthCm: this.lengthCm,
      bait: this.bait || undefined,
      rig: this.rig || undefined,
      released: this.released,
      photo: this.photo,
      notes: this.notes || undefined,
    };
    this.ref.close(result);
  }
}
