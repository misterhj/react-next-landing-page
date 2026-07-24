// Ruta: src/app/(admin)/admin/logs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Terminal, RefreshCw } from 'lucide-react';
import { logService } from '@/services/logService'; // 👈 Importamos la capa de servicio

export default function LogsPage() {
    const [logs, setLogs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            // Invocamos la función del servicio en lugar de hacer fetch directo
            const data = await logService.getRecentLogs(150);
            setLogs(Array.isArray(data) ? data : [data]);
        } catch (err: any) {
            setLogs([err.message || 'Error de conexión con el servidor.']);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Terminal className="text-emerald-500" size={28} />
                    <div>
                        <h1 className="text-2xl font-bold text-white">Logs del Servidor</h1>
                        <p className="text-sm text-slate-400">Visor de errores en tiempo real (Backend Spring Boot)</p>
                    </div>
                </div>
                
                <button 
                    onClick={fetchLogs}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                    <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                    Actualizar
                </button>
            </div>

            {/* Consola Estilo Terminal */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto h-[600px] overflow-y-auto space-y-1">
                {logs.length === 0 ? (
                    <span className="text-slate-500">No hay entradas de log disponibles.</span>
                ) : (
                    logs.map((line, idx) => (
                        <div 
                            key={idx} 
                            className={`whitespace-pre-wrap ${
                                line.includes('ERROR') 
                                    ? 'text-red-400 font-semibold' 
                                    : line.includes('WARN') 
                                    ? 'text-amber-300' 
                                    : 'text-slate-300'
                            }`}
                        >
                            {line}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}