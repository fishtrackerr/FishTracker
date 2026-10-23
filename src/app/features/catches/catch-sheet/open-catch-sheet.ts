import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { firstValueFrom } from 'rxjs';
import { Catch } from '../../../core/models';
import { CatchSheetComponent, CatchSheetData } from './catch-sheet.component';

/** Minimal theme surface needed to pick the themed panel classes. */
export interface CatchSheetTheme {
  resolvedTheme(): 'dark' | 'light';
}

/**
 * Opens the catch sheet (themed like the filter sheet) and resolves to the saved
 * catch, or undefined when closed without saving or when "All details…" was used.
 */
export async function openCatchSheet(
  bottomSheet: MatBottomSheet,
  theme: CatchSheetTheme,
  data: CatchSheetData,
): Promise<Catch | undefined> {
  const dark = theme.resolvedTheme() === 'dark';
  const ref = bottomSheet.open<CatchSheetComponent, CatchSheetData, Catch | undefined>(
    CatchSheetComponent,
    {
      data,
      panelClass: ['themed-bottom-sheet', dark ? 'theme-dark' : 'theme-light'],
      // MatBottomSheetConfig types this as string, but CDK Overlay accepts string[]
      // and a space-separated string throws in classList.add.
      backdropClass: ['themed-backdrop', dark ? 'theme-backdrop-dark' : 'theme-backdrop-light'] as unknown as string,
    },
  );
  return firstValueFrom(ref.afterDismissed());
}
