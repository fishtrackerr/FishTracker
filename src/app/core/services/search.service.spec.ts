import { describe, expect, it } from 'vitest';
import type { Catch, FishingSession, Lake, ProfileDocument, StoredImage } from '../models';
import { SearchService } from './search.service';

function makeSession(partial: Partial<FishingSession>): FishingSession {
  return {
    id: 'session-1',
    name: 'Morning Session',
    status: 'completed',
    startDate: '2026-07-20T06:00:00.000Z',
    endDate: '2026-07-20T10:00:00.000Z',
    photoIds: [],
    catchCount: 0,
    totalCatchWeightKg: 0,
    createdAt: '2026-07-20T06:00:00.000Z',
    updatedAt: '2026-07-20T10:00:00.000Z',
    ...partial,
  };
}

function makeCatch(partial: Partial<Catch>): Catch {
  return {
    id: 'catch-1',
    sessionId: 'session-1',
    species: 'Carp',
    caughtAt: '2026-07-20T07:00:00.000Z',
    createdAt: '2026-07-20T07:00:00.000Z',
    updatedAt: '2026-07-20T07:00:00.000Z',
    ...partial,
  };
}

function makeLake(partial: Partial<Lake>): Lake {
  return {
    id: 'lake-1',
    name: 'Mirror Lake',
    isFavorite: false,
    spots: [],
    photoIds: [],
    createdAt: '2026-07-20T06:00:00.000Z',
    updatedAt: '2026-07-20T10:00:00.000Z',
    ...partial,
  };
}

describe('SearchService', () => {
  const service = new SearchService();

  it('searches sessions by name, notes, and linked lake name', () => {
    const sessions = [
      makeSession({ id: 's1', name: 'Canal Dawn', notes: 'Calm water', lakeId: 'l1' }),
      makeSession({ id: 's2', name: 'River Night', notes: 'Windy', lakeId: 'l2' }),
    ];
    const lakes = [
      makeLake({ id: 'l1', name: 'Big Canal' }),
      makeLake({ id: 'l2', name: 'Stone River' }),
    ];

    expect(service.searchSessions(sessions, 'calm', lakes).map((s) => s.id)).toEqual(['s1']);
    expect(service.searchSessions(sessions, 'stone', lakes).map((s) => s.id)).toEqual(['s2']);
    expect(service.searchSessions(sessions, '', lakes)).toBe(sessions);
  });

  it('searches catches and sorts by weight and length', () => {
    const catches = [
      makeCatch({ id: 'c1', species: 'Carp', weightKg: 5, lengthCm: 70, bait: 'Corn' }),
      makeCatch({ id: 'c2', species: 'Pike', weightKg: 8, lengthCm: 90, bait: 'Shad' }),
      makeCatch({ id: 'c3', species: 'Perch', weightKg: 1, lengthCm: 30, notes: 'Canal edge' }),
    ];

    expect(service.searchCatches(catches, 'shad').map((c) => c.id)).toEqual(['c2']);
    expect(service.sortCatches(catches, 'highest-weight').map((c) => c.id)).toEqual([
      'c2',
      'c1',
      'c3',
    ]);
    expect(service.sortCatches(catches, 'longest').map((c) => c.id)).toEqual([
      'c2',
      'c1',
      'c3',
    ]);
  });

  it('searches lakes and documents and sorts images by favorite', () => {
    const lakes = [
      makeLake({ id: 'l1', name: 'Blue Lake', description: 'Clear water' }),
      makeLake({ id: 'l2', name: 'Forest Pond', address: 'North Woods' }),
    ];
    const docs: ProfileDocument[] = [
      {
        id: 'd1',
        type: 'permit',
        title: 'Main Permit',
        description: 'Annual permit',
        imageIds: [],
        createdAt: '2026-07-20T06:00:00.000Z',
        updatedAt: '2026-07-20T06:00:00.000Z',
      },
      {
        id: 'd2',
        type: 'license',
        title: 'Boat License',
        imageIds: [],
        createdAt: '2026-07-20T06:00:00.000Z',
        updatedAt: '2026-07-20T06:00:00.000Z',
      },
    ];
    const images: StoredImage[] = [
      {
        id: 'i1',
        type: 'general',
        fileName: 'a.jpg',
        blob: new Blob(['a']),
        thumbnailBlob: new Blob(['a']),
        mimeType: 'image/jpeg',
        createdAt: '2026-07-20T06:00:00.000Z',
        isFavorite: false,
        isHomepageImage: false,
      },
      {
        id: 'i2',
        type: 'general',
        fileName: 'b.jpg',
        blob: new Blob(['b']),
        thumbnailBlob: new Blob(['b']),
        mimeType: 'image/jpeg',
        createdAt: '2026-07-21T06:00:00.000Z',
        isFavorite: true,
        isHomepageImage: false,
      },
    ];

    expect(service.searchLakes(lakes, 'north').map((l) => l.id)).toEqual(['l2']);
    expect(service.searchDocuments(docs, 'permit').map((d) => d.id)).toEqual(['d1']);
    expect(service.sortImages(images, 'favorite').map((i) => i.id)).toEqual(['i2', 'i1']);
  });

  it('sorts sessions by requested mode', () => {
    const sessions = [
      makeSession({ id: 's1', name: 'Bravo', startDate: '2026-07-21T06:00:00.000Z', catchCount: 2 }),
      makeSession({ id: 's2', name: 'Alpha', startDate: '2026-07-20T06:00:00.000Z', catchCount: 5 }),
    ];

    expect(service.sortSessions(sessions, 'name-asc').map((s) => s.id)).toEqual(['s2', 's1']);
    expect(service.sortSessions(sessions, 'most-catches').map((s) => s.id)).toEqual(['s2', 's1']);
    expect(service.sortSessions(sessions, 'newest').map((s) => s.id)).toEqual(['s1', 's2']);
  });
});
