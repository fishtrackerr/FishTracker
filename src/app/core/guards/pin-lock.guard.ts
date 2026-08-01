import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PinLockService } from '../services/pin-lock.service';
import { AppStartupService } from '../services/app-startup.service';

export const pinLockGuard: CanActivateFn = async (_route, state) => {
  const startup = inject(AppStartupService);
  const pinLock = inject(PinLockService);
  const router = inject(Router);

  await startup.waitUntilReady();

  if (!pinLock.hasPinConfigured()) {
    return router.createUrlTree(['/pin/setup']);
  }
  if (pinLock.isAppLocked()) {
    // Use the navigation target — router.url is often still `/` during cold start.
    startup.storeReturnUrl(state.url);
    return router.createUrlTree(['/pin/unlock']);
  }
  return true;
};
