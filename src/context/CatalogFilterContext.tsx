// Ruta: src/context/CatalogFilterContext.tsx
'use client';

import { createContext, useContext, useMemo, useState, ReactNode, useCallback } from 'react';

export interface CatalogFilterState {
  searchTerm: string;
  selectedSectionId: number | null;
  selectedCategoryId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  sortBy: string;
  filtersOpen: boolean;
}

interface CatalogFilterContextValue extends CatalogFilterState {
  setSearchTerm: (term: string) => void;
  setSelectedSectionId: (id: number | null) => void;
  setSelectedCategoryId: (id: number | null) => void;
  setMinPrice: (price: number | null) => void;
  setMaxPrice: (price: number | null) => void;
  setInStock: (value: boolean) => void;
  setSortBy: (value: string) => void;
  toggleFilters: () => void;
  hasActiveFilters: () => boolean;
}

const CatalogFilterContext = createContext<CatalogFilterContextValue | null>(null);

export function CatalogFilterProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilters = useCallback(() => setFiltersOpen((v) => !v), []);

  const hasActiveFilters = useCallback(() => {
    return minPrice !== null || maxPrice !== null || inStock;
  }, [minPrice, maxPrice, inStock]);

  const value = useMemo<CatalogFilterContextValue>(
    () => ({
      searchTerm,
      selectedSectionId,
      selectedCategoryId,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      filtersOpen,
      setSearchTerm,
      setSelectedSectionId,
      setSelectedCategoryId,
      setMinPrice,
      setMaxPrice,
      setInStock,
      setSortBy,
      toggleFilters,
      hasActiveFilters,
    }),
    [searchTerm, selectedSectionId, selectedCategoryId, minPrice, maxPrice, inStock, sortBy, filtersOpen, toggleFilters, hasActiveFilters]
  );

  return <CatalogFilterContext.Provider value={value}>{children}</CatalogFilterContext.Provider>;
}

export function useCatalogFilter(): CatalogFilterContextValue {
  const ctx = useContext(CatalogFilterContext);
  if (!ctx) throw new Error('useCatalogFilter debe usarse dentro de CatalogFilterProvider');
  return ctx;
}
