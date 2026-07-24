// Ruta: src/services/authService.ts
import { api } from '@/api/apiInstance';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

export const authService = {
    /**
     * Realiza el registro de un nuevo usuario en Java Spring Boot
     */
    async register(credentials: RegisterRequest): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/register', credentials);
        return data;
    },

    /**
     * Realiza el inicio de sesión
     */
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/login', credentials);
        return data;
    }
};