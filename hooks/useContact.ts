// mutation for the 
import { sendContact } from "@/services/api/contact";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useContact = () => {
    const { mutate: sendContactMutation, isPending, error } = useMutation({
        mutationFn: sendContact,
        onSuccess: () => {
            console.log("Contact form submitted successfully");
            toast.success("Contact form submitted successfully");
        },
        onError: () => {
            console.log("Failed to submit contact form");
            toast.error("Failed to submit contact form");
        }
    });
    return { sendContactMutation, isLoading: isPending, error };
};