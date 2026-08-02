import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AssistantPrompt } from '../models';
import { generateId, nowIso } from '../utils';
import { AssistantPromptRepository } from './assistant-prompt.repository';

export type AssistantPromptInput = {
  title: string;
  description: string;
  userMessage: string;
};

@Injectable({ providedIn: 'root' })
export class AssistantPromptService {
  private readonly repo = inject(AssistantPromptRepository);

  watchAll(): Observable<AssistantPrompt[]> {
    return this.repo.watchAll();
  }

  async getAll(): Promise<AssistantPrompt[]> {
    return this.repo.getAll();
  }

  async getById(id: string): Promise<AssistantPrompt | undefined> {
    return this.repo.getById(id);
  }

  async create(input: AssistantPromptInput): Promise<AssistantPrompt> {
    const now = nowIso();
    const prompt: AssistantPrompt = {
      id: generateId(),
      title: input.title.trim(),
      description: input.description.trim(),
      userMessage: input.userMessage.trim(),
      visible: true,
      createdAt: now,
      updatedAt: now,
    };
    await this.repo.put(prompt);
    return prompt;
  }

  async update(id: string, input: AssistantPromptInput): Promise<AssistantPrompt | undefined> {
    const existing = await this.repo.getById(id);
    if (!existing) {
      return undefined;
    }
    const updated: AssistantPrompt = {
      ...existing,
      title: input.title.trim(),
      description: input.description.trim(),
      userMessage: input.userMessage.trim(),
      updatedAt: nowIso(),
    };
    await this.repo.put(updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
