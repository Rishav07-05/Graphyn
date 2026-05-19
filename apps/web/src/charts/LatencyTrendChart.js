import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export const LatencyTrendChart = ({ data }) => {
    const chartData = [...data].reverse().map((point) => ({
        time: point.bucket ?? "",
        latency: point.avgLatency
    }));
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", hide: true }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "latency", stroke: "#35f1a4", strokeWidth: 2, dot: false })] }) }));
};
