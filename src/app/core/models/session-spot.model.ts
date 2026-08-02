export interface SessionSpot {
  id: string;
  lakeSpotId?: string;
  name: string;
  latitude?: number;
  longitude?: number;
  depth?: number;
  bottomType?: string;
  notes?: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
}
