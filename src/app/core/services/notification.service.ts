import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type SnackbarVariant = 'success' | 'error' | 'warning' | 'info' | 'offline' | 'weather';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  success(message: string): void {
    this.show(message, 'OK', 'success');
  }

  error(message: string): void {
    this.show(message, 'Dismiss', 'error', 6000);
  }

  info(message: string): void {
    this.show(message, 'OK', 'info');
  }

  warning(message: string): void {
    this.show(message, 'Dismiss', 'warning', 6000);
  }

  offline(message: string): void {
    this.show(message, 'OK', 'offline', 5000);
  }

  weatherWarning(message: string): void {
    this.show(message, 'Dismiss', 'weather', 6000);
  }

  private show(
    message: string,
    action: string,
    variant: SnackbarVariant,
    duration = 4000,
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['app-snackbar', `app-snackbar--${variant}`],
    };
    this.snackBar.open(message, action, config);
  }
}
