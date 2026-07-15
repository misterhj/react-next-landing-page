import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtenemos el token de las cookies
  const token = request.cookies.get('admin-token')?.value;
  const { pathname } = request.nextUrl;

  // Si intenta acceder a rutas de administración y no tiene token
  if (pathname.startsWith('/admin') && !pathname.includes('/admin/login')) {
    if (!token) {
      // Redirigir al login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si ya tiene token e intenta ir al login, lo mandamos al dashboard
  if (pathname === '/admin/login' && token) {
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Indicamos qué rutas debe interceptar este middleware
export const config = {
  matcher: ['/admin/:path*'],
};