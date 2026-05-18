import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsPoint } from "../types/analytics";

interface LatencyTrendChartProps {
  data: AnalyticsPoint[];
}

export const LatencyTrendChart = ({ data }: LatencyTrendChartProps) => {
  const chartData = [...data].reverse().map((point) => ({
    time: point.bucket ?? "",
    latency: point.avgLatency
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="latency" stroke="#35f1a4" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
