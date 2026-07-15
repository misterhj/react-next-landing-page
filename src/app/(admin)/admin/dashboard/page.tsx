'use client';

import React from 'react';
import { ShoppingBag, Users, Layers, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Título de bienvenida */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard General</h1>
        <p className="text-sm text-slate-400">Resumen y estado actual de tu tienda</p>
      </div>

      {/* Grid de Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Cases Activos</p>
            <p className="text-3xl font-semibold mt-2 text-white">24</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Categorías</p>
            <p className="text-3xl font-semibold mt-2 text-white">3</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Layers size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Clientes</p>
            <p className="text-3xl font-semibold mt-2 text-white">142</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Consultas Web</p>
            <p className="text-3xl font-semibold mt-2 text-white">18</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Aquí podremos agregar gráficos u otra información visual */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl h-64 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Sección para gráficos de visitas y ventas próximamente...</p>
      </div>
    </div>
  );
}