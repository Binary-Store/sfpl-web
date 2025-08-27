import { z } from 'zod';

// Zod schema for registration
export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
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
