import { FishingMode } from './fishing-mode.model';

export type ChatRole = 'user' | 'assistant' | 'system';

export type InsightPromptId =
  | 'best-time'
  | 'best-lake'
  | 'best-bait-rig'
  | 'species-records';

export interface ChatThread {
  id: string;
  fishingMode?: FishingMode;
  title: string;
  promptId?: InsightPromptId;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: ChatRole;
  content: string;
  source?: 'local' | 'llm' | 'system';
  createdAt: string;
}
