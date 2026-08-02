import { FishingMode } from './fishing-mode.model';

export interface RodSpotHistory {
  id: string;
  fishingMode?: FishingMode;
  rodId: string;
  fromSessionSpotId?: string;
  toSessionSpotId: string;
  changedAt: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
}
