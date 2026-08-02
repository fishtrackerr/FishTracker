import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ChatMessage, ChatThread } from '../../core/models';
import { AssistantPromptService } from '../../core/services/assistant-prompt.service';
import { ChatService } from '../../core/services/chat.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { INSIGHT_PROMPTS } from '../../core/services/local-insight.service';
import { LlmService } from '../../core/services/llm.service';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

const ACTIVE_THREAD_KEY = 'ft.assistant.activeThreadId';
const PREVIEW_MAX_LEN = 80;

export interface StarterPromptCard {
  id: string;
  title: string;
  description: string;
  custom: boolean;
}


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
  private readonly assistantPromptService = inject(AssistantPromptService);
  private readonly confirm = inject(ConfirmService);
  private readonly i18n = inject(I18nService);
  private readonly llm = inject(LlmService);

  @ViewChild('messageList') private messageList?: ElementRef<HTMLElement>;

  private readonly customPrompts = toSignal(this.assistantPromptService.watchAll(), {
    initialValue: [],
  });
  readonly prompts = computed<StarterPromptCard[]>(() => {
    const builtin = INSIGHT_PROMPTS.map((prompt) => ({
      id: prompt.id,
      title: this.i18n.t(prompt.titleKey),
      description: this.i18n.t(prompt.descriptionKey),
      custom: false,
    }));
    const custom = this.customPrompts().map((prompt) => ({
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      custom: true,
    }));
    return [...builtin, ...custom];
  });
  readonly threads = toSignal(this.chatService.watchThreads(), { initialValue: [] as ChatThread[] });
  readonly activeThreadId = signal<string | null>(null);
  readonly messages = signal<ChatMessage[]>([]);
  readonly draft = signal('');
  readonly sending = signal(false);
  readonly showThreads = signal(false);
  readonly previews = signal<Record<string, string>>({});

  readonly aiReady = signal(this.llm.isConfigured());

  constructor() {
    void this.resumeLastThread();

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

    effect((onCleanup) => {
      const list = this.threads();
      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });
      void (async () => {
        const next: Record<string, string> = {};
        await Promise.all(
          list.map(async (thread) => {
            const msg = await this.chatService.getLatestMessage(thread.id);
            if (msg?.content) {
              next[thread.id] = this.previewText(msg.content);
            }
          }),
        );
        if (!cancelled) {
          this.previews.set(next);
        }
      })();
    });
  }

  async startPrompt(promptId: string): Promise<void> {
    if (this.sending()) {
      return;
    }
    this.sending.set(true);
    try {
      const thread = await this.chatService.startPromptThread(promptId);
      this.setActiveThread(thread.id);
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
    this.setActiveThread(thread.id);
    this.showThreads.set(false);
  }

  selectThread(threadId: string): void {
    this.setActiveThread(threadId);
    this.showThreads.set(false);
  }

  clearActive(): void {
    this.setActiveThread(null);
    this.showThreads.set(false);
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
    await this.deleteThread(threadId);
  }

  async deleteThread(threadId: string, event?: Event): Promise<void> {
    event?.stopPropagation();
    event?.preventDefault();
    const ok = await this.confirm.confirm({
      title: this.i18n.t('assistant.deleteConfirmTitle'),
      message: this.i18n.t('assistant.deleteConfirmMessage'),
      confirmLabel: this.i18n.t('common.delete'),
    });
    if (!ok) {
      return;
    }
    await this.chatService.deleteThread(threadId);
    if (this.activeThreadId() === threadId) {
      this.setActiveThread(null);
      this.showThreads.set(false);
    }
  }

  threadPreview(threadId: string): string {
    return this.previews()[threadId] ?? this.i18n.t('assistant.noPreview');
  }

  onComposerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void this.send();
    }
  }

  private async resumeLastThread(): Promise<void> {
    const stored = localStorage.getItem(ACTIVE_THREAD_KEY);
    if (!stored) {
      return;
    }
    const thread = await this.chatService.getThread(stored);
    if (thread) {
      this.activeThreadId.set(thread.id);
    } else {
      localStorage.removeItem(ACTIVE_THREAD_KEY);
    }
  }

  private setActiveThread(id: string | null): void {
    this.activeThreadId.set(id);
    if (id) {
      localStorage.setItem(ACTIVE_THREAD_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_THREAD_KEY);
    }
  }

  private previewText(content: string): string {
    const oneLine = content.replace(/\s+/g, ' ').trim();
    if (oneLine.length <= PREVIEW_MAX_LEN) {
      return oneLine;
    }
    return `${oneLine.slice(0, PREVIEW_MAX_LEN)}…`;
  }

  private scrollToBottom(): void {
    const el = this.messageList?.nativeElement;
    if (!el) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }
}
