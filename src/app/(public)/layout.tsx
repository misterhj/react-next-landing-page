// Ruta: src/app/(public)/layout.tsx
import type { Metadata } from 'next';
import { CatalogFilterProvider } from '@/context/CatalogFilterContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/catalog/CartDrawer';
import CatalogFooter from '@/components/catalog/CatalogFooter';
import WhatsAppButton from '@/components/catalog/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Cute Store',
  description: 'Cute Store',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col bg-white text-slate-900 font-sans antialiased">
      <CartProvider>
        <CatalogFilterProvider>
          {children}
          <CatalogFooter />
          <WhatsAppButton />
          <CartDrawer />
        </CatalogFilterProvider>
      </CartProvider>
    </div>
  );
}
