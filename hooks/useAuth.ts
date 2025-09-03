import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { register, verifyAccount, login, forgotPassword, resetPassword } from '../services/api/auth';
import { RegisterFormData, VerifyAccountData, LoginFormData, ForgotPasswordData } from '../types/auth';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await register(data);
      return response;
    },
    onSuccess: (response: unknown) => {
      const data = response as { token?: string; message?: string };
      if (data?.token) {
        localStorage.setItem('token', data?.token);
        localStorage.setItem('registrationTrue' , 'true');
        router.push('/verify?token=' + data?.token);
      } else if (data?.message) {
        console.log('Registration successful:', data?.message);
      } else {
        console.log('Registration successful, redirecting to verification');
      }
    },
    onError: (error: unknown) => {
      toast.error((error as Error).message);
      console.error('Registration failed:', (error as Error).message);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await login(data);
      return response;
    },
    onSuccess: (response: unknown) => {
      const data = response as { token?: string; message?: string; customer?:any };
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.customer));
        
        router.push('/dashboard'); // Redirect to home page after successful login
      } else if (data?.message) {
        router.push('/dashboard'); // Redirect to home page after successful login
      } else {
        router.push('/dashboard'); // Redirect to home page after successful login
      }
    },
    onError: (error: unknown) => {
      console.error('Login failed:', (error as Error).message);
      toast.error((error as Error).message);
    },
  });

  const verifyAccountMutation = useMutation({
    mutationFn: async (data: VerifyAccountData) => {
      const response = await verifyAccount(data);
      return response;
    },
    onSuccess: (response: unknown) => {
      const data = response as { token?: string; message?: string };
      if (data?.token) {
        localStorage.setItem('token', data?.token);
      }
      if (data?.message) {
        console.log('Verification successful:', data?.message);
      }
      router.push('/successfull-register');
      localStorage.removeItem('token');
    },
    onError: (error: unknown) => {
      toast.error((error as Error).message);
      console.error('Verification failed:', (error as Error).message);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await forgotPassword(data);
      return response;
    },
    onSuccess: (response: unknown) => {
      toast.success('Password reset email sent successfully!');
      console.log('Forgot password email sent:', response);
    },
    onError: (error: unknown) => {
      toast.error((error as Error).message);
      console.error('Forgot password failed:', (error as Error).message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string; new_password: string }) => {
      const response = await resetPassword(data);
      return response;
    },
    onSuccess: (response: unknown) => {
      toast.success('Password updated successfully!');
      console.log('Password reset successful:', response);
    },
    onError: (error: unknown) => {
      toast.error((error as Error).message);
      console.error('Password reset failed:', (error as Error).message);
    },
  });

  return {
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    verifyAccount: verifyAccountMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isVerifying: verifyAccountMutation.isPending,
    isForgotPassword: forgotPasswordMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
    verifyError: verifyAccountMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,
    resetPasswordError: resetPasswordMutation.error,
  };
};
