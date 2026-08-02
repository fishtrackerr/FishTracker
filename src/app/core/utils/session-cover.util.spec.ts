import { describe, expect, it } from 'vitest';
import { Catch, Lake } from '../models';
import {
  pickCatchCoverPhotoId,
  pickLakeCoverImageId,
  resolveSessionCoverImageId,
} from './session-cover.util';

describe('session-cover.util', () => {
  const lake: Lake = {
    id: 'lake-1',
    name: 'Lake A',
    isFavorite: false,
    spots: [],
    photoIds: ['lake-photo'],
    coverImageId: 'lake-cover',
    createdAt: '',
    updatedAt: '',
  };

  it('prefers most recent catch photo', () => {
    const catches = [
      { photoId: 'old', caughtAt: '2026-01-01T10:00:00.000Z' },
      { photoId: 'new', caughtAt: '2026-01-02T10:00:00.000Z' },
      { caughtAt: '2026-01-03T10:00:00.000Z' },
    ] as Catch[];

    expect(pickCatchCoverPhotoId(catches)).toBe('new');
  });

  it('falls back to lake cover then first photo', () => {
    expect(pickLakeCoverImageId(lake)).toBe('lake-cover');
    expect(pickLakeCoverImageId({ ...lake, coverImageId: undefined })).toBe('lake-photo');
  });

  it('resolves catch photo over lake image', () => {
    const catches = [
      { photoId: 'catch-1', caughtAt: '2026-01-01T10:00:00.000Z' },
    ] as Catch[];
    expect(resolveSessionCoverImageId(catches, lake)).toBe('catch-1');
    expect(resolveSessionCoverImageId([], lake)).toBe('lake-cover');
  });
});
