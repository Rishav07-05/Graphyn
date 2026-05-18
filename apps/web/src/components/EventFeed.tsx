import { useAppStore } from "../store/useAppStore";
import { StatBadge } from "./StatBadge";

export const EventFeed = () => {
  const traffic = useAppStore((state) => state.traffic);

  return (
    <div className="space-y-3">
      {traffic.length === 0 ? (
        <div className="text-sm text-slate-500 dark:text-slate-400">No live traffic yet.</div>
      ) : (
        traffic.map((event) => (
          <div
            key={`${event.traceId}-${event.timestamp}`}
            className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5"
          >
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">{event.service}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{event.traceId}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-600 dark:text-slate-300">{event.latency}ms</div>
              <StatBadge status={event.status} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
