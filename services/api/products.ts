import axiosInstance from "../httpServices";


export const getProducts = async () => {
    const url = `/products`;
    return axiosInstance({ method: 'GET', url });
};
