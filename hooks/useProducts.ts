import { getProductById, getProducts, addToCart, getCartItems, removeFromCart } from "@/services/api/products";
import { useQuery, useMutation } from "@tanstack/react-query";

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

export const useAddToCart = () => {
    const { mutate: addToCartMutation, isPending, error } = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {

            // toast.success('Product added to cart successfully!');
        },
        onError: () => {
            // toast.error('Failed to add product to cart');
        }
    });
    return { addToCartMutation, isLoading: isPending, error };
};

export const useGetCart = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCartItems,
        enabled: !!localStorage.getItem('token'),
    });
    return { data, isLoading, error };
};

export const useRemoveFromCart = () => {
    const { mutate: removeFromCartMutation, isPending, error } = useMutation({
        mutationFn: removeFromCart,
    });
    return { removeFromCartMutation, isLoading: isPending, error };
};