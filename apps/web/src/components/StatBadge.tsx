interface StatBadgeProps {
  status: "success" | "error" | string;
}

export const StatBadge = ({ status }: StatBadgeProps) => {
  const styles =
    status === "error"
      ? "bg-red-500/20 text-red-700 dark:text-red-200"
      : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-200";

  return (
    <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wide ${styles}`}>
      {status}
    </span>
  );
};
