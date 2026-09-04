// Ruta: src/app/(public)/producto/[slug]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CatalogNavbar from '@/components/catalog/CatalogNavbar';
import ProductDetail from '@/components/catalog/ProductDetail';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';

  return (
    <>
      <CatalogNavbar />
      <main className="flex-1 pt-32 sm:pt-36 lg:pt-24">
        <ProductDetail slug={slug} />
      </main>
    </>
  );
}
