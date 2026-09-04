// Ruta: src/hooks/catalog/useCatalogSections.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services/catalogService';
import type { CatalogSection } from '@/types/catalog';

export function useCatalogSections() {
  return useQuery<CatalogSection[]>({
    queryKey: ['catalog-sections'],
    queryFn: catalogService.getSections,
    staleTime: 1000 * 60 * 10,
  });
}
