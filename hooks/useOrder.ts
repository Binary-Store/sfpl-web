import { useMutation } from "@tanstack/react-query";
import { verifyOrder , createOrder } from "@/services/api/order";

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