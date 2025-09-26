import { getServiceById, getServices, addToCart, getCartItems, removeFromCart } from "@/services/api/service";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useServices = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['services'],
        queryFn: () => getServices(),
    }) as any;

    return { data, isLoading, error };
};

export const useServiceById = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['service', id],
        queryFn: () => getServiceById(id),
    }) as any;

    return { data, isLoading, error };
};

export const useAddToCart = () => {
    const { mutate: addToCartMutation, isPending, error } = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {

            // toast.success('Service added to cart successfully!');
        },
        onError: () => {
            // toast.error('Failed to add service to cart');
        }
    });
    return { addToCartMutation, isLoading: isPending, error };
};

export const useGetCart = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCartItems,
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
    }) as any;
    return { data, isLoading, error };
};

export const useRemoveFromCart = () => {
    const { mutate: removeFromCartMutation, isPending, error } = useMutation({
        mutationFn: removeFromCart,
    });
    return { removeFromCartMutation, isLoading: isPending, error };
};