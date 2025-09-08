import { type ReactNode } from "react";

interface PanelSectionProps {
  children: ReactNode;
  className?: string;
}

export function PanelSection({ children, className = "" }: PanelSectionProps) {
  return (
    <div className={`flex justify-start gap-25 h-fit relative w-fit ${className}`}>
      {/* Background Connection Line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2 z-0"></div>
      {children}
    </div>
  );
}
