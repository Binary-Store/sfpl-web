"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Smartphone, Search, MapPin, Building } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { data, isLoading, error } = useDevices();

  const filteredDevices = data?.filter((device) => {
    return (
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.imei.includes(searchTerm) ||
      device.ward_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serial?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDeviceClick = (deviceId) => {
    router.push(`/dashboard/projects/${deviceId}`);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects... (Press / or space to focus)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices?.map((device) => (
          <div
            key={device.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all duration-200 p-4 group"
            onClick={() => handleDeviceClick(device.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2.5 bg-blue-50 rounded-md">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {device.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono truncate">
                    {device.serial || device.imei}
                  </p>
                </div>
              </div>
              <span className="ml-3 shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                Ward {device.ward_name}
              </span>
            </div>

            <div className="mt-3 flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <span className="text-xs text-gray-700 truncate">
                {device.address || "Address not available"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDevices?.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No devices found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No devices have been added yet"}
          </p>
        </div>
      )}
    </div>
  );
}
