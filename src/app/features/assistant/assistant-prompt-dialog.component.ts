import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ASSISTANT_PROMPT_DESCRIPTION_MAX_LENGTH,
  ASSISTANT_PROMPT_MESSAGE_MAX_LENGTH,
  ASSISTANT_PROMPT_TITLE_MAX_LENGTH,
  AssistantPrompt,
} from '../../core/models';
import { AssistantPromptInput } from '../../core/services/assistant-prompt.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

export interface AssistantPromptDialogData {
  prompt?: AssistantPrompt;
}

@Component({
  selector: 'app-assistant-prompt-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      {{ (data.prompt ? 'settings.editPrompt' : 'settings.addPrompt') | tr }}
    </h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full">
        <mat-label>{{ 'settings.promptTitle' | tr }}</mat-label>
        <input matInput [(ngModel)]="title" [maxlength]="titleMax" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>{{ 'settings.promptDescription' | tr }}</mat-label>
        <input matInput [(ngModel)]="description" [maxlength]="descriptionMax" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>{{ 'settings.promptQuestion' | tr }}</mat-label>
        <textarea
          matInput
          rows="3"
          [(ngModel)]="userMessage"
          [maxlength]="messageMax"
          required
        ></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close type="button">{{ 'common.cancel' | tr }}</button>
      <button mat-flat-button type="button" [disabled]="!canSave() || saving()" (click)="save()">
        {{ 'common.save' | tr }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .full {
      width: 100%;
      display: block;
    }
    .dialog-title {
      margin: 0;
      font-size: 1.1rem;
    }
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: min(100%, 360px);
      padding-top: 0.5rem;
    }
  `,
})
export class AssistantPromptDialogComponent {
  readonly data = inject<AssistantPromptDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<AssistantPromptDialogComponent, AssistantPromptInput | undefined>);

  readonly titleMax = ASSISTANT_PROMPT_TITLE_MAX_LENGTH;
  readonly descriptionMax = ASSISTANT_PROMPT_DESCRIPTION_MAX_LENGTH;
  readonly messageMax = ASSISTANT_PROMPT_MESSAGE_MAX_LENGTH;

  title = this.data.prompt?.title ?? '';
  description = this.data.prompt?.description ?? '';
  userMessage = this.data.prompt?.userMessage ?? '';
  readonly saving = signal(false);

  canSave(): boolean {
    return this.title.trim().length > 0 && this.userMessage.trim().length > 0;
  }

  save(): void {
    if (!this.canSave() || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.ref.close({
      title: this.title.trim(),
      description: this.description.trim(),
      userMessage: this.userMessage.trim(),
    });
  }
}
