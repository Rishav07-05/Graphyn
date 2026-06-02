import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "Control Center", to: "/app/control-center" },
  { label: "Live Traffic", to: "/app/live" },
  { label: "Service Map", to: "/app/service-map" },
  { label: "Traces", to: "/app/traces" },
  { label: "Analytics", to: "/app/analytics" },
  { label: "Failures", to: "/app/failures" },
  { label: "Logs", to: "/app/logs" },
  { label: "Alerts", to: "/app/alerts" },
  { label: "Settings", to: "/app/settings" },
  { label: "SDK", to: "/app/sdk" },
];

export const Sidebar = () => {
  return (
    <aside
      className="sticky top-0 h-screen w-60 flex-shrink-0 px-4 py-6 flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}>
          <span className="text-sm font-black" style={{ color: 'var(--bg-base)' }}>G</span>
        </div>
        <span className="text-base font-bold tracking-tight" style={{ color: 'var(--accent)' }}>Graphyn</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200`
            }
            style={({ isActive }) => isActive ? {
              backgroundColor: 'var(--accent-bg-hover)',
              color: 'var(--accent)',
              boxShadow: 'inset 0 0 0 1px var(--accent-border)',
            } : {
              color: 'var(--text-muted)',
            }}
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 px-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--pulse-dot)' }} />
          <span className="text-[10px] uppercase tracking-[0.15em] font-mono" style={{ color: 'var(--text-faint)' }}>System Operational</span>
        </div>
      </div>
    </aside>
  );
};
