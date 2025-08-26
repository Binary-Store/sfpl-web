'use client';

import { useEffect, useState, Suspense } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/button';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { OTPInput } from '../../components/ui/otp-input';

function VerifyPageContent() {
  const [otp, setOtp] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { verifyAccount, isVerifying, verifyError } = useAuth();

  useEffect(() => {
    if (token) {
      toast.error('No registration token found. Please register again.');

    }
    if(!token) {
      window.location.href = '/register';
    }

  }, [token]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token && otp) {
      verifyAccount({ token, otp });
    } else if (!otp) {
      toast.error('Please enter the OTP code.');
    } 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the OTP sent to your email
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-gray-100 rounded-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-4">
                Enter the 6-digit OTP code
              </label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                length={6}
                className="mt-2"
              />
            </div>

             {verifyError && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                Verification failed. Please try again.
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={isVerifying || !otp}
                className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                {isVerifying ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Account'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  );
}
