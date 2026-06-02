import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
/* ── animation variants ─────────────────────────────── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
const rise = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
/* ── animated counter ───────────────────────────────── */
const Counter = ({ target, suffix = "" }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
    const [display, setDisplay] = useState("0");
    useEffect(() => {
        const controls = animate(count, target, { duration: 2.4, ease: "easeOut" });
        const unsub = rounded.on("change", setDisplay);
        return () => { controls.stop(); unsub(); };
    }, [count, rounded, target]);
    return _jsxs("span", { children: [display, suffix] });
};
/* ── floating particles canvas ──────────────────────── */
const ParticleField = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        let animId;
        const dpr = window.devicePixelRatio || 1;
        const resize = () => { canvas.width = canvas.offsetWidth * dpr; canvas.height = canvas.offsetHeight * dpr; ctx.scale(dpr, dpr); };
        resize();
        window.addEventListener("resize", resize);
        const dots = [];
        for (let i = 0; i < 60; i++)
            dots.push({ x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.8 + 0.6, o: Math.random() * 0.5 + 0.15 });
        const draw = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            dots.forEach((d) => {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < 0 || d.x > canvas.offsetWidth)
                    d.vx *= -1;
                if (d.y < 0 || d.y > canvas.offsetHeight)
                    d.vy *= -1;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(217,237,146,${d.o})`;
                ctx.fill();
            });
            for (let i = 0; i < dots.length; i++)
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y, dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.strokeStyle = `rgba(216,243,220,${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, []);
    return _jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full pointer-events-none" });
};
/* ── glowing network SVG ────────────────────────────── */
const HeroNetwork = () => {
    const nodes = [
        { x: 80, y: 90, label: "Gateway" }, { x: 220, y: 50, label: "Auth" },
        { x: 360, y: 90, label: "API" }, { x: 220, y: 150, label: "DB" },
        { x: 500, y: 70, label: "Cache" }, { x: 500, y: 140, label: "Queue" },
    ];
    const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [2, 5], [4, 5]];
    return (_jsxs("div", { className: "relative h-72 w-full overflow-hidden rounded-3xl border border-[#d9ed92]/10 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#0d0d0d] dark:from-[#050505] dark:via-[#080808] dark:to-[#0a0a0a] light:from-emerald-50 light:to-green-50", children: [_jsx(motion.div, { className: "absolute inset-0", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.5 }, children: _jsxs("svg", { viewBox: "0 0 580 200", className: "h-full w-full", children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "nodeGrad", x1: "0", x2: "1", y1: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#d9ed92" }), _jsx("stop", { offset: "100%", stopColor: "#d8f3dc" })] }), _jsxs("filter", { id: "glow", children: [_jsx("feGaussianBlur", { stdDeviation: "4", result: "blur" }), _jsxs("feMerge", { children: [_jsx("feMergeNode", { in: "blur" }), _jsx("feMergeNode", { in: "SourceGraphic" })] })] }), _jsxs("radialGradient", { id: "pulse", cx: "50%", cy: "50%", r: "50%", children: [_jsx("stop", { offset: "0%", stopColor: "#d9ed92", stopOpacity: "0.3" }), _jsx("stop", { offset: "100%", stopColor: "#d9ed92", stopOpacity: "0" })] })] }), edges.map(([a, b], i) => (_jsx(motion.line, { x1: nodes[a].x, y1: nodes[a].y, x2: nodes[b].x, y2: nodes[b].y, stroke: "#d8f3dc", strokeWidth: "1", strokeOpacity: "0.15", initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.2, delay: 0.3 + i * 0.1 } }, `e${i}`))), edges.map(([a, b], i) => (_jsx(motion.circle, { r: "2.5", fill: "#d9ed92", filter: "url(#glow)", initial: { opacity: 0 }, animate: { opacity: [0, 1, 1, 0], cx: [nodes[a].x, nodes[b].x], cy: [nodes[a].y, nodes[b].y] }, transition: { duration: 2.5, delay: 1 + i * 0.4, repeat: Infinity, repeatDelay: 1.5 } }, `p${i}`))), nodes.map((n, i) => (_jsxs("g", { children: [_jsx(motion.circle, { cx: n.x, cy: n.y, r: "22", fill: "url(#pulse)", initial: { scale: 0 }, animate: { scale: [1, 1.4, 1] }, transition: { duration: 3, delay: i * 0.2, repeat: Infinity } }), _jsx(motion.circle, { cx: n.x, cy: n.y, r: "6", fill: "url(#nodeGrad)", filter: "url(#glow)", initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" } }), _jsx("text", { x: n.x, y: n.y + 20, textAnchor: "middle", className: "fill-[#d8f3dc]/50 dark:fill-[#d8f3dc]/50", style: { fontSize: "8px", fontFamily: "monospace" }, children: n.label })] }, `n${i}`)))] }) }), _jsx("div", { className: "absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.25em] text-[#d9ed92]/40 font-mono", children: "Live Request Flow" })] }));
};
/* ── feature data ───────────────────────────────────── */
const features = [
    { icon: "⚡", title: "Realtime Traffic", description: "Stream API activity, websocket flows, and latency spikes the instant they occur." },
    { icon: "🗺️", title: "Service Map", description: "Visualize request chains and infrastructure health with live animated edges." },
    { icon: "🔍", title: "Trace Explorer", description: "Reconstruct distributed traces with waterfall timelines and dependency graphs." },
    { icon: "🧠", title: "AI Insights", description: "Surface bottlenecks and failure explanations with actionable remediation guidance." },
];
const stats = [
    { value: 2400, suffix: "+", label: "Traces / sec" },
    { value: 99, suffix: ".9%", label: "Uptime SLA" },
    { value: 12, suffix: "ms", label: "Avg Latency" },
    { value: 50, suffix: "K", label: "Events / min" },
];
/* ── main landing page ──────────────────────────────── */
export const LandingPage = () => {
    return (_jsxs("div", { className: "relative min-h-screen overflow-hidden bg-[#050505] text-[#d8f3dc] dark:bg-[#050505] dark:text-[#d8f3dc]\n      light-mode", children: [_jsx(ParticleField, {}), _jsxs("div", { className: "pointer-events-none absolute inset-0", children: [_jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#d9ed92]/[0.03] blur-[120px]" }), _jsx("div", { className: "absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#d8f3dc]/[0.02] blur-[100px]" })] }), _jsxs("div", { className: "relative z-10 mx-auto max-w-6xl px-6 sm:px-8 py-12 sm:py-20", children: [_jsxs(motion.nav, { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "flex items-center justify-between mb-20", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 rounded-lg bg-gradient-to-br from-[#d9ed92] to-[#d8f3dc] flex items-center justify-center", children: _jsx("span", { className: "text-[#050505] text-sm font-black", children: "G" }) }), _jsx("span", { className: "text-lg font-bold tracking-tight text-[#d9ed92]", children: "Graphyn" })] }), _jsx(Link, { to: "/auth", className: "rounded-full border border-[#d9ed92]/20 bg-[#d9ed92]/5 px-5 py-2 text-xs font-semibold text-[#d9ed92] uppercase tracking-wider backdrop-blur-sm transition-all hover:bg-[#d9ed92]/10 hover:border-[#d9ed92]/40 hover:shadow-[0_0_20px_rgba(217,237,146,0.1)]", children: "Sign In" })] }), _jsxs(motion.section, { variants: stagger, initial: "hidden", animate: "visible", className: "grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center", children: [_jsxs(motion.div, { variants: rise, children: [_jsxs(motion.div, { variants: rise, className: "inline-flex items-center gap-2 rounded-full border border-[#d9ed92]/15 bg-[#d9ed92]/5 px-4 py-1.5 mb-8 backdrop-blur-sm", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#d9ed92] animate-pulse" }), _jsx("span", { className: "text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9ed92]/80", children: "Now in Public Beta" })] }), _jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight", children: [_jsx("span", { className: "text-[#d9ed92]", children: "Realtime" }), " ", _jsx("span", { className: "text-[#d8f3dc]", children: "infrastructure observability" }), " ", _jsx("span", { className: "text-[#d8f3dc]/60", children: "for modern API systems." })] }), _jsx("p", { className: "mt-6 text-base sm:text-lg leading-relaxed text-[#d8f3dc]/50 max-w-lg", children: "Stream traces, visualize service chains, and respond to latency spikes with a focused command center built for engineers." }), _jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [_jsxs(Link, { to: "/auth", className: "group relative rounded-full bg-gradient-to-r from-[#d9ed92] to-[#d8f3dc] px-7 py-3.5 text-sm font-bold text-[#050505] transition-all hover:shadow-[0_0_30px_rgba(217,237,146,0.25)] active:scale-[0.97]", children: ["Get Started Free", _jsx("span", { className: "absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" })] }), _jsx(Link, { to: "/auth", className: "rounded-full border border-[#d8f3dc]/15 px-7 py-3.5 text-sm font-semibold text-[#d8f3dc]/70 backdrop-blur-sm transition-all hover:border-[#d8f3dc]/30 hover:text-[#d8f3dc]", children: "View Live Demo \u2192" })] })] }), _jsx(motion.div, { variants: scaleIn, children: _jsx(HeroNetwork, {}) })] }), _jsx(motion.div, { variants: stagger, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" }, className: "mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4", children: stats.map((s) => (_jsxs(motion.div, { variants: rise, className: "text-center rounded-2xl border border-[#d9ed92]/8 bg-[#d9ed92]/[0.03] p-5 backdrop-blur-sm", children: [_jsx("div", { className: "text-2xl sm:text-3xl font-bold text-[#d9ed92] font-mono", children: _jsx(Counter, { target: s.value, suffix: s.suffix }) }), _jsx("div", { className: "mt-1 text-[11px] uppercase tracking-[0.15em] text-[#d8f3dc]/35", children: s.label })] }, s.label))) }), _jsx(motion.div, { variants: stagger, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" }, className: "mt-28 grid gap-5 sm:grid-cols-2", children: features.map((f) => (_jsxs(motion.div, { variants: rise, className: "group relative rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0a0a0a] to-[#080808] p-7 transition-all duration-300 hover:border-[#d9ed92]/20 hover:shadow-[0_0_40px_rgba(217,237,146,0.04)]", children: [_jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d9ed92]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), _jsxs("div", { className: "relative z-10", children: [_jsx("div", { className: "text-2xl mb-4", children: f.icon }), _jsx("div", { className: "text-base font-semibold text-[#d9ed92]", children: f.title }), _jsx("p", { className: "mt-2.5 text-sm leading-relaxed text-[#d8f3dc]/45", children: f.description })] })] }, f.title))) }), _jsxs(motion.div, { variants: stagger, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" }, className: "mt-28 grid gap-6 md:grid-cols-2", children: [_jsxs(motion.div, { variants: rise, className: "rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-7", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono", children: "Architecture Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold text-[#d9ed92]", children: "Graph view of distributed calls" }), _jsx("div", { className: "mt-6 h-40 rounded-xl border border-[#d8f3dc]/6 bg-[#050505] flex items-center justify-center overflow-hidden", children: _jsxs("svg", { viewBox: "0 0 200 80", className: "w-3/4 h-auto opacity-40", children: [[[30, 40, 80, 25], [80, 25, 140, 55], [140, 55, 170, 30], [80, 25, 50, 60]].map(([x1, y1, x2, y2], i) => (_jsx(motion.line, { x1: x1, y1: y1, x2: x2, y2: y2, stroke: "#d9ed92", strokeWidth: "1", initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.5, delay: i * 0.3 } }, i))), [[30, 40], [80, 25], [140, 55], [170, 30], [50, 60]].map(([cx, cy], i) => (_jsx("circle", { cx: cx, cy: cy, r: "4", fill: "#d8f3dc", opacity: "0.6" }, i)))] }) })] }), _jsxs(motion.div, { variants: rise, className: "rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-7", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono", children: "SDK Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold text-[#d9ed92]", children: "Instrument in minutes" }), _jsxs("pre", { className: "mt-6 rounded-xl border border-[#d8f3dc]/6 bg-[#050505] p-5 text-xs leading-relaxed font-mono overflow-x-auto", children: [_jsx("span", { className: "text-[#d9ed92]/60", children: "import" }), " ", _jsx("span", { className: "text-[#d8f3dc]", children: "{ track }" }), " ", _jsx("span", { className: "text-[#d9ed92]/60", children: "from" }), " ", _jsx("span", { className: "text-[#d8f3dc]/70", children: "\"@graphyn/sdk\"" }), "\n\n", _jsx("span", { className: "text-[#d9ed92]/60", children: "track" }), "(", "{", "\n", "  ", "traceId: ", _jsx("span", { className: "text-[#d8f3dc]/70", children: "\"trace_abc123\"" }), ",", "\n", "  ", "service: ", _jsx("span", { className: "text-[#d8f3dc]/70", children: "\"auth-service\"" }), ",", "\n", "  ", "latency: ", _jsx("span", { className: "text-[#d9ed92]", children: "42" }), ",", "\n", "  ", "status:  ", _jsx("span", { className: "text-[#d8f3dc]/70", children: "\"success\"" }), "\n", "}", ");"] })] })] }), _jsxs(motion.div, { variants: stagger, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" }, className: "mt-16 grid gap-6 md:grid-cols-2", children: [_jsxs(motion.div, { variants: rise, className: "rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0a0a0a] to-[#080808] p-7", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono", children: "Analytics Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold text-[#d9ed92]", children: "Latency, throughput, and error flow" }), _jsx("div", { className: "mt-6 flex items-end gap-2 h-16", children: [22, 48, 36, 52, 30, 60, 44, 38].map((h, i) => (_jsx(motion.div, { className: "flex-1 rounded-md bg-gradient-to-t from-[#d9ed92]/50 to-[#d8f3dc]/30", initial: { height: 0 }, whileInView: { height: `${h}px` }, viewport: { once: true }, transition: { duration: 0.8, delay: i * 0.08, ease: "easeOut" } }, i))) })] }), _jsxs(motion.div, { variants: rise, className: "rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0a0a0a] to-[#080808] p-7", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono", children: "Trace Preview" }), _jsx("div", { className: "mt-3 text-lg font-semibold text-[#d9ed92]", children: "Waterfall breakdown of distributed calls" }), _jsx("div", { className: "mt-6 space-y-2.5", children: [{ w: 70, label: "gateway" }, { w: 50, label: "auth-svc" }, { w: 90, label: "db-query" }].map((t, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-[10px] font-mono text-[#d8f3dc]/30 w-16 text-right", children: t.label }), _jsx(motion.div, { className: "h-2.5 rounded-full bg-gradient-to-r from-[#d9ed92]/60 to-[#d8f3dc]/40", initial: { width: 0 }, whileInView: { width: `${t.w}%` }, viewport: { once: true }, transition: { duration: 1, delay: 0.2 + i * 0.15, ease: "easeOut" } })] }, i))) })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, className: "mt-28 relative rounded-3xl border border-[#d9ed92]/10 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#d9ed92]/[0.04] via-transparent to-[#d8f3dc]/[0.04]" }), _jsxs("div", { className: "relative p-10 sm:p-14 text-center", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-[#d9ed92]", children: "Ready to instrument your infrastructure?" }), _jsx("p", { className: "mt-4 text-sm text-[#d8f3dc]/40 max-w-md mx-auto", children: "Stream traces, visualize dependencies, and respond to incidents in minutes \u2014 not hours." }), _jsx("div", { className: "mt-8", children: _jsx(Link, { to: "/auth", className: "inline-block rounded-full bg-gradient-to-r from-[#d9ed92] to-[#d8f3dc] px-8 py-4 text-sm font-bold text-[#050505] transition-all hover:shadow-[0_0_40px_rgba(217,237,146,0.2)] active:scale-[0.97]", children: "Sign In to Continue" }) })] })] }), _jsx("div", { className: "mt-20 pb-8 text-center text-[11px] text-[#d8f3dc]/20 uppercase tracking-[0.2em] font-mono", children: "\u00A9 2026 Graphyn \u2014 Built for engineers who ship." })] })] }));
};
