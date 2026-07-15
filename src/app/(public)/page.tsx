// src/app/page.tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Aquí renderizamos el Hero */}
      <Hero />
      
      {/* Aquí iremos agregando el resto de secciones (Galería, Beneficios, etc.) */}
    </main>
  );
}