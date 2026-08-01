import { Injectable } from '@angular/core';
import { FishSpottedEvent, FishingSession } from '../models';
import { generateId, nowIso } from '../utils';
import { FishSpottedRepository } from './fish-spotted.repository';
import { GeolocationService } from './geolocation.service';
import { RodService } from './rod.service';
import { SessionEventService } from './session-event.service';
import { SessionRepository } from './session.repository';

export interface RegisterFishSpottedOptions {
  sessionId: string;
  rodId?: string;
  sessionSpotId?: string;
  notes?: string;
  useGps?: boolean;
}

@Injectable({ providedIn: 'root' })
export class FishSpottedEventService {
  constructor(
    private readonly repo: FishSpottedRepository,
    private readonly sessionRepo: SessionRepository,
    private readonly geo: GeolocationService,
    private readonly rodService: RodService,
    private readonly sessionEvents: SessionEventService,
  ) {}

  watchBySession(sessionId: string) {
    return this.repo.watchBySession(sessionId);
  }

  async register(options: RegisterFishSpottedOptions): Promise<FishingSession | undefined> {
    const session = await this.sessionRepo.getById(options.sessionId);
    if (!session) {
      return undefined;
    }

    let latitude: number | undefined;
    let longitude: number | undefined;
    if (options.useGps !== false) {
      const pos = await this.geo.getCurrentPosition();
      latitude = pos?.latitude ?? session.latitude;
      longitude = pos?.longitude ?? session.longitude;
    }

    const rod = options.rodId
      ? session.rods?.find((r) => r.id === options.rodId)
      : undefined;
    const sessionSpotId = options.sessionSpotId ?? rod?.sessionSpotId;

    const event = {
      id: generateId(),
      sessionId: options.sessionId,
      rodId: options.rodId,
      sessionSpotId,
      latitude,
      longitude,
      spottedAt: nowIso(),
      notes: options.notes,
    };
    await this.repo.put(event);

    await this.sessionEvents.record({
      sessionId: options.sessionId,
      type: 'fish-spotted',
      rodId: options.rodId,
      sessionSpotId,
      description: rod ? `Fish spotted near ${rod.name}` : 'Fish spotted',
    });

    return this.rodService.syncRodCounts(session);
  }
}
