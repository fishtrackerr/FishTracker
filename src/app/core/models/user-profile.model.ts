export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  preferredLanguage?: string;
  preferredWeightUnit?: string;
  preferredLengthUnit?: string;
  preferredTemperatureUnit?: string;
  favoriteFishSpecies: string[];
  favoriteLakeId?: string;
  fishingLicenseNumber?: string;
  profilePictureId?: string;
  notes?: string;
  updatedAt: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  id: 'default',
  favoriteFishSpecies: [],
  updatedAt: new Date().toISOString(),
};
