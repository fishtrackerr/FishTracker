export interface FishingSpot {
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
  waterDepthM?: number;
  bottomType?: string;
  distanceM?: number;
  vegetation?: string;
  snags?: string;
  recommendedBait?: string;
  notes?: string;
  isFavorite: boolean;
}
