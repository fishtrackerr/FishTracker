import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'icon';

@Component({
  selector: 'app-app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    @if (variant === 'icon') {
      <button
        mat-icon-button
        type="button"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel || label"
        [matTooltip]="tooltip"
        (click)="pressed.emit($event)"
      >
        <mat-icon>{{ icon }}</mat-icon>
      </button>
    } @else if (variant === 'outline') {
      <button mat-stroked-button type="button" [disabled]="disabled" (click)="pressed.emit($event)">
        @if (icon) { <mat-icon>{{ icon }}</mat-icon> }
        {{ label }}
      </button>
    } @else if (variant === 'danger') {
      <button mat-flat-button color="warn" type="button" [disabled]="disabled" (click)="pressed.emit($event)">
        @if (icon) { <mat-icon>{{ icon }}</mat-icon> }
        {{ label }}
      </button>
    } @else {
      <button mat-flat-button type="button" [disabled]="disabled" (click)="pressed.emit($event)">
        @if (icon) { <mat-icon>{{ icon }}</mat-icon> }
        {{ label }}
      </button>
    }
  `,
})
export class AppButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() variant: AppButtonVariant = 'primary';
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() tooltip = '';
  readonly pressed = output<Event>();
}
