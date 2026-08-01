import { Injectable } from '@angular/core';
import { BiteEvent, FishingSession } from '../models';
import { generateId, nowIso } from '../utils';
import { BiteEventRepository } from './bite-event.repository';
import { RodService } from './rod.service';
import { SessionEventService } from './session-event.service';
import { SessionRepository } from './session.repository';

@Injectable({ providedIn: 'root' })
export class BiteEventService {
  constructor(
    private readonly repo: BiteEventRepository,
    private readonly sessionRepo: SessionRepository,
    private readonly rodService: RodService,
    private readonly sessionEvents: SessionEventService,
  ) {}

  watchBySession(sessionId: string) {
    return this.repo.watchBySession(sessionId);
  }

  watchByRod(rodId: string) {
    return this.repo.watchByRod(rodId);
  }

  async addBite(sessionId: string, rodId: string): Promise<FishingSession | undefined> {
    const session = await this.sessionRepo.getById(sessionId);
    if (!session) {
      return undefined;
    }
    const rod = session.rods?.find((r) => r.id === rodId);
    if (!rod) {
      return undefined;
    }

    const event = {
      id: generateId(),
      sessionId,
      rodId,
      sessionSpotId: rod.sessionSpotId,
      occurredAt: nowIso(),
    };
    await this.repo.put(event);
    await this.sessionEvents.record({
      sessionId,
      type: 'bite',
      rodId,
      sessionSpotId: rod.sessionSpotId,
      description: `Bite on ${rod.name}`,
    });

    return this.rodService.syncRodCounts(session);
  }

  async removeBite(sessionId: string, rodId: string): Promise<FishingSession | undefined> {
    const session = await this.sessionRepo.getById(sessionId);
    if (!session) {
      return undefined;
    }
    const rod = session.rods?.find((r) => r.id === rodId);
    if (!rod || rod.biteCount <= 0) {
      return session;
    }

    const latest = await this.repo.getLatestByRod(rodId);
    if (latest) {
      await this.repo.delete(latest.id);
    }
    return this.rodService.syncRodCounts(session);
  }
}
