'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    categoryName?: string; // Opcional según tu backend
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    const fetchProducts = async () => {
        setLoading(true);
        setError('');
        const token = getCookie('admin-token');

        try {
            // endpoint público o privado según lo configuramos en SecurityConfig
            const response = await fetch('http://localhost:8080/api/v1/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo obtener el catálogo de productos');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8">
            {/* Header de la sección */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Catálogo de Productos</h1>
                    <p className="text-sm text-slate-400">Gestiona, añade o edita los cases disponibles en tu tienda</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-600/10">
                    <Plus size={16} />
                    Agregar Producto
                </button>
            </div>

            {/* Filtros y Buscador */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl max-w-md">
                <Search size={18} className="text-slate-500" />
                <input
                    type="text"
                    placeholder="Buscar producto por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
                />
            </div>

            {/* Contenedor de la Tabla */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                    <p className="text-sm text-slate-400">Cargando productos...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center max-w-xl mx-auto">
                    <p className="font-medium">Ha ocurrido un error</p>
                    <p className="text-sm text-slate-500 mt-1">{error}</p>
                    <button 
                        onClick={fetchProducts}
                        className="mt-3 text-xs bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">
                                    <th className="py-4 px-6">ID</th>
                                    <th className="py-4 px-6">Nombre del Producto</th>
                                    <th className="py-4 px-6">Precio</th>
                                    <th className="py-4 px-6">Stock</th>
                                    <th className="py-4 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-800/20 transition-colors text-slate-300">
                                            <td className="py-4 px-6 font-medium text-slate-500">#{product.id}</td>
                                            <td className="py-4 px-6 font-semibold text-white">{product.name}</td>
                                            <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    product.stock > 10 
                                                        ? 'bg-emerald-500/10 text-emerald-400' 
                                                        : product.stock > 0 
                                                        ? 'bg-amber-500/10 text-amber-400' 
                                                        : 'bg-red-500/10 text-red-400'
                                                }`}>
                                                    {product.stock} unidades
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-slate-500">
                                            No se encontraron productos en el catálogo.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}