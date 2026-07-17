'use client';

import { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
// import { AuthProvider } from './AuthProvider'; // <--- Mañana importas este aquí

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {/* <AuthProvider> */}
        {children}
      {/* </AuthProvider> */}
    </QueryProvider>
  );
}