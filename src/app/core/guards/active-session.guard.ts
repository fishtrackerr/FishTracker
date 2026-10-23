import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

/**
 * `/sessions/active` is kept as a stable entry point and always redirects:
 * to `/sessions/<id>` of the active session in the current fishing mode
 * (`?id=` wins when it names an active session in this mode), else to `/`.
 */
export const activeSessionRedirectGuard: CanActivateFn = async (route) => {
  const sessions = inject(SessionService);
  const router = inject(Router);

  const requestedId = route.queryParamMap.get('id');
  if (requestedId) {
    const requested = await sessions.getById(requestedId);
    if (requested?.status === 'active') {
      return router.createUrlTree(['/sessions', requested.id]);
    }
  }

  const active = await sessions.getActive();
  return active ? router.createUrlTree(['/sessions', active.id]) : router.createUrlTree(['/']);
};
