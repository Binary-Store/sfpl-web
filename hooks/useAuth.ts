import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { register, verifyAccount, login } from '../services/api/auth';
import { RegisterFormData, VerifyAccountData, LoginFormData } from '../types/auth';

export const useAuth = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await register(data);
      return response;
    },
    onSuccess: (response: unknown) => {
      console.log(response);
      const data = response as { token?: string; message?: string };
      console.log(data);
      if (data?.token) {
        localStorage.setItem('token', data?.token);
        router.push('/verify?token=' + data?.token);
      } else if (data?.message) {
        console.log('Registration successful:', data?.message);
      } else {
        console.log('Registration successful, redirecting to verification');
      }
    },
    onError: (error: unknown) => {
      console.error('Registration failed:', error);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await login(data);
      return response;
    },
    onSuccess: (response: unknown) => {
      const data = response as { token?: string; message?: string };
      if (data?.token) {
        localStorage.setItem('token', data.token);
        console.log('Login successful, token stored');
        router.push('/'); // Redirect to home page after successful login
      } else if (data?.message) {
        console.log('Login successful:', data.message);
        router.push('/'); // Redirect to home page after successful login
      } else {
        console.log('Login successful, redirecting to home');
        router.push('/');
      }
    },
    onError: (error: unknown) => {
      console.error('Login failed:', error);
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
      router.push('/login');
      localStorage.removeItem('token');
    },
    onError: (error: unknown) => {
      console.error('Verification failed:', error);
    },
  });

  return {
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    verifyAccount: verifyAccountMutation.mutate,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isVerifying: verifyAccountMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
    verifyError: verifyAccountMutation.error,
  };
};
