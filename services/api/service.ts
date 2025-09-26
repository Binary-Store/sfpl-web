import axiosInstance from "../httpServices";


export const getServices = async () => {
    const url = `/services`;
    return axiosInstance({ method: 'GET', url });
};

export const getServiceById = async (id: string) => {
    const url = `/services/${id}`;
    return axiosInstance({ method: 'GET', url });
};

export const addToCart = async (data: { service_id: string; quantity: number }) => {
    const url = `/cart`;
    return axiosInstance({ method: 'POST', url, data });
};

export const getCartItems = async () => {
    const url = `/cart`;
    return axiosInstance({ method: 'GET', url });
};

export const removeFromCart = async (data: { service_id: string }) => {
    const url = `/cart`;
    return axiosInstance({ method: 'DELETE', url, data });
};