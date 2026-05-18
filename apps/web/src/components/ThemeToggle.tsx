import { useTheme } from "../app/theme";

export const ThemeToggle = () => {
  const { mode, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-slate-200/80 bg-slate-100 px-4 py-2 text-xs uppercase tracking-wide text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
    >
      {mode === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
};
