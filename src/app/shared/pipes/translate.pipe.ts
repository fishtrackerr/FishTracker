import { ChangeDetectorRef, Pipe, PipeTransform, effect, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

/**
 * Translate pipe. Marked impure so language switches refresh without threading
 * `language()` through every binding. The effect + `markForCheck` keeps OnPush
 * hosts in sync when `I18nService` language/dictionary signals change.
 */
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
      this.i18n.language();
      this.i18n.dictionary();
      this.cdr.markForCheck();
    });
  }

  transform(key: string, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }
}
