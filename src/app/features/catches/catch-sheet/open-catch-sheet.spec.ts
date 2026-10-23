import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import type { MatBottomSheet } from '@angular/material/bottom-sheet';
import type { Catch, FishingSession } from '../../../core/models';
import { CatchSheetComponent } from './catch-sheet.component';
import { openCatchSheet } from './open-catch-sheet';

describe('openCatchSheet', () => {
  const session = { id: 's1' } as FishingSession;

  it('opens the sheet with themed classes and resolves to the saved catch', async () => {
    const saved = { id: 'c1' } as Catch;
    const open = vi.fn().mockReturnValue({ afterDismissed: () => of(saved) });
    const result = await openCatchSheet(
      { open } as unknown as MatBottomSheet,
      { resolvedTheme: () => 'dark' },
      { session, rodId: 'r1' },
    );
    expect(result).toBe(saved);
    const [component, config] = open.mock.calls[0];
    expect(component).toBe(CatchSheetComponent);
    expect(config.data).toEqual({ session, rodId: 'r1' });
    expect(config.panelClass).toEqual(['themed-bottom-sheet', 'theme-dark']);
    expect(config.backdropClass).toEqual(['themed-backdrop', 'theme-backdrop-dark']);
  });

  it('resolves to undefined when dismissed without a catch', async () => {
    const open = vi.fn().mockReturnValue({ afterDismissed: () => of(undefined) });
    const result = await openCatchSheet(
      { open } as unknown as MatBottomSheet,
      { resolvedTheme: () => 'light' },
      { session },
    );
    expect(result).toBeUndefined();
    expect(open.mock.calls[0][1].panelClass).toEqual(['themed-bottom-sheet', 'theme-light']);
  });
});
