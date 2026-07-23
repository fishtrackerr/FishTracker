import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="error-state">
      <p class="message">{{ message }}</p>
      @if (showRetry) {
        <button mat-stroked-button type="button" (click)="retry.emit()">Try again</button>
      }
    </div>
  `,
  styles: `
    .error-state {
      text-align: center;
      padding: 24px 16px;
      border: 1px solid var(--border-danger, #d64545);
      border-radius: var(--radius-md, 12px);
      background: var(--background-card, #1c1c1c);
    }
    .message {
      margin: 0 0 16px;
      color: var(--text-secondary, #d97b2b);
    }
  `,
})
export class ErrorStateComponent {
  @Input() message = 'Something went wrong';
  @Input() showRetry = true;
  readonly retry = output<void>();
}
