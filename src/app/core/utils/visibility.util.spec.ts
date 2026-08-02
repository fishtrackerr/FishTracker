import { describe, expect, it } from 'vitest';
import {
  isVisibleRecord,
  onlyVisibleRecords,
  softDeleteRecord,
  withVisibleDefault,
} from './visibility.util';

describe('visibility.util', () => {
  it('treats omitted visible as shown', () => {
    expect(isVisibleRecord({})).toBe(true);
    expect(isVisibleRecord({ visible: true })).toBe(true);
    expect(isVisibleRecord({ visible: false })).toBe(false);
    expect(isVisibleRecord(null)).toBe(false);
  });

  it('filters only visible rows', () => {
    expect(
      onlyVisibleRecords([{ id: 1 }, { id: 2, visible: false }, { id: 3, visible: true }]),
    ).toEqual([{ id: 1 }, { id: 3, visible: true }]);
  });

  it('stamps visible default and soft-deletes', () => {
    expect(withVisibleDefault({ id: 'a' } as { id: string; visible?: boolean })).toEqual({
      id: 'a',
      visible: true,
    });
    expect(softDeleteRecord({ id: 'a', visible: true } as { id: string; visible?: boolean })).toEqual({
      id: 'a',
      visible: false,
    });
  });
});
