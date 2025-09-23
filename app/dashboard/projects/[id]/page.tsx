"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Loader2, AlertCircle, Building2, AlarmCheck } from "lucide-react";
import { useDeviceById } from "@/hooks/useDevices";
import { useGlobal } from "@/contexts/GlobalContext";
import { Badge } from "@/components/ui/badge";
import { DeviceHeader } from "@/components/devices/DeviceHeader";
import { FireAlarmPanel } from "@/components/devices/FireAlarmPanel";
import { FirePumpPanel } from "@/components/devices/FirePumpPanel";
import { LiquidLevelPanel } from "@/components/devices/LiquidLevelPanel";

export default function DeviceDetails() {
  const params = useParams();
  const id = params.id as string;
  const { setBreadcrumbsEndPoint } = useGlobal();
  const router = useRouter();

  const { data: device, isLoading } = useDeviceById(id || "");

  useEffect(() => {
    if (device && id) {
      setBreadcrumbsEndPoint([
        {
          id: device.id,
          label: device.name.slice(0, 1).toUpperCase() + device.name.slice(1) || "",
          href: "/dashboard/projects/" + id,
        },
      ]);
    }
  }, [id, device, setBreadcrumbsEndPoint]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading device details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black overflow-auto rounded-lg text-white p-6">
      <DeviceHeader device={device} alarmData={device.alarmData} />

      <div className="flex flex-col gap-4">
        <FireAlarmPanel alarmData={device.alarmData} />
        <FirePumpPanel alarmData={device.alarmData} />
        <LiquidLevelPanel alarmData={device.alarmData} />
      </div>
    </div>
  );
}
