import { api } from '@/api/apiInstance';
import { Subcategory } from '@/types';

export interface SubcategoryRequest {
    name: string;
    categoryId: number;
}

export const subcategoryService = {
    // Obtener todas las subcategorías (opcionalmente filtradas por id de categoría)
    getAll: async (categoryId?: number): Promise<Subcategory[]> => {
        const url = categoryId ? `/subcategories?categoryId=${categoryId}` : '/subcategories';
        const { data } = await api.get<Subcategory[]>(url);
        return data;
    },

    // Crear una nueva subcategoría (ADMIN)
    create: async (payload: SubcategoryRequest): Promise<Subcategory> => {
        const { data } = await api.post<Subcategory>('/subcategories', payload);
        return data;
    },

    // Actualizar subcategoría (ADMIN)
    update: async (id: number, payload: SubcategoryRequest): Promise<Subcategory> => {
        const { data } = await api.put<Subcategory>(`/subcategories/${id}`, payload);
        return data;
    },

    // Eliminar subcategoría (ADMIN)
    delete: async (id: number): Promise<void> => {
        await api.delete(`/subcategories/${id}`);
    }
};