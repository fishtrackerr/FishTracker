import { BiteEvent } from './bite-event.model';
import { Catch } from './catch.model';
import { ChatMessage, ChatThread } from './chat.model';
import { FishSpottedEvent } from './fish-spotted-event.model';
import { FishingSession } from './fishing-session.model';
import { Lake } from './lake.model';
import { RodSpotHistory } from './rod-spot-history.model';
import { SessionEvent } from './session-event.model';
import { SessionWeatherRecord } from './session-weather.model';
import { UserOption } from './user-option.model';

export interface BackupImage {
  id: string;
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
}
