import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeInUp, staggerContainer } from "../animations/motionVariants";
const features = [
    {
        title: "Realtime Traffic",
        description: "Stream API activity, websocket flows, and latency spikes instantly."
    },
    {
        title: "Service Map",
        description: "Visualize request chains and infrastructure health with live edges."
    },
    {
        title: "Trace Explorer",
        description: "Reconstruct distributed traces with waterfall timelines and dependencies."
    },
    {
        title: "AI Insights",
        description: "Surface bottlenecks and failure explanations with actionable guidance."
    }
];
const HeroNetwork = () => {
    return (_jsxs("div", { className: "relative h-64 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900", children: [_jsx(motion.div, { className: "absolute inset-0", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.2 }, children: _jsxs("svg", { viewBox: "0 0 600 240", className: "h-full w-full", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "glow", x1: "0", x2: "1", y1: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#4af0e5" }), _jsx("stop", { offset: "100%", stopColor: "#35f1a4" })] }) }), [80, 180, 320, 460].map((x, index) => (_jsx("circle", { cx: x, cy: 120, r: 18, fill: "url(#glow)", opacity: 0.7 }, x))), _jsx(motion.path, { d: "M80 120 C140 70, 260 170, 320 120 S420 70, 460 120", stroke: "url(#glow)", strokeWidth: "4", fill: "none", initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } })] }) }), _jsx("div", { className: "absolute bottom-4 left-6 text-xs uppercase tracking-[0.2em] text-slate-400", children: "Live Request Flow" })] }));
};
export const LandingPage = () => {
    return (_jsx("div", { className: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white", children: _jsxs("div", { className: "mx-auto max-w-6xl px-8 py-16", children: [_jsxs(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid gap-10 md:grid-cols-[1.1fr_0.9fr]", children: [_jsxs(motion.div, { variants: fadeInUp, children: [_jsx("div", { className: "text-sm uppercase tracking-[0.3em] text-cyan-500 dark:text-cyan-300", children: "Graphyn" }), _jsx("h1", { className: "mt-6 text-5xl font-semibold leading-tight", children: "Realtime infrastructure observability for modern API systems." }), _jsx("p", { className: "mt-6 text-lg text-slate-600 dark:text-slate-300", children: "Stream traces, visualize service chains, and respond to latency spikes with a focused command center for engineers." }), _jsx("div", { className: "mt-8 flex gap-4", children: _jsx(Link, { to: "/auth", className: "rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900", children: "Sign In" }) })] }), _jsx(motion.div, { variants: fadeInUp, children: _jsx(HeroNetwork, {}) })] }), _jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-2", children: features.map((feature) => (_jsxs("div", { className: "rounded-2xl border border-slate-200/70 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5", children: [_jsx("div", { className: "text-lg font-semibold", children: feature.title }), _jsx("p", { className: "mt-3 text-sm text-slate-600 dark:text-slate-300", children: feature.description })] }, feature.title))) }), _jsxs("div", { className: "mt-16 grid gap-6 md:grid-cols-2", children: [_jsxs("div", { className: "rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-100 to-white p-6 dark:border-white/10 dark:from-slate-900 dark:to-slate-950", children: [_jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Architecture Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold", children: "Graph view of distributed calls" }), _jsx("div", { className: "mt-6 h-40 rounded-2xl border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-slate-950/70" })] }), _jsxs("div", { className: "rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-100 to-white p-6 dark:border-white/10 dark:from-slate-900 dark:to-slate-950", children: [_jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "SDK Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold", children: "Instrument in minutes" }), _jsx("pre", { className: "mt-6 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-300", children: `import { track } from "@graphyn/sdk";

track({
  traceId: "trace_abc123",
  service: "auth-service",
  latency: 42,
  status: "success"
});` })] })] }), _jsxs("div", { className: "mt-16 grid gap-6 md:grid-cols-2", children: [_jsxs("div", { className: "rounded-2xl border border-slate-200/70 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5", children: [_jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Analytics Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold", children: "Latency, throughput, and error flow" }), _jsx("div", { className: "mt-6 grid grid-cols-6 gap-2", children: [22, 48, 36, 52, 30, 60].map((height, index) => (_jsx("div", { className: "rounded-lg bg-cyan-400/70", style: { height: `${height}px` } }, `bar-${index}`))) })] }), _jsxs("div", { className: "rounded-2xl border border-slate-200/70 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5", children: [_jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Trace Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold", children: "Waterfall breakdown of distributed calls" }), _jsx("div", { className: "mt-6 space-y-2", children: [70, 50, 90].map((width, index) => (_jsx("div", { className: "h-3 rounded-full bg-emerald-400/70", style: { width: `${width}%` } }, `trace-${index}`))) })] })] }), _jsxs("div", { className: "mt-16 rounded-3xl border border-slate-200/70 bg-gradient-to-r from-white via-slate-100 to-white p-10 text-center dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900", children: [_jsx("div", { className: "text-2xl font-semibold", children: "Ready to instrument your infrastructure?" }), _jsx("p", { className: "mt-3 text-sm text-slate-600 dark:text-slate-300", children: "Stream traces, visualize dependencies, and respond to incidents in minutes." }), _jsx("div", { className: "mt-6", children: _jsx(Link, { to: "/auth", className: "rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900", children: "Sign In to Continue" }) })] })] }) }));
};
