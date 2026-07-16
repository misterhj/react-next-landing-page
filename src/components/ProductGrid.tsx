'use client';

import { useProducts } from '@/hooks/useProducts';

export function ProductGrid() {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <p>Cargando los cases más facheros...</p>;
  if (isError) return <p>Hubo un error al cargar el catálogo.</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
          <h3 className="font-bold mt-2">{product.name}</h3>
          <p className="text-green-600 font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}