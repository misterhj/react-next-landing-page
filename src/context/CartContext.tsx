// Ruta: src/context/CartContext.tsx
'use client';

import { createContext, useContext, useMemo, useState, ReactNode, useEffect, useRef } from 'react';
import type { CatalogProduct } from '@/types/catalog';

export interface CartItem {
  product: CatalogProduct;
  quantity: number;
}

const STORAGE_KEY = 'casezone_cart';

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (product: CatalogProduct, quantity?: number) => void;
  remove: (productId: number | undefined) => void;
  setQuantity: (productId: number | undefined, quantity: number) => void;
  increment: (productId: number | undefined) => void;
  decrement: (productId: number | undefined) => void;
  quantityOf: (productId: number | undefined) => number;
  clear: () => void;
  open: () => void;
  close: () => void;
  buildMessage: () => string;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed.filter((i) => i?.product && i.quantity > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hydratedRef.current) return;
    setItems(loadFromStorage());
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hydratedRef.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const add = (product: CatalogProduct, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { product, quantity }];
      });
      setIsOpen(true);
    };

    const remove = (productId: number | undefined) => {
      if (productId == null) return;
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    };

    const setQuantity = (productId: number | undefined, quantity: number) => {
      if (productId == null) return;
      if (quantity <= 0) {
        remove(productId);
        return;
      }
      setItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)));
    };

    const clear = () => setItems([]);

    const quantityOf = (productId: number | undefined) => {
      if (productId == null) return 0;
      return items.find((i) => i.product.id === productId)?.quantity ?? 0;
    };

    const increment = (productId: number | undefined) => setQuantity(productId, quantityOf(productId) + 1);
    const decrement = (productId: number | undefined) => setQuantity(productId, quantityOf(productId) - 1);

    const buildMessage = () => {
      const lines = items.map(
        (i) => `• ${i.product.name} x${i.quantity} — Gs. ${(i.product.price * i.quantity).toLocaleString('es-PY')}`
      );
      const totalLine = `TOTAL: Gs. ${total.toLocaleString('es-PY')}`;
      return `Hola! Quiero consultar por estos productos:\n\n${lines.join('\n')}\n\n${totalLine}`;
    };

    return { items, count, total, isOpen, add, remove, setQuantity, increment, decrement, quantityOf, clear, open: () => setIsOpen(true), close: () => setIsOpen(false), buildMessage };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
