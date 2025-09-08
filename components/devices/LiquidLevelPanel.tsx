import { Smile, Droplets, Fuel, Frown } from "lucide-react";
import { StatusCard } from "./StatusCard";
import { PanelSection } from "./PanelSection";

interface AlarmData {
  io_elements: {
    underground_tank_level: number;
    diesel_pump_tank_level: number;
  };
}

interface LiquidLevelPanelProps {
  alarmData: AlarmData | null;
}

export function LiquidLevelPanel({ alarmData }: LiquidLevelPanelProps) {
  const undergroundTankLevel = alarmData?.io_elements?.underground_tank_level || 0;
  const dieselTankLevel = alarmData?.io_elements?.diesel_pump_tank_level || 0;

  const isOverallHealthy = [undergroundTankLevel, dieselTankLevel].every((value) => value > 0);

  return (
    <PanelSection>
      {/* Liquid Level Status - Overall Health */}
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
          <h3 className="font-bold text-lg mb-1">Liquid Level</h3>
          <p className="text-sm font-semibold">{isOverallHealthy ? "Healthy" : "Fault"}</p>
        </div>
      </div>

      <div className="col-span-3 h-full flex justify-between gap-4 z-10">
        {/* Underground Tank Level */}
        <StatusCard
          title="Under Ground Tank Level"
          status={`${undergroundTankLevel.toFixed(2)}%`}
          icon={<Droplets className="h-12 w-12 text-white mx-auto" />}
          isHealthy={undergroundTankLevel > 0}
        />

        {/* Diesel Tank Level */}
        <StatusCard
          title="Diesel Tank Level"
          status={`${dieselTankLevel.toFixed(2)}%`}
          icon={<Fuel className="h-12 w-12 text-white mx-auto" />}
          isHealthy={dieselTankLevel > 0}
        />
      </div>
    </PanelSection>
  );
}
