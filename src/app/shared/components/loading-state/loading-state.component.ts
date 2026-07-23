import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  template: `
    <div class="loading-state" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p>{{ message }}</p>
    </div>
  `,
  styles: `
    .loading-state {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--text-muted);
    }
    .spinner {
      width: 36px;
      height: 36px;
      margin: 0 auto var(--spacing-md);
      border: 3px solid var(--border-primary);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class LoadingStateComponent {
  @Input() message = 'Loading...';
}
