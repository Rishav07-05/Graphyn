import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GlassPanel } from "./GlassPanel";
export const ChartCard = ({ title, subtitle, children }) => {
    return (_jsxs(GlassPanel, { children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: title }), subtitle ? (_jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: subtitle })) : null] }) }), _jsx("div", { className: "mt-6 h-56", children: children })] }));
};
