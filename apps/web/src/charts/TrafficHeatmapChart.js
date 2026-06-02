import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export const TrafficHeatmapChart = ({ data }) => {
    const chartData = [...data].reverse().map((point) => ({
        time: point.bucket ?? "",
        latency: point.p95Latency
    }));
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", hide: true }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "latency", fill: "#35f1a4" })] }) }));
};
