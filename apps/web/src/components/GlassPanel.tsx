import { PropsWithChildren } from "react";

export const GlassPanel = ({ children }: PropsWithChildren) => {
  return (
    <div className="glass rounded-2xl border border-slate-200/70 p-6 shadow-glass dark:border-white/10">
      {children}
    </div>
  );
};
