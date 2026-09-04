// Ruta: src/components/catalog/ProductDetail.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ImageIcon, Loader2 } from 'lucide-react';
import { useCatalogProductBySlug } from '@/hooks/catalog/useCatalogProductBySlug';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import type { CatalogProductMedia } from '@/types/catalog';

const ZOOM = 2.5;

function onImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  (e.target as HTMLElement).style.display = 'none';
}

function onThumbError(e: React.SyntheticEvent<HTMLImageElement>) {
  (e.target as HTMLElement).style.visibility = 'hidden';
}

export default function ProductDetail({ slug }: { slug: string }) {
  const { data: product, isLoading, isError } = useCatalogProductBySlug(slug);
  const cart = useCart();
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<Record<string, string> | null>(null);

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center items-center gap-3 text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Cargando producto...</span>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-500 mb-4">No se encontró el producto solicitado.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 transition"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const mediaList: CatalogProductMedia[] = (() => {
    const list = (product.media ?? []).filter((m) => !!m.url);
    if (list.length > 0) return list;
    return product.imageUrl ? [{ url: product.imageUrl, mediaType: 'image' as const }] : [];
  })();

  const selectedMedia = mediaList[selectedMediaIndex] ?? null;
  const specEntries = Object.entries(product.specifications ?? {});

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const img = container.querySelector('img') as HTMLImageElement;
    if (!img) {
      setZoomStyle(null);
      return;
    }
    if (!img.naturalWidth || !img.naturalHeight) {
      setZoomStyle(null);
      return;
    }
    const cRect = container.getBoundingClientRect();
    const mx = e.clientX - cRect.left;
    const my = e.clientY - cRect.top;
    const scale = Math.min(cRect.width / img.naturalWidth, cRect.height / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const drawX = (cRect.width - drawW) / 2;
    const drawY = (cRect.height - drawH) / 2;
    if (mx < drawX || mx > drawX + drawW || my < drawY || my > drawY + drawH) {
      setZoomStyle(null);
      return;
    }
    const px = ((mx - drawX) / drawW) * 100;
    const py = ((my - drawY) / drawH) * 100;
    setZoomStyle({ transformOrigin: `${px}% ${py}%`, transform: `scale(${ZOOM})` });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Migas de pan */}
      <nav className="text-xs text-slate-400 mb-6 flex flex-wrap items-center gap-1.5">
        <Link href="/" className="hover:text-slate-900 transition">Inicio</Link>
        {product.sectionName && (
          <>
            <span>/</span>
            <span className="text-slate-600">{product.sectionName}</span>
          </>
        )}
        {product.categoryName && (
          <>
            <span>/</span>
            <span className="text-slate-600">{product.categoryName}</span>
          </>
        )}
        {(product.sectionName || product.categoryName) && <span>/</span>}
        <span className="text-slate-900 font-semibold line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Galería */}
        <div>
          <div
            onMouseMove={selectedMedia?.mediaType === 'image' ? onMouseMove : undefined}
            onMouseLeave={() => setZoomStyle(null)}
            className="w-full h-72 sm:h-96 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative"
          >
            {selectedMedia?.mediaType === 'image' ? (
              <img
                src={selectedMedia.url}
                alt={product.name}
                onError={onImageError}
                style={zoomStyle ?? undefined}
                className="w-full h-full object-contain transition-transform duration-200 ease-out will-change-transform"
              />
            ) : selectedMedia?.mediaType === 'video' ? (
              <video src={selectedMedia.url} controls preload="metadata" className="w-full h-full object-contain bg-black" />
            ) : (
              <ImageIcon className="w-16 h-16 text-slate-300" />
            )}
          </div>

          {/* Miniaturas */}
          {mediaList.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {mediaList.map((m, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSelectedMediaIndex(i);
                    setZoomStyle(null);
                  }}
                  className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                    i === selectedMediaIndex ? 'border-blue-500' : 'border-slate-200'
                  }`}
                  aria-label={`Ver medio ${i + 1}`}
                >
                  {m.mediaType === 'image' ? (
                    <img src={m.url} alt={`${product.name} - ${i + 1}`} onError={onThumbError} className="w-full h-full object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white text-xs font-bold">▶</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {product.brandName && (
              <span className="px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md uppercase tracking-wide">
                {product.brandName}
              </span>
            )}
            {product.categoryName && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-md">{product.categoryName}</span>
            )}
            {product.modelName && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-md">{product.modelName}</span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{product.name}</h1>

          <div className="mt-3 space-y-1 text-sm text-slate-500">
            {product.code && (
              <p>
                <span className="font-semibold text-slate-700">Código:</span> {product.code}
              </p>
            )}
            {product.barcode && (
              <p>
                <span className="font-semibold text-slate-700">Código de barras:</span> {product.barcode}
              </p>
            )}
          </div>

          {/* Disponibilidad */}
          <div className="mt-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 border ${
                (product.stock ?? 0) > 0
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-rose-700 bg-rose-50 border-rose-200'
              }`}
            >
              {(product.stock ?? 0) > 0
                ? (product.stock ?? 0) === 1
                  ? 'Queda 1 unidad'
                  : `Quedan ${product.stock} unidades`
                : 'Producto agotado'}
            </span>
          </div>

          {/* Precio */}
          <div className="mt-5">
            <span className="text-xs text-slate-400 block">Precio</span>
            <span className="text-3xl font-extrabold text-slate-900">{formatPrice(product.price)}</span>
          </div>

          {/* Descripción */}
          {product.description && (
            <p className="mt-5 text-sm text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
          )}

          {/* Acciones */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => cart.add(product, 1)}
              className="flex-1 px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
            >
              Comprar ahora
            </button>
            <button
              onClick={() => cart.add(product, 1)}
              className="flex-1 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl transition"
            >
              Consultar
            </button>
          </div>
        </div>
      </div>

      {/* Especificaciones técnicas */}
      {specEntries.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Especificaciones técnicas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5">
            {specEntries.map(([key, value]) => (
              <div key={key} className="flex items-start gap-2 text-sm">
                <span className="text-slate-600">
                  <span className="font-semibold text-slate-900">{key}:</span> {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
