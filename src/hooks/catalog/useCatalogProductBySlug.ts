// Ruta: src/hooks/catalog/useCatalogProductBySlug.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services/catalogService';
import type { CatalogProduct } from '@/types/catalog';

export function useCatalogProductBySlug(slug: string) {
  return useQuery<CatalogProduct>({
    queryKey: ['catalog-product', slug],
    queryFn: () => catalogService.getProductBySlug(slug),
    enabled: !!slug,
    retry: false,
  });
}
