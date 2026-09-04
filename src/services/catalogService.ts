// Ruta: src/services/catalogService.ts
// Servicio dedicado al catálogo público. Consume el backend con la API nueva
// (PagedResult, media[], secciones, etc.) usando publicApi (sin JWT).
import { publicApi } from '@/api/publicApi';
import type { CatalogProduct, CatalogCategory, CatalogSection, PagedResult, ProductQuery } from '@/types/catalog';

export type CatalogProductQuery = ProductQuery;

const chartIfParams = (params?: CatalogProductQuery): string => {
  if (!params) return '';
  const qs = new URLSearchParams();
  if (params.pageIndex != null) qs.set('pageIndex', String(params.pageIndex));
  if (params.pageSize != null) qs.set('pageSize', String(params.pageSize));
  if (params.sectionId != null) qs.set('sectionId', String(params.sectionId));
  if (params.categoryId != null) qs.set('categoryId', String(params.categoryId));
  if (params.subcategoryId != null) qs.set('subcategoryId', String(params.subcategoryId));
  if (params.brandId != null) qs.set('brandId', String(params.brandId));
  if (params.modelId != null) qs.set('modelId', String(params.modelId));
  if (params.search) qs.set('search', params.search);
  if (params.minPrice != null) qs.set('minPrice', String(params.minPrice));
  if (params.maxPrice != null) qs.set('maxPrice', String(params.maxPrice));
  if (params.inStock) qs.set('inStock', 'true');
  if (params.sortBy) qs.set('sortBy', params.sortBy);
  const s = qs.toString();
  return s ? `?${s}` : '';
};

export const catalogService = {
  // Catálogo paginado de productos (público)
  getProducts: async (params?: CatalogProductQuery): Promise<PagedResult<CatalogProduct>> => {
    const { data } = await publicApi.get<PagedResult<CatalogProduct>>(`/products${chartIfParams(params)}`);
    return data;
  },

  // Detalle de producto por slug (público)
  getProductBySlug: async (slug: string): Promise<CatalogProduct> => {
    const { data } = await publicApi.get<CatalogProduct>(`/products/product/${slug}`);
    return data;
  },

  // Categorías principales (público)
  getCategories: async (): Promise<CatalogCategory[]> => {
    const { data } = await publicApi.get<CatalogCategory[]>('/categories');
    return data;
  },

  // Secciones (público)
  getSections: async (): Promise<CatalogSection[]> => {
    const { data } = await publicApi.get<CatalogSection[]>('/sections');
    return data;
  },
};
