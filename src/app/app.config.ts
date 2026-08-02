import {
  ApplicationConfig,
  APP_INITIALIZER,
  ErrorHandler,
  isDevMode,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_SELECT_CONFIG } from '@angular/material/select';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { AppStartupService } from './core/services/app-startup.service';
import { isNativeApp } from './core/utils/platform';

function initializeApp(startup: AppStartupService): () => Promise<void> {
  return () => startup.initialize();
}

function serviceWorkerEnabled(): boolean {
  if (isDevMode()) {
    return false;
  }
  // Capacitor Android/iOS: bundled assets + SW causes blank screens after reload.
  return !isNativeApp();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: serviceWorkerEnabled(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['app-snackbar'],
      },
    },
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        overlayPanelClass: 'app-select-panel',
      },
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppStartupService],
      multi: true,
    },
  ],
};
