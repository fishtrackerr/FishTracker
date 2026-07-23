import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-card',
  standalone: true,
  template: `
    <div class="app-card" [class.hoverable]="hoverable">
      @if (title) {
        <h3 class="card-title">{{ title }}</h3>
      }
      <ng-content />
    </div>
  `,
  styles: `
    .app-card {
      background: var(--background-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      box-shadow: var(--shadow-sm);
      margin-bottom: var(--spacing-md);
    }
    .app-card.hoverable:hover {
      border-color: var(--border-active);
      box-shadow: var(--shadow-md);
    }
    .card-title {
      text-align: center;
      margin: 0 0 var(--spacing-md);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
    }
  `,
})
export class AppCardComponent {
  @Input() title = '';
  @Input() hoverable = false;
}
