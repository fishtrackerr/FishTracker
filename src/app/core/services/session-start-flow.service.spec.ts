import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BackupService } from './backup.service';
import { ConfirmService } from './confirm.service';
import { DialogService } from './dialog.service';
import { FishingModeService } from './fishing-mode.service';
import { I18nService } from './i18n.service';
import { LakeService } from './lake.service';
import { NotificationService } from './notification.service';
import { RodSetupFlowService } from './rod-setup-flow.service';
import { SessionService } from './session.service';
import { SessionStartFlowService } from './session-start-flow.service';
import { SettingsService } from './settings.service';

describe('SessionStartFlowService', () => {
  const newSession = {
    id: 's-new',
    name: 'Morning',
    status: 'active' as const,
    startDate: '2026-08-01T08:00:00.000Z',
    createdAt: '2026-08-01T08:00:00.000Z',
    updatedAt: '2026-08-01T08:00:00.000Z',
  };

  const createResult = {
    name: 'Morning',
    startDate: '2026-08-01T08:00:00.000Z',
  };

  let dialogResult: unknown;
  let getActive: ReturnType<typeof vi.fn>;
  let startSession: ReturnType<typeof vi.fn>;
  let exportBackup: ReturnType<typeof vi.fn>;
  let downloadJson: ReturnType<typeof vi.fn>;
  let confirm: ReturnType<typeof vi.fn>;
  let promptAfterSessionCreate: ReturnType<typeof vi.fn>;
  let navigate: ReturnType<typeof vi.fn>;
  let info: ReturnType<typeof vi.fn>;
  let success: ReturnType<typeof vi.fn>;
  let error: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    dialogResult = createResult;
    getActive = vi.fn().mockResolvedValue(undefined);
    startSession = vi.fn().mockResolvedValue(newSession);
    exportBackup = vi.fn().mockResolvedValue({ version: 6, sessions: [] });
    downloadJson = vi.fn();
    confirm = vi.fn();
    promptAfterSessionCreate = vi.fn().mockResolvedValue(newSession);
    navigate = vi.fn().mockResolvedValue(true);
    info = vi.fn();
    success = vi.fn();
    error = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        SessionStartFlowService,
        {
          provide: SessionService,
          useValue: { getActive, start: startSession },
        },
        {
          provide: LakeService,
          useValue: {
            getAll: vi.fn().mockResolvedValue([]),
            getSortedLakes: vi.fn((lakes: unknown[]) => lakes),
          },
        },
        {
          provide: SettingsService,
          useValue: { get: vi.fn().mockReturnValue({}) },
        },
        {
          provide: FishingModeService,
          useValue: {
            getActivePreferences: vi.fn().mockReturnValue({ lastLakeId: undefined }),
          },
        },
        {
          provide: NotificationService,
          useValue: { info, success, error },
        },
        {
          provide: I18nService,
          useValue: { t: vi.fn((key: string) => key) },
        },
        {
          provide: Router,
          useValue: { navigate },
        },
        {
          provide: DialogService,
          useValue: {
            open: vi.fn().mockImplementation(() => ({
              afterClosed: () => of(dialogResult),
            })),
          },
        },
        {
          provide: RodSetupFlowService,
          useValue: { promptAfterSessionCreate },
        },
        {
          provide: BackupService,
          useValue: { export: exportBackup, downloadJson },
        },
        {
          provide: ConfirmService,
          useValue: { confirm },
        },
      ],
    });
  });

  it('exports backup before creating a new session', async () => {
    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(true);
    expect(exportBackup).toHaveBeenCalledOnce();
    expect(downloadJson).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringMatching(/^fish-tracker-pre-session-\d{4}-\d{2}-\d{2}\.json$/),
    );
    expect(startSession).toHaveBeenCalledWith(createResult);
    expect(promptAfterSessionCreate).toHaveBeenCalledWith(newSession);
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's-new'], {
      queryParams: { setupRods: '1' },
    });
    expect(success).toHaveBeenCalledWith('sessions.backupSaved');
    expect(success).toHaveBeenCalledWith('sessions.sessionStarted');
  });

  it('skips backup when an active session already exists', async () => {
    getActive.mockResolvedValue({ id: 's-active', status: 'active' });
    startSession.mockResolvedValue({ id: 's-active', status: 'active' });

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(true);
    expect(exportBackup).not.toHaveBeenCalled();
    expect(downloadJson).not.toHaveBeenCalled();
    expect(promptAfterSessionCreate).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/sessions/active'], {
      queryParams: { id: 's-active' },
    });
  });

  it('starts session when backup fails and user skips', async () => {
    exportBackup.mockRejectedValue(new Error('disk full'));
    confirm.mockResolvedValue(true);

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(true);
    expect(confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'sessions.backupFailedTitle',
        message: 'sessions.backupFailedMessage',
        confirmLabel: 'sessions.startWithoutBackup',
      }),
    );
    expect(startSession).toHaveBeenCalledWith(createResult);
  });

  it('does not start session when backup fails and user cancels', async () => {
    exportBackup.mockRejectedValue(new Error('disk full'));
    confirm.mockResolvedValue(false);

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(false);
    expect(startSession).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('returns false when create dialog is cancelled', async () => {
    dialogResult = undefined;

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(false);
    expect(exportBackup).not.toHaveBeenCalled();
    expect(startSession).not.toHaveBeenCalled();
  });
});
