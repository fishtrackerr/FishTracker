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
      background: #1a1a1a;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      border: 1px solid #333;
    }
    .label {
      font-size: 0.75rem;
      color: #888;
      margin-bottom: 4px;
    }
    .value {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ff6b00;
    }
  `,
})
export class StatCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
}
