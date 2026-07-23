import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <button
      mat-icon-button
      type="button"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      [matTooltip]="tooltip"
      (click)="pressed.emit($event)"
    >
      <mat-icon>{{ icon }}</mat-icon>
    </button>
  `,
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) ariaLabel!: string;
  @Input() tooltip = '';
  @Input() disabled = false;
  readonly pressed = output<Event>();
}
