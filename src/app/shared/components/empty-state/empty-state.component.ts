import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="empty">
      <div class="icon">{{ icon }}</div>
      <h3>{{ title | tr }}</h3>
      <p>{{ message | tr }}</p>
    </div>
  `,
  styles: `
    .empty {
      text-align: center;
      padding: 48px 24px;
      color: var(--text-muted);
    }
    .icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }
    h3 {
      color: var(--primary);
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
