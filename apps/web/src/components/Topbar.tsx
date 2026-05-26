import { ThemeToggle } from "./ThemeToggle";
import { ProfileMenu } from "./ProfileMenu";

export const Topbar = () => {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 lg:px-8 backdrop-blur-xl transition-colors duration-300"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg-base) 80%, transparent)', borderBottom: '1px solid var(--border)' }}
    >
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] font-mono" style={{ color: 'var(--text-muted)' }}>Realtime Observability</div>
        <div className="text-base font-semibold mt-0.5" style={{ color: 'var(--accent)' }}>Control Center</div>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-full px-3.5 py-1.5 backdrop-blur-sm"
          style={{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--pulse-dot)' }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--accent)' }}>Live</span>
        </div>
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
};
