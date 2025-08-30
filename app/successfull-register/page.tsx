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

  const handleContactSupport = () => {
    localStorage.removeItem('registrationTrue');
    router.push('/contact');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      

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
                Your account has been created successfully. You can now access our fire safety solutions .
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
                Login to Your Account
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">
                Need help? Contact our support team
              </p>
              <div className="flex justify-center space-x-4 text-xs">
                <Link href="/contact" onClick={handleContactSupport} className="text-red-600 hover:text-red-700 hover:underline">
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
