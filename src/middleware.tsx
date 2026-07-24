// Ruta: src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	// Obtenemos el token de las cookies
	const token = request.cookies.get('admin-token')?.value;
	const { pathname } = request.nextUrl;

	// Definimos las rutas públicas del panel que no requieren estar autenticado
	const isPublicAdminRoute = pathname === '/admin/login' || pathname === '/admin/register';

	// Si intenta acceder a rutas de administración que NO son públicas y NO tiene token
	if (pathname.startsWith('/admin') && !isPublicAdminRoute) {
		if (!token) {
			// Redirigir al login
			const loginUrl = new URL('/admin/login', request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	// Si ya tiene token e intenta ir al login o al registro, lo mandamos al dashboard
	if (isPublicAdminRoute && token) {
		const dashboardUrl = new URL('/admin/dashboard', request.url);
		return NextResponse.redirect(dashboardUrl);
	}

	return NextResponse.next();
}

// Indicamos qué rutas debe interceptar este middleware
export const config = {
	matcher: ['/admin/:path*'],
};