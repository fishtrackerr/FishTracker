import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LAST_SEEN_VERSION_KEY } from '../constants/storage-keys';
import { WhatsNewDialogComponent } from '../../shared/components/whats-new-dialog/whats-new-dialog.component';
import { DialogService } from './dialog.service';
import { ReleaseNotesData, ReleaseNotesService } from './release-notes.service';

@Injectable({ providedIn: 'root' })
export class WhatsNewService {
  private readonly releaseNotes = inject(ReleaseNotesService);
  private readonly dialog = inject(DialogService);
  private dialogOpen = false;

  async maybeShow(): Promise<void> {
    if (this.dialogOpen) {
      return;
    }

    const notes = await this.releaseNotes.getReleaseNotes();
    if (!notes || !this.hasContent(notes)) {
      return;
    }

    const currentVersion = notes.version?.trim();
    if (!currentVersion) {
      return;
    }

    const lastSeen = this.readLastSeenVersion();
    if (!lastSeen) {
      this.writeLastSeenVersion(currentVersion);
      return;
    }

    if (lastSeen === currentVersion) {
      return;
    }

    this.dialogOpen = true;
    try {
      const ref = this.dialog.open(WhatsNewDialogComponent, {
        data: notes,
        maxWidth: '480px',
        width: 'calc(100vw - 32px)',
        autoFocus: 'dialog',
      });
      await firstValueFrom(ref.afterClosed());
      this.writeLastSeenVersion(currentVersion);
    } finally {
      this.dialogOpen = false;
    }
  }

  private hasContent(notes: ReleaseNotesData): boolean {
    return notes.sections.some((section) => section.items.length > 0);
  }

  private readLastSeenVersion(): string | null {
    try {
      const value = localStorage.getItem(LAST_SEEN_VERSION_KEY);
      return value?.trim() || null;
    } catch {
      return null;
    }
  }

  private writeLastSeenVersion(version: string): void {
    try {
      localStorage.setItem(LAST_SEEN_VERSION_KEY, version);
    } catch {
      // Ignore quota / private-mode failures; dialog may reappear next visit.
    }
  }
}
