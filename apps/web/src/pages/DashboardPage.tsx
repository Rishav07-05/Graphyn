import { useAppStore } from "../store/useAppStore";
import { MetricCard } from "../components/MetricCard";
import { ChartCard } from "../components/ChartCard";
import { LiveTrafficGraph } from "../graphs/LiveTrafficGraph";
import { EventFeed } from "../components/EventFeed";

export const DashboardPage = () => {
  const metrics = useAppStore((state) => state.metrics);
  const traffic = useAppStore((state) => state.traffic);
  const services = useAppStore((state) => state.services);
  const socketConnections = useAppStore((state) => state.socketConnections);

  const requests = metrics?.requestCount ?? 0;
  const latency = metrics?.avgLatency ?? 0;
  const errors = metrics?.errorCount ?? 0;
  const p95 = metrics?.p95Latency ?? 0;
  const activeServices = services.length;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Requests / min" value={`${requests}`} detail="Live throughput" />
        <MetricCard label="Avg Latency" value={`${latency}ms`} detail="Across services" />
        <MetricCard label="p95 Latency" value={`${p95}ms`} detail="Performance tail" />
        <MetricCard label="Errors" value={`${errors}`} detail="Current window" />
        <MetricCard label="Active Services" value={`${activeServices}`} detail="Reporting now" />
        <MetricCard
          label="Websocket Activity"
          value={`${socketConnections}`}
          detail="Active connections"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Realtime Latency" subtitle="Websocket stream">
          <LiveTrafficGraph events={traffic} />
        </ChartCard>
        <ChartCard title="Live Event Feed" subtitle="Most recent spans">
          <div className="h-56 overflow-y-auto">
            <EventFeed />
          </div>
        </ChartCard>
      </div>
    </div>
  );
};
