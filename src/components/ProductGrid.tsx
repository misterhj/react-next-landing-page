// Ruta: src/components/ProductGrid.tsx
'use client';

import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Loader2, Smartphone, ShieldCheck, Inbox } from 'lucide-react';

interface ProductGridProps {
  searchTerm: string;
  selectedCategory: number | null;
}

export default function ProductGrid({ searchTerm, selectedCategory }: ProductGridProps) {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 bg-neutral-50 text-neutral-900">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-sm text-neutral-500 font-medium">Cargando nuestro catálogo premium...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-neutral-50 py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 p-6 rounded-2xl text-neutral-900">
          <p className="text-red-600 font-semibold">No pudimos conectar con el servidor</p>
          <p className="text-xs text-neutral-500 mt-2">
            Asegúrate de que tu backend de Spring Boot esté activo.
          </p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === null || product.category?.id === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    // 🟢 Cambiado a bg-neutral-50 (gris claro) y textos oscuros
    <section className="bg-neutral-50 py-16 text-neutral-900">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Encabezado */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-12">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">
              <ShieldCheck size={14} /> Colección Oficial
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-950">
              Explora Diseños Disponibles
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-sm text-neutral-400 font-semibold">
              Mostrando {filteredProducts.length} de {products.length} productos
            </span>
          </div>
        </div>

        {/* Rejilla de productos filtrados */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-neutral-300 rounded-3xl bg-neutral-100/50">
            <Inbox className="mx-auto text-neutral-400 mb-4" size={48} />
            <p className="text-neutral-500 font-medium text-lg">No encontramos resultados</p>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
              Intenta buscando con otros términos o seleccionando otra categoría.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                // 🟢 Tarjeta blanca (bg-white) con sombra muy suave, borde gris sutil, y hover dinámico
                className="group flex flex-col bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Contenedor de la Imagen (Mantiene el fondo ligeramente gris para contrastar con las fotos) */}
                <div className="relative aspect-square w-full bg-neutral-50 flex items-center justify-center overflow-hidden border-b border-neutral-100">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}

                  {/* Badge de Stock */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${
                      product.stock > 10 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : product.stock > 0 
                        ? 'bg-amber-50 text-amber-700 border-amber-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {product.stock > 0 ? `${product.stock} disp.` : 'Agotado'}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                      {product.category?.name || 'Funda'}
                    </span>
                    <h3 className="font-extrabold text-base text-neutral-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {product.description || 'Protección de grado militar con acabado sofisticado.'}
                    </p>
                  </div>

                  {/* Precio y Botón de Acción */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Precio</span>
                      <span className="text-xl font-black text-neutral-950">
                        ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <button 
                      disabled={product.stock === 0}
                      // 🟢 Botón negro profundo para que resalte sobre el fondo blanco
                      className="bg-neutral-950 hover:bg-neutral-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md hover:shadow-lg disabled:bg-neutral-200 disabled:text-neutral-400"
                    >
                      {product.stock > 0 ? 'Adquirir' : 'Sin Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}