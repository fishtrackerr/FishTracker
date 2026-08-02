import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { WeatherHistoryComponent } from '../../shared/components/weather-history/weather-history.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-weather-history-page',
  standalone: true,
  imports: [
    PageTitleComponent,
    WeatherHistoryComponent,
    MatButtonModule,
    TranslatePipe,
  ],
  template: `
    <app-page-title title="weatherHistory.pageTitle" />
    @if (sessionId(); as id) {
      <app-weather-history [sessionId]="id" [showAll]="true" />
      <button mat-stroked-button type="button" class="back-btn" (click)="goBack()">
        {{ 'common.back' | tr }}
      </button>
    }
  `,
  styles: `
    .back-btn {
      width: 100%;
      margin-top: var(--spacing-lg);
    }
  `,
})
export class WeatherHistoryPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  readonly sessionId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  goBack(): void {
    this.location.back();
  }
}
