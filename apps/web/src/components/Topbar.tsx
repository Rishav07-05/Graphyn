import { ThemeToggle } from "./ThemeToggle";
import { ProfileMenu } from "./ProfileMenu";

export const Topbar = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200/60 px-8 py-4 dark:border-white/10">
      <div>
        <div className="text-sm text-slate-500 dark:text-slate-400">Realtime Observability</div>
        <div className="text-lg font-semibold text-slate-900 dark:text-white">Graphyn Control Center</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-200">
          Live
        </div>
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
};
