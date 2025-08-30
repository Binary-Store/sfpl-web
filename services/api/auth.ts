import axiosInstance from "../httpServices";

export const login = async (data: {email: string, password: string}) => {
    const url = `/customers/auth/login`;
    return axiosInstance({ method: 'POST', url, data });
};

export const register = async (data: {name: string, email: string, password: string,phone_number:string , address:string , gender:string ,organization_name:string , gst_number?: string , pan_number?: string}) => {
    const url = `/customers/auth/register`;
    return axiosInstance({ method: 'POST', url, data });
};

export const verifyAccount = async (data: {token: string, otp: string}) => {
    const url = `/customers/auth/verify-account`;
    return axiosInstance({ method: 'POST', url, data });
};

export const forgotPassword = async (data: {email: string}) => {
    const url = `/customers/auth/forget-password`;
    return axiosInstance({ method: 'POST', url, data });
};

export const resetPassword = async (data: {token: string, new_password: string}) => {
    const url = `/customers/auth/reset-password`;
    return axiosInstance({ method: 'POST', url, data });
};