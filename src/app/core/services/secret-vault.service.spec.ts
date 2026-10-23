import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AppSettings } from '../models';
import { SecretVaultService } from './secret-vault.service';
import { SettingsService } from './settings.service';

describe('SecretVaultService', () => {
  let stored: Partial<AppSettings>;
  let vault: SecretVaultService;

  const newVault = (): SecretVaultService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SettingsService,
          useValue: {
            get: () => stored,
            update: (patch: Partial<AppSettings>) => {
              stored = { ...stored, ...patch };
            },
          },
        },
      ],
    });
    return TestBed.inject(SecretVaultService);
  };

  beforeEach(() => {
    stored = {};
    sessionStorage.clear();
    vault = newVault();
  });

  afterEach(() => sessionStorage.clear());

  it('encrypts the key and decrypts it after a restart', async () => {
    await vault.unlockWithPin('123456');
    await vault.setAiApiKey('sk-first');
    expect(stored.aiApiKeyEncrypted).toBeTruthy();

    sessionStorage.clear();
    const restarted = newVault();
    await restarted.unlockWithPin('123456');

    expect(restarted.getAiApiKey()).toBe('sk-first');
  });

  it('never brings back the old key when it was changed after an in-tab refresh', async () => {
    await vault.unlockWithPin('123456');
    await vault.setAiApiKey('sk-old');

    // In-tab refresh: plaintext comes back from sessionStorage, the wrap key does not.
    const refreshed = newVault();
    refreshed.restoreFromSession();
    await refreshed.setAiApiKey('sk-new');
    expect(stored.aiApiKeyEncrypted).toBeUndefined();

    // Next PIN unlock in the same tab encrypts the new key.
    await refreshed.unlockWithPin('123456');
    expect(stored.aiApiKeyEncrypted).toBeTruthy();

    sessionStorage.clear();
    const restarted = newVault();
    await restarted.unlockWithPin('123456');
    expect(restarted.getAiApiKey()).toBe('sk-new');
  });
});
