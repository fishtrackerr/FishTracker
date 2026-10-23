import { MatBottomSheetConfig } from '@angular/material/bottom-sheet';

/**
 * Panel and backdrop classes shared by all themed bottom sheets (filters, start session),
 * matching what `DialogService` does for dialogs.
 */
export function themedBottomSheetConfig<D>(
  resolvedTheme: 'dark' | 'light',
  data: D,
): MatBottomSheetConfig<D> {
  const dark = resolvedTheme === 'dark';
  return {
    data,
    panelClass: ['themed-bottom-sheet', dark ? 'theme-dark' : 'theme-light'],
    // MatBottomSheetConfig types this as string, but CDK Overlay accepts string[]
    // and a space-separated string throws in classList.add.
    backdropClass: ['themed-backdrop', dark ? 'theme-backdrop-dark' : 'theme-backdrop-light'] as unknown as string,
  };
}
