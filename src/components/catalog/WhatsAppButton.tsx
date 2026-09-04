// Ruta: src/components/catalog/WhatsAppButton.tsx
'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5491100000000';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 w-13 h-13 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-500 hover:scale-105 transition"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}