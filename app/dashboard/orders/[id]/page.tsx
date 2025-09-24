"use client";

import { useGetOrder } from "@/hooks/useOrder";
import { useInvoice } from "@/hooks/useInvoice";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Truck,
  Download,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface OrderProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images?: {
    url: string;
  }[];
}

interface Order {
  id: string;
  customer_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
  sub_total: number;
  gst_percentage: number;
  gst_amount: number;
  total: number;
  is_paid: boolean;
  total_product_count: string;
  products?: OrderProduct[];
  serial: string;
  order_status_logs?: {
    id: string;
    status: string;
    remark?: string | null;
    created_at: string;
  }[];
}

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [isClient, setIsClient] = useState(false);

  const { data: order, isLoading, error } = useGetOrder(orderId);
  const { generateInvoice, isGenerating } = useInvoice();

  const typedOrder = order as Order | undefined;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "installed":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "shipped":
        return <Truck className="w-6 h-6 text-blue-500" />;
      case "in-transit":
        return <Truck className="w-6 h-6 text-blue-500" />;
      case "processing":
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case "cancelled":
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case "pending":
        return <Clock className="w-6 h-6 text-yellow-500" />;
      default:
        return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "installed":
        return "text-green-600 bg-green-50 border-green-200";
      case "shipped":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "in-transit":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "processing":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleGenerateInvoice = async () => {
    if (!typedOrder) return;

    try {
      await generateInvoice(typedOrder);
    } catch (error) {
      console.error("Failed to generate invoice:", error);
    }
  };

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !typedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The order you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-2">
      {/* Header */}
      <div className="mb-4">
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600 mt-2">
              Order #{typedOrder?.serial || "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                typedOrder?.status
              )}`}
            >
              {getStatusIcon(typedOrder?.status)}
              <span className="ml-2 capitalize">{typedOrder?.status}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-2">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Items
              </h2>
            </div>
            <div className="p-4">
              {typedOrder?.products && typedOrder?.products.length > 0 ? (
                <div className="space-y-2">
                  {typedOrder?.products.map(
                    (product: OrderProduct, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          {product.images?.length &&
                          product.images.length > 0 ? (
                            <img
                              src={product.images[0].url}
                              alt={product.name || "Product"}
                              className="w-full h-20 object-cover rounded-xl"
                            />
                          ) : (
                            <Package className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                Quantity:
                              </span>
                              <span className="font-semibold text-gray-900">
                                {product.quantity}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-green-600">
                                {formatCurrency(
                                  (product.price * product.quantity) / 100
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    No products found in this order
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Timeline
              </h2>
            </div>
            <div className="p-4">
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200"></div>
                <div className="space-y-4">
                  {/* Always show order placed */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Placed</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(typedOrder?.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic logs */}
                  {typedOrder?.order_status_logs
                    ?.slice()
                    .sort(
                      (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    )
                    .map((log) => {
                      const status = log.status?.toLowerCase();
                      const isProcessing = status === "processing";
                      const isShipped =
                        status === "shipped" || status === "in-transit";
                      const isDelivered = status === "delivered";
                      const isInstalled = status === "installed";
                      return (
                        <div key={log.id} className="relative pl-10">
                          <div
                            className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                              isProcessing
                                ? "bg-yellow-100"
                                : isShipped
                                ? "bg-blue-100"
                                : isDelivered || isInstalled
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {isProcessing && (
                              <Clock className="w-3 h-3 text-yellow-600" />
                            )}
                            {isShipped && (
                              <Truck className="w-3 h-3 text-blue-600" />
                            )}
                            {(isDelivered || isInstalled) && (
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            )}
                            {!isProcessing &&
                              !isShipped &&
                              !isDelivered &&
                              !isInstalled && (
                                <Package className="w-3 h-3 text-gray-600" />
                              )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {status}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(log.created_at)}
                            </p>
                            {log.remark ? (
                              <p className="text-sm text-gray-700">
                                {log.remark}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total</span>
                <span>{formatCurrency(typedOrder?.sub_total / 100)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST ({typedOrder?.gst_percentage}%)</span>
                <span>{formatCurrency(typedOrder?.gst_amount / 100)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(typedOrder?.total / 100)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Order Date</p>
                  <p className="text-gray-600">
                    {formatDate(typedOrder?.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleGenerateInvoice}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isGenerating ? "Generating..." : "Download Invoice"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
