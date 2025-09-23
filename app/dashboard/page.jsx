'use client';

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Cpu, Navigation, Clock } from "lucide-react";
import { serverDetails } from "@/config";
import socket from "@/lib/socket";
import { useGetAllDeviceForMonitoring } from "@/hooks/useDevices";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

// Map container styles
const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 120px)",
  borderRadius: "5px",
};

// Default center (Rajkot, Gujarat, India)
const defaultCenter = {
  lat: 22.3039, // Rajkot, Gujarat, India
  lng: 70.8022,
};

// Helper function to group devices by location and offset overlapping markers
const groupAndOffsetDevices = (devices) => {
  console.log(devices, "devices");
  const locationGroups = {};
  const offsetDistance = 0.0001; // Small offset in degrees (approximately 10-15 meters)

  // Group devices by their coordinates
  devices?.forEach((device) => {
    const lat = device.latitude || defaultCenter.lat;
    const lng = device.longitude || defaultCenter.lng;
    const key = `${lat.toFixed(6)},${lng.toFixed(6)}`;

    if (!locationGroups[key]) {
      locationGroups[key] = [];
    }
    locationGroups[key].push(device);
  });

  // Create offset positions for devices in the same location
  const processedDevices = [];

  Object.entries(locationGroups).forEach(([locationKey, deviceGroup]) => {
    const [baseLat, baseLng] = locationKey.split(",").map(Number);

    if (deviceGroup.length === 1) {
      // Single device - no offset needed
      processedDevices.push({
        ...deviceGroup[0],
        displayLat: baseLat,
        displayLng: baseLng,
        deviceCount: 1,
        groupedDevices: [deviceGroup[0]],
      });
    } else {
      // Multiple devices - create offset positions in a circle pattern
      deviceGroup.forEach((device, index) => {
        const angle = (2 * Math.PI * index) / deviceGroup.length;
        const offsetLat = baseLat + offsetDistance * Math.cos(angle);
        const offsetLng = baseLng + offsetDistance * Math.sin(angle);

        processedDevices.push({
          ...device,
          displayLat: offsetLat,
          displayLng: offsetLng,
          deviceCount: deviceGroup.length,
          groupedDevices: deviceGroup,
          isGrouped: true,
        });
      });
    }
  });

  return processedDevices;
};

// Device status colors based on system_status
const getStatusColor = (systemStatus) => {
  switch (systemStatus?.toLowerCase()) {
    case "healthy":
      return "bg-green-500";
    case "unhealthy":
      return "bg-orange-500";
    case "affected":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

// Get hex color for SVG icons
const getStatusHexColor = (systemStatus) => {
  switch (systemStatus?.toLowerCase()) {
    case "healthy":
      return "#10B981"; // green-500
    case "unhealthy":
      return "#F97316"; // orange-500
    case "affected":
      return "#EF4444"; // red-500
    default:
      return "#6B7280"; // gray-500
  }
};

export default function DashboardPage() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const router = useRouter();
  const mapRef = useRef(null);
  const { data: devices, refetch } = useGetAllDeviceForMonitoring();
  console.log(devices, "devices");
  const queryClient = useQueryClient();

  // Process devices to handle overlapping coordinates
  const processedDevices = devices ? groupAndOffsetDevices(devices) : [];

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: serverDetails.googleMapAPIKey || "",
    id: "google-map-script",
  });


  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMarkerClick = (device) => {
    setSelectedDevice(device);
  };

  const handleInfoWindowClose = () => {
    setSelectedDevice(null);
  };

  useEffect(() => {
    if (socket) {
      socket.on("record:change", (data) => {
        // Update the cache with new data
        queryClient.setQueryData(['listAllDevicesForMap'], (oldData) => {
          return oldData.map((device) => {
            if (device?.imei === data?.imei) {
              return {
                ...device,
                system_status: data.system_status,
              };
            }
            return device;
          });
        });

        // Force a re-render by invalidating the query
        queryClient.invalidateQueries({ queryKey: ['listAllDevicesForMap'] });

        // Update selected device if it matches
        if (selectedDevice && data?.imei === selectedDevice.imei) {
          if (data) {
            setSelectedDevice((prevSelected) => ({
              ...prevSelected,
              system_status: data.system_status,
            }));
          }
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("record:change");
      }
    };
  }, [selectedDevice, queryClient]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Map Loading Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Failed to load Google Maps. Please check your API key configuration.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="h-5 w-5 mr-2 animate-spin" />
              Loading Map...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Initializing Google Maps...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Map */}
      <div className="p-0 rounded-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}>
          {/* Device Markers */}
          {processedDevices?.map((device) => (
            <Marker
              key={device.id}
              position={{
                lat: device.displayLat,
                lng: device.displayLng,
              }}
              onClick={() => handleMarkerClick(device)}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <!-- Pin shape -->
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${getStatusHexColor(
                        device.system_status
                      )}" stroke="white" stroke-width="2"/>
                      
                      <!-- Inner circle -->
                      <circle cx="12" cy="9" r="3" fill="white"/>
                      
                      <!-- Status indicator dot -->
                      <circle cx="12" cy="9" r="1.5" fill="${getStatusHexColor(device.system_status)}"/>
                    </svg>
                  `)}`,
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(12, 24), // Anchor at bottom center of pin
              }}
            />
          ))}

          {/* Info Window */}
          {selectedDevice && (
            <InfoWindow
              position={{
                lat: selectedDevice.displayLat || selectedDevice.latitude,
                lng: selectedDevice.displayLng || selectedDevice.longitude,
              }}
              onCloseClick={handleInfoWindowClose}>
              <div className="p-4 min-w-[320px] bg-white rounded-lg shadow-lg border border-gray-200">
                {/* Header with device icon and status */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(selectedDevice?.system_status)} animate-pulse`}
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{selectedDevice?.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{selectedDevice?.system_status}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(
                      selectedDevice?.system_status
                    )} text-white font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wide`}>
                    {selectedDevice?.system_status}
                  </Badge>
                </div>

                {/* Address and IMEI info */}
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Cpu className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">IMEI</span>
                    </div>
                    <p className="text-sm text-gray-900 font-mono">{selectedDevice?.imei || "N/A"}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Navigation className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Address</span>
                    </div>
                    <p className="text-sm text-gray-900">{selectedDevice?.address || "No address"}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => router.push(`/dashboard/projects/${selectedDevice?.id}`)}>
                    <Navigation className="h-3 w-3 mr-1" />
                    Navigate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => router.push(`/dashboard/projects/${selectedDevice?.id}/alarm-panel`)}>
                    <Cpu className="h-3 w-3 mr-1" />
                    Alarm Panel
                  </Button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
