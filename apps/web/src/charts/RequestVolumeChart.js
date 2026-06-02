import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export const RequestVolumeChart = ({ data }) => {
    const chartData = [...data].reverse().map((point) => ({
        time: point.bucket ?? "",
        requests: point.requestCount
    }));
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", hide: true }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "requests", fill: "#4af0e5" })] }) }));
};
