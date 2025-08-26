'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Shield, Zap, Wrench, Building2, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const { register: registerUser, isRegistering, registerError } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchedGst = watch('gst_number');
  const watchedPan = watch('pan_number');

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Enhanced Aesthetic Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50">
        <div className="flex flex-col justify-center items-center p-8 w-full relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-green-500 to-teal-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center mb-8">
            <Image src="/logo-full-black.svg" alt="SFPL" width={200} height={200} />  
         
            {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">SFPL</h1> */}
            {/* <h2 className="text-lg font-semibold text-gray-700 mb-2">Specific Fire Protection Limited</h2> */}
            <p className="text-gray-600 text-base font-medium mt-6">Your Safety, Our Priority</p>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="space-y-4 max-w-sm relative z-10">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Professional Protection</h3>
                <p className="text-xs text-gray-600">Expert fire safety solutions tailored for your needs</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Certified Equipment</h3>
                <p className="text-xs text-gray-600">ISO certified products with global standards</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">24/7 Support</h3>
                <p className="text-xs text-gray-600">Round-the-clock emergency assistance</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wrench className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Complete Services</h3>
                <p className="text-xs text-gray-600">Installation, maintenance & system upgrades</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex items-center space-x-4 text-xs text-gray-500 relative z-10">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>1000+ Happy Clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form with 2 Columns */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Mobile Branding for small screens */}
          <div className="lg:hidden text-center mb-6">
            
            <p className="text-sm text-gray-600">Specific Fire Protection Limited</p>
          </div>
          
         

          <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-2xl">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      {...register('name')}
                      type="text"
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.name.message) || 'Name is required'}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      {...register('email')}
                      type="email"
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.email.message) || 'Email is required'}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      {...register('phone_number')}
                      type="tel"
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter your phone number"
                    />
                    {errors.phone_number && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.phone_number.message) || 'Phone number is required'}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender *
                    </label>
                    <Select
                      {...register('gender')}
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    {errors.gender && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.gender.message) || 'Gender is required'}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gst_number" className="block text-sm font-semibold text-gray-700 mb-2">
                      GST Number {!watchedPan && '*'}
                    </label>
                    <Input
                      {...register('gst_number')}
                      type="text"
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter GST number"
                    />
                    {errors.gst_number && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.gst_number.message) || 'Either GST or PAN number is required'}</p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password *
                    </label>
                    <Input
                      {...register('password')}
                      type="password"
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.password.message) || 'Password is required'}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="organization_name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <Input
                      {...register('organization_name')}
                      type="text"
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter organization name"
                    />
                    {errors.organization_name && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.organization_name.message) || 'Organization name is required'}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pan_number" className="block text-sm font-semibold text-gray-700 mb-2">
                      PAN Number {!watchedGst && '*'}
                    </label>
                    <Input
                      {...register('pan_number')}
                      type="text"
                      className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter PAN number"
                    />
                    {errors.pan_number && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.pan_number.message) || 'Either GST or PAN number is required'}</p>
                    )}
                  </div>

                  <div className="md:row-span-2">
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <Textarea
                      {...register('address')}
                      rows={4}
                      className="border-gray-200 focus:border-red-500 focus:ring-red-500 resize-none"
                      placeholder="Enter your complete address"
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600">{String(errors.address.message) || 'Address is required'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {registerError && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                  Registration failed. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isRegistering ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
              {/* login */}
              <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-red-600 hover:text-red-700 font-semibold hover:underline">
                  Login here
                </Link>
              </p>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{' '}
                <a href="/terms-conditions" className="text-red-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}