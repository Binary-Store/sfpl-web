"use client";
import { useParams } from "next/navigation";
import { useDeviceById } from "@/hooks/useDevices";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { useGlobal } from "@/contexts/GlobalContext";
import { Activity } from "lucide-react";
import { DeviceHeader } from "@/components/devices/DeviceHeader";
import { FireAlarmPanel } from "@/components/devices/FireAlarmPanel";
import { FirePumpPanel } from "@/components/devices/FirePumpPanel";
import { LiquidLevelPanel } from "@/components/devices/LiquidLevelPanel";
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
    alarm_panel_external_voltage: number;
    alarm_panel_battery_level: number;
    zone_1: number;
    line_pressure: number;
    pump_panel_mode: number;
    pressure_switch: number;
    voltage_r: number;
    ampere_r: number;
    voltage_y: number;
    ampere_y: number;
    voltage_b: number;
    ampere_b: number;
    diesel_pump_battery_level: number;
    underground_tank_level: number;
    diesel_pump_tank_level: number;
  };
}

interface Device {
  id: string;
  name: string;
  last_record: AlarmData;
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
          href: `/dashboard/projects/${device.id}`,
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
    <div className="h-full overflow-auto bg-black rounded-lg text-white p-6">
    <DeviceHeader device={device} alarmData={alarmData} />

    <div className="flex flex-col gap-4">
      <FireAlarmPanel alarmData={alarmData} />
      <FirePumpPanel alarmData={alarmData} />
      <LiquidLevelPanel alarmData={alarmData} />
    </div>
  </div>
  );
}
