import { Injectable } from '@angular/core';

export interface ReleaseNoteItem {
  message: string;
  shortHash?: string;
  commitUrl?: string;
}

export interface ReleaseNotesData {
  version: string;
  date: string;
  sections: { category: string; items: Array<string | ReleaseNoteItem> }[];
}

@Injectable({ providedIn: 'root' })
export class ReleaseNotesService {
  async getReleaseNotes(): Promise<ReleaseNotesData | null> {
    try {
      const response = await fetch('assets/release-notes.json');
      if (!response.ok) {
        return null;
      }
      return (await response.json()) as ReleaseNotesData;
    } catch {
      return null;
    }
  }
}
