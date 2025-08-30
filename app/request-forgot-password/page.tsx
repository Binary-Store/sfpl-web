'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Shield, Zap, Wrench, Building2, CheckCircle, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Forgot Password schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function RequestForgotPasswordPage() {
  const { forgotPassword, isForgotPassword, forgotPasswordError } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword({
        email: data.email,
        callback_url: 'https://sfpl-web-sage.vercel.app/reset-password'
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-2xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Email Sent!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
            </p>
            <Link href="/login">
              <Button className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
     

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Branding for small screens */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-red-600 mr-3" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">SFPL</h1>
            <p className="text-sm text-gray-600">Specific Fire Protection Limited</p>
          </div>
          
          <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h2>
              <p className="text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    {...register('email')}
                    type="email"
                    className="h-12 pl-10 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{String(errors.email.message)}</p>
                )}
              </div>

              {/* Error Display */}
              {forgotPasswordError && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                  Failed to send reset email. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isForgotPassword}
                  className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isForgotPassword ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending Email...</span>
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </div>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link 
                  href="/login" 
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-700 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
