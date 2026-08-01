import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ChatMessage, ChatThread, InsightPromptId } from '../../core/models';
import { ChatService } from '../../core/services/chat.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { INSIGHT_PROMPTS, InsightPromptDef } from '../../core/services/local-insight.service';
import { LlmService } from '../../core/services/llm.service';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    PageTitleComponent,
    TranslatePipe,
  ],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.css',
})
export class AssistantComponent {
  private readonly chatService = inject(ChatService);
  private readonly confirm = inject(ConfirmService);
  private readonly i18n = inject(I18nService);
  private readonly llm = inject(LlmService);

  @ViewChild('messageList') private messageList?: ElementRef<HTMLElement>;

  readonly prompts: InsightPromptDef[] = INSIGHT_PROMPTS;
  readonly threads = toSignal(this.chatService.watchThreads(), { initialValue: [] as ChatThread[] });
  readonly activeThreadId = signal<string | null>(null);
  readonly messages = signal<ChatMessage[]>([]);
  readonly draft = signal('');
  readonly sending = signal(false);
  readonly showThreads = signal(false);

  readonly aiReady = signal(this.llm.isConfigured());

  constructor() {
    effect((onCleanup) => {
      const threadId = this.activeThreadId();
      if (!threadId) {
        this.messages.set([]);
        return;
      }
      const sub = this.chatService.watchMessages(threadId).subscribe((msgs) => {
        this.messages.set(msgs);
        queueMicrotask(() => this.scrollToBottom());
      });
      onCleanup(() => sub.unsubscribe());
    });
  }

  async startPrompt(promptId: InsightPromptId): Promise<void> {
    if (this.sending()) {
      return;
    }
    this.sending.set(true);
    try {
      const thread = await this.chatService.startPromptThread(promptId);
      this.activeThreadId.set(thread.id);
      this.showThreads.set(false);
    } finally {
      this.sending.set(false);
      this.aiReady.set(this.llm.isConfigured());
    }
  }

  async startBlankChat(): Promise<void> {
    if (this.sending()) {
      return;
    }
    const thread = await this.chatService.createBlankThread();
    this.activeThreadId.set(thread.id);
    this.showThreads.set(false);
  }

  selectThread(threadId: string): void {
    this.activeThreadId.set(threadId);
    this.showThreads.set(false);
  }

  clearActive(): void {
    this.activeThreadId.set(null);
  }

  async send(): Promise<void> {
    const threadId = this.activeThreadId();
    const text = this.draft().trim();
    if (!threadId || !text || this.sending()) {
      return;
    }
    this.sending.set(true);
    this.draft.set('');
    try {
      await this.chatService.sendMessage(threadId, text);
    } finally {
      this.sending.set(false);
      this.aiReady.set(this.llm.isConfigured());
    }
  }

  async deleteActive(): Promise<void> {
    const threadId = this.activeThreadId();
    if (!threadId) {
      return;
    }
    const ok = await this.confirm.confirm({
      title: this.i18n.t('assistant.deleteConfirmTitle'),
      message: this.i18n.t('assistant.deleteConfirmMessage'),
      confirmLabel: this.i18n.t('common.delete'),
    });
    if (!ok) {
      return;
    }
    await this.chatService.deleteThread(threadId);
    this.activeThreadId.set(null);
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void this.send();
    }
  }

  private scrollToBottom(): void {
    const el = this.messageList?.nativeElement;
    if (!el) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }
}
