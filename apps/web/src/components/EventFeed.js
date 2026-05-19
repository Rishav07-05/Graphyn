import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppStore } from "../store/useAppStore";
import { StatBadge } from "./StatBadge";
export const EventFeed = () => {
    const traffic = useAppStore((state) => state.traffic);
    return (_jsx("div", { className: "space-y-3", children: traffic.length === 0 ? (_jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No live traffic yet." })) : (traffic.map((event) => (_jsxs("div", { className: "flex items-center justify-between rounded-xl border border-slate-200/60 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-slate-900 dark:text-white", children: event.service }), _jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: event.traceId })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "text-xs text-slate-600 dark:text-slate-300", children: [event.latency, "ms"] }), _jsx(StatBadge, { status: event.status })] })] }, `${event.traceId}-${event.timestamp}`)))) }));
};
