// Ruta: src/components/catalog/CatalogNavbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ShoppingCart } from 'lucide-react';
import { useCatalogFilter } from '@/context/CatalogFilterContext';
import { useCatalogSections } from '@/hooks/catalog/useCatalogSections';
import { useCatalogCategories } from '@/hooks/catalog/useCatalogCategories';
import { useCart } from '@/context/CartContext';

export default function CatalogNavbar() {
  const filter = useCatalogFilter();
  const cart = useCart();
  const { data: sections = [] } = useCatalogSections();
  const { data: categories = [] } = useCatalogCategories();

  const sectionSelectClass =
    'w-full appearance-none bg-slate-800 border border-slate-700 rounded-lg pl-3 pr-9 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">

          {/* Fila 1: Logo + Buscador */}
          <div className="flex items-center gap-3 flex-1">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 text-sm sm:text-base">
                CS
              </div>
              <span className="font-black text-base sm:text-lg text-white tracking-wider whitespace-nowrap">
                Cute Store
              </span>
            </Link>

            {/* Buscador */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={filter.searchTerm}
                onChange={(e) => filter.setSearchTerm(e.target.value)}
                placeholder="Buscar case para tu modelo..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {filter.searchTerm && (
                <button
                  onClick={() => filter.setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  title="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filtros por Sección y Categoría */}
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-44">
              <select
                value={filter.selectedSectionId ?? ''}
                onChange={(e) => filter.setSelectedSectionId(e.target.value ? Number(e.target.value) : null)}
                className={sectionSelectClass}
              >
                <option value="">Todas las secciones</option>
                {sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 sm:w-52">
              <select
                value={filter.selectedCategoryId ?? ''}
                onChange={(e) => filter.setSelectedCategoryId(e.target.value ? Number(e.target.value) : null)}
                className={sectionSelectClass}
              >
                <option value="">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón Filtros avanzados */}
            <button
              onClick={filter.toggleFilters}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition shrink-0 ${
                filter.filtersOpen
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
              title="Filtros avanzados"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
              {filter.hasActiveFilters() && <span className="w-2 h-2 rounded-full bg-amber-400" />}
            </button>

            {/* Carrito de consulta */}
            <button
              onClick={cart.open}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white transition shrink-0"
              title="Tu consulta"
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  {cart.count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Panel de filtros avanzados */}
      {filter.filtersOpen && (
        <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Precio mín.</label>
              <input
                type="number"
                min="0"
                value={filter.minPrice ?? ''}
                onChange={(e) => filter.setMinPrice(e.target.value === '' ? null : Number(e.target.value))}
                placeholder="Ej: 100000"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Precio máx.</label>
              <input
                type="number"
                min="0"
                value={filter.maxPrice ?? ''}
                onChange={(e) => filter.setMaxPrice(e.target.value === '' ? null : Number(e.target.value))}
                placeholder="Ej: 500000"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.inStock}
                  onChange={(e) => filter.setInStock(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-xs sm:text-sm text-slate-200">Solo en stock</span>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Ordenar por</label>
              <select
                value={filter.sortBy}
                onChange={(e) => filter.setSortBy(e.target.value)}
                className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-lg pl-3 pr-8 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
              >
                <option value="newest">Más recientes</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="name_asc">Nombre: A-Z</option>
                <option value="name_desc">Nombre: Z-A</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
