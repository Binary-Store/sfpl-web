'use client';
import { useState, useEffect } from 'react';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Truck,
  Eye,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { useListOrders } from '@/hooks/useOrder';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  const { data: ordersData, isLoading, error } = useListOrders();

  console.log(ordersData);

  useEffect(() => {
    // Use real data from API
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-transit':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'in-transit':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentStatusColor = (isPaid) => {
    return isPaid ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Past Orders</h1>
          <p className="text-gray-600">View and manage your fire safety equipment orders</p>
        </div>
      
      </div>

    

      {/* Orders List */}
      <div className="space-y-2">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.is_paid)}`}>
                    {order.is_paid ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Ordered on {new Date(order.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(order.total)}</p>
                  <p className="text-sm text-gray-600">{order.total_product_count} products</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.sub_total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">GST ({order.gst_percentage}%)</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.gst_amount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </button>
              {order.status === 'delivered' && (
                <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Track Package</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start by placing your first order for fire safety equipment'
            }
          </p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
