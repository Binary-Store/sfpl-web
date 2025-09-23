// get all projects getDevices from api
import { getDeviceById, getDevices, listAllDevicesForMap } from "@/services/api/devices";
import { useQuery } from "@tanstack/react-query";

export const useDevices = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['projects'],
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

export const useGetAllDeviceForMonitoring = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['listAllDevicesForMap'],
        queryFn: () => listAllDevicesForMap(),
    });

    return { data, isLoading, error };
};