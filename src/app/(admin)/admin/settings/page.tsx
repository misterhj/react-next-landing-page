'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';

export default function SettingsPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Estados de visibilidad para cada campo
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validaciones del lado del cliente
        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('La nueva contraseña y la confirmación no coinciden.');
            return;
        }

        setLoading(true);
        const token = getCookie('admin-token');

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al intentar cambiar la contraseña');
            }

            setSuccess('¡Tu contraseña ha sido actualizada con éxito!');
            // Limpiamos los campos del formulario
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-4xl">
            {/* Título de la Sección */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Configuración del Panel</h1>
                <p className="text-sm text-slate-400">Gestiona la seguridad y preferencias de tu cuenta de administrador</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel de Información Lateral */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                        <h3 className="text-sm font-semibold text-white mb-2">Consejos de seguridad</h3>
                        <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                            <li>Usa al menos 8 caracteres.</li>
                            <li>Combina letras mayúsculas, minúsculas, números y símbolos.</li>
                            <li>No utilices contraseñas obvias o de otros servicios.</li>
                            <li>Cambia tu contraseña periódicamente.</li>
                        </ul>
                    </div>
                </div>

                {/* Formulario Principal */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleChangePassword} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
                        <div className="border-b border-slate-800 pb-4">
                            <h2 className="text-lg font-semibold text-white">Cambiar Contraseña</h2>
                            <p className="text-xs text-slate-400 mt-1">Deberás ingresar tu contraseña actual para confirmar los cambios.</p>
                        </div>

                        {/* Alerta de Error */}
                        {error && (
                            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-lg">
                                <ShieldAlert size={18} className="shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Alerta de Éxito */}
                        {success && (
                            <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm p-4 rounded-lg">
                                <CheckCircle2 size={18} className="shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        {/* Campos de Entrada */}
                        <div className="space-y-4">
                            {/* Contraseña Actual */}
                            <div>
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Contraseña Actual</label>
                                <div className="relative mt-2">
                                    <input
                                        type={showCurrent ? 'text' : 'password'}
                                        required
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-slate-800 bg-slate-950 pl-3 pr-10 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                                        placeholder="Tu contraseña actual"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrent(!showCurrent)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Nueva Contraseña */}
                            <div>
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nueva Contraseña</label>
                                <div className="relative mt-2">
                                    <input
                                        type={showNew ? 'text' : 'password'}
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-slate-800 bg-slate-950 pl-3 pr-10 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirmar Nueva Contraseña */}
                            <div>
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Confirmar Nueva Contraseña</label>
                                <div className="relative mt-2">
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-slate-800 bg-slate-950 pl-3 pr-10 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                                        placeholder="Repite la nueva contraseña"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Botón de Enviar */}
                        <div className="flex justify-end pt-4 border-t border-slate-800">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-5 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-600/10 disabled:bg-emerald-800 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={16} />
                                        Guardando cambios...
                                    </>
                                ) : (
                                    'Guardar Cambios'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}