import { profileService } from "@/components/api/profile.service";
import type {
  BusinessProfile,
  CreateProfileRequest,
  UpdateProfileRequest,
} from "@/types/profile.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.get,
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfileRequest) => profileService.create(data),

    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => profileService.update(data),

    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });
};

export const useUploadLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileService.uploadLogo(file),

    onSuccess: (data) => {
      const currentProfile = queryClient.getQueryData(["profile"]) as BusinessProfile | undefined;
      if (currentProfile) {
        queryClient.setQueryData(["profile"], {
          ...currentProfile,
          logo: data.url,
        });
      }
    },
  });
};
