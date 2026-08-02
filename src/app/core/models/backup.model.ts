import { AssistantPrompt } from './assistant-prompt.model';
import { BiteEvent } from './bite-event.model';
import { Catch } from './catch.model';
import { ChatMessage, ChatThread } from './chat.model';
import { FishSpottedEvent } from './fish-spotted-event.model';
import { FishingSession } from './fishing-session.model';
import { Lake } from './lake.model';
import { ProfileDocument } from './profile-document.model';
import { RodSpotHistory } from './rod-spot-history.model';
import { SessionEvent } from './session-event.model';
import { SessionWeatherRecord } from './session-weather.model';
import { UserOption } from './user-option.model';
import { UserProfile } from './user-profile.model';

export interface BackupImage {
  id: string;
  fishingMode?: string;
  type: string;
  parentId?: string;
  fileName?: string;
  mimeType: string;
  data: string;
  thumbnail: string;
  createdAt: string;
  isFavorite?: boolean;
  isHomepageImage?: boolean;
}

export interface BackupData {
  version: number;
  exportedAt: string;
  sessions: FishingSession[];
  catches: Catch[];
  lakes: Lake[];
  images: BackupImage[];
  biteEvents?: BiteEvent[];
  fishSpottedEvents?: FishSpottedEvent[];
  rodSpotHistory?: RodSpotHistory[];
  sessionEvents?: SessionEvent[];
  sessionWeather?: SessionWeatherRecord[];
  userOptions?: UserOption[];
  chatThreads?: ChatThread[];
  chatMessages?: ChatMessage[];
  assistantPrompts?: AssistantPrompt[];
  profiles?: UserProfile[];
  profileDocuments?: ProfileDocument[];
}

/** Summary returned by validate before a destructive import. */
export interface BackupPreview {
  version: number;
  exportedAt?: string;
  sessionCount: number;
  catchCount: number;
  lakeCount: number;
  imageCount: number;
  profileCount: number;
  profileDocumentCount: number;
}

/** Current backup format version written by export(). */
export const BACKUP_EXPORT_VERSION = 8;

/** Versions accepted by import() (legacy + current). */
export const SUPPORTED_BACKUP_VERSIONS = [4, 5, 6, 7, 8] as const;
