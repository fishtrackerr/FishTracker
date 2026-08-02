import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppStartupService } from '../../core/services/app-startup.service';
import { FishingModeService } from '../../core/services/fishing-mode.service';
import { PrivacyWelcomeService } from '../../core/services/privacy-welcome.service';
import { UserOptionService } from '../../core/services/user-option.service';
import { FishingMode } from '../../core/models';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const MODE_ICONS: Record<FishingMode, string> = {
  carper: 'water',
  catfish: 'set_meal',
  pike: 'bolt',
  bass: 'sailing',
  feeder: 'grain',
  general: 'public',
};

@Component({
  selector: 'app-mode-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './mode-select.component.html',
  styleUrl: './mode-select.component.css',
})
export class ModeSelectComponent {
  private readonly fishingMode = inject(FishingModeService);
  private readonly userOptions = inject(UserOptionService);
  private readonly privacyWelcome = inject(PrivacyWelcomeService);
  private readonly startup = inject(AppStartupService);
  private readonly router = inject(Router);

  readonly modes = this.fishingMode.modes;
  readonly selecting = signal(false);
  readonly modeIcons = MODE_ICONS;

  constructor() {
    void this.privacyWelcome.maybeShow();
  }

  async selectMode(mode: FishingMode): Promise<void> {
    if (this.selecting()) {
      return;
    }
    this.selecting.set(true);
    try {
      this.fishingMode.setMode(mode);
      await this.userOptions.ensureDefaultsForCurrentMode();
      const returnUrl = this.startup.consumeReturnUrl();
      const target = await this.startup.resolveUnlockedDestination(returnUrl);
      await this.router.navigateByUrl(target);
    } finally {
      this.selecting.set(false);
    }
  }
}
