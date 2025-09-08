import { type ReactNode } from "react";

interface StatusCardProps {
  title: string;
  status: string;
  value?: string;
  icon: ReactNode;
  isHealthy: boolean;
  className?: string;
}

export function StatusCard({ title, status, value, icon, isHealthy, className = "" }: StatusCardProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`rounded-lg p-4 text-center h-40 w-40 flex flex-col justify-center ${
          isHealthy ? "bg-green-600 border-2 border-green-400" : "bg-red-600 border-2 border-red-400"
        }`}>
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm font-semibold">{status}</p>
      </div>
    </div>
  );
}
