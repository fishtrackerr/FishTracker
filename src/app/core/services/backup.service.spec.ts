import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { BackupService } from './backup.service';
import { BACKUP_EXPORT_VERSION, SUPPORTED_BACKUP_VERSIONS } from '../models';
import { LlmError, LlmService } from './llm.service';
import { SecretVaultService } from './secret-vault.service';
import { SettingsService } from './settings.service';

describe('BackupService.validate', () => {
  let service: BackupService;

  beforeEach(() => {
    service = Object.create(BackupService.prototype) as BackupService;
  });

  it('accepts a minimal valid backup', () => {
    const preview = service.validate({
      version: BACKUP_EXPORT_VERSION,
      exportedAt: '2026-01-01T00:00:00.000Z',
      sessions: [{ id: 's1' }],
      catches: [],
      lakes: [],
      images: [],
    });
    expect(preview.sessionCount).toBe(1);
    expect(preview.version).toBe(BACKUP_EXPORT_VERSION);
  });

  it('rejects unsupported versions', () => {
    expect(() =>
      service.validate({
        version: 999,
        sessions: [],
        catches: [],
        lakes: [],
      }),
    ).toThrow(/Unsupported backup version/);
  });

  it('rejects missing required arrays', () => {
    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [],
        catches: null,
        lakes: [],
      }),
    ).toThrow(/must be arrays/);
  });

  it('rejects sessions without id', () => {
    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [{}],
        catches: [],
        lakes: [],
      }),
    ).toThrow(/session entries must have an id/);
  });

  it('rejects catches and lakes without id', () => {
    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [{ id: 's1' }],
        catches: [{}],
        lakes: [],
      }),
    ).toThrow(/catch entries must have an id/);

    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [{ id: 's1' }],
        catches: [],
        lakes: [{}],
      }),
    ).toThrow(/lake entries must have an id/);
  });

  it('rejects unsupported image mime types', () => {
    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [],
        catches: [],
        lakes: [],
        images: [{ id: 'i1', mimeType: 'image/svg+xml' }],
      }),
    ).toThrow(/unsupported image mime type/);
  });
});

describe('LlmService.resolveBaseUrl', () => {
  let llm: LlmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LlmService,
        { provide: SettingsService, useValue: { get: () => ({}) } },
        { provide: SecretVaultService, useValue: { getAiApiKey: () => undefined } },
      ],
    });
    llm = TestBed.inject(LlmService);
  });

  it('allowlists exact openai and openrouter hosts only', () => {
    expect(llm.resolveBaseUrl('https://api.openai.com/v1')).toBe('https://api.openai.com/v1');
    expect(llm.resolveBaseUrl('https://openrouter.ai/api/v1')).toBe('https://openrouter.ai/api/v1');
    expect(() => llm.resolveBaseUrl('http://api.openai.com/v1')).toThrow(LlmError);
    expect(() => llm.resolveBaseUrl('https://evil.example/v1')).toThrow(LlmError);
    expect(() => llm.resolveBaseUrl('https://evil.api.openai.com/v1')).toThrow(LlmError);
    expect(() => llm.resolveBaseUrl('https://user:pass@api.openai.com/v1')).toThrow(LlmError);
  });
});
