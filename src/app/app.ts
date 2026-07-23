import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { AppStartupService } from './core/services/app-startup.service';
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
    effect(() => {
      if (this.startup.isReady()) {
        void this.startup.performInitialNavigation();
      }
    });
  }
}
