// src/components/Hero.tsx
import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Textos y CTA */}
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <span className="inline-block self-center lg:self-start bg-black text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              Nueva Colección 2026
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Viste tu teléfono con estilo, <br />
              <span className="text-blue-600">protégelo de todo.</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0">
              Cases de alta resistencia con diseños exclusivos que se adaptan a tu personalidad. 
              Disponibles ahora para iPhone y Samsung con envío a domicilio.
            </p>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Ver Diseños Disponibles
              </button>
              <button className="border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium px-8 py-4 rounded-xl transition-all">
                Conocer Materiales
              </button>
            </div>
          </div>

          {/* Imagen Destacada / Render */}
          <div className="relative flex justify-center items-center">
            {/* Círculo decorativo de fondo */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
            
            {/* Simulación del Case del Celular */}
            <div className="relative z-10 w-64 h-[500px] md:w-72 bg-neutral-950 rounded-[40px] shadow-2xl border-4 border-neutral-800 flex items-center justify-center p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer">
              <div className="text-center text-white px-4">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Diseño Premium</p>
                <p className="font-bold text-lg">Mármol Neon</p>
                <div className="mt-8 text-neutral-500 text-sm">[ Espacio para Foto de Case ]</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}