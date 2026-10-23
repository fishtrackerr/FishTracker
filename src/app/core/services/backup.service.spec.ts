import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Directory } from '@capacitor/filesystem';
import { BackupSaveCancelledError, BackupService, serializeBackup } from './backup.service';
import { BackupData, BACKUP_EXPORT_VERSION, SUPPORTED_BACKUP_VERSIONS } from '../models';
import { db } from '../db/fish-db';
import { ProfileDocumentRepository } from './profile-document.repository';
import { ProfileRepository } from './profile.repository';
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

  it('rejects invalid userOptions', () => {
    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [],
        catches: [],
        lakes: [],
        userOptions: [{ id: 'o1', category: 'not-a-category', value: 'x' }],
      }),
    ).toThrow(/userOption category/);

    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [],
        catches: [],
        lakes: [],
        userOptions: [{ id: 'o1', category: 'bait', value: 'x'.repeat(81) }],
      }),
    ).toThrow(/userOption value/);
  });

  it('rejects invalid assistantPrompts', () => {
    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [],
        catches: [],
        lakes: [],
        assistantPrompts: [{ id: 'p1', title: '', userMessage: 'hi' }],
      }),
    ).toThrow(/assistantPrompt title/);

    expect(() =>
      service.validate({
        version: SUPPORTED_BACKUP_VERSIONS[0],
        sessions: [],
        catches: [],
        lakes: [],
        assistantPrompts: [{ id: 'p1', title: 'Ask', userMessage: 'x'.repeat(501) }],
      }),
    ).toThrow(/assistantPrompt userMessage/);
  });

  it('accepts well-formed userOptions and assistantPrompts', () => {
    const preview = service.validate({
      version: SUPPORTED_BACKUP_VERSIONS[0],
      sessions: [],
      catches: [],
      lakes: [],
      userOptions: [{ id: 'o1', category: 'bait', value: 'Corn', fishingMode: 'carper' }],
      assistantPrompts: [
        {
          id: 'p1',
          title: 'Best bait',
          description: 'optional',
          userMessage: 'What bait works best?',
          fishingMode: 'carper',
        },
      ],
    });
    expect(preview.sessionCount).toBe(0);
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

describe('serializeBackup', () => {
  it('joins into the same JSON as JSON.stringify', () => {
    const data = {
      version: BACKUP_EXPORT_VERSION,
      exportedAt: '2026-01-01T00:00:00.000Z',
      sessions: [{ id: 's1', notes: 'a "quoted" note', optional: undefined }],
      catches: [],
      lakes: [{ id: 'l1' }, { id: 'l2' }],
      images: [],
      profiles: [undefined],
      profileDocuments: undefined,
    } as unknown as BackupData;

    const parsed = JSON.parse(serializeBackup(data).join(''));

    expect(parsed).toEqual(JSON.parse(JSON.stringify(data)));
  });
});

describe('BackupService export/import', () => {
  type Row = Record<string, unknown>;
  const repoMock = () => ({
    getAllAcrossModes: vi.fn().mockResolvedValue([]),
    clear: vi.fn().mockResolvedValue(undefined),
    put: vi.fn().mockResolvedValue(undefined),
  });
  let repos: Record<string, ReturnType<typeof repoMock>>;
  let chatRepo: Record<string, ReturnType<typeof vi.fn>>;
  let service: BackupService;

  const putRows = (name: string): Row[] => repos[name].put.mock.calls.map(([row]) => row as Row);

  beforeEach(() => {
    repos = Object.fromEntries(
      [
        'session',
        'catch',
        'lake',
        'image',
        'bite',
        'spotted',
        'rodSpot',
        'sessionEvent',
        'weather',
        'option',
        'prompt',
      ].map((name) => [name, repoMock()]),
    );
    chatRepo = {
      getAllThreadsAcrossModes: vi.fn().mockResolvedValue([]),
      getAllMessagesAcrossModes: vi.fn().mockResolvedValue([]),
      clear: vi.fn().mockResolvedValue(undefined),
      putThread: vi.fn().mockResolvedValue(undefined),
      putMessage: vi.fn().mockResolvedValue(undefined),
    };
    vi.spyOn(db, 'transaction').mockImplementation(((...args: unknown[]) =>
      (args[args.length - 1] as () => Promise<unknown>)()) as never);
    vi.spyOn(db.profiles, 'clear').mockResolvedValue(undefined as never);
    vi.spyOn(db.profileDocuments, 'clear').mockResolvedValue(undefined as never);

    TestBed.configureTestingModule({
      providers: [
        { provide: ProfileRepository, useValue: { get: vi.fn(), put: vi.fn() } },
        { provide: ProfileDocumentRepository, useValue: { getAll: vi.fn(), put: vi.fn() } },
      ],
    });
    service = TestBed.runInInjectionContext(
      () =>
        new BackupService(
          repos['session'] as never,
          repos['catch'] as never,
          repos['lake'] as never,
          repos['image'] as never,
          repos['bite'] as never,
          repos['spotted'] as never,
          repos['rodSpot'] as never,
          repos['sessionEvent'] as never,
          repos['weather'] as never,
          repos['option'] as never,
          chatRepo as never,
          repos['prompt'] as never,
        ),
    );
  });

  afterEach(() => vi.restoreAllMocks());

  const backup = (version: number, extra: Partial<BackupData> = {}): BackupData =>
    ({ version, exportedAt: '', sessions: [], catches: [], lakes: [], images: [], ...extra }) as BackupData;

  const image = (id: string, visible?: boolean) => ({
    id,
    fishingMode: 'catfish',
    type: 'catch',
    mimeType: 'image/jpeg',
    data: 'AAAA',
    thumbnail: 'AAAA',
    createdAt: '2026-01-01T00:00:00.000Z',
    visible,
  });

  it('exports the soft-delete flag of images', async () => {
    repos['image'].getAllAcrossModes.mockResolvedValue([
      { id: 'i1', blob: new Blob(['a']), thumbnailBlob: new Blob(['a']) },
      { id: 'i2', blob: new Blob(['a']), thumbnailBlob: new Blob(['a']), visible: false },
    ]);

    const data = await service.export();

    expect(data.images.map((img) => img.visible)).toEqual([true, false]);
  });

  it('keeps deleted images hidden on restore', async () => {
    await service.import(
      backup(BACKUP_EXPORT_VERSION, {
        images: [image('i1'), image('i2', false)] as BackupData['images'],
      }),
    );

    expect(putRows('image').map((row) => row['visible'])).toEqual([true, false]);
  });

  it('restores pre-v8 carper and unscoped rows into catfish', async () => {
    await service.import(
      backup(7, {
        sessions: [
          { id: 's1', fishingMode: 'carper' },
          { id: 's2' },
          { id: 's3', fishingMode: 'pike' },
        ] as BackupData['sessions'],
      }),
    );

    expect(putRows('session').map((row) => row['fishingMode'])).toEqual([
      'catfish',
      'catfish',
      'pike',
    ]);
  });

  it('keeps carper rows in carper for current backups', async () => {
    await service.import(
      backup(BACKUP_EXPORT_VERSION, {
        sessions: [{ id: 's1', fishingMode: 'carper' }] as BackupData['sessions'],
      }),
    );

    expect(putRows('session')[0]['fishingMode']).toBe('carper');
  });

  it('does not let a deleted active session demote the real one', async () => {
    await service.import(
      backup(BACKUP_EXPORT_VERSION, {
        sessions: [
          { id: 'deleted', fishingMode: 'pike', status: 'active', visible: false },
          { id: 'real', fishingMode: 'pike', status: 'active' },
        ] as BackupData['sessions'],
      }),
    );

    const real = putRows('session').find((row) => row['id'] === 'real');
    expect(real?.['status']).toBe('active');
  });
});

describe('BackupService.saveToFile', () => {
  let service: BackupService;
  const data = {
    version: BACKUP_EXPORT_VERSION,
    exportedAt: '2026-10-23T00:00:00.000Z',
    sessions: [{ id: 's1' }],
    catches: [],
    lakes: [],
    images: [{ id: 'i1', data: 'x'.repeat(10), thumbnail: '' }],
  } as unknown as BackupData;

  beforeEach(() => {
    service = Object.create(BackupService.prototype) as BackupService;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    delete (window as { Capacitor?: unknown }).Capacitor;
  });

  describe('in the Android app', () => {
    let written: string;
    let writeFile: ReturnType<typeof vi.fn>;
    let appendFile: ReturnType<typeof vi.fn>;
    let rmdir: ReturnType<typeof vi.fn>;
    let share: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      (window as { Capacitor?: unknown }).Capacitor = { isNativePlatform: () => true };
      written = '';
      writeFile = vi.fn(async ({ data: chunk }: { data: string }) => {
        written = chunk;
        return { uri: '' };
      });
      appendFile = vi.fn(async ({ data: chunk }: { data: string }) => {
        written += chunk;
      });
      rmdir = vi.fn().mockRejectedValue(new Error('missing'));
      share = vi.fn().mockResolvedValue({});
      Object.assign(service, {
        filesystem: {
          writeFile,
          appendFile,
          rmdir,
          getUri: vi.fn().mockResolvedValue({ uri: 'file:///cache/backups/b.json' }),
        },
        share: { share },
      });
    });

    it('writes valid JSON to the cache and opens the share sheet', async () => {
      await service.saveToFile(data, 'b.json');

      expect(rmdir).toHaveBeenCalledWith(
        expect.objectContaining({ path: 'backups', directory: Directory.Cache, recursive: true }),
      );
      expect(writeFile).toHaveBeenCalledWith(
        expect.objectContaining({ path: 'backups/b.json', directory: Directory.Cache, recursive: true }),
      );
      expect(JSON.parse(written)).toEqual(data);
      expect(share).toHaveBeenCalledWith({ title: 'b.json', files: ['file:///cache/backups/b.json'] });
    });

    it('reports a dismissed share sheet as cancelled', async () => {
      share.mockRejectedValue(new Error('Share canceled'));

      await expect(service.saveToFile(data, 'b.json')).rejects.toBeInstanceOf(
        BackupSaveCancelledError,
      );
    });

    it('passes other share errors through', async () => {
      share.mockRejectedValue(new Error('No app can handle this'));

      await expect(service.saveToFile(data, 'b.json')).rejects.toThrow('No app can handle this');
    });
  });

  it('downloads in the browser and revokes the URL later', async () => {
    vi.useFakeTimers();
    const createObjectURL = vi.fn().mockReturnValue('blob:backup');
    const revokeObjectURL = vi.fn();
    Object.assign(URL, { createObjectURL, revokeObjectURL });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);

    await service.saveToFile(data, 'b.json');

    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).not.toHaveBeenCalled();
    vi.runAllTimers();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:backup');
  });
});
