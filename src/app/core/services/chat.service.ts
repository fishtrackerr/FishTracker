import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, ChatThread, InsightPromptId } from '../models';
import { generateId, nowIso } from '../utils';
import { ChatRepository } from './chat.repository';
import { FishingDataContextService } from './fishing-data-context.service';
import { I18nService } from './i18n.service';
import { LlmError, LlmService } from './llm.service';
import { INSIGHT_PROMPTS, LocalInsightService } from './local-insight.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(
    private readonly chatRepo: ChatRepository,
    private readonly localInsights: LocalInsightService,
    private readonly contextService: FishingDataContextService,
    private readonly llm: LlmService,
    private readonly i18n: I18nService,
    private readonly notifications: NotificationService,
  ) {}

  watchThreads(): Observable<ChatThread[]> {
    return this.chatRepo.watchThreads();
  }

  watchMessages(threadId: string): Observable<ChatMessage[]> {
    return this.chatRepo.watchMessages(threadId);
  }

  async getThread(id: string): Promise<ChatThread | undefined> {
    return this.chatRepo.getThread(id);
  }

  async getLatestMessage(threadId: string): Promise<ChatMessage | undefined> {
    return this.chatRepo.getLatestMessage(threadId);
  }

  async createBlankThread(): Promise<ChatThread> {
    const now = nowIso();
    const thread: ChatThread = {
      id: generateId(),
      title: this.i18n.t('assistant.newChat'),
      createdAt: now,
      updatedAt: now,
    };
    await this.chatRepo.putThread(thread);
    return thread;
  }

  async startPromptThread(promptId: InsightPromptId): Promise<ChatThread> {
    const prompt = INSIGHT_PROMPTS.find((p) => p.id === promptId);
    const now = nowIso();
    const title = prompt ? this.i18n.t(prompt.titleKey) : this.i18n.t('assistant.newChat');
    const thread: ChatThread = {
      id: generateId(),
      title,
      promptId,
      createdAt: now,
      updatedAt: now,
    };
    await this.chatRepo.putThread(thread);

    const userText = prompt
      ? this.i18n.t(prompt.userMessageKey)
      : this.i18n.t('assistant.newChat');
    await this.appendMessage(thread.id, 'user', userText);

    const answer = await this.resolveAnswer(userText, promptId);
    await this.appendMessage(thread.id, 'assistant', answer.text, answer.source);
    await this.touchThread(thread.id, title);
    return thread;
  }

  async sendMessage(threadId: string, content: string): Promise<void> {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    await this.appendMessage(threadId, 'user', trimmed);

    const thread = await this.chatRepo.getThread(threadId);
    const promptId = thread?.promptId ?? this.localInsights.matchPromptId(trimmed);
    const answer = await this.resolveAnswer(trimmed, promptId, threadId);
    await this.appendMessage(threadId, 'assistant', answer.text, answer.source);

    const title =
      thread && thread.title !== this.i18n.t('assistant.newChat')
        ? thread.title
        : trimmed.length > 40
          ? `${trimmed.slice(0, 40)}…`
          : trimmed;
    await this.touchThread(threadId, title);
  }

  async deleteThread(threadId: string): Promise<void> {
    await this.chatRepo.deleteThread(threadId);
  }

  private async resolveAnswer(
    userText: string,
    promptId: InsightPromptId | undefined,
    threadId?: string,
  ): Promise<{ text: string; source: 'local' | 'llm' | 'system' }> {
    if (this.llm.isConfigured()) {
      try {
        const text = await this.runLlm(userText, threadId);
        return { text, source: 'llm' };
      } catch (err) {
        this.notifyLlmError(err);
        if (promptId) {
          const local = await this.localInsights.answer(promptId);
          return { text: local, source: 'local' };
        }
        return {
          text: this.i18n.t('assistant.aiUnavailable'),
          source: 'system',
        };
      }
    }

    if (promptId) {
      const local = await this.localInsights.answer(promptId);
      return { text: local, source: 'local' };
    }

    return {
      text: this.i18n.t('assistant.needsAiKey'),
      source: 'system',
    };
  }

  private async runLlm(userText: string, threadId?: string): Promise<string> {
    const context = await this.contextService.build();
    const contextText = this.contextService.toPromptText(context);
    const history: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    if (threadId) {
      const messages = await this.chatRepo.getMessages(threadId);
      for (const msg of messages) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          history.push({ role: msg.role, content: msg.content });
        }
      }
      // Last user message already appended; keep prior turns only
      if (history.length > 0 && history[history.length - 1].role === 'user') {
        history.pop();
      }
    }

    const system = [
      'You are a fishing coach for the FishTracker app.',
      'Answer only from the provided fishing data summary.',
      'Do not invent catches, lakes, or times that are not in the data.',
      'If data is insufficient, say so clearly.',
      'Be concise and practical.',
      '',
      'Fishing data summary (JSON):',
      contextText,
    ].join('\n');

    return this.llm.chat([
      { role: 'system', content: system },
      ...history.slice(-12),
      { role: 'user', content: userText },
    ]);
  }

  private notifyLlmError(err: unknown): void {
    if (err instanceof LlmError) {
      const key =
        err.code === 'offline'
          ? 'assistant.errors.offline'
          : err.code === 'unauthorized'
            ? 'assistant.errors.unauthorized'
            : 'assistant.errors.generic';
      this.notifications.error(this.i18n.t(key));
      return;
    }
    this.notifications.error(this.i18n.t('assistant.errors.generic'));
  }

  private async appendMessage(
    threadId: string,
    role: ChatMessage['role'],
    content: string,
    source?: ChatMessage['source'],
  ): Promise<void> {
    const message: ChatMessage = {
      id: generateId(),
      threadId,
      role,
      content,
      source,
      createdAt: nowIso(),
    };
    await this.chatRepo.putMessage(message);
  }

  private async touchThread(threadId: string, title: string): Promise<void> {
    const thread = await this.chatRepo.getThread(threadId);
    if (!thread) {
      return;
    }
    await this.chatRepo.putThread({
      ...thread,
      title,
      updatedAt: nowIso(),
    });
  }
}
