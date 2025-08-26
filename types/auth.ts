import { z } from 'zod';

// Zod schema for registration
export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender',
  }),
  organization_name: z.string().min(1, 'Organization ID is required'),
  gst_number: z.string().optional(),
  pan_number: z.string().optional(),
}).refine((data) => {
  // Either GST number or PAN number must be provided
  return data.gst_number || data.pan_number;
}, {
  message: "Either GST number or PAN number is required",
  path: ["gst_number"], // This will show the error on the GST field
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
