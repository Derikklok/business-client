import type { LoginResponse } from "@/types/auth.types";

const USER_KEY = "auth_user";
export const saveUser = (user: LoginResponse) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): LoginResponse | null => {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;
  return JSON.parse(data);
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};
