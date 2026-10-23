import { MatSelect } from '@angular/material/select';

/**
 * Puts a mat-select back to `value` after the user picked an entry that was
 * rejected (cancelled prompt/confirm). A one-way `[ngModel]` binding does not
 * re-render when its bound value never changed, so write to the control itself.
 */
export function restoreSelectValue(select: MatSelect | undefined, value: unknown): void {
  select?.writeValue(value);
}
