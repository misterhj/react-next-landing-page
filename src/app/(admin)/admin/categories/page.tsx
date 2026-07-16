'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2, X } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Estados para el Modal (Crear / Editar)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('Nueva Categoría');
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [categoryName, setCategoryName] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    const fetchCategories = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/v1/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo cargar la lista de categorías');
            }

            const data = await response.json();
            setCategories(data);
        } catch (err: any) {
            setError(err.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setModalTitle('Nueva Categoría');
        setEditingCategoryId(null);
        setCategoryName('');
        setFormError('');
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setModalTitle('Editar Categoría');
        setEditingCategoryId(category.id);
        setCategoryName(category.name);
        setFormError('');
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);
        const token = getCookie('admin-token');

        if (!categoryName.trim()) {
            setFormError('El nombre de la categoría no puede estar vacío.');
            setFormLoading(false);
            return;
        }

        const url = editingCategoryId 
            ? `http://localhost:8080/api/v1/categories/${editingCategoryId}`
            : 'http://localhost:8080/api/v1/categories';

        const method = editingCategoryId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: categoryName })
            });

            if (!response.ok) {
                throw new Error('Error al intentar guardar la categoría');
            }

            await fetchCategories();
            setIsModalOpen(false);
            setCategoryName('');
        } catch (err: any) {
            setFormError(err.message || 'Error de conexión con el servidor');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta categoría? Si tiene productos asociados, podría causar errores.')) {
            return;
        }

        const token = getCookie('admin-token');

        try {
            const response = await fetch(`http://localhost:8080/api/v1/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar la categoría. Asegúrate de que no tenga productos vinculados.');
            }

            await fetchCategories();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Categorías</h1>
                    <p className="text-sm text-slate-400">Organiza tus cases de celular por modelos o tipos</p>
                </div>
                <button 
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-600/10"
                >
                    <Plus size={16} />
                    Agregar Categoría
                </button>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl max-w-md">
                <Search size={18} className="text-slate-500" />
                <input
                    type="text"
                    placeholder="Buscar categoría..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
                />
            </div>

            {/* Tabla */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                    <p className="text-sm text-slate-400">Cargando categorías...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center max-w-xl mx-auto">
                    <p className="font-medium">Ha ocurrido un error</p>
                    <p className="text-sm text-slate-500 mt-1">{error}</p>
                    <button 
                        onClick={fetchCategories}
                        className="mt-3 text-xs bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden max-w-3xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">
                                    <th className="py-4 px-6 w-24">ID</th>
                                    <th className="py-4 px-6">Nombre de la Categoría</th>
                                    <th className="py-4 px-6 text-right w-32">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category) => (
                                        <tr key={category.id} className="hover:bg-slate-800/20 transition-colors text-slate-300">
                                            <td className="py-4 px-6 font-medium text-slate-500">#{category.id}</td>
                                            <td className="py-4 px-6 font-semibold text-white">{category.name}</td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => openEditModal(category)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteCategory(category.id)}
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
                                        <td colSpan={3} className="py-12 text-center text-slate-500">
                                            No se encontraron categorías.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- MODAL PARA AGREGAR/EDITAR CATEGORÍA --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
                        {/* Cabecera */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h3 className="text-lg font-bold text-white">{modalTitle}</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {formError && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
                                    {formError}
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nombre</label>
                                <input 
                                    type="text" 
                                    required
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Ej: iPhone, Samsung, Silicona..."
                                    className="mt-2 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                                />
                            </div>

                            {/* Acciones */}
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
                                    disabled={formLoading}
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors disabled:bg-emerald-800"
                                >
                                    {formLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={14} />
                                            Guardando...
                                        </>
                                    ) : (
                                        'Guardar'
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