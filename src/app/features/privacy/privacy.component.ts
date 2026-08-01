import { Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [PageTitleComponent, TranslatePipe],
  template: `
    <app-page-title title="privacy.title" />

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.summaryTitle' | tr }}</h2>
      <p>{{ 'privacy.summaryBody' | tr }}</p>
    </section>

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.storedTitle' | tr }}</h2>
      <p>{{ 'privacy.storedBody' | tr }}</p>
    </section>

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.storageTitle' | tr }}</h2>
      <p>{{ 'privacy.storageBody' | tr }}</p>
    </section>

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.thirdPartiesTitle' | tr }}</h2>
      <p>{{ 'privacy.thirdPartiesIntro' | tr }}</p>
      <ul>
        <li>{{ 'privacy.thirdPartyWeather' | tr }}</li>
        <li>{{ 'privacy.thirdPartyGeocode' | tr }}</li>
        <li>{{ 'privacy.thirdPartyMaps' | tr }}</li>
        <li>{{ 'privacy.thirdPartyAi' | tr }}</li>
      </ul>
    </section>

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.photosTitle' | tr }}</h2>
      <p>{{ 'privacy.photosBody' | tr }}</p>
    </section>

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.pinTitle' | tr }}</h2>
      <p>{{ 'privacy.pinBody' | tr }}</p>
    </section>

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.backupsTitle' | tr }}</h2>
      <p>{{ 'privacy.backupsBody' | tr }}</p>
    </section>

    <section class="privacy-section app-card">
      <h2>{{ 'privacy.controlTitle' | tr }}</h2>
      <p>{{ 'privacy.controlBody' | tr }}</p>
    </section>
  `,
  styles: `
    .privacy-section {
      margin-bottom: var(--spacing-md);
    }
    .privacy-section h2 {
      color: var(--text-primary);
      margin: 0 0 var(--spacing-sm);
      font-size: 1.1rem;
    }
    .privacy-section p,
    .privacy-section li {
      color: var(--text-secondary);
      margin: 0 0 var(--spacing-sm);
      line-height: 1.5;
    }
    .privacy-section ul {
      margin: 0;
      padding-left: 1.25rem;
    }
    .privacy-section li {
      margin-bottom: var(--spacing-xs);
    }
  `,
})
export class PrivacyComponent {}
