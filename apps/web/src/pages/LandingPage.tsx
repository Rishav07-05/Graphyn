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
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <svg viewBox="0 0 600 240" className="h-full w-full">
          <defs>
            <linearGradient id="glow" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#4af0e5" />
              <stop offset="100%" stopColor="#35f1a4" />
            </linearGradient>
          </defs>
          {[80, 180, 320, 460].map((x, index) => (
            <circle key={x} cx={x} cy={120} r={18} fill="url(#glow)" opacity={0.7} />
          ))}
          <motion.path
            d="M80 120 C140 70, 260 170, 320 120 S420 70, 460 120"
            stroke="url(#glow)"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </motion.div>
      <div className="absolute bottom-4 left-6 text-xs uppercase tracking-[0.2em] text-slate-400">
        Live Request Flow
      </div>
    </div>
  );
};

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <motion.div variants={fadeInUp}>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-500 dark:text-cyan-300">
              Graphyn
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-tight">
              Realtime infrastructure observability for modern API systems.
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              Stream traces, visualize service chains, and respond to latency spikes with a
              focused command center for engineers.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/auth"
                className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <HeroNetwork />
          </motion.div>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-lg font-semibold">{feature.title}</div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-100 to-white p-6 dark:border-white/10 dark:from-slate-900 dark:to-slate-950">
            <div className="text-sm text-slate-500 dark:text-slate-400">Architecture Preview</div>
            <div className="mt-3 text-lg font-semibold">Graph view of distributed calls</div>
            <div className="mt-6 h-40 rounded-2xl border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-slate-950/70" />
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-100 to-white p-6 dark:border-white/10 dark:from-slate-900 dark:to-slate-950">
            <div className="text-sm text-slate-500 dark:text-slate-400">SDK Preview</div>
            <div className="mt-3 text-lg font-semibold">Instrument in minutes</div>
            <pre className="mt-6 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-300">
{`import { track } from "@graphyn/sdk";

track({
  traceId: "trace_abc123",
  service: "auth-service",
  latency: 42,
  status: "success"
});`}
            </pre>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm text-slate-500 dark:text-slate-400">Analytics Preview</div>
            <div className="mt-3 text-lg font-semibold">Latency, throughput, and error flow</div>
            <div className="mt-6 grid grid-cols-6 gap-2">
              {[22, 48, 36, 52, 30, 60].map((height, index) => (
                <div
                  key={`bar-${index}`}
                  className="rounded-lg bg-cyan-400/70"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
            <div className="text-sm text-slate-500 dark:text-slate-400">Trace Preview</div>
            <div className="mt-3 text-lg font-semibold">Waterfall breakdown of distributed calls</div>
            <div className="mt-6 space-y-2">
              {[70, 50, 90].map((width, index) => (
                <div
                  key={`trace-${index}`}
                  className="h-3 rounded-full bg-emerald-400/70"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200/70 bg-gradient-to-r from-white via-slate-100 to-white p-10 text-center dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="text-2xl font-semibold">Ready to instrument your infrastructure?</div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Stream traces, visualize dependencies, and respond to incidents in minutes.
          </p>
          <div className="mt-6">
            <Link
              to="/auth"
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
