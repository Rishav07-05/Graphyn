import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
const ToastContext = createContext(null);
const TOAST_TTL_MS = 2800;
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((message, type = "info") => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const toast = { id, message, type };
        setToasts((prev) => [...prev, toast]);
        window.setTimeout(() => {
            setToasts((prev) => prev.filter((item) => item.id !== id));
        }, TOAST_TTL_MS);
    }, []);
    const value = useMemo(() => ({ addToast }), [addToast]);
    return (_jsxs(ToastContext.Provider, { value: value, children: [children, _jsx("div", { className: "pointer-events-none fixed right-6 top-6 z-50 space-y-3", children: toasts.map((toast) => (_jsx("div", { className: `pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg ${toast.type === "success"
                        ? "border-emerald-200/70 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200"
                        : toast.type === "error"
                            ? "border-red-200/70 bg-red-500/10 text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200"
                            : "border-slate-200/70 bg-white/90 text-slate-700 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-200"}`, children: toast.message }, toast.id))) })] }));
};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
};
