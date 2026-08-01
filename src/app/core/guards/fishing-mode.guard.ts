import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStartupService } from '../services/app-startup.service';
import { FishingModeService } from '../services/fishing-mode.service';
import { PinLockService } from '../services/pin-lock.service';

export const fishingModeGuard: CanActivateFn = async (_route, state) => {
  const startup = inject(AppStartupService);
  const pinLock = inject(PinLockService);
  const fishingMode = inject(FishingModeService);
  const router = inject(Router);

  await startup.waitUntilReady();

  if (!pinLock.hasPinConfigured()) {
    return router.createUrlTree(['/pin/setup']);
  }
  if (pinLock.isAppLocked()) {
    startup.storeReturnUrl(state.url);
    return router.createUrlTree(['/pin/unlock']);
  }
  if (!fishingMode.hasMode()) {
    startup.storeReturnUrl(state.url);
    return router.createUrlTree(['/mode-select']);
  }
  return true;
};
