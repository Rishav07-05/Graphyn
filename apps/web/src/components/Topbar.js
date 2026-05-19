import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeToggle } from "./ThemeToggle";
import { ProfileMenu } from "./ProfileMenu";
export const Topbar = () => {
    return (_jsxs("header", { className: "flex items-center justify-between border-b border-slate-200/60 px-8 py-4 dark:border-white/10", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Realtime Observability" }), _jsx("div", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Graphyn Control Center" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-200", children: "Live" }), _jsx(ThemeToggle, {}), _jsx(ProfileMenu, {})] })] }));
};
