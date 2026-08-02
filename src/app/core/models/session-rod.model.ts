export interface SessionRod {
  id: string;
  sessionId: string;
  rodNumber: number;
  name: string;
  sessionSpotId?: string;
  bait?: string;
  rig?: string;
  castAt?: string;
  retrievedAt?: string;
  biteCount: number;
  fishSpottedCount: number;
  isActive: boolean;
  notes?: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
}
