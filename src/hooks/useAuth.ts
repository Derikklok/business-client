import { authService } from "@/components/api/auth.service";
import { getUser } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

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
  const [user, setUser] = useState(() => getUser());
  
  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
  }, []);

  return user;
};
