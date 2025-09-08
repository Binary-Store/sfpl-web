import { useMutation } from "@tanstack/react-query";
import { verifyOrder , createOrder , listOrders, getOrder } from "@/services/api/order";
import { useQuery } from "@tanstack/react-query";

export const useVerifyOrder = () => {
    const { mutate: verifyOrderMutation, isPending, error } = useMutation({
        mutationFn: verifyOrder,
    });
    return { verifyOrderMutation, isLoading: isPending, error };
}

export const useCreateOrder = () => {
    const { mutate: createOrderMutation, isPending, error } = useMutation({
        mutationFn: createOrder,
    });
    return { createOrderMutation, isLoading: isPending, error };
}

export const useListOrders = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: listOrders,
    });
    return { data, isLoading, error };
}

export const useGetOrder = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['orders', id],
        queryFn: () => getOrder(id),
    });
    return { data, isLoading, error };
    }