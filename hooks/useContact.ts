// mutation for the 
import { sendContact } from "@/services/api/contact";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useContact = (callbacks?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
    const { mutate: sendContactMutation, isPending, error } = useMutation({
        mutationFn: sendContact,
        onSuccess: () => {
            console.log("Contact form submitted successfully");
            toast.success("submitted successfully");
            // Call custom success callback if provided
            callbacks?.onSuccess?.();
        },
        onError: () => {
            console.log("Failed to submit contact form");
            toast.error("Failed to submit contact form");
            // Call custom error callback if provided
            callbacks?.onError?.();
        }
    });
    return { sendContactMutation, isLoading: isPending, error };
};