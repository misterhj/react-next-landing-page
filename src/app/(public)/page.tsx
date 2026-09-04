// Ruta: src/app/(public)/page.tsx
'use client';

import React from 'react';
import CatalogNavbar from '@/components/catalog/CatalogNavbar';
import CatalogProducts from '@/components/catalog/CatalogProducts';

export default function HomePage() {
  return (
    <>
      <CatalogNavbar />
      <main className="flex-1 pt-32 sm:pt-36 lg:pt-24">
        <CatalogProducts />
      </main>
    </>
  );
}
