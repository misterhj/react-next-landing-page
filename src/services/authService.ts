import { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const authService = {
	/**
	 * Realiza el registro de un nuevo usuario en Java Spring Boot
	 */
	async register(credentials: RegisterRequest): Promise<AuthResponse> {
		const response = await fetch(`${API_BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Error al registrar el usuario');
		}

		return data;
	},

	/**
	 * Realiza el inicio de sesión
	 */
	async login(credentials: LoginRequest): Promise<AuthResponse> {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Credenciales inválidas');
		}

		return data;
	},
};