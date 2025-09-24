import { Clock } from "lucide-react";

interface AlarmData {
  timestamp: string;
  io_elements: {
    alarm_panel_battery_level: number;
  };
}

interface Device {
  name: string;
  imei: string;
}

interface DeviceHeaderProps {
  device: Device;
  alarmData: AlarmData | null;
}

export function DeviceHeader({ device, alarmData }: DeviceHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 flex-wrap">
      <div>
        <h1 className="text-2xl font-bold text-white">{device.name}</h1>
        <p className="text-gray-400 text-sm">IMEI: {device.imei}</p>
      </div>

      {/* Status Bar - Right Corner */}
      <div className="flex items-center gap-4 bg-white text-black px-4 py-2 rounded-lg flex-wrap">
        {/* Battery Health */}
        <div className="flex items-center gap-2">
          🔋
          <span className="font-medium">{alarmData?.io_elements?.alarm_panel_battery_level.toFixed(2) || 0}%</span>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">
            {alarmData
              ? new Date(alarmData.timestamp).toLocaleString("en-US", {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "No data"}
          </span>
        </div>
      </div>
    </div>
  );
}
