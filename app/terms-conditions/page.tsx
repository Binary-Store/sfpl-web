'use client';

import { Shield, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-red-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our services.
              By accessing or using our website, you agree to be bound by these terms.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12">
            
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Last Updated: January 2024</span>
              </div>
            </div>

            {/* Terms Content */}
            <div className="space-y-8">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  1. Acceptance of Terms
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    By accessing and using the website of Specific Fire Protection Limited (SFPL), 
                    you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use the service.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  2. Use License
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Permission is granted to temporarily download one copy of the materials 
                    (information or software) on SFPL's website for personal, non-commercial 
                    transitory viewing only.
                  </p>
                  <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  3. Services and Products
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    SFPL provides fire safety equipment, installation services, maintenance, 
                    and consultation services. All products and services are subject to availability 
                    and may be modified or discontinued without notice.
                  </p>
                  <p>
                    We strive to provide accurate information about our products and services, 
                    but we do not warrant that product descriptions or other content is accurate, 
                    complete, reliable, current, or error-free.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  4. Privacy Policy
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, 
                    which also governs your use of the service, to understand our practices.
                  </p>
                  <p>
                    By using our service, you consent to the collection and use of information 
                    in accordance with our Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  5. Limitation of Liability
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    In no event shall SFPL or its suppliers be liable for any damages 
                    (including, without limitation, damages for loss of data or profit, 
                    or due to business interruption) arising out of the use or inability 
                    to use the materials on SFPL's website.
                  </p>
                  <p>
                    Even if SFPL or a SFPL authorized representative has been notified 
                    orally or in writing of the possibility of such damage.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  6. Contact Information
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">Specific Fire Protection Limited</p>
                    <p>Email: sales@specificfire.com</p>
                    <p>Phone: +91 9512570092</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Note */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <p className="text-gray-700">
                  <strong>Note:</strong> These terms are subject to change without notice. 
                  Please review this page periodically for updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
