export interface BusinessProfile {
  id: string;
  businessName: string;
  registrationNumber: string;
  address: string;

  contactNumbers: string[];
  emailAddresses: string[]; // ✅ NEW

  logo?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileRequest {
  businessName: string;
  registrationNumber: string;
  address: string;

  contactNumbers: string[];
  emailAddresses: string[]; // ✅ NEW

  logo?: string;
}

export interface UpdateProfileRequest {
  businessName?: string;
  registrationNumber?: string;
  address?: string;

  contactNumbers?: string[];
  emailAddresses?: string[]; // ✅ NEW

  logo?: string;
}
