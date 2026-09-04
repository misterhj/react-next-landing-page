// Ruta: src/hooks/catalog/useCatalogProducts.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { catalogService, CatalogProductQuery } from '@/services/catalogService';
import type { CatalogProduct } from '@/types/catalog';

export const CATALOG_PAGE_SIZE = 12;

export function useCatalogProducts(query: CatalogProductQuery) {
  return useInfiniteQuery({
    queryKey: ['catalog-products', query],
    queryFn: ({ pageParam = 1 }) =>
      catalogService.getProducts({ ...query, pageIndex: pageParam, pageSize: CATALOG_PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const { totalCount } = lastPage;
      const loaded = allPages.reduce((sum, p) => sum + p.items.length, 0);
      if (loaded >= totalCount) return undefined;
      return lastPage.pageIndex + 1;
    },
    placeholderData: (prev) => prev,
  });
}

// Devuelve la URL de la primera imagen de media, con fallback a imageUrl
export function primaryImage(product: CatalogProduct): string | null {
  const firstImage = (product.media ?? []).find((m) => m.mediaType === 'image');
  return firstImage?.url ?? product.imageUrl ?? null;
}
