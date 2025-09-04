import axiosInstance from "../httpServices";

export const verifyOrder = async (data: { 
    order_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}) => {
    const url = `/orders/verify`;
    return axiosInstance({ method: 'POST', url, data });
};

export const createOrder = async (data: { order_id: string }) => {
    const url = `/orders`;
    return axiosInstance({ method: 'POST', url, data });
};

export const listOrders = async () => {
    const url = `/orders`;
    return axiosInstance({ method: 'GET', url });
};

export const getOrder = async (id: string) => {
    const url = `/orders/${id}`;
    return axiosInstance({ method: 'GET', url });
};