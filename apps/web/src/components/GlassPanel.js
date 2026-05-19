import { jsx as _jsx } from "react/jsx-runtime";
export const GlassPanel = ({ children }) => {
    return (_jsx("div", { className: "glass rounded-2xl border border-slate-200/70 p-6 shadow-glass dark:border-white/10", children: children }));
};
