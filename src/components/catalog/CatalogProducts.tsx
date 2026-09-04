// Ruta: src/components/catalog/CatalogProducts.tsx
'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ImageIcon, ShoppingCart } from 'lucide-react';
import { useCatalogFilter } from '@/context/CatalogFilterContext';
import { useCatalogProducts, primaryImage } from '@/hooks/catalog/useCatalogProducts';
import { useCatalogSections } from '@/hooks/catalog/useCatalogSections';
import { useCatalogCategories } from '@/hooks/catalog/useCatalogCategories';
import { formatPrice } from '@/lib/format';
import type { CatalogProduct } from '@/types/catalog';

function onImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  (e.target as HTMLElement).style.display = 'none';
}

export default function CatalogProducts() {
  const router = useRouter();
  const filter = useCatalogFilter();
  const { data: sections = [] } = useCatalogSections();
  const { data: categories = [] } = useCatalogCategories();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useCatalogProducts({
    sectionId: filter.selectedSectionId,
    categoryId: filter.selectedCategoryId,
    search: filter.searchTerm || undefined,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    inStock: filter.inStock,
    sortBy: filter.sortBy && filter.sortBy !== 'newest' ? filter.sortBy : undefined,
  });

  const allProducts: CatalogProduct[] = data?.pages.flatMap((p) => p.items) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  // Scroll infinito: cerca del fondo carga el siguiente lote
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const goToProduct = (product: CatalogProduct) => {
    const slug = product.slug ?? product.id;
    if (slug != null) router.push(`/producto/${slug}`);
  };

  const sectionName = (id: number | null | undefined) =>
    id != null ? sections.find((s) => s.id === id)?.name : undefined;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loader inicial */}
        {isLoading && allProducts.length === 0 && (
          <div className="py-12 flex justify-center items-center gap-3 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Cargando catálogo...</span>
          </div>
        )}

        {/* Sin productos */}
        {!isLoading && !isError && allProducts.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            No se encontraron productos que coincidan con tu búsqueda.
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="py-12 text-center">
            <p className="text-slate-500 mb-4">No pudimos conectar con el servidor.</p>
          </div>
        )}

        {/* Grid de productos */}
        {allProducts.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Catálogo</h2>
              <span className="text-xs text-slate-400">
                Mostrando {allProducts.length} de {totalCount} productos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => {
                const img = primaryImage(product);
                const stockLabel =
                  sectionName(product.sectionId) ||
                  product.categoryName ||
                  product.subcategoryName ||
                  categories.find((c) => c.id === product.categoryId)?.name;

                return (
                  <div
                    key={product.id}
                    onClick={() => goToProduct(product)}
                    className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 transition group cursor-pointer"
                  >
                    {/* Imagen */}
                    <div className="w-full h-56 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative mb-4">
                      {img ? (
                        <img
                          src={img}
                          alt={product.name}
                          onError={onImageError}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-slate-300" />
                      )}
                    </div>

                    {/* Información */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {stockLabel && (
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                            {stockLabel}
                          </span>
                        )}
                        <h3 className="font-bold text-slate-900 text-base mt-1 group-hover:text-slate-600 transition line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 block">Precio</span>
                          <span className="text-lg font-extrabold text-slate-900">{formatPrice(product.price)}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToProduct(product);
                          }}
                          className="p-2.5 bg-slate-900 hover:bg-slate-700 text-white rounded-xl transition shadow-sm"
                          title="Ver y consultar"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Loader de siguientes lotes + sentinela para scroll infinito */}
            <div ref={sentinelRef} className="py-8 flex justify-center items-center gap-3 text-slate-500">
              {isFetchingNextPage && allProducts.length > 0 && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Cargando más productos...</span>
                </>
              )}
              {!hasNextPage && allProducts.length > 0 && (
                <span className="text-xs text-slate-400"></span>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
