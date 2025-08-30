import axiosInstance from "../httpServices";


export const getProducts = async () => {
    const url = `/products`;
    return axiosInstance({ method: 'GET', url });
};

export const getProductById = async (id: string) => {
    const url = `/products/${id}`;
    return axiosInstance({ method: 'GET', url });
};