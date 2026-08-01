import { Injectable } from '@angular/core';
import { fetchWithTimeout } from '../utils';
import { ConnectivityService, readNavigatorOnline } from './connectivity.service';
import { SettingsService } from './settings.service';

/** LLM round-trips are slower than weather/geocode; still bounded for poor links. */
const LLM_FETCH_TIMEOUT_MS = 30_000;

/** Hosts allowed for OpenAI-compatible chat completions (Bearer token is sent here). */
export const ALLOWED_AI_BASE_HOSTS = [
  'api.openai.com',
  'openrouter.ai',
  'api.openrouter.ai',
] as const;

export interface LlmChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class LlmError extends Error {
  constructor(
    message: string,
    readonly code: 'offline' | 'unauthorized' | 'disabled' | 'http' | 'empty' | 'invalid_url',
  ) {
    super(message);
    this.name = 'LlmError';
  }
}

@Injectable({ providedIn: 'root' })
export class LlmService {
  constructor(
    private readonly settings: SettingsService,
    private readonly connectivity?: ConnectivityService,
  ) {}

  isConfigured(): boolean {
    const s = this.settings.get();
    return !!(s.aiChatEnabled && s.aiApiKey?.trim());
  }

  /**
   * Resolves and validates the AI base URL. Only HTTPS hosts on the allowlist are accepted.
   */
  resolveBaseUrl(raw?: string): string {
    const base = (raw || 'https://api.openai.com/v1').replace(/\/$/, '');
    let url: URL;
    try {
      url = new URL(base);
    } catch {
      throw new LlmError('Invalid AI base URL', 'invalid_url');
    }
    if (url.protocol !== 'https:') {
      throw new LlmError('AI base URL must use HTTPS', 'invalid_url');
    }
    const host = url.hostname.toLowerCase();
    const allowed = ALLOWED_AI_BASE_HOSTS.some(
      (h) => host === h || host.endsWith(`.${h}`),
    );
    if (!allowed) {
      throw new LlmError(
        `AI base URL host is not allowed. Use: ${ALLOWED_AI_BASE_HOSTS.join(', ')}`,
        'invalid_url',
      );
    }
    return base;
  }

  async chat(messages: LlmChatMessage[]): Promise<string> {
    const s = this.settings.get();
    if (!s.aiChatEnabled || !s.aiApiKey?.trim()) {
      throw new LlmError('AI chat is not configured', 'disabled');
    }
    if (!(this.connectivity?.isOnline() ?? readNavigatorOnline())) {
      throw new LlmError('You are offline', 'offline');
    }

    const baseUrl = this.resolveBaseUrl(s.aiBaseUrl);
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
    } catch (err) {
      if (err instanceof LlmError) {
        throw err;
      }
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
