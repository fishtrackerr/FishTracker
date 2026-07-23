import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserOptionCategory } from '../../../core/models';
import { UserOptionService } from '../../../core/services/user-option.service';

@Component({
  selector: 'app-option-combobox',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
  ],
  template: `
    <mat-form-field appearance="outline" class="full">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [(ngModel)]="value"
        [matAutocomplete]="auto"
        (ngModelChange)="onInputChange($event)"
      />
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onSelect($event.option.value)">
        @for (option of filteredOptions(); track option.id) {
          <mat-option [value]="option.value">
            @if (option.isFavorite) { ★ }
            {{ option.value }}
          </mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>

    @if (showCustomPrompt()) {
      <div class="custom-prompt app-card">
        <p>No match for "{{ pendingCustom() }}"</p>
        <button mat-stroked-button type="button" (click)="useOnce()">Use once</button>
        <button mat-flat-button type="button" (click)="saveAsOption()">Save as option</button>
      </div>
    }
  `,
  styles: `
    .full { width: 100%; }
    .custom-prompt {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-md);
    }
    .custom-prompt p { margin: 0; flex: 1; font-size: 0.9rem; }
  `,
})
export class OptionComboboxComponent {
  private readonly userOptions = inject(UserOptionService);

  @Input({ required: true }) category!: UserOptionCategory;
  @Input() label = 'Option';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  readonly options = signal<{ id: string; value: string; isFavorite: boolean }[]>([]);
  readonly filteredOptions = signal<{ id: string; value: string; isFavorite: boolean }[]>([]);
  readonly showCustomPrompt = signal(false);
  readonly pendingCustom = signal('');

  constructor() {
    void this.loadOptions();
  }

  async loadOptions(): Promise<void> {
    const sorted = await this.userOptions.getSortedOptions(this.category);
    this.options.set(sorted);
    this.filteredOptions.set(sorted);
  }

  onInputChange(text: string): void {
    this.valueChange.emit(text);
    const query = text.trim().toLowerCase();
    const all = this.options();
    if (!query) {
      this.filteredOptions.set(all);
      this.showCustomPrompt.set(false);
      return;
    }
    const filtered = all.filter((o) => o.value.toLowerCase().includes(query));
    this.filteredOptions.set(filtered);
    const exact = all.some((o) => o.value.toLowerCase() === query);
    this.showCustomPrompt.set(!exact && text.trim().length > 0);
    this.pendingCustom.set(text.trim());
  }

  onSelect(selected: string): void {
    this.valueChange.emit(selected);
    this.showCustomPrompt.set(false);
  }

  useOnce(): void {
    this.valueChange.emit(this.pendingCustom());
    this.showCustomPrompt.set(false);
  }

  async saveAsOption(): Promise<void> {
    const saved = await this.userOptions.saveOption(this.category, this.pendingCustom());
    this.valueChange.emit(saved.value);
    this.showCustomPrompt.set(false);
    await this.loadOptions();
  }
}
