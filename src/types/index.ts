// Define el rol del usuario (coincide con tu Enum de Java: Role.java)
export type Role = 'ADMIN' | 'USER';

// Interfaz para el usuario que inicia sesión
export interface User {
  id?: number;
  username: string;
  email: string;
  role: Role;
}

// Interfaz para las categorías (Category.java)
export interface Category {
  id: number;
  name: string;
  slug: string;
}

// Interfaz para los productos (Product.java)
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  // Almacenamos specifications como string o parseado como objeto de clave-valor
  specifications: string; 
  category?: Category;
  categoryId?: number; // Útil para cuando enviamos formularios de creación
}