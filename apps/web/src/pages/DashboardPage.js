import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-6", children: [_jsx(MetricCard, { label: "Requests / min", value: `${requests}`, detail: "Live throughput" }), _jsx(MetricCard, { label: "Avg Latency", value: `${latency}ms`, detail: "Across services" }), _jsx(MetricCard, { label: "p95 Latency", value: `${p95}ms`, detail: "Performance tail" }), _jsx(MetricCard, { label: "Errors", value: `${errors}`, detail: "Current window" }), _jsx(MetricCard, { label: "Active Services", value: `${activeServices}`, detail: "Reporting now" }), _jsx(MetricCard, { label: "Websocket Activity", value: `${socketConnections}`, detail: "Active connections" })] }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]", children: [_jsx(ChartCard, { title: "Realtime Latency", subtitle: "Websocket stream", children: _jsx(LiveTrafficGraph, { events: traffic }) }), _jsx(ChartCard, { title: "Live Event Feed", subtitle: "Most recent spans", children: _jsx("div", { className: "h-56 overflow-y-auto", children: _jsx(EventFeed, {}) }) })] })] }));
};
