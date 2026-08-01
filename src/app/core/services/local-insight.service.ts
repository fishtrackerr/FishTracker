import { Injectable } from '@angular/core';
import { InsightPromptId } from '../models';
import { I18nService } from './i18n.service';
import {
  FishingDataContext,
  FishingDataContextService,
} from './fishing-data-context.service';

export interface InsightPromptDef {
  id: InsightPromptId;
  titleKey: string;
  descriptionKey: string;
  userMessageKey: string;
}

export const INSIGHT_PROMPTS: InsightPromptDef[] = [
  {
    id: 'best-time',
    titleKey: 'assistant.prompts.bestTime.title',
    descriptionKey: 'assistant.prompts.bestTime.description',
    userMessageKey: 'assistant.prompts.bestTime.userMessage',
  },
  {
    id: 'best-lake',
    titleKey: 'assistant.prompts.bestLake.title',
    descriptionKey: 'assistant.prompts.bestLake.description',
    userMessageKey: 'assistant.prompts.bestLake.userMessage',
  },
  {
    id: 'best-bait-rig',
    titleKey: 'assistant.prompts.bestBaitRig.title',
    descriptionKey: 'assistant.prompts.bestBaitRig.description',
    userMessageKey: 'assistant.prompts.bestBaitRig.userMessage',
  },
  {
    id: 'species-records',
    titleKey: 'assistant.prompts.speciesRecords.title',
    descriptionKey: 'assistant.prompts.speciesRecords.description',
    userMessageKey: 'assistant.prompts.speciesRecords.userMessage',
  },
];

@Injectable({ providedIn: 'root' })
export class LocalInsightService {
  constructor(
    private readonly contextService: FishingDataContextService,
    private readonly i18n: I18nService,
  ) {}

  getPrompts(): InsightPromptDef[] {
    return INSIGHT_PROMPTS;
  }

  matchPromptId(text: string): InsightPromptId | undefined {
    const normalized = text.trim().toLowerCase();
    for (const prompt of INSIGHT_PROMPTS) {
      const userMessage = this.i18n.t(prompt.userMessageKey).toLowerCase();
      const title = this.i18n.t(prompt.titleKey).toLowerCase();
      if (normalized === userMessage || normalized === title) {
        return prompt.id;
      }
    }
    return undefined;
  }

  async answer(promptId: InsightPromptId): Promise<string> {
    const context = await this.contextService.build();
    return this.answerFromContext(promptId, context);
  }

  answerFromContext(promptId: InsightPromptId, context: FishingDataContext): string {
    switch (promptId) {
      case 'best-time':
        return this.bestTimeAnswer(context);
      case 'best-lake':
        return this.bestLakeAnswer(context);
      case 'best-bait-rig':
        return this.bestBaitRigAnswer(context);
      case 'species-records':
        return this.speciesRecordsAnswer(context);
      default:
        return this.i18n.t('assistant.insights.noData');
    }
  }

  private bestTimeAnswer(context: FishingDataContext): string {
    if (context.summary.totalCatches === 0 || context.catchHours.length === 0) {
      return this.i18n.t('assistant.insights.noCatches');
    }
    const top = context.catchHours.slice(0, 3);
    const lines = top.map(
      (h) =>
        `• ${h.hour.toString().padStart(2, '0')}:00 — ${h.count} ${this.i18n.t('assistant.insights.catches')}`,
    );
    const best = context.summary.bestTimeOfDay ?? `${top[0].hour}:00`;
    const month = context.summary.bestMonth
      ? `\n${this.i18n.t('assistant.insights.bestMonth', { month: context.summary.bestMonth })}`
      : '';
    return `${this.i18n.t('assistant.insights.bestTimeIntro', { time: best })}\n\n${lines.join('\n')}${month}`;
  }

  private bestLakeAnswer(context: FishingDataContext): string {
    if (context.lakes.length === 0) {
      return this.i18n.t('assistant.insights.noLakes');
    }
    const ranked = [...context.lakes].sort((a, b) => b.catches - a.catches || b.sessions - a.sessions);
    const top = ranked[0];
    const lines = ranked.slice(0, 5).map(
      (l) =>
        `• ${l.name} — ${l.sessions} ${this.i18n.t('assistant.insights.sessions')}, ${l.catches} ${this.i18n.t('assistant.insights.catches')}`,
    );
    return `${this.i18n.t('assistant.insights.bestLakeIntro', { lake: top.name })}\n\n${lines.join('\n')}`;
  }

  private bestBaitRigAnswer(context: FishingDataContext): string {
    if (context.summary.totalCatches === 0) {
      return this.i18n.t('assistant.insights.noCatches');
    }
    const bait = context.summary.bestBait ?? this.i18n.t('common.unknown');
    const rig = context.summary.bestRig ?? this.i18n.t('common.unknown');
    const baitLines = context.baits
      .slice(0, 5)
      .map((b) => `• ${b.bait} — ${b.count}`)
      .join('\n');
    const rigLines = context.rigs
      .slice(0, 5)
      .map((r) => `• ${r.rig} — ${r.count}`)
      .join('\n');
    return `${this.i18n.t('assistant.insights.bestBaitRigIntro', { bait, rig })}\n\n${this.i18n.t('assistant.insights.baits')}:\n${baitLines || '—'}\n\n${this.i18n.t('assistant.insights.rigs')}:\n${rigLines || '—'}`;
  }

  private speciesRecordsAnswer(context: FishingDataContext): string {
    if (context.species.length === 0) {
      return this.i18n.t('assistant.insights.noCatches');
    }
    const lines = context.species
      .slice(0, 8)
      .map(
        (s) =>
          `• ${s.species} — ${s.count} ${this.i18n.t('assistant.insights.catches')}, avg ${s.avgWeightKg} kg, best ${s.bestWeightKg} kg`,
      );
    return `${this.i18n.t('assistant.insights.speciesIntro')}\n\n${lines.join('\n')}`;
  }
}
