import { api } from '@/api/apiInstance';
import { Product } from '@/types';

export const productService = {
  // 1. Obtener todos los productos (público)
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>('/products');
    return data;
  },

  // 2. Obtener un producto por su ID (público)
  getById: async (id: number): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  // 3. Crear un nuevo producto (requiere rol ADMIN - el interceptor inyecta el JWT)
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const { data } = await api.post<Product>('/products', product);
    return data;
  },

  // 4. Actualizar un producto existente (requiere rol ADMIN)
  update: async (id: number, product: Product): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  },

  // 5. Eliminar un producto (requiere rol ADMIN)
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  }
};