import axiosInstance from "../httpServices";


export const getProducts = async () => {
    const url = `/products`;
    return axiosInstance({ method: 'GET', url });
};

export const getProductById = async (id: string) => {
    const url = `/products/${id}`;
    return axiosInstance({ method: 'GET', url });
};

export const addToCart = async (data: { product_id: string; quantity: number }) => {
    const url = `/cart`;
    return axiosInstance({ method: 'POST', url, data });
};

export const getCartItems = async () => {
    const url = `/cart`;
    return axiosInstance({ method: 'GET', url });
};

export const removeFromCart = async (data: { product_id: string }) => {
    const url = `/cart`;
    return axiosInstance({ method: 'DELETE', url, data });
};