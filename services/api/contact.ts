import axiosInstance from "../httpServices";

export const sendContact = async (data: {name: string, email: string, message: string , phone_number: string}) => {
    const url = `/inquiries`;
    return axiosInstance({ method: 'POST', url, data });
};