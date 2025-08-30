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
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalDevices: 0,
    activeDevices: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalPayments: 0,
    recentActivity: []
  });

  useEffect(()=>{
    // redirect to devices page
    router.push('/dashboard/devices');
  },[])

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
    <h1>Dashboard</h1>

   
    </div>
  );
}
