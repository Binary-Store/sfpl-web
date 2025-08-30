import { getProducts } from "@/services/api/products";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),
    });

    return { data, isLoading, error };
};