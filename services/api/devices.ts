import axiosInstance from "../httpServices";

export const getDevices = async (data: {page: number, limit: number, search: string}) => {
    const url = `/customers/devices`;
    return axiosInstance({ method: 'GET', url, data });
};

export const getDeviceById = async (id: string) => {
    const url = `/customers/devices/${id}`;
    return axiosInstance({ method: 'GET', url });
};