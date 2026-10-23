import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="stat-card">
      <div class="label">{{ label }}</div>
      <div class="value">{{ value }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
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
      font-family: var(--font-label);
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: var(--label-spacing);
      text-transform: var(--label-transform);
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .value {
      font-family: var(--font-label);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--heading-color);
    }
  `,
})
export class StatCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
}
