import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useRealtime } from "../hooks/useRealtime";
import { useProjectData } from "../hooks/useProjectData";
export const AppShell = () => {
    const projectId = "default";
    useRealtime();
    useProjectData(projectId);
    return (_jsx("div", { className: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white", children: _jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1", children: [_jsx(Topbar, {}), _jsx("main", { className: "px-8 py-6", children: _jsx(Outlet, { context: { projectId } }) })] })] }) }));
};
