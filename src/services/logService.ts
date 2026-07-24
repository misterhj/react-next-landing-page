// Ruta: src/services/logService.ts
import { api } from '@/api/apiInstance';

export const logService = {
    /**
     * Obtiene las últimas N líneas del archivo de log del backend.
     */
    async getRecentLogs(lines: number = 100): Promise<string[]> {
        const { data } = await api.get<string[]>(`/admin/logs?lines=${lines}`);
        return data;
    },

    /**
     * Borra o vacía el contenido de los logs.
     */
    async clearLogs(): Promise<void> {
        await api.delete('/admin/logs');
    }
};