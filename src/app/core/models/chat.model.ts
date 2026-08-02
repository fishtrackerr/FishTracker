import { FishingMode } from './fishing-mode.model';

export type ChatRole = 'user' | 'assistant' | 'system';

export type InsightPromptId =
  | 'best-time'
  | 'best-lake'
  | 'best-bait-rig'
  | 'species-records';

export const BUILTIN_INSIGHT_PROMPT_IDS: readonly InsightPromptId[] = [
  'best-time',
  'best-lake',
  'best-bait-rig',
  'species-records',
] as const;

export function isBuiltinInsightPromptId(id: string | undefined | null): id is InsightPromptId {
  return !!id && (BUILTIN_INSIGHT_PROMPT_IDS as readonly string[]).includes(id);
}

export interface ChatThread {
  id: string;
  fishingMode?: FishingMode;
  title: string;
  /** Built-in insight id or custom assistant prompt id. */
  promptId?: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: ChatRole;
  content: string;
  source?: 'local' | 'llm' | 'system';
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
  createdAt: string;
}
