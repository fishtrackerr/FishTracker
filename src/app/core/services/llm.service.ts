import { Injectable } from '@angular/core';
import { fetchWithTimeout } from '../utils';
import { SettingsService } from './settings.service';

/** LLM round-trips are slower than weather/geocode; still bounded for poor links. */
const LLM_FETCH_TIMEOUT_MS = 30_000;

export interface LlmChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class LlmError extends Error {
  constructor(
    message: string,
    readonly code: 'offline' | 'unauthorized' | 'disabled' | 'http' | 'empty',
  ) {
    super(message);
    this.name = 'LlmError';
  }
}

@Injectable({ providedIn: 'root' })
export class LlmService {
  constructor(private readonly settings: SettingsService) {}

  isConfigured(): boolean {
    const s = this.settings.get();
    return !!(s.aiChatEnabled && s.aiApiKey?.trim());
  }

  async chat(messages: LlmChatMessage[]): Promise<string> {
    const s = this.settings.get();
    if (!s.aiChatEnabled || !s.aiApiKey?.trim()) {
      throw new LlmError('AI chat is not configured', 'disabled');
    }
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new LlmError('You are offline', 'offline');
    }

    const baseUrl = (s.aiBaseUrl || 'https://api.openai.com/v1').replace(/\/$/, '');
    const model = s.aiModel || 'gpt-4o-mini';

    let response: Response;
    try {
      response = await fetchWithTimeout(
        `${baseUrl}/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${s.aiApiKey.trim()}`,
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.4,
          }),
        },
        LLM_FETCH_TIMEOUT_MS,
      );
    } catch {
      throw new LlmError('Network request failed', 'offline');
    }

    if (response.status === 401 || response.status === 403) {
      throw new LlmError('Invalid API key', 'unauthorized');
    }
    if (!response.ok) {
      throw new LlmError(`Provider error (${response.status})`, 'http');
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new LlmError('Empty response from model', 'empty');
    }
    return content;
  }
}
