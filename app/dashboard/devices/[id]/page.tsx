"use client";
import { useParams } from "next/navigation";
import { useDeviceById } from "@/hooks/useDevices";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { Clock, Activity } from "lucide-react";
import { useGlobal } from "@/contexts/GlobalContext";

interface AlarmData {
  imei: string;
  timestamp: string;
  priority: number;
  event_trigger_id: number;
  gps: {
    altitude: number;
    angle: number;
    latitude: number;
    longitude: number;
    satellites: number;
    speed: number;
  };
  io_elements: {
    ignition: number;
    zone_1: number;
    external_voltage: number;
    battery_level: number;
  };
}

export default function AlarmPanel() {
  const params = useParams();
  const { setBreadcrumbsEndPoint } = useGlobal();

  const id = params.id as string;
  const { data: device, isLoading } = useDeviceById(id || "");
  const [alarmData, setAlarmData] = useState<AlarmData | null>(null);

  useEffect(() => {
    if (device && id) {
      setBreadcrumbsEndPoint([
        {
          id: device?.id,
          label: device?.name ? device?.name.slice(0, 1).toUpperCase() + device?.name.slice(1) : "",
          href: `/dashboard/devices/${device.id}`,
        },
      ]);
      setAlarmData(device.last_record);
      console.log(device.last_record);
    }
  }, [device, id]);

  useEffect(() => {
    socket.on("record", (data: AlarmData) => {
      if (device?.imei === data.imei) {
        console.log(data);
        setAlarmData(data);
      }
    });

    return () => {
      socket.off("record");
    };
  }, [device?.imei]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center text-muted-foreground">
          <Activity className="h-8 w-8 mx-auto mb-2" />
          <p>Loading device information...</p>
        </div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center text-muted-foreground">
          <Activity className="h-8 w-8 mx-auto mb-2" />
          <p>Device not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black rounded-lg text-white p-6">
      {/* Device Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{device.name}</h1>
        </div>

        {/* Status Bar - Right Corner */}
        <div className="flex items-center gap-4 bg-white text-black px-4 py-2 rounded-lg">
          {/* Battery Health */}
          <div className="flex items-center gap-2">
            🔋
            <span className="font-medium">{alarmData?.io_elements?.battery_level || 0}%</span>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">
              {alarmData ? new Date(alarmData.timestamp).toLocaleString() : "No data"}
            </span>
          </div>
        </div>
      </div>

      {/* Status Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 h-fit gap-20 relative">
        {/* Background Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2 z-0"></div>

        {/* Fire Alarm Panel Status - Overall Health */}
        <div className="relative h-full z-10">
          <div
            className={`rounded-lg p-6 text-center h-48 flex flex-col justify-center ${
              (alarmData?.io_elements?.external_voltage || 0) > 0 &&
              (alarmData?.io_elements?.battery_level || 0) > 0 &&
              (alarmData?.io_elements?.zone_1 || 0) < 1
                ? "bg-green-600 border-2 border-green-400"
                : "bg-red-600 border-2 border-red-400"
            }`}>
            <div className="text-5xl mb-3">
              {(alarmData?.io_elements?.external_voltage || 0) > 0 &&
              (alarmData?.io_elements?.battery_level || 0) > 0 &&
              (alarmData?.io_elements?.zone_1 || 0) < 1
                ? "😊"
                : "😟"}
            </div>
            <h3 className="font-bold text-2xl mb-2">Fire Alarm Panel</h3>
            <p className="text-xl font-semibold">
              {(alarmData?.io_elements?.external_voltage || 0) > 0 &&
              (alarmData?.io_elements?.battery_level || 0) > 10 &&
              (alarmData?.io_elements?.zone_1 || 0) < 1
                ? "Healthy"
                : "Fault"}
            </p>
          </div>
        </div>

        <div className="grid col-span-3 h-full grid-cols-1 md:grid-cols-3 gap-6 z-10">
          {/* Power Status */}
          <div className="relative">
            <div
              className={`rounded-lg p-6 text-center h-48 flex flex-col justify-center ${
                (alarmData?.io_elements?.external_voltage || 0) > 0
                  ? "bg-green-600 border-2 border-green-400"
                  : "bg-red-600 border-2 border-red-400"
              }`}>
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="font-bold text-xl mb-2">Power Status</h3>
              <p className="text-lg font-semibold">
                {(alarmData?.io_elements?.external_voltage || 0) > 0 ? "ON" : "OFF"}
              </p>
            </div>
          </div>

          {/* Battery Level */}
          <div className="relative">
            <div
              className={`rounded-lg p-6 text-center h-48 flex flex-col justify-center ${
                (alarmData?.io_elements?.battery_level || 0) > 10
                  ? "bg-green-600 border-2 border-green-400"
                  : "bg-red-600 border-2 border-red-400"
              }`}>
              <div className="text-5xl mb-3">🔋</div>
              <h3 className="font-bold text-xl mb-2">Battery Level</h3>
              <p className="text-lg font-semibold">
                {(alarmData?.io_elements?.battery_level || 0) > 0
                  ? `${alarmData?.io_elements?.battery_level || 0}%`
                  : "0%"}
              </p>
            </div>
          </div>

          {/* Zone Status */}
          <div className="relative">
            <div
              className={`rounded-lg p-6 text-center h-48 flex flex-col justify-center ${
                (alarmData?.io_elements?.zone_1 || 0) < 1
                  ? "bg-green-600 border-2 border-green-400"
                  : "bg-red-600 border-2 border-red-400"
              }`}>
              <div className="text-5xl mb-3">{(alarmData?.io_elements?.zone_1 || 0) < 1 ? "😊" : "😟"}</div>
              <h3 className="font-bold text-xl mb-2">Zone Status</h3>
              <p className="text-lg font-semibold">
                {(alarmData?.io_elements?.zone_1 || 0) < 1 ? "Healthy" : "Danger"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
