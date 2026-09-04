// Ruta: src/types/catalog.ts
// Tipos dedicados al catálogo público (API nueva, DTOs Java: ProductResponse, CategoryDto, Section)

export interface CatalogCategory {
  id: number;
  name: string;
  slug: string;
  parentCategoryId?: number | null;
  subcategories?: CatalogCategory[];
}

export interface CatalogSection {
  id: number;
  name: string;
}

export interface CatalogProductMedia {
  id?: number;
  url: string;
  mediaType: 'image' | 'video';
  isPrimary?: boolean;
}

export interface CatalogProduct {
  id: number;
  name: string;
  slug?: string;
  code?: string;
  barcode?: string;
  description: string;
  price: number;
  stock: number;
  specifications?: Record<string, string> | null;
  media?: CatalogProductMedia[];
  imageUrl?: string;

  sectionId?: number | null;
  categoryId?: number | null;
  subcategoryId?: number | null;
  brandId?: number | null;
  modelId?: number | null;

  sectionName?: string;
  categoryName?: string;
  subcategoryName?: string;
  brandName?: string;
  modelName?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}

export interface ProductQuery {
  pageIndex?: number;
  pageSize?: number;
  sectionId?: number | null;
  categoryId?: number | null;
  subcategoryId?: number | null;
  brandId?: number | null;
  modelId?: number | null;
  search?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  inStock?: boolean;
  sortBy?: string;
}
