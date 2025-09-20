"use client";

import React from "react";
import { ArrowLeft, Clock, Shield, RefreshCw, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ReturnRefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-lg text-gray-600">
            Our commitment to your satisfaction with our fire safety products
            and services.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Overview Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Our Return & Refund Guarantee
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Specific Fire Protection Limited, we stand behind the quality
              of our fire safety products and services. We understand that fire
              safety is critical, and we want to ensure you have complete
              confidence in your purchase.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  30-Day Return
                </h3>
                <p className="text-sm text-gray-600">
                  Return eligible products within 30 days of purchase
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <RefreshCw className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Easy Process
                </h3>
                <p className="text-sm text-gray-600">
                  Simple return process with our customer support team
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quality Assured
                </h3>
                <p className="text-sm text-gray-600">
                  All products tested and certified for fire safety standards
                </p>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Return Policy
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Eligibility for Returns
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Products must be returned within 30 days of purchase</li>
                  <li>
                    Items must be in original condition with all packaging and
                    documentation
                  </li>
                  <li>Products must not be damaged, used, or modified</li>
                  <li>
                    Custom or specially ordered items may not be eligible for
                    return
                  </li>
                  <li>
                    Installation services are non-refundable once work has begun
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Return Process
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>
                    Contact our customer service team to initiate a return
                  </li>
                  <li>Provide your order number and reason for return</li>
                  <li>
                    Receive return authorization and shipping instructions
                  </li>
                  <li>Package the item securely with original packaging</li>
                  <li>Ship the item back using the provided return label</li>
                  <li>Receive confirmation once your return is processed</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Return Shipping
                </h3>
                <p className="text-gray-600 mb-3">
                  Return shipping costs are the responsibility of the customer,
                  unless the return is due to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Defective or damaged products upon arrival</li>
                  <li>Incorrect product shipped by our error</li>
                  <li>Products that do not meet specifications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Refund Policy
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Refund Processing
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>
                    Refunds will be processed within 5-7 business days after
                    receiving the returned item
                  </li>
                  <li>
                    Refunds will be issued to the original payment method used
                    for purchase
                  </li>
                  <li>
                    Bank transfers may take additional 3-5 business days to
                    reflect in your account
                  </li>
                  <li>
                    Partial refunds may apply for items returned in less than
                    original condition
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Refund Amounts
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <strong>Full Refund:</strong> Items returned in original
                      condition within 30 days
                    </li>
                    <li>
                      <strong>Partial Refund:</strong> Items with minor wear or
                      missing accessories
                    </li>
                    <li>
                      <strong>No Refund:</strong> Items damaged by customer
                      misuse or beyond return period
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Exceptions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Exceptions & Special Cases
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Fire Safety Equipment
                </h3>
                <p className="text-gray-600">
                  Due to safety regulations, certain fire safety equipment may
                  have restricted return policies. Please contact us for
                  specific information about your product.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Installation Services
                </h3>
                <p className="text-gray-600">
                  Installation services are non-refundable once work has
                  commenced. However, we guarantee our workmanship and will
                  address any issues at no additional cost.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Custom Orders
                </h3>
                <p className="text-gray-600">
                  Custom or specially manufactured items may not be eligible for
                  return unless there is a manufacturing defect.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-red-50 rounded-lg border border-red-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Need Help with Returns or Refunds?
            </h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to help you with any questions
              about returns or refunds. We're committed to resolving any issues
              quickly and fairly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Phone Support</p>
                  <a
                    href="tel:+919512570090"
                    className="text-gray-600 hover:text-red-600"
                  >
                    +91 9512570090
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <a
                    href="mailto:contact@specificfire.com"
                    className="text-gray-600 hover:text-red-600"
                  >
                    contact@specificfire.com
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 6:00
                PM (IST)
                <br />
                <strong>Response Time:</strong> We typically respond to return
                requests within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
