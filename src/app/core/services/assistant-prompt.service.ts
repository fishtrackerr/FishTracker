import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ASSISTANT_PROMPT_DESCRIPTION_MAX_LENGTH,
  ASSISTANT_PROMPT_MESSAGE_MAX_LENGTH,
  ASSISTANT_PROMPT_TITLE_MAX_LENGTH,
  AssistantPrompt,
} from '../models';
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
    const fields = this.requireFields(input);
    const now = nowIso();
    const prompt: AssistantPrompt = {
      id: generateId(),
      ...fields,
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
    const fields = this.requireFields(input);
    const updated: AssistantPrompt = {
      ...existing,
      ...fields,
      updatedAt: nowIso(),
    };
    await this.repo.put(updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  private requireFields(input: AssistantPromptInput): {
    title: string;
    description: string;
    userMessage: string;
  } {
    const title = input.title.trim();
    const description = input.description.trim();
    const userMessage = input.userMessage.trim();
    if (!title) {
      throw new Error('Prompt title cannot be empty');
    }
    if (!userMessage) {
      throw new Error('Prompt message cannot be empty');
    }
    if (title.length > ASSISTANT_PROMPT_TITLE_MAX_LENGTH) {
      throw new Error(`Prompt title cannot exceed ${ASSISTANT_PROMPT_TITLE_MAX_LENGTH} characters`);
    }
    if (description.length > ASSISTANT_PROMPT_DESCRIPTION_MAX_LENGTH) {
      throw new Error(
        `Prompt description cannot exceed ${ASSISTANT_PROMPT_DESCRIPTION_MAX_LENGTH} characters`,
      );
    }
    if (userMessage.length > ASSISTANT_PROMPT_MESSAGE_MAX_LENGTH) {
      throw new Error(
        `Prompt message cannot exceed ${ASSISTANT_PROMPT_MESSAGE_MAX_LENGTH} characters`,
      );
    }
    return { title, description, userMessage };
  }
}
