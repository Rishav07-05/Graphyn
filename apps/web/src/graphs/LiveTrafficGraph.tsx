import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrafficEvent } from "../types/event";

interface LiveTrafficGraphProps {
  events: TrafficEvent[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 shadow-lg"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--accent-border)' }}
    >
      <div className="text-[10px] uppercase tracking-wider font-mono" style={{ color: 'var(--text-muted)' }}>Latency</div>
      <div className="text-sm font-bold font-mono" style={{ color: 'var(--accent)' }}>{payload[0].value}ms</div>
      <div className="text-[10px] font-mono" style={{ color: 'var(--text-faint)' }}>{payload[0].payload.time}</div>
    </div>
  );
};

export const LiveTrafficGraph = ({ events }: LiveTrafficGraphProps) => {
  const data = [...events]
    .reverse()
    .map((event) => ({
      time: new Date(event.timestamp).toLocaleTimeString(),
      latency: event.latency,
    }));

  /* Read CSS variable values at render time for recharts (which needs raw color strings) */
  const root = typeof document !== 'undefined' ? getComputedStyle(document.documentElement) : null;
  const strokeColor = root?.getPropertyValue('--chart-stroke').trim() || '#d9ed92';
  const gridColor = root?.getPropertyValue('--chart-grid').trim() || 'rgba(216,243,220,0.05)';
  const fillStart = root?.getPropertyValue('--chart-fill-start').trim() || 'rgba(217,237,146,0.3)';
  const fillEnd = root?.getPropertyValue('--chart-fill-end').trim() || 'rgba(217,237,146,0)';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillStart} stopOpacity={1} />
            <stop offset="100%" stopColor={fillEnd} stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="latency"
          stroke={strokeColor}
          strokeWidth={2}
          fill="url(#latencyGrad)"
          dot={false}
          animationDuration={300}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
