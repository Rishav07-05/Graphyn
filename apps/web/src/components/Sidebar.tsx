import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "Live Traffic", to: "/app/live" },
  { label: "Service Map", to: "/app/service-map" },
  { label: "Traces", to: "/app/traces" },
  { label: "Analytics", to: "/app/analytics" },
  { label: "Failures", to: "/app/failures" },
  { label: "Logs", to: "/app/logs" },
  { label: "Alerts", to: "/app/alerts" },
  { label: "Settings", to: "/app/settings" },
  { label: "SDK", to: "/app/sdk" }
];

export const Sidebar = () => {
  return (
    <aside className="min-h-screen w-64 border-r border-slate-200/60 bg-white/70 px-6 py-8 dark:border-white/10 dark:bg-slate-950/70">
      <div className="text-xl font-semibold text-slate-900 dark:text-white">Graphyn</div>
      <div className="mt-10 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-cyan-400/20 text-cyan-700 dark:text-cyan-200"
                  : "text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-white/5"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
