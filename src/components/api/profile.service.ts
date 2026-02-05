import api from "@/lib/axios";
import type {
  BusinessProfile,
  CreateProfileRequest,
  UpdateProfileRequest,
} from "@/types/profile.types";

export const profileService = {
  // Get business profile
  get: async (): Promise<BusinessProfile> => {
    const res = await api.get<BusinessProfile>("/api/profile");
    return res.data;
  },

  // Create business profile
  create: async (data: CreateProfileRequest): Promise<BusinessProfile> => {
    const res = await api.post("/api/profile", data);
    return res.data;
  },

  // Update business profile
  update: async (data: UpdateProfileRequest): Promise<BusinessProfile> => {
    const res = await api.put<BusinessProfile>("/api/profile", data);
    return res.data;
  },

  // Upload logo
  uploadLogo: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("logo", file);
    const res = await api.post<{ url: string }>("/api/profile/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};
