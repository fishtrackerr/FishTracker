import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notifications = inject(NotificationService);

  handleError(error: unknown): void {
    if (isDevMode()) {
      console.error('[GlobalErrorHandler]', error);
    }
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'An unexpected error occurred';
    if (error instanceof Error && error.message.includes('NG0100')) {
      return;
    }
    this.notifications.error(message);
  }
}
