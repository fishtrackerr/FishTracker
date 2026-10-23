import { TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BackupService } from './backup.service';
import { ConfirmService } from './confirm.service';
import { BackupSaveCancelledError } from './backup.service';
import { FishingModeService } from './fishing-mode.service';
import { I18nService } from './i18n.service';
import { LakeService } from './lake.service';
import { NotificationService } from './notification.service';
import { RodService } from './rod.service';
import { ThemeService } from './theme.service';
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
    rodCount: 2,
  };

  let dialogResult: unknown;
  let getActive: ReturnType<typeof vi.fn>;
  let startSession: ReturnType<typeof vi.fn>;
  let exportBackup: ReturnType<typeof vi.fn>;
  let saveToFile: ReturnType<typeof vi.fn>;
  let confirm: ReturnType<typeof vi.fn>;
  let openSheet: ReturnType<typeof vi.fn>;
  let addSpot: ReturnType<typeof vi.fn>;
  let updateSession: ReturnType<typeof vi.fn>;
  let getLakeById: ReturnType<typeof vi.fn>;
  let watchAll: ReturnType<typeof vi.fn>;
  let navigate: ReturnType<typeof vi.fn>;
  let info: ReturnType<typeof vi.fn>;
  let success: ReturnType<typeof vi.fn>;
  let error: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    dialogResult = createResult;
    getActive = vi.fn().mockResolvedValue(undefined);
    startSession = vi.fn().mockResolvedValue(newSession);
    exportBackup = vi.fn().mockResolvedValue({ version: 6, sessions: [] });
    saveToFile = vi.fn().mockResolvedValue(undefined);
    confirm = vi.fn();
    openSheet = vi.fn().mockImplementation(() => ({
      afterDismissed: () => of(dialogResult),
    }));
    addSpot = vi.fn();
    updateSession = vi.fn().mockResolvedValue(undefined);
    getLakeById = vi.fn().mockResolvedValue(undefined);
    watchAll = vi.fn().mockReturnValue(of([]));
    navigate = vi.fn().mockResolvedValue(true);
    info = vi.fn();
    success = vi.fn();
    error = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        SessionStartFlowService,
        {
          provide: SessionService,
          useValue: { getActive, start: startSession, watchAll, update: updateSession },
        },
        {
          provide: LakeService,
          useValue: {
            getAll: vi.fn().mockResolvedValue([]),
            getSortedLakes: vi.fn((lakes: unknown[]) => lakes),
            getById: getLakeById,
            addSpot,
          },
        },
        {
          provide: SettingsService,
          useValue: { get: vi.fn().mockReturnValue({ backupBeforeSession: true }) },
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
          provide: MatBottomSheet,
          useValue: { open: openSheet },
        },
        {
          provide: ThemeService,
          useValue: { resolvedTheme: () => 'dark' },
        },
        {
          provide: RodService,
          useValue: {
            snapshotFromLakeSpot: vi.fn((spot: { id: string; name: string }) => ({
              id: 'ss-' + spot.id,
              lakeSpotId: spot.id,
              name: spot.name,
              visible: true,
            })),
          },
        },
        {
          provide: BackupService,
          useValue: { export: exportBackup, saveToFile },
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
    expect(saveToFile).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringMatching(/^fish-tracker-pre-session-\d{4}-\d{2}-\d{2}\.json$/),
    );
    expect(startSession).toHaveBeenCalledWith({
      ...createResult,
      sessionSpots: undefined,
      rodSpotId: undefined,
    });
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's-new']);
    expect(success).toHaveBeenCalledWith('sessions.backupSaved');
    expect(success).toHaveBeenCalledWith('sessions.sessionStarted');
  });

  it('starts without a backup when backup before session is off', async () => {
    vi.mocked(TestBed.inject(SettingsService).get).mockReturnValue({
      backupBeforeSession: false,
    } as never);

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(true);
    expect(exportBackup).not.toHaveBeenCalled();
    expect(saveToFile).not.toHaveBeenCalled();
  });

  it('goes to the active session without a sheet, backup or snackbar when one exists', async () => {
    getActive.mockResolvedValue({ id: 's-active', status: 'active' });

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(false);
    expect(openSheet).not.toHaveBeenCalled();
    expect(exportBackup).not.toHaveBeenCalled();
    expect(startSession).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/sessions/active'], {
      queryParams: { id: 's-active' },
    });
    expect(success).not.toHaveBeenCalled();
  });

  it('continues the active session when one appears while the sheet is open', async () => {
    getActive
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ id: 's-active', status: 'active' });

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(false);
    expect(startSession).not.toHaveBeenCalled();
    expect(success).not.toHaveBeenCalledWith('sessions.sessionStarted');
    expect(navigate).toHaveBeenCalledWith(['/sessions/active'], {
      queryParams: { id: 's-active' },
    });
  });

  it('continues the active session when one appears during the backup step', async () => {
    getActive
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ id: 's-active', status: 'active' });

    const ok = await TestBed.inject(SessionStartFlowService).start();

    expect(ok).toBe(false);
    expect(exportBackup).toHaveBeenCalled();
    expect(startSession).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/sessions/active'], {
      queryParams: { id: 's-active' },
    });
  });

  it('defaults the rod count to the most recent session and clamps to the maximum', async () => {
    vi.mocked(TestBed.inject(SettingsService).get).mockReturnValue({
      backupBeforeSession: false,
      maxRodCount: 3,
    } as never);
    watchAll.mockReturnValue(
      of([
        { id: 'a', startDate: '2026-07-01T00:00:00Z', rods: [{ id: 'r1' }] },
        {
          id: 'b',
          startDate: '2026-07-20T00:00:00Z',
          rods: [
            { id: 'r1' },
            { id: 'r2' },
            { id: 'r3' },
            { id: 'r4' },
            { id: 'r5', visible: false },
          ],
        },
      ]),
    );

    await TestBed.inject(SessionStartFlowService).start();

    const config = openSheet.mock.calls[0][1] as {
      data: { defaultRodCount: number; maxRodCount: number };
    };
    expect(config.data.defaultRodCount).toBe(3);
    expect(config.data.maxRodCount).toBe(3);
  });

  it('defaults to one rod without earlier sessions and opens a themed sheet', async () => {
    await TestBed.inject(SessionStartFlowService).start();

    const config = openSheet.mock.calls[0][1] as {
      data: { defaultRodCount: number };
      panelClass: string[];
    };
    expect(config.data.defaultRodCount).toBe(1);
    expect(config.panelClass).toEqual(['themed-bottom-sheet', 'theme-dark']);
  });

  it('assigns a new swim to all rods as a real session spot and adds it to the lake after the start', async () => {
    dialogResult = { ...createResult, lakeId: 'l1', swim: { newName: 'Point' } };
    getLakeById.mockResolvedValue({ id: 'l1', spots: [] });
    addSpot.mockResolvedValue({ id: 'ls1', name: 'Point' });

    await TestBed.inject(SessionStartFlowService).start();

    expect(addSpot).toHaveBeenCalledWith('l1', { name: 'Point' });
    const call = startSession.mock.calls[0][0] as {
      sessionSpots: { id: string; name: string }[];
      rodSpotId: string;
    };
    expect(call.sessionSpots).toHaveLength(1);
    expect(call.sessionSpots[0].name).toBe('Point');
    expect(call.rodSpotId).toBe(call.sessionSpots[0].id);
    expect(startSession.mock.invocationCallOrder[0]).toBeLessThan(addSpot.mock.invocationCallOrder[0]);
    expect(updateSession).toHaveBeenCalledWith('s-new', {
      sessionSpots: [expect.objectContaining({ id: call.rodSpotId, lakeSpotId: 'ls1' })],
    });
  });

  it('does not add the new swim to the lake when starting fails', async () => {
    dialogResult = { ...createResult, lakeId: 'l1', swim: { newName: 'Point' } };
    startSession.mockRejectedValue(new Error('boom'));

    const ok = await TestBed.inject(SessionStartFlowService).start();

    expect(ok).toBe(false);
    expect(addSpot).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
  });

  it('still starts when saving the new swim on the lake fails', async () => {
    dialogResult = { ...createResult, lakeId: 'l1', swim: { newName: 'Point' } };
    addSpot.mockRejectedValue(new Error('db'));

    const ok = await TestBed.inject(SessionStartFlowService).start();

    expect(ok).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's-new']);
  });

  it('snapshots an existing lake spot into the session', async () => {
    dialogResult = { ...createResult, lakeId: 'l1', swim: { lakeSpotId: 'ls9' } };
    getLakeById.mockResolvedValue({ id: 'l1', spots: [{ id: 'ls9', name: 'Reeds' }] });

    await TestBed.inject(SessionStartFlowService).start();

    expect(addSpot).not.toHaveBeenCalled();
    expect(startSession).toHaveBeenCalledWith(
      expect.objectContaining({
        rodSpotId: 'ss-ls9',
        sessionSpots: [expect.objectContaining({ name: 'Reeds' })],
      }),
    );
  });

  it('keeps a new swim on the session only when no lake is chosen', async () => {
    dialogResult = { ...createResult, swim: { newName: 'Bank' } };

    await TestBed.inject(SessionStartFlowService).start();

    expect(addSpot).not.toHaveBeenCalled();
    const call = startSession.mock.calls[0][0] as {
      sessionSpots: { id: string; name: string }[];
      rodSpotId: string;
    };
    expect(call.sessionSpots).toHaveLength(1);
    expect(call.sessionSpots[0].name).toBe('Bank');
    expect(call.rodSpotId).toBe(call.sessionSpots[0].id);
  });

  it('asks with "not saved" wording when the share sheet is dismissed', async () => {
    saveToFile.mockRejectedValue(new BackupSaveCancelledError());
    confirm.mockResolvedValue(false);
    const consoleError = vi.spyOn(console, 'error');

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(false);
    expect(confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'sessions.backupSkippedTitle',
        message: 'sessions.backupSkippedMessage',
      }),
    );
    expect(consoleError).not.toHaveBeenCalled();
    expect(startSession).not.toHaveBeenCalled();
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
    expect(startSession).toHaveBeenCalledWith(expect.objectContaining(createResult));
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

  it('returns false when the sheet is dismissed', async () => {
    dialogResult = undefined;

    const service = TestBed.inject(SessionStartFlowService);
    const ok = await service.start();

    expect(ok).toBe(false);
    expect(exportBackup).not.toHaveBeenCalled();
    expect(startSession).not.toHaveBeenCalled();
  });
});
