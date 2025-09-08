import { Smile, Gauge, AlertTriangle, Battery, Frown } from "lucide-react";
import { StatusCard } from "./StatusCard";
import { PanelSection } from "./PanelSection";

interface AlarmData {
  io_elements: {
    pump_panel_mode: number;
    line_pressure: number;
    pressure_switch: number;
    voltage_r: number;
    ampere_r: number;
    voltage_y: number;
    ampere_y: number;
    voltage_b: number;
    ampere_b: number;
    diesel_pump_battery_level: number;
  };
}

interface FirePumpPanelProps {
  alarmData: AlarmData | null;
}

export function FirePumpPanel({ alarmData }: FirePumpPanelProps) {
  const pumpPanelMode = alarmData?.io_elements?.pump_panel_mode || 0;
  const linePressure = alarmData?.io_elements?.line_pressure || 0;
  const pressureSwitch = alarmData?.io_elements?.pressure_switch || 0;
  const voltageR = alarmData?.io_elements?.voltage_r;
  const ampereR = alarmData?.io_elements?.ampere_r;
  const voltageY = alarmData?.io_elements?.voltage_y;
  const ampereY = alarmData?.io_elements?.ampere_y;
  const voltageB = alarmData?.io_elements?.voltage_b;
  const ampereB = alarmData?.io_elements?.ampere_b;
  const dieselPumpBattery = alarmData?.io_elements?.diesel_pump_battery_level || 0;

  // Check if all voltages are healthy (> 200V)
  const voltages = [voltageR, voltageY, voltageB];
  const setVoltages = voltages.filter((v) => v !== undefined && v !== null);
  const isVoltageHealthy = setVoltages.length > 0 && setVoltages.every((v) => v! > 200);

  const isOverallHealthy =
    [pumpPanelMode, linePressure, pressureSwitch, dieselPumpBattery].every((value) => Number(value) > 0) &&
    isVoltageHealthy;

  return (
    <PanelSection>
      {/* Fire Pump Panel Status - Overall Health */}
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
          <h3 className="font-bold text-lg mb-1">Fire Pump Panel</h3>
          <p className="text-sm font-semibold">{isOverallHealthy ? "Healthy" : "Fault"}</p>
        </div>
      </div>

      <div className="col-span-3 h-full flex justify-between gap-4 z-10">
        {/* Pump Panel Mode */}
        <StatusCard
          title="Pump Panel Mode"
          status={pumpPanelMode > 0 ? "Auto" : "Manual"}
          icon={
            pumpPanelMode > 0 ? (
              <img src="/auto.svg" alt="Pump Mode" className="h-12 w-12 text-white mx-auto" />
            ) : (
              <img src="/manual.svg" alt="Pump Mode" className="h-12 w-12 text-white mx-auto" />
            )
          }
          isHealthy={true}
        />

        {/* Hydrant Line Pressure */}
        <StatusCard
          title="Hydrant Line Pressure"
          status={`${linePressure.toFixed(2)} kg/cm²`}
          icon={<Gauge className="h-12 w-12 text-white mx-auto" />}
          isHealthy={linePressure > 0}
        />

        {/* Pressure Switch Status */}
        <StatusCard
          title="Pressure Switch Status"
          status={pressureSwitch > 0 ? "High" : "Low"}
          icon={<AlertTriangle className="h-12 w-12 text-white mx-auto" />}
          isHealthy={pressureSwitch > 0}
        />

        {/* Voltage/Ampere Display */}
        <div className="relative">
          <div
            className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center ${
              isVoltageHealthy ? "bg-green-600 border-2 border-green-400" : "bg-red-600 border-2 border-red-400"
            }`}>
            <div className="text-3xl mb-2">
              <Gauge className="h-12 w-12 text-white mx-auto" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <div>V</div>
              <div>A</div>
            </div>
            {voltageR !== undefined && voltageR !== null && (
              <div className="grid grid-cols-3 gap-2">
                <div>R</div>
                <div>{Math.round(voltageR) || 0}</div>
                <div>{ampereR?.toFixed(2) || 0}</div>
              </div>
            )}
            {voltageY !== undefined && voltageY !== null && (
              <div className="grid grid-cols-3 gap-2">
                <div>Y</div>
                <div>{Math.round(voltageY) || 0}</div>
                <div>{ampereY?.toFixed(2) || 0}</div>
              </div>
            )}
            {voltageB !== undefined && voltageB !== null && (
              <div className="grid grid-cols-3 gap-2">
                <div>B</div>
                <div>{Math.round(voltageB) || 0}</div>
                <div>{ampereB?.toFixed(2) || 0}</div>
              </div>
            )}
          </div>
        </div>

        {/* Diesel Pump Battery */}
        <StatusCard
          title="Diesel Pump Battery"
          status={`${dieselPumpBattery.toFixed(2)}%`}
          icon={<Battery className="h-12 w-12 text-white mx-auto" />}
          isHealthy={dieselPumpBattery > 0}
        />
      </div>
    </PanelSection>
  );
}
