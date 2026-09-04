import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import AppProviders from '@/app/providers'; // O '@/providers' según donde lo moviste[cite: 2]

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cute Store',
  description: 'Cute Store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full`} suppressHydrationWarning>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}