import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notifications = inject(NotificationService);

  handleError(error: unknown): void {
    console.error('[GlobalErrorHandler]', error);
    if (error instanceof Error && error.message.includes('NG0100')) {
      return;
    }
    const message =
      isDevMode() && error instanceof Error && error.message
        ? error.message
        : 'An unexpected error occurred';
    this.notifications.error(message);
  }
}
