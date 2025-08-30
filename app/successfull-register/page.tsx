'use client';

import { Button } from '../../components/ui/button';
import { CheckCircle, Shield, Home, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessfulRegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const registrationTrue = localStorage.getItem('registrationTrue');
    if (!registrationTrue) {
      router.push('/');
    }
  }, []);

  const handleGoToHome = () => {
    localStorage.removeItem('registrationTrue');
    router.push('/');
  };

  const handleGoToLogin = () => {
    localStorage.removeItem('registrationTrue');
    router.push('/login');
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
            <Link href="/" className='cursor-pointer'>
              <Image src="/logo-full-black.svg" alt="SFPL" width={200} height={200} className="mx-auto" />  
            </Link>
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
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Certified Equipment</h3>
                <p className="text-xs text-gray-600">ISO certified products with global standards</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">24/7 Support</h3>
                <p className="text-xs text-gray-600">Round-the-clock emergency assistance</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Complete Services</h3>
                <p className="text-xs text-gray-600">Installation, maintenance & system upgrades</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-4 text-xs text-gray-500 relative z-10">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>1000+ Happy Clients</span>
            </div>
          </div>
        </div>
      </div>

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
          
          <div className="bg-white p-8 shadow-xl border border-gray-100 rounded-2xl text-center">
            {/* Success Icon and Message */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Account Created Successfully!
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Welcome to SFPL! 🎉
              </p>
              <p className="text-sm text-gray-500">
                Your account has been created successfully. You can now access our comprehensive fire safety solutions and professional protection services.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleGoToHome}
                className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Go to Home
              </Button>
              
              <Button
                onClick={handleGoToLogin}
                variant="outline"
                className="w-full h-14 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-red-500 hover:text-red-600 font-semibold rounded-xl transition-all duration-200 text-lg"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In to Your Account
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">
                Need help? Contact our support team
              </p>
              <div className="flex justify-center space-x-4 text-xs">
                <Link href="/contact" className="text-red-600 hover:text-red-700 hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
