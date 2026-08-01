import { FishingSpot } from './fishing-spot.model';

export interface Lake {
  id: string;
  name: string;
  description?: string;
  address?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  isFavorite: boolean;
  rules?: string;
  permitInformation?: string;
  openingHours?: string;
  averageDepthM?: number;
  maximumDepthM?: number;
  surfaceAreaHa?: number;
  parking?: string;
  facilities?: string;
  notes?: string;
  spots: FishingSpot[];
  photoIds: string[];
  coverImageId?: string;
  createdAt: string;
  updatedAt: string;
}
