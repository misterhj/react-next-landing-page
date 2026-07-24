// Ruta: src/app/(admin)/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { register, loading, error } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await register({ username, email, password });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8 bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">
				<div>
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-500 border border-emerald-500/20">
						<UserPlus size={24} />
					</div>
					<h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-white">
						Crear Cuenta
					</h2>
					<p className="mt-2 text-center text-sm text-slate-400">
						Registra un nuevo usuario para administrar tu tienda
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg text-center">
							{error}
						</div>
					)}

					<div className="space-y-4 rounded-md">
						<div>
							<label className="text-sm font-medium text-slate-300">Usuario</label>
							<input
								type="text"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
								placeholder="Nombre de usuario"
							/>
						</div>

						<div>
							<label className="text-sm font-medium text-slate-300">Correo Electrónico</label>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
								placeholder="admin@casezone.com"
							/>
						</div>

						<div>
							<label className="text-sm font-medium text-slate-300">Contraseña</label>
							<div className="relative mt-1">
								<input
									type={showPassword ? 'text' : 'password'}
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full rounded-lg border border-slate-800 bg-slate-950 pl-3 pr-10 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
									aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative flex w-full justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-emerald-800"
						>
							{loading ? 'Registrando...' : 'Registrar Cuenta'}
						</button>
					</div>

					<div className="text-center text-sm">
						<Link href="/admin/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
							¿Ya tienes cuenta? Inicia sesión aquí
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}