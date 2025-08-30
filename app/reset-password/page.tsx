'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Shield, Zap, Wrench, Building2, CheckCircle, Lock, Key, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Forgot Password schema
const forgotPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

function ResetPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { resetPassword, isResettingPassword, resetPasswordError } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      router.push('/request-forgot-password');
    }
  }, [token, router]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (!token) {
      return;
    }

    try {
      await resetPassword({
        token: token,
        new_password: data.newPassword
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
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
              Password Updated!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Redirecting to login page in 3 seconds...
            </p>
            <Link href="/login">
              <Button className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Sign In Now
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
                <Key className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-sm text-gray-600">
                Enter your new password below
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    {...register('newPassword')}
                    type="password"
                    className="h-12 pl-10 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter new password"
                  />
                </div>
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600">{String(errors.newPassword.message)}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    {...register('confirmPassword')}
                    type="password"
                    className="h-12 pl-10 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    placeholder="Confirm new password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{String(errors.confirmPassword.message)}</p>
                )}
              </div>

              {/* Error Display */}
              {Boolean(resetPasswordError) && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                  Failed to update password. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isResettingPassword}
                  className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isResettingPassword ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    'Update Password'
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
