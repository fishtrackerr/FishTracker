import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { AssistantPromptRepository } from './assistant-prompt.repository';
import { BiteEventRepository } from './bite-event.repository';
import { CatchRepository } from './catch.repository';
import { ChatRepository } from './chat.repository';
import { FilterService } from './filter.service';
import { FishSpottedRepository } from './fish-spotted.repository';
import { FishingModeService } from './fishing-mode.service';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';
import { LakeRepository } from './lake.repository';
import { ResetService } from './reset.service';
import { RodSpotHistoryRepository } from './rod-spot-history.repository';
import { SecretVaultService } from './secret-vault.service';
import { SessionEventRepository } from './session-event.repository';
import { SessionRepository } from './session.repository';
import { SessionWeatherRepository } from './session-weather.repository';
import { SettingsService } from './settings.service';
import { ThemeService } from './theme.service';
import { UserOptionRepository } from './user-option.repository';
import { UserOptionService } from './user-option.service';

describe('ResetService.resetAllSettings', () => {
  it('keeps PIN, mode preferences and the AI key salt', async () => {
    const current = {
      pinHash: 'hash',
      pinSalt: 'pin-salt',
      pinEnabled: true,
      aiKeySalt: 'ai-salt',
      modePreferences: { pike: { favoriteSpecies: ['Pike'] } },
      theme: 'light',
    };
    const replace = vi.fn();
    const unused = [
      FishingModeService,
      ThemeService,
      FilterService,
      UserOptionService,
      ImageService,
      SessionRepository,
      CatchRepository,
      LakeRepository,
      ImageRepository,
      BiteEventRepository,
      FishSpottedRepository,
      RodSpotHistoryRepository,
      SessionEventRepository,
      SessionWeatherRepository,
      UserOptionRepository,
      ChatRepository,
      AssistantPromptRepository,
    ].map((token) => ({ provide: token, useValue: {} }));
    TestBed.configureTestingModule({
      providers: [
        ...unused,
        { provide: SettingsService, useValue: { get: () => current, replace } },
        { provide: SecretVaultService, useValue: { clearAiApiKey: vi.fn().mockResolvedValue(undefined) } },
      ],
    });
    const service = TestBed.inject(ResetService);
    vi.spyOn(service, 'resetFilters').mockImplementation(() => undefined);
    vi.spyOn(service, 'resetAppearance').mockResolvedValue(undefined);
    vi.spyOn(service, 'resetWeather').mockImplementation(() => undefined);
    vi.spyOn(service, 'resetSecurity').mockImplementation(() => undefined);

    await service.resetAllSettings();

    expect(replace).toHaveBeenCalledWith(
      expect.objectContaining({
        pinHash: 'hash',
        pinSalt: 'pin-salt',
        pinEnabled: true,
        aiKeySalt: 'ai-salt',
        modePreferences: current.modePreferences,
      }),
    );
  });
});
