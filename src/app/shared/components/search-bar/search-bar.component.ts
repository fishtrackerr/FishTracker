import { Component, Input, output, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, TranslatePipe],
  template: `
    <mat-form-field appearance="outline" class="search-field">
      <mat-label>{{ placeholder | tr }}</mat-label>
      <mat-icon matPrefix>search</mat-icon>
      <input
        matInput
        [ngModel]="query()"
        (ngModelChange)="onInput($event)"
        [attr.aria-label]="placeholder | tr"
      />
    </mat-form-field>
  `,
  styles: `
    .search-field { width: 100%; }
  `,
})
export class SearchBarComponent implements OnDestroy {
  @Input() placeholder = 'common.search';
  @Input() debounceMs = 300;
  readonly search = output<string>();

  readonly query = signal('');
  private timer?: ReturnType<typeof setTimeout>;

  onInput(value: string): void {
    this.query.set(value);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.search.emit(value.trim()), this.debounceMs);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
