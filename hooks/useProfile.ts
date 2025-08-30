import { getProfile, updateProfile } from "@/services/api/profile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useProfile = () => {
    const queryClient = useQueryClient();
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile(),
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile updated successfully');
        },
        onError: () => {
            toast.error(error?.message || 'Failed to update profile');
        }
    });

    return { 
        data, 
        isLoading, 
        error, 
        updateProfile: updateProfileMutation.mutate,
        isUpdating: updateProfileMutation.isPending,
        updateError: updateProfileMutation.error
    };
};

