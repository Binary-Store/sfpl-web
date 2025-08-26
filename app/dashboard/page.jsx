'use client';

import { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Package, 
  CreditCard, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import socket from '@/lib/socket';
import { toast } from 'react-hot-toast';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalDevices: 0,
    activeDevices: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalPayments: 0,
    recentActivity: []
  });

  useEffect(() => {
    socket.on("connect", () => {
      toast.success("Connected to server");
    });

    socket.on("disconnect", () => {
      toast.error("Disconnected from server");
    });

    socket.on("error", (error) => {
      toast.error(error.message);
    });
  }, []);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalDevices: 12,
      activeDevices: 10,
      totalOrders: 8,
      pendingOrders: 2,
      totalPayments: 6,
      recentActivity: [
        { id: 1, type: 'device', action: 'Fire alarm system installed', time: '2 hours ago', status: 'completed' },
        { id: 2, type: 'order', action: 'New order placed for extinguishers', time: '1 day ago', status: 'pending' },
        { id: 3, type: 'payment', action: 'Payment received for order #1234', time: '2 days ago', status: 'completed' },
        { id: 4, type: 'device', action: 'Maintenance scheduled for pump system', time: '3 days ago', status: 'scheduled' }
      ]
    });
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'scheduled':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
    

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Devices Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDevices}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">{stats.activeDevices} active</span>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-yellow-600 font-medium">{stats.pendingOrders} pending</span>
          </div>
        </div>

        {/* Payments Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPayments}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">All cleared</span>
          </div>
        </div>

        {/* System Status Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-2xl font-bold text-green-600">Healthy</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-600">Latest updates from your fire safety systems</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

   
    </div>
  );
}
