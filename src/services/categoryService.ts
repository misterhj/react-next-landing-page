import { api } from '@/api/apiInstance';
import { Category } from '@/types';

export const categoryService = {
  // Obtener todas las categorías para filtros o selectores
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  },

  // Crear una nueva categoría (útil para el futuro panel de administración)
  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const { data } = await api.post<Category>('/categories', category);
    return data;
  }
};