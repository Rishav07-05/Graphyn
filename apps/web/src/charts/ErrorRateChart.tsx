import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsPoint } from "../types/analytics";

interface ErrorRateChartProps {
  data: AnalyticsPoint[];
}

export const ErrorRateChart = ({ data }: ErrorRateChartProps) => {
  const chartData = [...data].reverse().map((point) => ({
    time: point.bucket ?? "",
    errors: point.errorCount
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="errors" stroke="#f97316" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
