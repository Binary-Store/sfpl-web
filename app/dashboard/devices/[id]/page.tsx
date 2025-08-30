"use client";
import { useParams } from "next/navigation";
import { useDeviceById } from "@/hooks/useDevices";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { useGlobal } from "@/contexts/GlobalContext";
import { Clock, Activity, Smile, Frown, Zap, Battery, AlertTriangle, Droplets, Gauge, Fuel } from "lucide-react";
import Image from "next/image";

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
      <div className="flex justify-between items-center mb-6">
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
              {alarmData ? new Date(alarmData.timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              }) : "No data"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Status Dashboard Grid */}
        <div className="flex justify-start gap-25 h-fit relative w-fit">
          {/* Background Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2 z-0"></div>

          {/* Fire Alarm Panel Status - Overall Health */}
          <div className="relative h-full z-10">
            <div
              className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center ${
                (alarmData?.io_elements?.external_voltage || 0) > 0 &&
                (alarmData?.io_elements?.battery_level || 0) > 0 &&
                (alarmData?.io_elements?.zone_1 || 0) < 1
                  ? "bg-green-600 border-2 border-green-400"
                  : "bg-red-600 border-2 border-red-400"
              }`}>
              <div className="text-3xl mb-2">
                {(alarmData?.io_elements?.external_voltage || 0) > 0 &&
                (alarmData?.io_elements?.battery_level || 0) > 0 &&
                (alarmData?.io_elements?.zone_1 || 0) < 1 ? (
                  <Smile className="h-12 w-12 text-white mx-auto" />
                ) : (
                  <Frown className="h-12 w-12 text-white mx-auto" />
                )}
              </div>
              <h3 className="font-bold text-lg mb-1">Fire Alarm Panel</h3>
              <p className="text-sm font-semibold">
                {(alarmData?.io_elements?.external_voltage || 0) > 0 &&
                (alarmData?.io_elements?.battery_level || 0) > 10 &&
                (alarmData?.io_elements?.zone_1 || 0) < 1
                  ? "Healthy"
                  : "Fault"}
              </p>
            </div>
          </div>

          <div className="col-span-3 h-full flex justify-between gap-4 z-10">
            {/* Power Status */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center ${
                  (alarmData?.io_elements?.external_voltage || 0) > 0
                    ? "bg-green-600 border-2 border-green-400"
                    : "bg-red-600 border-2 border-red-400"
                }`}>
                <div className="text-3xl mb-2">
                  <Zap className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-lg mb-1">Power Status</h3>
                <p className="text-sm font-semibold">
                  {(alarmData?.io_elements?.external_voltage || 0) > 0 ? "ON" : "OFF"}
                </p>
              </div>
            </div>

            {/* Battery Level */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center ${
                  (alarmData?.io_elements?.battery_level || 0) > 10
                    ? "bg-green-600 border-2 border-green-400"
                    : "bg-red-600 border-2 border-red-400"
                }`}>
                <div className="text-3xl mb-2">
                  <Battery className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-lg mb-1">Battery Level</h3>
                <p className="text-sm font-semibold">
                  {(alarmData?.io_elements?.battery_level || 0) > 0
                    ? `${alarmData?.io_elements?.battery_level || 0}%`
                    : "0%"}
                </p>
              </div>
            </div>

            {/* Zone Status */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center ${
                  (alarmData?.io_elements?.zone_1 || 0) < 1
                    ? "bg-green-600 border-2 border-green-400"
                    : "bg-red-600 border-2 border-red-400"
                }`}>
                <div className="text-3xl mb-2">
                  {(alarmData?.io_elements?.zone_1 || 0) < 1 ? (
                    <Smile className="h-12 w-12 text-white mx-auto" />
                  ) : (
                    <Frown className="h-12 w-12 text-white mx-auto" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">Zone Status</h3>
                <p className="text-sm font-semibold">
                  {(alarmData?.io_elements?.zone_1 || 0) < 1 ? "Healthy" : "Danger"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Dashboard Grid */}
        <div className="flex justify-start gap-25 h-fit relative w-fit">
          {/* Background Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2 z-0"></div>

          {/* Fire Pump Panel Status - Overall Health */}
          <div className="relative h-full z-10">
            <div
              className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
              <div className="text-3xl mb-2">
                <Smile className="h-12 w-12 text-white mx-auto" />
              </div>
              <h3 className="font-bold text-lg mb-1">Fire Pump Panel</h3>
              <p className="text-sm font-semibold">Healthy</p>
            </div>
          </div>

          <div className="col-span-3 h-full flex justify-between gap-4 z-10">
            {/* Power Status */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
                <div className="text-3xl mb-2">
                  <Image src="/auto.svg" alt="Pump Mode" className="h-12 w-12 text-white mx-auto" width={12} height={12} />
                </div>
                <h3 className="font-bold text-lg mb-1">Pump Panel Mode</h3>
                <p className="text-sm font-semibold">Auto</p>
              </div>
            </div>

            {/* Battery Level */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
                <div className="text-3xl mb-2">
                  <Gauge className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-lg mb-1">Hydrant Line Pressure</h3>
                <p className="text-sm font-semibold">12 kg/cm²</p>
              </div>
            </div>

            {/* Zone Status */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
                <div className="text-3xl mb-2">
                  <AlertTriangle className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-lg mb-1">Pressure Switch Status</h3>
                <p className="text-sm font-semibold">Low</p>
              </div>
            </div>

            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
                <div className="text-3xl mb-2">
                  <Gauge className="h-12 w-12 text-white mx-auto" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div></div>
                  <div>V</div>
                  <div>A</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>R</div>
                  <div>230.3</div>
                  <div>2.3</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>Y</div>
                  <div>228.3</div>
                  <div>1.3</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>B</div>
                  <div>252.3</div>
                  <div>1.9</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
                <div className="text-3xl mb-2">
                  <Battery className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-lg mb-1">Diesel Pump Battery </h3>
                <p className="text-sm font-semibold">80%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Dashboard Grid */}
        <div className="flex justify-start gap-25 h-fit relative w-fit">
          {/* Background Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2 z-0"></div>

          {/* Fire Pump Panel Status - Overall Health */}
          <div className="relative h-full z-10">
            <div
              className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
              <div className="text-3xl mb-2">
                <Smile className="h-12 w-12 text-white mx-auto" />
              </div>
              <h3 className="font-bold text-lg mb-1">Liquid Level</h3>
              <p className="text-sm font-semibold">Healthy</p>
            </div>
          </div>

          <div className="col-span-3 h-full flex justify-between gap-4 z-10">
            {/* Power Status */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
                <div className="text-3xl mb-2">
                  <Droplets className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-lg mb-1">Under Ground Tank Level</h3>
                <p className="text-sm font-semibold">80%</p>
              </div>
            </div>

            {/* Battery Level */}
            <div className="relative">
              <div
                className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center bg-gray-600 border-2 border-gray-400`}>
                <div className="text-3xl mb-2">
                  <Fuel className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-lg mb-1">Diesel Tank Level</h3>
                <p className="text-sm font-semibold">80%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
