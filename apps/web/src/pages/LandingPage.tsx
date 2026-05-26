import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ── animation variants ─────────────────────────────── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
const rise = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

/* ── animated counter ───────────────────────────────── */
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const controls = animate(count, target, { duration: 2.4, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => { controls.stop(); unsub(); };
  }, [count, rounded, target]);
  return <span>{display}{suffix}</span>;
};

/* ── floating particles canvas ──────────────────────── */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { canvas.width = canvas.offsetWidth * dpr; canvas.height = canvas.offsetHeight * dpr; ctx.scale(dpr, dpr); };
    resize();
    window.addEventListener("resize", resize);
    const dots: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    for (let i = 0; i < 60; i++) dots.push({ x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.8 + 0.6, o: Math.random() * 0.5 + 0.15 });
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.offsetWidth) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.offsetHeight) d.vy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,237,146,${d.o})`; ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.strokeStyle = `rgba(216,243,220,${0.08 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ── glowing network SVG ────────────────────────────── */
const HeroNetwork = () => {
  const nodes = [
    { x: 80, y: 90, label: "Gateway" }, { x: 220, y: 50, label: "Auth" },
    { x: 360, y: 90, label: "API" }, { x: 220, y: 150, label: "DB" },
    { x: 500, y: 70, label: "Cache" }, { x: 500, y: 140, label: "Queue" },
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [2, 5], [4, 5]];
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-[#d9ed92]/10 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#0d0d0d] dark:from-[#050505] dark:via-[#080808] dark:to-[#0a0a0a] light:from-emerald-50 light:to-green-50">
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <svg viewBox="0 0 580 200" className="h-full w-full">
          <defs>
            <linearGradient id="nodeGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#d9ed92" /><stop offset="100%" stopColor="#d8f3dc" /></linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <radialGradient id="pulse" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#d9ed92" stopOpacity="0.3" /><stop offset="100%" stopColor="#d9ed92" stopOpacity="0" /></radialGradient>
          </defs>
          {edges.map(([a, b], i) => (
            <motion.line key={`e${i}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#d8f3dc" strokeWidth="1" strokeOpacity="0.15" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }} />
          ))}
          {edges.map(([a, b], i) => (
            <motion.circle key={`p${i}`} r="2.5" fill="#d9ed92" filter="url(#glow)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0], cx: [nodes[a].x, nodes[b].x], cy: [nodes[a].y, nodes[b].y] }} transition={{ duration: 2.5, delay: 1 + i * 0.4, repeat: Infinity, repeatDelay: 1.5 }} />
          ))}
          {nodes.map((n, i) => (
            <g key={`n${i}`}>
              <motion.circle cx={n.x} cy={n.y} r="22" fill="url(#pulse)" initial={{ scale: 0 }} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }} />
              <motion.circle cx={n.x} cy={n.y} r="6" fill="url(#nodeGrad)" filter="url(#glow)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }} />
              <text x={n.x} y={n.y + 20} textAnchor="middle" className="fill-[#d8f3dc]/50 dark:fill-[#d8f3dc]/50" style={{ fontSize: "8px", fontFamily: "monospace" }}>{n.label}</text>
            </g>
          ))}
        </svg>
      </motion.div>
      <div className="absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.25em] text-[#d9ed92]/40 font-mono">Live Request Flow</div>
    </div>
  );
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
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-[#d8f3dc] dark:bg-[#050505] dark:text-[#d8f3dc]
      light-mode">
      {/* particle canvas */}
      <ParticleField />

      {/* subtle radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#d9ed92]/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#d8f3dc]/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 py-12 sm:py-20">

        {/* ─── nav ─── */}
        <motion.nav initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#d9ed92] to-[#d8f3dc] flex items-center justify-center">
              <span className="text-[#050505] text-sm font-black">G</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#d9ed92]">Graphyn</span>
          </div>
          <Link to="/auth"
            className="rounded-full border border-[#d9ed92]/20 bg-[#d9ed92]/5 px-5 py-2 text-xs font-semibold text-[#d9ed92] uppercase tracking-wider backdrop-blur-sm transition-all hover:bg-[#d9ed92]/10 hover:border-[#d9ed92]/40 hover:shadow-[0_0_20px_rgba(217,237,146,0.1)]">
            Sign In
          </Link>
        </motion.nav>

        {/* ─── hero ─── */}
        <motion.section variants={stagger} initial="hidden" animate="visible" className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
          <motion.div variants={rise}>
            <motion.div variants={rise} className="inline-flex items-center gap-2 rounded-full border border-[#d9ed92]/15 bg-[#d9ed92]/5 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9ed92] animate-pulse" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9ed92]/80">Now in Public Beta</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight">
              <span className="text-[#d9ed92]">Realtime</span>{" "}
              <span className="text-[#d8f3dc]">infrastructure observability</span>{" "}
              <span className="text-[#d8f3dc]/60">for modern API systems.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#d8f3dc]/50 max-w-lg">
              Stream traces, visualize service chains, and respond to latency spikes with a focused command center built for engineers.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/auth"
                className="group relative rounded-full bg-gradient-to-r from-[#d9ed92] to-[#d8f3dc] px-7 py-3.5 text-sm font-bold text-[#050505] transition-all hover:shadow-[0_0_30px_rgba(217,237,146,0.25)] active:scale-[0.97]">
                Get Started Free
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/auth"
                className="rounded-full border border-[#d8f3dc]/15 px-7 py-3.5 text-sm font-semibold text-[#d8f3dc]/70 backdrop-blur-sm transition-all hover:border-[#d8f3dc]/30 hover:text-[#d8f3dc]">
                View Live Demo →
              </Link>
            </div>
          </motion.div>
          <motion.div variants={scaleIn}>
            <HeroNetwork />
          </motion.div>
        </motion.section>

        {/* ─── stats bar ─── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <motion.div variants={rise} key={s.label}
              className="text-center rounded-2xl border border-[#d9ed92]/8 bg-[#d9ed92]/[0.03] p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-[#d9ed92] font-mono">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#d8f3dc]/35">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── features ─── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="mt-28 grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <motion.div variants={rise} key={f.title}
              className="group relative rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0a0a0a] to-[#080808] p-7 transition-all duration-300 hover:border-[#d9ed92]/20 hover:shadow-[0_0_40px_rgba(217,237,146,0.04)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d9ed92]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-2xl mb-4">{f.icon}</div>
                <div className="text-base font-semibold text-[#d9ed92]">{f.title}</div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#d8f3dc]/45">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── architecture + SDK ─── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="mt-28 grid gap-6 md:grid-cols-2">
          <motion.div variants={rise}
            className="rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-7">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono">Architecture Preview</div>
            <div className="mt-3 text-lg font-semibold text-[#d9ed92]">Graph view of distributed calls</div>
            <div className="mt-6 h-40 rounded-xl border border-[#d8f3dc]/6 bg-[#050505] flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 80" className="w-3/4 h-auto opacity-40">
                {[[30,40,80,25],[80,25,140,55],[140,55,170,30],[80,25,50,60]].map(([x1,y1,x2,y2],i) => (
                  <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d9ed92" strokeWidth="1" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.5,delay:i*0.3}} />
                ))}
                {[[30,40],[80,25],[140,55],[170,30],[50,60]].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r="4" fill="#d8f3dc" opacity="0.6" />
                ))}
              </svg>
            </div>
          </motion.div>
          <motion.div variants={rise}
            className="rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-7">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono">SDK Preview</div>
            <div className="mt-3 text-lg font-semibold text-[#d9ed92]">Instrument in minutes</div>
            <pre className="mt-6 rounded-xl border border-[#d8f3dc]/6 bg-[#050505] p-5 text-xs leading-relaxed font-mono overflow-x-auto">
              <span className="text-[#d9ed92]/60">import</span> <span className="text-[#d8f3dc]">{"{ track }"}</span> <span className="text-[#d9ed92]/60">from</span> <span className="text-[#d8f3dc]/70">"@graphyn/sdk"</span>{"\n\n"}
              <span className="text-[#d9ed92]/60">track</span>({"{"}
              {"\n"}{"  "}traceId: <span className="text-[#d8f3dc]/70">"trace_abc123"</span>,
              {"\n"}{"  "}service: <span className="text-[#d8f3dc]/70">"auth-service"</span>,
              {"\n"}{"  "}latency: <span className="text-[#d9ed92]">42</span>,
              {"\n"}{"  "}status:  <span className="text-[#d8f3dc]/70">"success"</span>
              {"\n"}{"}"});
            </pre>
          </motion.div>
        </motion.div>

        {/* ─── analytics + trace preview ─── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 md:grid-cols-2">
          <motion.div variants={rise}
            className="rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0a0a0a] to-[#080808] p-7">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono">Analytics Preview</div>
            <div className="mt-3 text-lg font-semibold text-[#d9ed92]">Latency, throughput, and error flow</div>
            <div className="mt-6 flex items-end gap-2 h-16">
              {[22, 48, 36, 52, 30, 60, 44, 38].map((h, i) => (
                <motion.div key={i} className="flex-1 rounded-md bg-gradient-to-t from-[#d9ed92]/50 to-[#d8f3dc]/30"
                  initial={{ height: 0 }} whileInView={{ height: `${h}px` }}
                  viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }} />
              ))}
            </div>
          </motion.div>
          <motion.div variants={rise}
            className="rounded-2xl border border-[#d8f3dc]/8 bg-gradient-to-br from-[#0a0a0a] to-[#080808] p-7">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d9ed92]/40 font-mono">Trace Preview</div>
            <div className="mt-3 text-lg font-semibold text-[#d9ed92]">Waterfall breakdown of distributed calls</div>
            <div className="mt-6 space-y-2.5">
              {[{ w: 70, label: "gateway" }, { w: 50, label: "auth-svc" }, { w: 90, label: "db-query" }].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#d8f3dc]/30 w-16 text-right">{t.label}</span>
                  <motion.div className="h-2.5 rounded-full bg-gradient-to-r from-[#d9ed92]/60 to-[#d8f3dc]/40"
                    initial={{ width: 0 }} whileInView={{ width: `${t.w}%` }}
                    viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: "easeOut" }} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ─── CTA ─── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-28 relative rounded-3xl border border-[#d9ed92]/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d9ed92]/[0.04] via-transparent to-[#d8f3dc]/[0.04]" />
          <div className="relative p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#d9ed92]">Ready to instrument your infrastructure?</h2>
            <p className="mt-4 text-sm text-[#d8f3dc]/40 max-w-md mx-auto">
              Stream traces, visualize dependencies, and respond to incidents in minutes — not hours.
            </p>
            <div className="mt-8">
              <Link to="/auth"
                className="inline-block rounded-full bg-gradient-to-r from-[#d9ed92] to-[#d8f3dc] px-8 py-4 text-sm font-bold text-[#050505] transition-all hover:shadow-[0_0_40px_rgba(217,237,146,0.2)] active:scale-[0.97]">
                Sign In to Continue
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ─── footer ─── */}
        <div className="mt-20 pb-8 text-center text-[11px] text-[#d8f3dc]/20 uppercase tracking-[0.2em] font-mono">
          © 2026 Graphyn — Built for engineers who ship.
        </div>
      </div>
    </div>
  );
};
