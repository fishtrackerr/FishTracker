import { FishingMode } from './fishing-mode.model';

/** Max lengths enforced in UI, service, and backup validation. */
export const ASSISTANT_PROMPT_TITLE_MAX_LENGTH = 80;
export const ASSISTANT_PROMPT_DESCRIPTION_MAX_LENGTH = 160;
export const ASSISTANT_PROMPT_MESSAGE_MAX_LENGTH = 500;

/** User-defined starter question for the assistant. */
export interface AssistantPrompt {
  id: string;
  fishingMode?: FishingMode;
  title: string;
  description: string;
  /** Question sent when the starter is tapped. */
  userMessage: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
  createdAt: string;
  updatedAt: string;
}
