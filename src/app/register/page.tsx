// Ruta: src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, LoaderCircle, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [identityDocument, setIdentityDocument] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [registering, setRegistering] = useState(false);

	const { register, error } = useAuth();

	const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

	const firstNameValid = firstName.trim().length >= 2;
	const lastNameValid = lastName.trim().length >= 2;
	const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
	const usernameValid = username.trim().length >= 3;
	const passwordValid = password.length >= 6;
	const confirmValid = confirmPassword === password && confirmPassword.length > 0;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setTouched({
			firstName: true,
			lastName: true,
			email: true,
			username: true,
			password: true,
			confirmPassword: true,
		});

		if (!firstNameValid || !lastNameValid || !emailValid || !usernameValid || !passwordValid || !confirmValid) {
			return;
		}

		setRegistering(true);
		await register({
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			email: email.trim(),
			username: username.trim(),
			password,
			identityDocument: identityDocument.trim() || undefined,
			phoneNumber: phoneNumber.trim() || undefined,
		});
		setRegistering(false);
	};

	const inputClass =
		'mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm';
	const passwordInputClass =
		'block w-full rounded-lg border border-slate-800 bg-slate-950 pl-3 pr-10 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm';

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
						{/* Nombre/s */}
						<div>
							<label className="text-sm font-medium text-slate-300">Nombre/s</label>
							<input
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								onBlur={() => markTouched('firstName')}
								disabled={registering}
								className={inputClass}
								placeholder="Ej. Juan Carlos"
							/>
							{touched.firstName && !firstNameValid && (
								<span className="text-xs text-red-400 mt-1 block">
									El nombre es requerido (mínimo 2 caracteres).
								</span>
							)}
						</div>

						{/* Apellido/s */}
						<div>
							<label className="text-sm font-medium text-slate-300">Apellido/s</label>
							<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								onBlur={() => markTouched('lastName')}
								disabled={registering}
								className={inputClass}
								placeholder="Ej. Pérez García"
							/>
							{touched.lastName && !lastNameValid && (
								<span className="text-xs text-red-400 mt-1 block">
									El apellido es requerido (mínimo 2 caracteres).
								</span>
							)}
						</div>

						{/* Email */}
						<div>
							<label className="text-sm font-medium text-slate-300">Correo Electrónico</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={() => markTouched('email')}
								disabled={registering}
								className={inputClass}
								placeholder="ej. usuario@email.com"
							/>
							{touched.email && !emailValid && (
								<span className="text-xs text-red-400 mt-1 block">
									Ingresa un correo electrónico válido.
								</span>
							)}
						</div>

						{/* Documento de Identidad (opcional) */}
						<div>
							<label className="text-sm font-medium text-slate-300">
								Documento de Identidad{' '}
								<span className="text-xs font-normal text-slate-500">(opcional)</span>
							</label>
							<input
								type="text"
								value={identityDocument}
								onChange={(e) => setIdentityDocument(e.target.value)}
								disabled={registering}
								className={inputClass}
								placeholder="Ej. 12345678"
							/>
						</div>

						{/* Teléfono (opcional) */}
						<div>
							<label className="text-sm font-medium text-slate-300">
								Teléfono{' '}
								<span className="text-xs font-normal text-slate-500">(opcional)</span>
							</label>
							<input
								type="tel"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								disabled={registering}
								className={inputClass}
								placeholder="Ej. 987654321"
							/>
						</div>

						{/* Usuario */}
						<div>
							<label className="text-sm font-medium text-slate-300">Nuevo Usuario</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								onBlur={() => markTouched('username')}
								disabled={registering}
								className={inputClass}
								placeholder="Ej. admin2"
							/>
							{touched.username && !usernameValid && (
								<span className="text-xs text-red-400 mt-1 block">
									El nombre de usuario es requerido (mínimo 3 caracteres).
								</span>
							)}
						</div>

						{/* Contraseña */}
						<div>
							<label className="text-sm font-medium text-slate-300">Contraseña</label>
							<div className="relative mt-1">
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									onBlur={() => markTouched('password')}
									disabled={registering}
									className={passwordInputClass}
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									disabled={registering}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none disabled:opacity-50"
									aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{touched.password && !passwordValid && (
								<span className="text-xs text-red-400 mt-1 block">
									La contraseña es requerida (mínimo 6 caracteres).
								</span>
							)}
						</div>

						{/* Confirmación de Contraseña */}
						<div>
							<label className="text-sm font-medium text-slate-300">Confirmación de Contraseña</label>
							<div className="relative mt-1">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									onBlur={() => markTouched('confirmPassword')}
									disabled={registering}
									className={passwordInputClass}
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									disabled={registering}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none disabled:opacity-50"
									aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
								>
									{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{touched.confirmPassword && confirmPassword.length === 0 && (
								<span className="text-xs text-red-400 mt-1 block">
									La confirmación es requerida.
								</span>
							)}
							{touched.confirmPassword && confirmPassword.length > 0 && !confirmValid && (
								<span className="text-xs text-red-400 mt-1 block">
									Las contraseñas no coinciden.
								</span>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={registering}
							className="group relative flex w-full justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-emerald-800 disabled:cursor-not-allowed"
						>
							{registering ? (
								<div className="flex items-center gap-2">
									<LoaderCircle size={18} className="animate-spin" />
									Guardando...
								</div>
							) : (
								'Registrar Cuenta'
							)}
						</button>
					</div>

					<div className="text-center text-sm">
						<Link href="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
							¿Ya tienes cuenta? Inicia sesión aquí
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}