// Ruta: src/components/catalog/CartDrawer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

export default function CartDrawer() {
  const cart = useCart();

  if (!cart.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Fondo */}
      <div className="absolute inset-0 bg-black/40" onClick={cart.close} />

      {/* Panel lateral */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Cabecera */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">
            Tu consulta <span className="text-slate-400 font-medium">({cart.count} items)</span>
          </h2>
          <button onClick={cart.close} className="text-slate-400 hover:text-slate-900 transition" title="Cerrar">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-slate-500">Tu lista de consulta está vacía.</p>
            <Link
              href="/"
              onClick={cart.close}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Explorar el catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {cart.items.map((item) => (
                <li key={item.product.id} className="flex gap-3 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => cart.decrement?.(item.product.id)}
                        className="p-1 rounded border border-slate-200 hover:bg-slate-100 transition"
                        disabled={!cart.decrement}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-slate-900 w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => cart.increment?.(item.product.id)}
                        className="p-1 rounded border border-slate-200 hover:bg-slate-100 transition"
                        disabled={!cart.increment}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => cart.remove(item.product.id)}
                        className="ml-auto p-1.5 text-slate-400 hover:text-red-500 transition"
                        title="Quitar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total + envío por WhatsApp */}
            <div className="border-t border-slate-200 px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Total</span>
                <span className="text-lg font-extrabold text-slate-900">{formatPrice(cart.total)}</span>
              </div>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(cart.buildMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-3 rounded-xl transition"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
