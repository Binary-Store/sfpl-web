import axiosInstance from "../httpServices";

export const getDevices = async (data: {page: number, limit: number, search: string}) => {
    const url = `/devices`;
    return axiosInstance({ method: 'GET', url, data });
};

export const getDeviceById = async (id: string) => {
    const url = `/devices/${id}`;
    return axiosInstance({ method: 'GET', url });
};

export const listAllDevicesForMap = async () => {
    const url = `/devices/list-all-devices-for-map`;
    return axiosInstance({ method: 'GET', url });
};

export const updateAlternativeContacts = async (deviceId: string, alternativeContacts: any[]) => {
    const url = `/devices/${deviceId}/alternative-contacts`;
    return axiosInstance({ 
        method: 'PUT', 
        url, 
        data: { alternative_contacts: alternativeContacts } 
    });
};