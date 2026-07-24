// Ruta: src/components/Navbar.tsx
'use client';

import React from 'react';
import { Search, SlidersHorizontal, Smartphone, Laptop, Sparkles } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
}

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: NavbarProps) {
  
  const categories = [
    { id: null, name: 'Todos', icon: Sparkles },
    { id: 1, name: 'Phones Cases', icon: Smartphone },
    { id: 2, name: 'Clear Glass', icon: Sparkles },
    { id: 3, name: 'Minimal Cases', icon: Laptop },
  ];

  return (
    // 🟢 Cabecera oscura fija que contrasta con el fondo claro del sitio
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-neutral-950/95 backdrop-blur-md transition-all shadow-lg">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 font-black text-white shadow-lg shadow-blue-500/20">
              CZ
            </div>
            <span className="text-xl font-black uppercase tracking-wider text-white hidden sm:block">
              Case<span className="text-blue-500">Zone</span>
            </span>
          </div>

          {/* Buscador */}
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-neutral-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar case para tu modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Categorías */}
          <div className="hidden md:flex items-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id ?? 'all'}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    isSelected
                      ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <Icon size={14} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-2">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-white transition-all">
              <SlidersHorizontal size={18} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}