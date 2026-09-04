// Ruta: src/components/catalog/CatalogFooter.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function CatalogFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-500 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-xs">
            CS
          </div>
          <span className="font-black text-slate-900">Cute Store</span>
          <span className="text-xs text-slate-400">© 2026 Todos los derechos reservados.</span>
        </div>

        <div className="flex gap-6 text-xs text-slate-500">
          <Link href="/condiciones-del-servicio" className="hover:text-slate-900 transition">
            Términos y Condiciones
          </Link>
          <Link href="/politica-de-privacidad" className="hover:text-slate-900 transition">
            Política de Privacidad
          </Link>
          <a href="#" className="hover:text-slate-900 transition">
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}