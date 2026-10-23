import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { firstValueFrom } from 'rxjs';
import { Catch } from '../../../core/models';
import { themedBottomSheetConfig } from '../../../shared/utils/themed-bottom-sheet';
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
  const ref = bottomSheet.open<CatchSheetComponent, CatchSheetData, Catch | undefined>(
    CatchSheetComponent,
    themedBottomSheetConfig(theme.resolvedTheme(), data),
  );
  return firstValueFrom(ref.afterDismissed());
}
