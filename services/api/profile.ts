import axiosInstance from "../httpServices";

export interface ProfileData {
    name: string;
    phone_number: string;
    email: string;
    address: string;
    organization_name: string;
    gst_number: string;
}

export const getProfile = async () => {
    const url = `/customers/profile`;
    return axiosInstance({ method: 'GET', url });
};

export const updateProfile = async (data: ProfileData) => {
    const url = `/customers/profile`;
    return axiosInstance({ method: 'PUT', url, data });
};