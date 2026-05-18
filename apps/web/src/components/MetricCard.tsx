import { GlassPanel } from "./GlassPanel";

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
}

export const MetricCard = ({ label, value, detail }: MetricCardProps) => {
  return (
    <GlassPanel>
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{value}</div>
      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">{detail}</div>
    </GlassPanel>
  );
};
