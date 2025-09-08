import axiosInstance from "../httpServices";

export interface ProfileData {
    name: string;
    phone_number: string;
    address: string | null;
    organization_name: string | null;
    gst_number: string | null;
    pan_number: string | null;
}

export const getProfile = async () => {
    const url = `/profile`;
    return axiosInstance({ method: 'GET', url });
};

export const updateProfile = async (data: ProfileData) => {
    const url = `/profile`;
    return axiosInstance({ method: 'PUT', url, data });
};