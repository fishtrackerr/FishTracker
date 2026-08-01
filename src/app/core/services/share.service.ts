import { Injectable, inject } from '@angular/core';
import { APP_PUBLIC_URL } from '../constants/app-public-url';
import { I18nService } from './i18n.service';

@Injectable({ providedIn: 'root' })
export class ShareService {
  private readonly i18n = inject(I18nService);

  /** Opens WhatsApp with a prefilled invite that includes the public deploy URL. */
  shareAppViaWhatsApp(): void {
    const text = this.i18n.t('settings.shareWhatsAppText', { url: APP_PUBLIC_URL });
    const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(href, '_blank', 'noopener,noreferrer');
  }
}
