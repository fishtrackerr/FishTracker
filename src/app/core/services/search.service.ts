import { Injectable } from '@angular/core';
import { Catch, FishingSession, Lake, ProfileDocument, StoredImage } from '../models';

@Injectable({ providedIn: 'root' })
export class SearchService {
  searchSessions(sessions: FishingSession[], query: string, lakes: Lake[]): FishingSession[] {
    const q = query.toLowerCase();
    if (!q) return sessions;
    const lakeNames = new Map(lakes.map((l) => [l.id, l.name.toLowerCase()]));
    return sessions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.notes?.toLowerCase().includes(q) ||
        (s.lakeId && lakeNames.get(s.lakeId)?.includes(q)),
    );
  }

  searchCatches(catches: Catch[], query: string): Catch[] {
    const q = query.toLowerCase();
    if (!q) return catches;
    return catches.filter(
      (c) =>
        c.species.toLowerCase().includes(q) ||
        c.bait?.toLowerCase().includes(q) ||
        c.rig?.toLowerCase().includes(q) ||
        c.notes?.toLowerCase().includes(q) ||
        c.fishName?.toLowerCase().includes(q),
    );
  }

  searchLakes(lakes: Lake[], query: string): Lake[] {
    const q = query.toLowerCase();
    if (!q) return lakes;
    return lakes.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q) ||
        l.address?.toLowerCase().includes(q),
    );
  }

  searchDocuments(docs: ProfileDocument[], query: string): ProfileDocument[] {
    const q = query.toLowerCase();
    if (!q) return docs;
    return docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q),
    );
  }

  sortSessions(
    sessions: FishingSession[],
    sort: 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'most-catches',
  ): FishingSession[] {
    const copy = [...sessions];
    switch (sort) {
      case 'oldest':
        return copy.sort((a, b) => a.startDate.localeCompare(b.startDate));
      case 'name-asc':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return copy.sort((a, b) => b.name.localeCompare(a.name));
      case 'most-catches':
        return copy.sort((a, b) => b.catchCount - a.catchCount);
      default:
        return copy.sort((a, b) => b.startDate.localeCompare(a.startDate));
    }
  }

  sortCatches(
    catches: Catch[],
    sort: 'newest' | 'oldest' | 'highest-weight' | 'lowest-weight' | 'longest',
  ): Catch[] {
    const copy = [...catches];
    switch (sort) {
      case 'oldest':
        return copy.sort((a, b) => a.caughtAt.localeCompare(b.caughtAt));
      case 'highest-weight':
        return copy.sort((a, b) => (b.weightKg ?? 0) - (a.weightKg ?? 0));
      case 'lowest-weight':
        return copy.sort((a, b) => (a.weightKg ?? 0) - (b.weightKg ?? 0));
      case 'longest':
        return copy.sort((a, b) => (b.lengthCm ?? 0) - (a.lengthCm ?? 0));
      default:
        return copy.sort((a, b) => b.caughtAt.localeCompare(a.caughtAt));
    }
  }

  sortImages(images: StoredImage[], sort: 'newest' | 'oldest' | 'favorite'): StoredImage[] {
    const copy = [...images];
    if (sort === 'favorite') {
      return copy.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
    }
    if (sort === 'oldest') {
      return copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
    return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}
