import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GlassPanel } from "./GlassPanel";
export const MetricCard = ({ label, value, detail }) => {
    return (_jsxs(GlassPanel, { children: [_jsx("div", { className: "text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400", children: label }), _jsx("div", { className: "mt-4 text-3xl font-semibold text-slate-900 dark:text-white", children: value }), _jsx("div", { className: "mt-2 text-xs text-slate-500 dark:text-slate-400", children: detail })] }));
};
