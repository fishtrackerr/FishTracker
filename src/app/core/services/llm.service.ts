import { Injectable, inject } from '@angular/core';
import { fetchWithTimeout } from '../utils';
import { ConnectivityService, readNavigatorOnline } from './connectivity.service';
import { SecretVaultService } from './secret-vault.service';
import { SettingsService } from './settings.service';

/** LLM round-trips are slower than weather/geocode; still bounded for poor links. */
const LLM_FETCH_TIMEOUT_MS = 30_000;

/** Hosts allowed for OpenAI-compatible chat completions (Bearer token is sent here). Exact match only. */
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
  private readonly settings = inject(SettingsService);
  private readonly vault = inject(SecretVaultService);
  private readonly connectivity = inject(ConnectivityService, { optional: true });

  isConfigured(): boolean {
    const s = this.settings.get();
    return !!(s.aiChatEnabled && this.vault.getAiApiKey()?.trim());
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
    if (url.username || url.password) {
      throw new LlmError('AI base URL must not include credentials', 'invalid_url');
    }
    const host = url.hostname.toLowerCase();
    const allowed = (ALLOWED_AI_BASE_HOSTS as readonly string[]).includes(host);
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
    const apiKey = this.vault.getAiApiKey()?.trim();
    if (!s.aiChatEnabled || !apiKey) {
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
            Authorization: `Bearer ${apiKey}`,
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
