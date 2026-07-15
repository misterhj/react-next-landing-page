'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Users, 
    Settings, 
    LogOut, 
    Menu, 
    X, 
    Bell, 
    Search 
} from 'lucide-react';

// IMPORTANTE: Importamos los estilos globales de Tailwind para esta sección
import '@/app/globals.css'; 

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Si estamos en el login, renderizamos una estructura HTML limpia pero con Tailwind
    if (pathname === '/admin/login') {
        return (
            <html lang="es" className="h-full bg-slate-950">
                <body className="h-full m-0">
                    {children}
                </body>
            </html>
        );
    }

    const handleLogout = () => {
        document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        router.push('/admin/login');
        router.refresh();
    };

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Productos', href: '/admin/products', icon: ShoppingBag },
        { name: 'Clientes', href: '/admin/customers', icon: Users },
        { name: 'Configuración', href: '/admin/settings', icon: Settings },
    ];

    return (
        <html lang="es" className="h-full">
            <body className="h-full bg-slate-950 text-slate-100 m-0">
                <div className="min-h-screen flex">
                    {/* --- SIDEBAR --- */}
                    <aside 
                        className={`bg-slate-900 border-r border-slate-800 w-64 flex flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:translate-x-0 md:static ${
                            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        {/* Header Sidebar (Logo) */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">
                                    C
                                </div>
                                <span className="font-bold text-lg tracking-wider text-white">CASE ZONE</span>
                            </div>
                            <button 
                                onClick={() => setIsSidebarOpen(false)} 
                                className="md:hidden text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Links del Menú */}
                        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                            isActive 
                                                ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' 
                                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                    >
                                        <Icon size={18} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer Sidebar (Logout) */}
                        <div className="p-4 border-t border-slate-800">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                            >
                                <LogOut size={18} />
                                Cerrar Sesión
                            </button>
                        </div>
                    </aside>

                    {/* --- CONTENIDO PRINCIPAL --- */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Header Superior */}
                        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                                    className="text-slate-400 hover:text-white"
                                >
                                    <Menu size={22} />
                                </button>
                                
                                {/* Buscador */}
                                <div className="hidden sm:flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg w-64 text-slate-500">
                                    <Search size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Buscar..." 
                                        className="bg-transparent border-none outline-none text-xs text-white placeholder-slate-500 w-full"
                                    />
                                </div>
                            </div>

                            {/* Acciones del Header */}
                            <div className="flex items-center gap-4">
                                <button className="relative text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800">
                                    <Bell size={20} />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                                </button>

                                {/* Perfil */}
                                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-white text-sm">
                                        AD
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="text-xs font-semibold text-white">Administrador</p>
                                        <p className="text-[10px] text-slate-400">admin@casezone.com</p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Contenedor de las vistas del panel */}
                        <main className="flex-1 overflow-y-auto bg-slate-950">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}