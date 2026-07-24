import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Product } from '@/types';

export const useProducts = () => {
  	const queryClient = useQueryClient();

  	// 1. Query: Obtener todos los productos
	const productsQuery = useQuery({
		queryKey: ['products'],
		queryFn: productService.getAll,
		staleTime: 1000 * 60 * 5, // Considerar los datos "frescos" por 5 minutos
	});

	// 2. Mutation: Crear un producto
	const createMutation = useMutation({
		mutationFn: productService.create,
		onSuccess: () => {
		// Le decimos a TanStack Query que la lista de productos cambió
		queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});

	// 3. Mutation: Actualizar un producto
	const updateMutation = useMutation({
		mutationFn: ({ id, product }: { id: number; product: Product }) => 
		productService.update(id, product),
		onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});

	// 4. Mutation: Eliminar un producto
	const deleteMutation = useMutation({
		mutationFn: productService.delete,
		onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});

	return {
		// Datos y estados de carga de la lista
		products: productsQuery.data ?? [],
		isLoading: productsQuery.isLoading,
		isError: productsQuery.isError,
		error: productsQuery.error,

		// Métodos para mutaciones
		createProduct: createMutation.mutateAsync,
		isCreating: createMutation.isPending,

		updateProduct: updateMutation.mutateAsync,
		isUpdating: updateMutation.isPending,

		deleteProduct: deleteMutation.mutateAsync,
		isDeleting: deleteMutation.isPending,
	};
};