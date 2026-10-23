import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Catch, FishingSession, SessionRod } from '../../../core/models';
import { CatchService, FullCatchInput } from '../../../core/services/catch.service';
import { DialogService } from '../../../core/services/dialog.service';
import { FishingModeService } from '../../../core/services/fishing-mode.service';
import { I18nService } from '../../../core/services/i18n.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PhotoPickService } from '../../../core/services/photo-pick.service';
import { SettingsService } from '../../../core/services/settings.service';
import { inchToCm, kgToLbs, lbsToKg } from '../../../core/utils';
import { promptForText } from '../../../shared/components/text-prompt-dialog/text-prompt-dialog.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

export interface CatchSheetData {
  session: FishingSession;
  /** Rod to log the catch on; defaults to the first visible rod. */
  rodId?: string;
}

/** Bottom sheet to log a catch on a rod: species chips, weight, length, photo, released. */
@Component({
  selector: 'app-catch-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatButtonModule, MatSlideToggleModule, TranslatePipe],
  templateUrl: './catch-sheet.component.html',
  styleUrl: './catch-sheet.component.css',
})
export class CatchSheetComponent implements OnInit {
  private readonly sheetRef = inject<MatBottomSheetRef<CatchSheetComponent, Catch | undefined>>(
    MatBottomSheetRef,
  );
  readonly data = inject<CatchSheetData>(MAT_BOTTOM_SHEET_DATA);
  private readonly catchService = inject(CatchService);
  private readonly fishingMode = inject(FishingModeService);
  private readonly photoPick = inject(PhotoPickService);
  private readonly dialogs = inject(DialogService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly settings = inject(SettingsService);
  private readonly router = inject(Router);

  /** Visible rods only. */
  readonly rods: SessionRod[] = (this.data.session.rods ?? []).filter((r) => r.visible !== false);

  readonly rodId = signal<string>(
    this.rods.find((r) => r.id === this.data.rodId)?.id ?? this.rods[0]?.id ?? '',
  );
  readonly pickingRod = signal(false);
  readonly species = signal('');
  readonly extraSpecies = signal<string[]>([]);
  readonly weight = signal<number | null>(null);
  readonly length = signal<number | null>(null);
  readonly released = signal(true);
  readonly photo = signal<File | undefined>(undefined);
  readonly saving = signal(false);

  readonly favoriteSpecies: string[] = this.fishingMode.getActivePreferences().favoriteSpecies;
  readonly speciesChips = computed(() => [...this.favoriteSpecies, ...this.extraSpecies()]);

  readonly weightUnit = this.settings.get().weightUnit;
  readonly lengthUnit = this.settings.get().lengthUnit;

  readonly rod = computed(() => this.rods.find((r) => r.id === this.rodId()));
  readonly rodLine = computed(() => {
    const rod = this.rod();
    const spot = rod?.sessionSpotId
      ? this.data.session.sessionSpots?.find((s) => s.id === rod.sessionSpotId)?.name
      : undefined;
    return [rod?.name, spot, rod?.bait].filter(Boolean).join(' · ');
  });

  readonly canSave = computed(
    () => !!this.rod() && this.species().trim().length > 0 && !this.saving(),
  );

  async ngOnInit(): Promise<void> {
    const preselected = await this.findPreselectedSpecies();
    // Do not override a species the user already tapped while we were loading.
    if (preselected && !this.species()) {
      this.selectSpecies(preselected);
    }
  }

  /** Last catch in this session, else last catch in this mode, else first favourite. */
  private async findPreselectedSpecies(): Promise<string | undefined> {
    const latest = (catches: Catch[]): string | undefined =>
      [...catches]
        .filter((c) => !c.detailsPending && c.species?.trim())
        .sort((a, b) => b.caughtAt.localeCompare(a.caughtAt))[0]?.species;
    try {
      const inSession = latest(
        await firstValueFrom(this.catchService.watchBySession(this.data.session.id)),
      );
      if (inSession) return inSession;
      const inMode = latest(await firstValueFrom(this.catchService.watchAll()));
      if (inMode) return inMode;
    } catch {
      // Fall through to the first favourite.
    }
    return this.favoriteSpecies[0];
  }

  selectSpecies(name: string): void {
    this.species.set(name);
    if (!this.speciesChips().includes(name)) {
      this.extraSpecies.update((list) => [...list, name]);
    }
  }

  async pickOtherSpecies(): Promise<void> {
    const name = await promptForText(this.dialogs, {
      title: this.i18n.t('catchSheet.otherSpeciesTitle'),
      label: this.i18n.t('catchForm.species'),
      maxLength: 60,
    });
    if (name) {
      const existing = this.speciesChips().find((s) => s.toLowerCase() === name.toLowerCase());
      this.selectSpecies(existing ?? name);
    }
  }

  selectRod(id: string): void {
    this.rodId.set(id);
    this.pickingRod.set(false);
  }

  async pickPhoto(useCamera: boolean): Promise<void> {
    this.photo.set((await this.photoPick.pickImage({ capture: useCamera })) ?? undefined);
  }

  /** Weight as stored (kg); undefined when empty or invalid. */
  weightKg(): number | undefined {
    const w = this.weight();
    if (w == null || !Number.isFinite(w) || w <= 0) return undefined;
    return this.weightUnit === 'lbs' ? lbsToKg(w) : w;
  }

  lengthCm(): number | undefined {
    const l = this.length();
    if (l == null || !Number.isFinite(l) || l <= 0) return undefined;
    return this.lengthUnit === 'inch' ? inchToCm(l) : l;
  }

  async save(): Promise<void> {
    const rod = this.rod();
    if (!rod || !this.canSave()) return;
    this.saving.set(true);
    const weightKg = this.weightKg();
    const input: FullCatchInput = {
      species: this.species().trim(),
      rodId: rod.id,
      sessionSpotId: rod.sessionSpotId,
      weightKg,
      lengthCm: this.lengthCm(),
      bait: rod.bait,
      rig: rod.rig,
      released: this.released(),
      photo: this.photo(),
      // "Log now, details later": no weight means the catch still needs details.
      detailsPending: weightKg === undefined ? true : undefined,
    };
    try {
      const saved = await this.catchService.create(this.data.session.id, input);
      this.announceSaved(saved, rod);
      this.sheetRef.dismiss(saved);
    } catch (error) {
      console.error('[CatchSheet] Failed to save catch', error);
      this.notifications.error(this.i18n.t('activeSession.instantCatchFailed'));
      this.saving.set(false);
    }
  }

  private announceSaved(saved: Catch, rod: SessionRod): void {
    const kg = saved.weightKg;
    const weight =
      kg == null ? '' : this.weightUnit === 'lbs' ? `${kgToLbs(kg).toFixed(1)} lbs` : `${kg.toFixed(1)} kg`;
    this.notifications.withAction(
      this.i18n.t('catchSheet.saved', {
        species: saved.species,
        weight: weight ? ` ${weight}` : '',
        rod: rod.rodNumber,
      }),
      this.i18n.t('catchSheet.undo'),
      () => {
        void this.catchService.delete(saved.id);
      },
      'success',
      6000,
    );
  }

  openAllDetails(): void {
    const rod = this.rod();
    const returnUrl = this.router.url;
    this.sheetRef.dismiss(undefined);
    void this.router.navigate(['/sessions', this.data.session.id, 'catches', 'new'], {
      queryParams: {
        rodId: rod?.id,
        sessionSpotId: rod?.sessionSpotId,
        returnUrl,
      },
    });
  }

  close(): void {
    this.sheetRef.dismiss(undefined);
  }
}
