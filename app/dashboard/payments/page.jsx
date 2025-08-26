'use client';

import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Eye,
  Search,
  Filter,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data - replace with actual API calls
    setPayments([
      {
        id: 'PAY-001',
        transactionId: 'TXN-2024-001',
        orderNumber: 'SFPL-2024-001',
        amount: 55000,
        method: 'Bank Transfer',
        status: 'completed',
        date: '2024-01-15',
        description: 'Payment for Fire Extinguishers and Smoke Detectors',
        invoiceNumber: 'INV-2024-001'
      },
      {
        id: 'PAY-002',
        transactionId: 'TXN-2024-002',
        orderNumber: 'SFPL-2024-002',
        amount: 57000,
        method: 'Credit Card',
        status: 'completed',
        date: '2024-01-18',
        description: 'Payment for Fire Alarm Control Panel and Heat Detectors',
        invoiceNumber: 'INV-2024-002'
      },
      {
        id: 'PAY-003',
        transactionId: 'TXN-2024-003',
        orderNumber: 'SFPL-2024-003',
        amount: 150000,
        method: 'UPI',
        status: 'pending',
        date: '2024-01-20',
        description: 'Payment for Fire Pump and Installation Service',
        invoiceNumber: 'INV-2024-003'
      },
      {
        id: 'PAY-004',
        transactionId: 'TXN-2024-004',
        orderNumber: 'SFPL-2024-004',
        amount: 32500,
        method: 'Bank Transfer',
        status: 'refunded',
        date: '2024-01-22',
        description: 'Refund for Cancelled Order - Fire Sprinkler Heads',
        invoiceNumber: 'INV-2024-004'
      },
      {
        id: 'PAY-005',
        transactionId: 'TXN-2024-005',
        orderNumber: 'SFPL-2024-005',
        amount: 75000,
        method: 'Cheque',
        status: 'processing',
        date: '2024-01-25',
        description: 'Payment for Emergency Lighting System',
        invoiceNumber: 'INV-2024-005'
      }
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'refunded':
        return <TrendingDown className="w-5 h-5 text-blue-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'refunded':
        return 'text-blue-600 bg-blue-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'credit card':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'bank transfer':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'upi':
        return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'cheque':
        return <CreditCard className="w-4 h-4 text-orange-500" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTotalAmount = () => {
    return payments.reduce((total, payment) => {
      if (payment.status === 'completed') return total + payment.amount;
      if (payment.status === 'refunded') return total - payment.amount;
      return total;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-600">Track your payments and invoices for fire safety equipment</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <CreditCard className="w-5 h-5" />
          <span>Make Payment</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(getTotalAmount())}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
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
                placeholder="Search payments by transaction ID, order number, or description..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Payment Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{payment.transactionId}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{payment.description}</p>
                <p className="text-sm text-gray-500">
                  Order: {payment.orderNumber} • Invoice: {payment.invoiceNumber}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(payment.status)}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                  <p className="text-sm text-gray-600">{payment.date}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Payment Method:</span>
                  <div className="flex items-center space-x-1">
                    {getMethodIcon(payment.method)}
                    <span className="font-medium text-gray-900">{payment.method}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{payment.date}</span>
                </div>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                <span>Download Receipt</span>
              </button>
              {payment.status === 'pending' && (
                <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  <span>Complete Payment</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Your payment history will appear here once you make your first payment'
            }
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Make Payment
          </button>
        </div>
      )}
    </div>
  );
}
