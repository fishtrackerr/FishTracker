import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PinLockService } from '../services/pin-lock.service';
import { AppStartupService } from '../services/app-startup.service';

export const pinSetupGuard: CanActivateFn = async () => {
  const startup = inject(AppStartupService);
  const pinLock = inject(PinLockService);
  const router = inject(Router);

  await startup.waitUntilReady();

  if (pinLock.hasPinConfigured()) {
    return router.createUrlTree(['/']);
  }
  return true;
};
