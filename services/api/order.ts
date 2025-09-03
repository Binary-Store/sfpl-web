import axiosInstance from "../httpServices";

export const verifyOrder = async (data: { order_id: string }) => {
    const url = `/orders/verify`;
    return axiosInstance({ method: 'POST', url, data });
};

export const createOrder = async (data: { order_id: string }) => {
    const url = `/orders`;
    return axiosInstance({ method: 'POST', url, data });
};