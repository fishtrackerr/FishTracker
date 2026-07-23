import { Injectable, inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from './theme.service';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly dialog = inject(MatDialog);
  private readonly theme = inject(ThemeService);

  open<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config?: MatDialogConfig<D>,
  ): MatDialogRef<T, R> {
    const themeClass = this.theme.resolvedTheme() === 'dark' ? 'theme-dark' : 'theme-light';
    const backdropThemeClass = this.theme.resolvedTheme() === 'dark' ? 'theme-backdrop-dark' : 'theme-backdrop-light';
    const panelClass = config?.panelClass
      ? Array.isArray(config.panelClass)
        ? [...config.panelClass, 'themed-dialog', themeClass]
        : [config.panelClass, 'themed-dialog', themeClass]
      : ['themed-dialog', themeClass];
    const backdropClass = config?.backdropClass
      ? Array.isArray(config.backdropClass)
        ? [...config.backdropClass, 'themed-backdrop', backdropThemeClass]
        : [config.backdropClass, 'themed-backdrop', backdropThemeClass]
      : ['themed-backdrop', backdropThemeClass];

    return this.dialog.open(component, {
      ...config,
      panelClass,
      backdropClass,
    });
  }
}
