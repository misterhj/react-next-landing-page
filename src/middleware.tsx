// Ruta: src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	// Obtenemos el token de las cookies
	const token = request.cookies.get('admin-token')?.value;
	const { pathname } = request.nextUrl;

	// Si intenta acceder a rutas de administración y NO tiene token
	if (pathname.startsWith('/admin')) {
		if (!token) {
			// Redirigir al login público
			const loginUrl = new URL('/login', request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

// Indicamos qué rutas debe interceptar este middleware
export const config = {
	matcher: ['/admin/:path*'],
};