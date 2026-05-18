import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsPoint } from "../types/analytics";

interface ThroughputChartProps {
  data: AnalyticsPoint[];
}

export const ThroughputChart = ({ data }: ThroughputChartProps) => {
  const chartData = [...data].reverse().map((point) => ({
    time: point.bucket ?? "",
    throughput: point.throughput
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Tooltip />
        <Area type="monotone" dataKey="throughput" stroke="#4af0e5" fill="#4af0e533" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
