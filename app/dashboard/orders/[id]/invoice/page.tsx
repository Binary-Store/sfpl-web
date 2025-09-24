"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download, AlertTriangle } from "lucide-react";
import InvoicePDF from "@/components/invoice/InvoicePDF";
import { useGetOrder } from "@/hooks/useOrder";
import { useInvoice } from "@/hooks/useInvoice";

export default function OrderInvoicePreviewPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [isClient, setIsClient] = useState(false);
  const { data: order, isLoading, error } = useGetOrder(orderId);
  const { generateInvoice, isGenerating } = useInvoice();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-top-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoice preview...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Invoice Not Available
            </h2>
            <p className="text-gray-600 mb-8">
              We couldn't load the invoice for this order.
            </p>
            <Link
              href={`/dashboard/orders/${orderId}`}
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Order
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/orders/${orderId}`}
          className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Order
        </Link>

        <button
          onClick={() => generateInvoice(order)}
          disabled={isGenerating}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {isClient && (
          <PDFViewer style={{ width: "100%", height: "80vh" }} showToolbar>
            {/* @ts-ignore - InvoicePDF is a valid React-PDF document */}
            <InvoicePDF order={order} />
          </PDFViewer>
        )}
      </div>
    </div>
  );
}
