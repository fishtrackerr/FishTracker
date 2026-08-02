/** Soft-delete: omitted or true = shown; false = hidden (restorable). */
export type WithVisibility = { visible?: boolean };

export function isVisibleRecord(entity: WithVisibility | null | undefined): boolean {
  return entity != null && entity.visible !== false;
}

export function onlyVisibleRecords<T extends WithVisibility>(rows: T[]): T[] {
  return rows.filter(isVisibleRecord);
}

export function withVisibleDefault<T extends WithVisibility>(entity: T): T & { visible: boolean } {
  return {
    ...entity,
    visible: entity.visible !== false,
  };
}

/** Mark as soft-deleted (kept in storage for future restore). */
export function softDeleteRecord<T extends WithVisibility>(entity: T): T & { visible: false } {
  return { ...entity, visible: false };
}
