import { getProductById, getProducts } from "@/services/api/products";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),
    });

    return { data, isLoading, error };
};

export const useProductById = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
    });

    return { data, isLoading, error };
};