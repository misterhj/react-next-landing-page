// Ruta: src/lib/format.ts
// Utilidades de formato compartidas
export function formatPrice(value: number): string {
  return `Gs. ${value.toLocaleString('es-PY', { maximumFractionDigits: 0 })}`;
}
