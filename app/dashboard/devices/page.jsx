'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  MapPin
} from 'lucide-react';
import { useDevices } from '@/hooks/useDevices';

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { data, isLoading, error } = useDevices();

  const filteredDevices = data?.filter(device => {
    return device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           device.imei.includes(searchTerm) ||
           device.ward_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeviceClick = (deviceId) => {
    router.push(`/dashboard/devices/${deviceId}`);
  };

  const getSimCardBadge = (simStatus) => {
    if (simStatus === 'Sim Assigned') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {simStatus}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {simStatus}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search devices... (Press / or space to focus)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead >
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IMEI
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward
                </th>
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices?.map((device) => (
                <tr 
                  key={device.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleDeviceClick(device.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {device.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {device.imei}
                    </div>
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{device.ward_name}</span>
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      </div>

      {/* Empty State */}
      {filteredDevices?.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'No devices have been added yet'
            }
          </p>
        </div>
      )}
    </div>
  );
}
