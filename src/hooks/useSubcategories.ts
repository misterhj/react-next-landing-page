import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subcategoryService, SubcategoryRequest } from '@/services/subcategoryService';

export const useSubcategories = (categoryId?: number) => {
    const queryClient = useQueryClient();

    // Query: Obtener subcategorías
    const subcategoriesQuery = useQuery({
        queryKey: ['subcategories', categoryId],
        queryFn: () => subcategoryService.getAll(categoryId),
    });

    // Mutation: Crear subcategoría
    const createSubcategoryMutation = useMutation({
        mutationFn: subcategoryService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subcategories'] });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    // Mutation: Actualizar subcategoría
    const updateSubcategoryMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: SubcategoryRequest }) =>
            subcategoryService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subcategories'] });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    // Mutation: Eliminar subcategoría
    const deleteSubcategoryMutation = useMutation({
        mutationFn: subcategoryService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subcategories'] });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    return {
        subcategories: subcategoriesQuery.data ?? [],
        isLoading: subcategoriesQuery.isLoading,
        isError: subcategoriesQuery.isError,
        error: subcategoriesQuery.error,

        createSubcategory: createSubcategoryMutation.mutateAsync,
        isCreating: createSubcategoryMutation.isPending,

        updateSubcategory: updateSubcategoryMutation.mutateAsync,
        isUpdating: updateSubcategoryMutation.isPending,

        deleteSubcategory: deleteSubcategoryMutation.mutateAsync,
        isDeleting: deleteSubcategoryMutation.isPending,
    };
};