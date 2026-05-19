import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export const ThroughputChart = ({ data }) => {
    const chartData = [...data].reverse().map((point) => ({
        time: point.bucket ?? "",
        throughput: point.throughput
    }));
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", hide: true }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, {}), _jsx(Area, { type: "monotone", dataKey: "throughput", stroke: "#4af0e5", fill: "#4af0e533" })] }) }));
};
