"use client";

import React from "react";
import {
  ArrowLeft,
  Truck,
  Package,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function OrderShippingPage() {
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
            Order & Shipping Information
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about placing orders and shipping for
            our fire safety products.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Order Process Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                How to Place an Order
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ordering fire safety products from Specific Fire Protection
              Limited is simple and secure. Follow these steps to place your
              order with confidence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Browse Products
                </h3>
                <p className="text-sm text-gray-600">
                  Explore our comprehensive range of fire safety products
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Add to Cart
                </h3>
                <p className="text-sm text-gray-600">
                  Select products and quantities, add to your cart
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Checkout</h3>
                <p className="text-sm text-gray-600">
                  Review order details and proceed to secure checkout
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Confirmation
                </h3>
                <p className="text-sm text-gray-600">
                  Receive order confirmation and tracking details
                </p>
              </div>
            </div>
          </div>

          {/* Order Processing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Order Processing Timeline
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Order Confirmation (Immediate)
                  </h3>
                  <p className="text-gray-600">
                    You'll receive an email confirmation immediately after
                    placing your order with order details and estimated delivery
                    timeline.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Order Processing (1-2 Business Days)
                  </h3>
                  <p className="text-gray-600">
                    Our team reviews your order, checks inventory, and prepares
                    your items for shipping. Custom orders may require
                    additional processing time.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Package className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Packaging & Dispatch (1 Business Day)
                  </h3>
                  <p className="text-gray-600">
                    Your order is carefully packaged with proper fire safety
                    equipment handling protocols and dispatched from our
                    warehouse.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Truck className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Shipping & Delivery (2-7 Business Days)
                  </h3>
                  <p className="text-gray-600">
                    Your order is shipped via our trusted logistics partners and
                    delivered to your specified address.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Truck className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Shipping Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Shipping Zones & Delivery Times
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">
                      Metro Cities
                    </span>
                    <span className="text-gray-600">2-3 business days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">
                      Tier 2 Cities
                    </span>
                    <span className="text-gray-600">3-5 business days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">
                      Other Locations
                    </span>
                    <span className="text-gray-600">5-7 business days</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Shipping Methods
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Standard Shipping
                    </h4>
                    <p className="text-sm text-gray-600">
                      Free shipping on orders above ₹5,000
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Express Shipping
                    </h4>
                    <p className="text-sm text-gray-600">
                      Available for urgent orders (additional charges apply)
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">
                      White Glove Delivery
                    </h4>
                    <p className="text-sm text-gray-600">
                      Professional installation and setup service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Costs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Shipping Costs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Order Value
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Shipping Cost
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Delivery Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-gray-600">Below ₹5,000</td>
                    <td className="py-3 px-4 text-gray-600">₹200</td>
                    <td className="py-3 px-4 text-gray-600">
                      2-7 business days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600">
                      ₹5,000 - ₹25,000
                    </td>
                    <td className="py-3 px-4 text-gray-600">Free</td>
                    <td className="py-3 px-4 text-gray-600">
                      2-5 business days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600">Above ₹25,000</td>
                    <td className="py-3 px-4 text-gray-600">Free + Express</td>
                    <td className="py-3 px-4 text-gray-600">
                      1-3 business days
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Special Handling */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Special Handling & Requirements
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Fire Safety Equipment
                </h3>
                <p className="text-gray-600 mb-3">
                  All fire safety equipment is handled with special care and
                  follows strict safety protocols during packaging and shipping.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>
                    Certified packaging materials for fire safety products
                  </li>
                  <li>Temperature-controlled storage when required</li>
                  <li>Special handling for pressurized equipment</li>
                  <li>
                    Compliance with fire safety regulations during transport
                  </li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Installation Services
                </h3>
                <p className="text-gray-600 mb-3">
                  For products requiring professional installation, we
                  coordinate delivery with our certified technicians.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Pre-delivery site inspection</li>
                  <li>Scheduled delivery and installation</li>
                  <li>Post-installation testing and certification</li>
                  <li>Training for equipment operation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Track Your Order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  How to Track
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Check your email for tracking number after dispatch</li>
                  <li>
                    Use the tracking number on our website or carrier's site
                  </li>
                  <li>Contact our customer service for real-time updates</li>
                  <li>Receive SMS notifications for delivery status</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Delivery Updates
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Order dispatched</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">In transit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-600">Out for delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-8 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Important Shipping Notes
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • Please ensure someone is available to receive the delivery
                    during business hours
                  </li>
                  <li>
                    • Fire safety equipment requires proper handling - please
                    inspect packages upon delivery
                  </li>
                  <li>
                    • Damaged packages must be reported within 24 hours of
                    delivery
                  </li>
                  <li>
                    • Installation services are scheduled separately after
                    product delivery
                  </li>
                  <li>
                    • Some locations may have restricted delivery due to fire
                    safety regulations
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-red-50 rounded-lg border border-red-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Need Help with Your Order?
            </h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is available to help you with any
              questions about your order, shipping, or delivery. We're committed
              to ensuring your fire safety needs are met promptly and
              professionally.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Order Support</p>
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
                <strong>Order Processing:</strong> Orders placed before 2:00 PM
                are processed the same day
                <br />
                <strong>Emergency Orders:</strong> Available for urgent fire
                safety requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
