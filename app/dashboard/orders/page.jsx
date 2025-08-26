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

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data - replace with actual API calls
    setOrders([
      {
        id: 'ORD-001',
        orderNumber: 'SFPL-2024-001',
        items: [
          { name: 'Fire Extinguisher - 5kg', quantity: 10, price: 2500 },
          { name: 'Smoke Detector - Wireless', quantity: 25, price: 1200 }
        ],
        total: 55000,
        status: 'delivered',
        orderDate: '2024-01-15',
        deliveryDate: '2024-01-20',
        paymentStatus: 'paid'
      },
      {
        id: 'ORD-002',
        orderNumber: 'SFPL-2024-002',
        items: [
          { name: 'Fire Alarm Control Panel', quantity: 1, price: 45000 },
          { name: 'Heat Detector - Fixed Temp', quantity: 15, price: 800 }
        ],
        total: 57000,
        status: 'in-transit',
        orderDate: '2024-01-18',
        deliveryDate: '2024-01-25',
        paymentStatus: 'paid'
      },
      {
        id: 'ORD-003',
        orderNumber: 'SFPL-2024-003',
        items: [
          { name: 'Fire Pump - 1000 GPM', quantity: 1, price: 125000 },
          { name: 'Installation Service', quantity: 1, price: 25000 }
        ],
        total: 150000,
        status: 'processing',
        orderDate: '2024-01-20',
        deliveryDate: '2024-02-05',
        paymentStatus: 'pending'
      },
      {
        id: 'ORD-004',
        orderNumber: 'SFPL-2024-004',
        items: [
          { name: 'Fire Sprinkler Heads', quantity: 50, price: 350 },
          { name: 'Pipe Fittings', quantity: 100, price: 150 }
        ],
        total: 32500,
        status: 'cancelled',
        orderDate: '2024-01-22',
        deliveryDate: '2024-01-30',
        paymentStatus: 'refunded'
      }
    ]);
  }, []);

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
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'refunded':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Package className="w-5 h-5" />
          <span>New Order</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by number or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="in-transit">In Transit</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Ordered on {order.orderDate} • Expected delivery {order.deliveryDate}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(order.total)}</p>
                  <p className="text-sm text-gray-600">{order.items.length} items</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600">{item.quantity}x</span>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-gray-600">{formatCurrency(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
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
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
