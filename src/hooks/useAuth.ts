import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { LoginRequest, RegisterRequest } from '@/types';

export function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleAuthSuccess = (token: string) => {
		document.cookie = `admin-token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
		router.push('/admin/dashboard');
		router.refresh();
	};

	const login = async (credentials: LoginRequest) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.login(credentials);
			handleAuthSuccess(data.token);
		} catch (err: any) {
			setError(err.message || 'Error al iniciar sesión');
		} finally {
			setLoading(false);
		}
	};

	const register = async (credentials: RegisterRequest) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.register(credentials);
			const msg = data?.message ? encodeURIComponent(data.message) : '';
			router.push(`/login?registered=true&msg=${msg}`);
			router.refresh();
		} catch (err: any) {
			setError(err.message || 'Error al registrar cuenta');
		} finally {
			setLoading(false);
		}
	};

	return {
		login,
		register,
		loading,
		error,
		setError,
	};
}