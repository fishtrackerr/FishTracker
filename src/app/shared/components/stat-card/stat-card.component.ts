import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="stat-card">
      <div class="label">{{ label }}</div>
      <div class="value">{{ value }}</div>
    </div>
  `,
  styles: `
    .stat-card {
      background: var(--background-card);
      border-radius: var(--radius-md);
      padding: 16px;
      text-align: center;
      border: 1px solid var(--border-primary);
      box-shadow: var(--shadow-sm);
    }
    .label {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary);
    }
  `,
})
export class StatCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
}
