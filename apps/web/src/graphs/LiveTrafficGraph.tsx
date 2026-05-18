import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrafficEvent } from "../types/event";

interface LiveTrafficGraphProps {
  events: TrafficEvent[];
}

export const LiveTrafficGraph = ({ events }: LiveTrafficGraphProps) => {
  const data = [...events]
    .reverse()
    .map((event) => ({
      time: new Date(event.timestamp).toLocaleTimeString(),
      latency: event.latency
    }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="time" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="latency" stroke="#4af0e5" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
