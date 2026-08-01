import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { AppStartupService } from './core/services/app-startup.service';
import { SwUpdateService } from './core/services/sw-update.service';
import { VersionCheckService } from './core/services/version-check.service';
import { PwaInstallService } from './core/services/pwa-install.service';
import { I18nService } from './core/services/i18n.service';
import { StartupSplashComponent } from './shared/components/startup-splash/startup-splash.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartupSplashComponent],
  template: `
    @if (!startup.isReady()) {
      <app-startup-splash />
    } @else {
      <router-outlet />
    }
  `,
  styles: ':host { display: block; height: 100dvh; }',
})
export class App {
  readonly startup = inject(AppStartupService);

  constructor() {
    inject(ThemeService);
    inject(I18nService);
    inject(SwUpdateService);
    inject(VersionCheckService);
    inject(PwaInstallService);
    effect(() => {
      if (this.startup.isReady()) {
        void this.startup.performInitialNavigation();
      }
    });
  }
}
