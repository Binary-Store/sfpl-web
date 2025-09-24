"use client";
import { useState, useEffect } from "react";
import {
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Truck,
  Download,
  Search,
  Filter,
} from "lucide-react";
import { useListOrders } from "@/hooks/useOrder";
import { useInvoice } from "@/hooks/useInvoice";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();

  const { data: ordersData, isLoading, error } = useListOrders();
  const { generateInvoice, isGenerating } = useInvoice();

  console.log(ordersData);

  useEffect(() => {
    // Use real data from API
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-transit":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "cancelled":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50";
      case "in-transit":
        return "text-blue-600 bg-blue-50";
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleGenerateInvoice = async (order) => {
    try {
      await generateInvoice(order);
    } catch (error) {
      console.error("Failed to generate invoice:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Past Orders</h1>
          <p className="text-gray-600">
            View and manage your fire safety equipment orders
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-2">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:bg-gray-50 cursor-pointer transition-colors"
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/dashboard/orders/${order.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/dashboard/orders/${order.id}`);
              }
            }}
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.serial || `Order #${order.id.slice(-8)}`}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Ordered on{" "}
                  {new Date(order.created_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(order.total / 100)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.total_product_count} products
                  </p>
                </div>
              </div>
            </div>

            {/* Card is clickable; actions removed */}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Start by placing your first order for fire safety equipment"}
          </p>
        </div>
      )}
    </div>
  );
}
