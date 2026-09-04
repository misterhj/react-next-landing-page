// Define el rol del usuario (coincide con tu Enum de Java: Role.java)
export type Role = 'ADMIN' | 'USER';

// Interfaz para el usuario que inicia sesión
export interface User {
    id?: number;
    username: string;
    email: string;
    role: Role;
}

// Interfaz para las Subcategorías (Subcategory.java)
export interface Subcategory {
    id: number;
    name: string;
    slug: string;
    category?: Category;
    categoryId?: number;
}

// Interfaz para las Categorías (Category.java)
export interface Category {
    id: number;
    name: string;
    slug: string;
    subcategories?: Subcategory[];
}

// Interfaz para los productos (Product.java)
export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    specifications: string; 
    category?: Category | null;
    categoryId?: number | null;
    subcategory?: Subcategory | null;
    subcategoryId?: number | null;
}

// DTOs para Auth
export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    identityDocument?: string;
    phoneNumber?: string;
}

export interface AuthResponse {
    token: string;
    message?: string;
}
