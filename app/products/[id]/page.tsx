'use client';

import { useParams } from 'next/navigation';
import { useProductById } from '@/hooks/useProducts';
import { serverDetails } from '@/config';
import { IndianRupee, Star, Shield, CheckCircle, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useContact } from '@/hooks/useContact';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: product, isLoading, error } = useProductById(id);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryFormData, setInquiryFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: ''
  });

  const { sendContactMutation, isLoading: isInquiryLoading, error: inquiryError } = useContact();

  const handleInquiryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInquiryFormData({
      ...inquiryFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    sendContactMutation({
      name: inquiryFormData.name,
      email: inquiryFormData.email,
      message: "inquiry for product " + product?.name,
      phone_number: inquiryFormData.phone_number
    }, {
      onSuccess: () => {
        // Reset form
        setInquiryFormData({
          name: '',
          email: '',
          phone_number: '',
          message: ''
        });
        // Close modal
        setIsInquiryModalOpen(false);
      }
    });
  };

  const openInquiryModal = () => {
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/products"
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              {product.photo_url ? (
                <img
                  src={`${serverDetails.socketPath}/files/${product.photo_url}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Shield className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Fire Safety Badge */}
            <div className="flex justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Fire Safety Certified
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <IndianRupee className="w-8 h-8 text-green-600" />
              <span className="text-4xl font-bold text-green-600">
                {product.price?.toLocaleString()}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${
                      star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-gray-600">(4.8/5)</span>
              <span className="text-gray-500">• 127 reviews</span>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Fire Resistant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Easy Installation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Low Maintenance</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={openInquiryModal}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Inquiry Now 
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-red-600 py-2 px-1 text-sm font-medium text-red-600">
                Specifications
              </button>
             
            </nav>
          </div>

          <div className="py-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium">Fire-resistant composite</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-medium">300 x 200 x 150 mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">2.5 kg</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Operating Temperature</span>
                    <span className="font-medium">-20°C to +60°C</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Power Supply</span>
                    <span className="font-medium">12V DC</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Certification</span>
                    <span className="font-medium">ISO 9001:2015</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Product Inquiry</h2>
              <button
                onClick={closeInquiryModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={inquiryFormData.name}
                  onChange={handleInquiryInputChange}
                  placeholder="Your Name" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  required 
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={inquiryFormData.email}
                  onChange={handleInquiryInputChange}
                  placeholder="you@email.com" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  required 
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone_number"
                  value={inquiryFormData.phone_number}
                  onChange={handleInquiryInputChange}
                  maxLength={10}
                  placeholder="Phone Number" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" 
                />
              </div>

              {/* <div>
                <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                <textarea 
                  name="message"
                  value={inquiryFormData.message}
                  onChange={handleInquiryInputChange}
                  placeholder="Tell us about your requirements..." 
                  rows={4} 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  required 
                />
              </div> */}

              {inquiryError && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                  Failed to send inquiry. Please try again.
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeInquiryModal}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isInquiryLoading}
                  className="flex-1 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400"
                >
                  {isInquiryLoading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
