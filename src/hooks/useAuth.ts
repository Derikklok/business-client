import { authService } from "@/components/api/auth.service";
import { getUser } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  });
};

export const useAuthUser = () => {
  const [user] = useState(() => getUser());

  return user;
};
