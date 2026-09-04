// Ruta: src/hooks/catalog/useCatalogCategories.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services/catalogService';
import type { CatalogCategory } from '@/types/catalog';

export function useCatalogCategories() {
  return useQuery<CatalogCategory[]>({
    queryKey: ['catalog-categories'],
    queryFn: catalogService.getCategories,
    staleTime: 1000 * 60 * 10,
  });
}
