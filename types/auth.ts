import { z } from 'zod';

// Zod schema for registration
export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
  phone_number: z.string()
    .min(1, 'Phone number is required')
    .length(10, 'Phone number must be exactly 10 digits')
    .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
});

// TypeScript types
export type RegisterFormData = z.infer<typeof registerSchema>;

export type LoginFormData = {
  email: string;
  password: string;
};

export type VerifyAccountData = {
  token: string;
  otp: string;
};

export type AuthResponse = {
  token: string;
  message?: string;
};

export type ForgotPasswordData = {
  email: string;
};