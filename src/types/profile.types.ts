export interface BusinessProfile {
  id: string;
  businessName: string;
  registrationNumber: string;
  address: string;
  contactNumbers: string[];
  logo?: string; // Base64 or URL
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileRequest {
  businessName: string;
  registrationNumber: string;
  address: string;
  contactNumbers: string[];
  logo?: string;
}

export interface UpdateProfileRequest {
  businessName?: string;
  registrationNumber?: string;
  address?: string;
  contactNumbers?: string[];
  logo?: string;
}
