import { PropsWithChildren } from "react";
import { GlassPanel } from "./GlassPanel";

interface ChartCardProps {
  title: string;
  subtitle?: string;
}

export const ChartCard = ({ title, subtitle, children }: PropsWithChildren<ChartCardProps>) => {
  return (
    <GlassPanel>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
          {subtitle ? (
            <div className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-6 h-56">{children}</div>
    </GlassPanel>
  );
};
