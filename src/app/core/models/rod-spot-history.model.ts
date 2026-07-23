export interface RodSpotHistory {
  id: string;
  rodId: string;
  fromSessionSpotId?: string;
  toSessionSpotId: string;
  changedAt: string;
}
