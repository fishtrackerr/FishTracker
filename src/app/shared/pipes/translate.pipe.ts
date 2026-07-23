import { ChangeDetectorRef, Pipe, PipeTransform, effect, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

@Pipe({
  name: 'tr',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      // Re-render templates when language or dictionary changes.
      this.i18n.language();
      this.i18n.dictionary();
      this.cdr.markForCheck();
    });
  }

  transform(key: string, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }
}
