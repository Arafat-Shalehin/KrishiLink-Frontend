import React from "react";

const SkeletonBlock = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={[
      "relative overflow-hidden rounded-md",
      "bg-[color-mix(in_srgb,var(--color-muted)_18%,transparent)]",
      "dark:bg-[color-mix(in_srgb,var(--color-muted)_24%,transparent)]",
      "before:absolute before:inset-0",
      "before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
      "dark:before:via-white/10",
      className,
    ].join(" ")}
  />
);

const AdminTableSkeleton = ({ titleWidth = "w-56", cols = 4, rows = 8 }) => {
  return (
    <section
      role="status"
      aria-label="Loading admin table"
      aria-busy="true"
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <SkeletonBlock className={`h-8 ${titleWidth} rounded-lg`} />
        <SkeletonBlock className="mt-3 h-4 w-96 rounded" />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <SkeletonBlock className="h-10 w-full rounded-xl" />
        <SkeletonBlock className="h-10 w-full rounded-xl" />
        <SkeletonBlock className="h-10 w-full rounded-xl" />
        <SkeletonBlock className="h-10 w-full rounded-xl" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <SkeletonBlock className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r} className="border-b border-[var(--color-border)]">
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c} className="px-4 py-4">
                    <SkeletonBlock className="h-4 w-full max-w-[180px]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-4 w-40" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-9 w-20 rounded-lg" />
          <SkeletonBlock className="h-9 w-20 rounded-lg" />
        </div>
      </div>

      <span className="sr-only">Loading...</span>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default AdminTableSkeleton;
