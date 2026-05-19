import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export const LiveTrafficGraph = ({ events }) => {
    const data = [...events]
        .reverse()
        .map((event) => ({
        time: new Date(event.timestamp).toLocaleTimeString(),
        latency: event.latency
    }));
    return (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: data, children: [_jsx(XAxis, { dataKey: "time", hide: true }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "latency", stroke: "#4af0e5", strokeWidth: 2, dot: false })] }) }));
};
