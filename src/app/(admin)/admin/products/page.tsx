// Ruta: src/app/(admin)/admin/products/page.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2, X } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories'; // Asumiendo que usas tu hook de categorías

export default function ProductsPage() {
	// Hook de TanStack Query para productos
	const { products, isLoading, isError, error, createProduct, isCreating, deleteProduct } = useProducts();
	
	// Hook o llamado para categorías
	const { categories } = useCategories(); 

	const [searchTerm, setSearchTerm] = useState('');

	// Estados para el Modal de Agregar Producto
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newName, setNewName] = useState('');
	const [newPrice, setNewPrice] = useState('');
	const [newStock, setNewStock] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('');
	const [formError, setFormError] = useState('');

	const handleCreateProduct = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError('');

		if (parseFloat(newPrice) <= 0 || parseInt(newStock) < 0) {
			setFormError('Por favor introduce valores de precio y stock coherentes.');
			return;
		}

		if (!selectedCategoryId) {
			setFormError('Por favor selecciona una categoría para el producto.');
			return;
		}

		try {
			// Usamos la mutación de TanStack Query
			await createProduct({
				name: newName,
				price: parseFloat(newPrice),
				stock: parseInt(newStock),
				description: '', // Campos opcionales según tus tipos
				imageUrl: '',
				specifications: '',
				categoryId: parseInt(selectedCategoryId),
			});

			setIsModalOpen(false);
			setNewName('');
			setNewPrice('');
			setNewStock('');
			setSelectedCategoryId('');
		} catch (err: any) {
			setFormError(err.message || 'Error de conexión al crear el producto');
		}
	};

	const handleDeleteProduct = async (id: number) => {
		if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
			try {
				await deleteProduct(id);
			} catch (err: any) {
				alert('No se pudo eliminar el producto');
			}
		}
	};

	const filteredProducts = products.filter((product) =>
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
				<button 
					onClick={() => setIsModalOpen(true)}
					className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-600/10"
				>
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
			{isLoading ? (
				<div className="flex flex-col items-center justify-center py-20 gap-3">
					<Loader2 className="animate-spin text-emerald-500" size={32} />
					<p className="text-sm text-slate-400">Cargando productos desde la API...</p>
				</div>
			) : isError ? (
				<div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center max-w-xl mx-auto">
					<p className="font-medium">Ha ocurrido un error</p>
					<p className="text-sm text-slate-500 mt-1">{(error as Error)?.message || 'Error al conectar'}</p>
				</div>
			) : (
				<div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">
									<th className="py-4 px-6">ID</th>
									<th className="py-4 px-6">Nombre del Producto</th>
									<th className="py-4 px-6">Categoría</th>
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
											<td className="py-4 px-6">
												<span className="text-slate-400 font-medium">
													{product.category?.name || 'Sin Categoría'}
												</span>
											</td>
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
													<button 
														onClick={() => product.id && handleDeleteProduct(product.id)}
														className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
													>
														<Trash2 size={16} />
													</button>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={6} className="py-12 text-center text-slate-500">
											No se encontraron productos en el catálogo.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* --- MODAL PARA AGREGAR PRODUCTO --- */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
					<div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
						<div className="flex items-center justify-between p-6 border-b border-slate-800">
							<h3 className="text-lg font-bold text-white">Nuevo Producto</h3>
							<button 
								onClick={() => setIsModalOpen(false)}
								className="text-slate-400 hover:text-white transition-colors"
							>
								<X size={20} />
							</button>
						</div>

						<form onSubmit={handleCreateProduct} className="p-6 space-y-4">
							{formError && (
								<div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
									{formError}
								</div>
							)}

							<div>
								<label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nombre del Case</label>
								<input 
									type="text" 
									required
									value={newName}
									onChange={(e) => setNewName(e.target.value)}
									placeholder="Ej: Case iPhone 15 Pro Max Silicona"
									className="mt-2 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
								/>
							</div>

							<div>
								<label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Categoría</label>
								<select
									required
									value={selectedCategoryId}
									onChange={(e) => setSelectedCategoryId(e.target.value)}
									className="mt-2 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
								>
									<option value="" disabled className="bg-slate-950 text-slate-500">Seleccionar categoría...</option>
									{categories.map((cat: any) => (
										<option key={cat.id} value={cat.id} className="bg-slate-950 text-white">
											{cat.name}
										</option>
									))}
								</select>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Precio ($)</label>
									<input 
										type="number" 
										step="0.01"
										required
										value={newPrice}
										onChange={(e) => setNewPrice(e.target.value)}
										placeholder="19.99"
										className="mt-2 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
									/>
								</div>
								<div>
									<label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Stock Inicial</label>
									<input 
										type="number" 
										required
										value={newStock}
										onChange={(e) => setNewStock(e.target.value)}
										placeholder="50"
										className="mt-2 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
								<button 
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 px-4 rounded-lg text-sm transition-colors"
								>
									Cancelar
								</button>
								<button 
									type="submit"
									disabled={isCreating}
									className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors disabled:bg-emerald-800"
								>
									{isCreating ? (
										<>
											<Loader2 className="animate-spin" size={14} />
											Guardando...
										</>
									) : (
										'Guardar Producto'
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}