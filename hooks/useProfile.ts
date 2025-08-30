import { getProfile, updateProfile } from "@/services/api/profile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
        },
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

