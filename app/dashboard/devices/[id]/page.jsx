'use client';

import { useParams } from 'next/navigation';
import { useDeviceById } from '@/hooks/useDevices';
import { 
  Battery, 
  Zap, 
  Clock, 
  MapPin,
  Smartphone,
  Wifi,
  Signal
} from 'lucide-react';
import socket from '@/lib/socket';
import { useEffect, useState } from 'react';
import { useGlobal } from '@/contexts/GlobalContext';

export default function DeviceDetailPage() {
  const {  setLastId } = useGlobal();
  const params = useParams();
  const deviceId = params.id;

  
  const { data: device, isLoading, error } = useDeviceById(deviceId);
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    if(device) {
      setLastId(device);
    }
  }, [device]);
  
  useEffect(() => {
    socket.on("record", (data) => {
      console.log(data, "this is device data");
      console.log(data.imei, "this is device data");

      console.log(device?.imei, "this is device data");
      if (data.imei === device?.imei) {
        setLiveData(data);
      }
    });

    // Cleanup socket listener
    return () => {
      socket.off("record");
    };
  }, [device?.imei]);

  // Use live data if available, otherwise fall back to device data
  const currentData = liveData || device?.last_record;
  const currentDevice = device;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading device details...</p>
        </div>
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="text-center py-12">
        <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Device not found</h3>
        <p className="text-gray-600">Unable to load device details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Side - Device Info */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentDevice.name} - Alarm Panel
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>IMEI: {currentDevice.imei}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Ward: {currentDevice.ward_name}</span>
              </div>
            </div>
            {currentDevice.description && (
              <p className="text-sm text-gray-500">{currentDevice.description}</p>
            )}
          </div>
          
          {/* Right Side - Battery & Time */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Battery className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">
                {currentData?.io_elements?.battery_level || 0}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                {currentData?.timestamp 
                  ? new Date(currentData.timestamp).toLocaleDateString('en-GB') + ', ' + 
                    new Date(currentData.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
                  : 'No data'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Power Status Card */}
        <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${currentData?.io_elements?.external_voltage > 10 ? 'bg-green-50' : 'bg-red-200'}`}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h3 className={`text-lg font-bold ${currentData?.io_elements?.external_voltage > 0 ? 'text-green-800' : 'text-red-800'} mb-2`}>Power Status</h3>
          <p className={`text-xl font-semibold ${currentData?.io_elements?.external_voltage > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {currentData?.io_elements?.external_voltage > 0 ? 'ON' : 'OFF'}
          </p>
          <p className={`text-xs ${currentData?.io_elements?.external_voltage > 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
            {currentData?.io_elements?.external_voltage || 0} mV
          </p>
        </div>

        {/* Battery Level Card */}
        <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${currentData?.io_elements?.battery_level > 10 ? 'bg-green-50' : 'bg-red-200'}`}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Battery className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h3 className={`text-lg font-bold ${currentData?.io_elements?.battery_level > 10 ? 'text-green-800' : 'text-red-800'} mb-2`}>Battery Level</h3>
          <p className={`text-xl font-semibold ${currentData?.io_elements?.battery_level > 10 ? 'text-green-600' : 'text-red-600'}`}>
            {currentData?.io_elements?.battery_level || 0}%
          </p>
        </div>

        {/* Zone Status Card */}
        <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${currentData?.io_elements?.zone_1 === 0 ? 'bg-green-50' : 'bg-red-200'}`}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">
                {currentData?.io_elements?.zone_1 === 0 ? '😊' : '🚨'}
              </span>
            </div>
          </div>
          <h3 className={`text-lg font-bold ${currentData?.io_elements?.zone_1 === 0 ? 'text-green-800' : 'text-red-800'} mb-2`}>Zone Status</h3>
          <p className={`text-xl font-semibold ${currentData?.io_elements?.zone_1 === 0 ? 'text-green-600' : 'text-red-600'}`}>
            {currentData?.io_elements?.zone_1 === 1 ? 'Alert' : 'Healthy'}
          </p>
        </div>
      </div>

      {/* Additional Device Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Device Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Device Name:</span>
              <span className="font-medium text-gray-900">{currentDevice.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">IMEI:</span>
              <span className="font-mono text-gray-900">{currentDevice.imei}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ward:</span>
              <span className="font-medium text-gray-900">{currentDevice.ward_name}</span>
            </div>
            {currentDevice.description && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Description:</span>
                <span className="font-medium text-gray-900">{currentDevice.description}</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium text-gray-900">
                {currentData?.timestamp 
                  ? new Date(currentData.timestamp).toLocaleDateString('en-GB')
                  : 'No data'
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Created:</span>
              <span className="font-medium text-gray-900">
                {new Date(currentDevice.created_at).toLocaleDateString('en-GB')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SIM Card Information */}
      {currentDevice.sim_card && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SIM Card Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Number:</span>
                <span className="font-medium text-gray-900">{currentDevice.sim_card.number}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Activation:</span>
                <span className="font-medium text-gray-900">
                  {new Date(currentDevice.sim_card.activation_date).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Expiry:</span>
                <span className="font-medium text-gray-900">
                  {new Date(currentDevice.sim_card.expiry_date).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Data Indicator */}
      {liveData && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Data Active</span>
          </div>
        </div>
      )}
    </div>
  );
}
