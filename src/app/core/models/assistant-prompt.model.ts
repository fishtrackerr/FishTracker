import { FishingMode } from './fishing-mode.model';

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
