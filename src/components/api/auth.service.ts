import api from "@/lib/axios";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth.types";

export const authService = {
    login : async (data: LoginRequest):Promise<LoginResponse> => {
        const res = await api.post<LoginResponse>("/api/auth/login",data);
        return res.data;
    },
    
    register : async (data: RegisterRequest):Promise<RegisterResponse> => {
        const res = await api.post<RegisterResponse>("/api/auth/register",data);
        return res.data;
    }
}