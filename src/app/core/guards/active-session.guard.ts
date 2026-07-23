import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionRepository } from '../services/session.repository';

export const activeSessionGuard: CanActivateFn = async () => {
  const sessionRepo = inject(SessionRepository);
  const router = inject(Router);
  const active = await sessionRepo.getActive();
  if (!active) {
    return router.createUrlTree(['/']);
  }
  return true;
};
