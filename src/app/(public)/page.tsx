// Ruta: src/app/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    // 🟢 Cambiado a fondo claro para que resalte la cabecera oscura
    <div className="min-h-screen bg-neutral-50">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <main>
        <ProductGrid 
          searchTerm={searchTerm} 
          selectedCategory={selectedCategory} 
        />
      </main>
    </div>
  );
}