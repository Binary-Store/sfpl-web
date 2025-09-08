import { Smile, Frown, Zap, Battery } from "lucide-react";
import { StatusCard } from "./StatusCard";
import { PanelSection } from "./PanelSection";

interface AlarmData {
  io_elements: {
    alarm_panel_external_voltage: number;
    alarm_panel_battery_level: number;
    zone_1: number;
  };
}

interface FireAlarmPanelProps {
  alarmData: AlarmData | null;
}

export function FireAlarmPanel({ alarmData }: FireAlarmPanelProps) {
  const externalVoltage = alarmData?.io_elements?.alarm_panel_external_voltage || 0;
  const batteryLevel = alarmData?.io_elements?.alarm_panel_battery_level || 0;
  const zone1 = alarmData?.io_elements?.zone_1 || 0;

  // Overall health calculation
  const isOverallHealthy = [externalVoltage, batteryLevel, zone1].every((value) => value > 0);

  console

  return (
    <PanelSection>
      {/* Fire Alarm Panel Status - Overall Health */}
      <div className="relative h-full z-10">
        <div
          className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center ${
            isOverallHealthy ? "bg-green-600 border-2 border-green-400" : "bg-red-600 border-2 border-red-400"
          }`}>
          <div className="text-3xl mb-2">
            {isOverallHealthy ? (
              <Smile className="h-12 w-12 text-white mx-auto" />
            ) : (
              <Frown className="h-12 w-12 text-white mx-auto" />
            )}
          </div>
          <h3 className="font-bold text-lg mb-1">Fire Alarm Panel</h3>
          <p className="text-sm font-semibold">{isOverallHealthy ? "Healthy" : "Fault"}</p>
        </div>
      </div>

      <div className="col-span-3 h-full flex justify-between gap-4 z-10">
        {/* Power Status - Only show if external voltage is defined/not null */}
        {externalVoltage !== undefined && externalVoltage !== null && (
          <StatusCard
            title="Power Status"
            status={externalVoltage > 0 ? "ON" : "OFF"}
            value={`Voltage: ${externalVoltage > 0 ? externalVoltage + " V" : "0 V"}`}
            icon={<Zap className="h-12 w-12 text-white mx-auto" />}
            isHealthy={externalVoltage > 0}
          />
        )}

        {/* Battery Level */}
        {batteryLevel !== undefined && batteryLevel !== null && (
          <StatusCard
            title="Battery Level"
            status={batteryLevel > 0 ? `${batteryLevel.toFixed(2)}%` : "0%"}
            value={`Battery: ${batteryLevel > 0 ? batteryLevel.toFixed(2) : "0"}`}
            icon={<Battery className="h-12 w-12 text-white mx-auto" />}
            isHealthy={batteryLevel > 0}
          />
        )}

        {zone1 !== undefined && zone1 !== null && (
          <StatusCard
            title="Zone Status"
            status={zone1 > 0 ? "Healthy" : "Danger"}
            value={zone1.toFixed(2)}
            icon={<Smile className="h-12 w-12 text-white mx-auto" />}
            isHealthy={zone1 > 0}
          />
        )}
      </div>
    </PanelSection>
  );
}
