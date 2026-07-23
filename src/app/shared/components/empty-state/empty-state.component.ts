import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty">
      <div class="icon">{{ icon }}</div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
  `,
  styles: `
    .empty {
      text-align: center;
      padding: 48px 24px;
      color: #888;
    }
    .icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }
    h3 {
      color: #fff;
      margin: 0 0 8px;
    }
    p {
      margin: 0;
      font-size: 0.9rem;
    }
  `,
})
export class EmptyStateComponent {
  @Input() icon = '🎣';
  @Input({ required: true }) title!: string;
  @Input({ required: true }) message!: string;
}
