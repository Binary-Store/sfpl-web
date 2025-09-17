"use client";

import { useProfile } from "@/hooks/useProfile";
import { useGetCart } from "@/hooks/useProducts";
import { useCreateOrder, useVerifyOrder } from "@/hooks/useOrder";
import { ArrowLeft, CreditCard, Edit3, User, Phone, MapPin, Building, FileText, Hash } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function CheckoutPage() {
  const { data: profile, isLoading: profileLoading, updateProfile, isUpdating } = useProfile();
  const { data: cartItems, isLoading: cartLoading } = useGetCart();
  const [isEditing, setIsEditing] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { createOrderMutation, isLoading: isCreatingOrder } = useCreateOrder();
  const { verifyOrderMutation } = useVerifyOrder();

  // Form state for editing profile
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address: "",
    organization_name: "",
    gst_number: "",
    pan_number: "",
  });

  // Set client state to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        organization_name: profile.organization_name || "",
        gst_number: profile.gst_number || "",
        pan_number: profile.pan_number || "",
      });
    }
  }, [profile]);

  // Load Razorpay script
  useEffect(() => {
    if (isClient) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
        toast.success("Profile updated successfully");
      },
    });
  };

  const handleCancelEdit = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        organization_name: profile.organization_name || "",
        gst_number: profile.gst_number || "",
        pan_number: profile.pan_number || "",
      });
    }
    setIsEditing(false);
  };

  const handleProceedToPayment = () => {
    setIsCheckoutLoading(true);

    try {
      const orderData = promoCode ? { promo_code: promoCode } : {};
      createOrderMutation(orderData as { order_id: string }, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (response: any) => {
          const orderId = response.id;

          if (!orderId) {
            toast.error("Failed to create order");
            setIsCheckoutLoading(false);
            return;
          }
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY",
            amount: calculateTotal() * 100, // Convert to paise
            currency: "INR",
            name: "SFPL Fire Safety",
            description: "Fire Safety Products",
            order_id: orderId,
            handler: function (response: RazorpayResponse) {
              verifyOrderMutation(
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  onSuccess: () => {
                    toast.success("Payment successful! Order verified.");
                    queryClient.invalidateQueries({ queryKey: ["cart"] });
                    router.push("/dashboard/orders");
                  },
                  onError: () => {
                    toast.error("Payment verification failed");
                  },
                }
              );
            },
            prefill: {
              name: profile?.name || "Customer Name",
              email: "customer@example.com",
              contact: profile?.phone_number || "9999999999",
            },
            theme: {
              color: "#DC2626", // Red color matching your theme
            },
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const razorpay = new (window as any).Razorpay(options);
          razorpay.open();
          setIsCheckoutLoading(false);
        },
        onError: (error: { message: string }) => {
          toast.error(error.message);
          setIsCheckoutLoading(false);
        },
      });
    } catch {
      toast.error("Checkout failed");
      setIsCheckoutLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Show loading state only on client side to prevent hydration mismatch
  if (!isClient || profileLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h2>
          <p className="text-gray-600 mb-8">Please complete your profile to proceed with checkout.</p>
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Review your details and complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors">
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profile.name || "Not provided"}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profile.phone_number || "Not provided"}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profile.address || "Not provided"}</p>
                  )}
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="h-4 w-4 inline mr-2" />
                    Organization Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="organization_name"
                      value={formData.organization_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Enter your organization name"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profile.organization_name || "Not provided"}</p>
                  )}
                </div>

                {/* GST Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4 inline mr-2" />
                    GST Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gst_number"
                      value={formData.gst_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Enter your GST number"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profile.gst_number || "Not provided"}</p>
                  )}
                </div>

                {/* PAN Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Hash className="h-4 w-4 inline mr-2" />
                    PAN Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="pan_number"
                      value={formData.pan_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Enter your PAN number"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profile.pan_number || "Not provided"}</p>
                  )}
                </div>

                {/* Edit Actions */}
                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isUpdating}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems?.length || 0} items)</span>
                  <span>₹{calculateTotal() / 100}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{calculateTotal() / 100}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code (Optional)</label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Enter promo code"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleProceedToPayment}
                  disabled={isCheckoutLoading || isCreatingOrder}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isCheckoutLoading || isCreatingOrder ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Proceed to Payment
                    </>
                  )}
                </button>

                <Link
                  href="/cart"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors text-center block">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
