import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [MatFormFieldModule],
  template: `
    <mat-form-field appearance="outline" class="app-form-field">
      @if (label) {
        <mat-label>{{ label }}</mat-label>
      }
      <ng-content />
      @if (error) {
        <mat-error>{{ error }}</mat-error>
      }
    </mat-form-field>
  `,
  styles: `
    .app-form-field { width: 100%; }
  `,
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() error = '';
}
