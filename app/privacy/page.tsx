'use client';

import { Shield, Lock, Eye, Database, Users, Bell } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 text-red-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We respect your privacy and are committed to protecting your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12">
            
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Last Updated: January 2024</span>
              </div>
            </div>

            {/* Privacy Content */}
            <div className="space-y-8">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="h-6 w-6 text-blue-600 mr-3" />
                  1. Information We Collect
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Create an account or register for our services</li>
                    <li>Contact us for support or inquiries</li>
                    <li>Subscribe to our newsletters or updates</li>
                    <li>Purchase our products or services</li>
                  </ul>
                  <p>
                    This may include your name, email address, phone number, company information, 
                    and other contact details.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="h-6 w-6 text-blue-600 mr-3" />
                  2. How We Use Your Information
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Communicate with you about products, services, and events</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  3. Information Sharing
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information 
                    to third parties without your consent, except as described in this policy.
                  </p>
                  <p>
                    We may share your information with trusted third parties who assist us 
                    in operating our website, conducting our business, or servicing you, 
                    as long as those parties agree to keep this information confidential.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  4. Data Security
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    We implement appropriate security measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p>
                    However, no method of transmission over the internet or electronic storage 
                    is 100% secure, so we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="h-6 w-6 text-blue-600 mr-3" />
                  5. Your Rights
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request information about how we process your data</li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="h-6 w-6 text-blue-600 mr-3" />
                  6. Contact Us
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us:
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
                <Shield className="h-5 w-5 text-gray-600" />
                <p className="text-gray-700">
                  <strong>Note:</strong> This privacy policy may be updated from time to time. 
                  We will notify you of any changes by posting the new policy on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
