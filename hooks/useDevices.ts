// get all devices getDevices from api
import { getDeviceById, getDevices } from "@/services/api/devices";
import { useQuery } from "@tanstack/react-query";

export const useDevices = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['devices'],
        queryFn: () => getDevices({ page: 1, limit: 100, search: '' }),
    });

    return { data, isLoading, error };
};

export const useDeviceById = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['device', id],
        queryFn: () => getDeviceById(id),
    });

    return { data, isLoading, error };
};