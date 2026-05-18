import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsPoint } from "../types/analytics";

interface RequestVolumeChartProps {
  data: AnalyticsPoint[];
}

export const RequestVolumeChart = ({ data }: RequestVolumeChartProps) => {
  const chartData = [...data].reverse().map((point) => ({
    time: point.bucket ?? "",
    requests: point.requestCount
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="requests" fill="#4af0e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};
