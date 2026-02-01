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
      "before:bg-linear-to-r before:from-transparent before:via-white/25 before:to-transparent",
      "dark:before:via-white/10",
      className,
    ].join(" ")}
  />
);

const KpiSkeleton = () => (
  <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
    <SkeletonBlock className="h-3.5 w-32" />
    <SkeletonBlock className="mt-3 h-7 w-16 rounded-lg" />
    <SkeletonBlock className="mt-2 h-3 w-28" />
  </div>
);

const TableSkeleton = ({ rows = 5, cols = 3 }) => (
  <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) overflow-hidden">
    <div className="border-b border-(--color-border) px-4 py-4 flex items-center justify-between">
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-44" />
        <SkeletonBlock className="h-3 w-64" />
      </div>
      <SkeletonBlock className="h-4 w-16" />
    </div>

    <div className="p-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-(--color-bg) border border-(--color-border)">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-3 py-2">
                <SkeletonBlock className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="border-b border-(--color-border)">
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c} className="px-3 py-3">
                  <SkeletonBlock className="h-3.5 w-full max-w-[200px]" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminOverviewSkeleton = () => {
  return (
    <section
      role="status"
      aria-label="Loading admin overview"
      aria-busy="true"
      className="space-y-6"
    >
      {/* Header */}
      <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <SkeletonBlock className="h-8 w-64 rounded-lg" />
        <SkeletonBlock className="mt-3 h-4 w-[min(680px,90%)]" />
        <div className="mt-4 flex flex-wrap gap-2">
          <SkeletonBlock className="h-10 w-40 rounded-xl" />
          <SkeletonBlock className="h-10 w-40 rounded-xl" />
          <SkeletonBlock className="h-10 w-40 rounded-xl" />
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <KpiSkeleton key={i} />
        ))}
      </div>

      {/* Chart + tables layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart skeleton */}
        <div className="lg:col-span-1 rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
          <SkeletonBlock className="h-4 w-52" />
          <SkeletonBlock className="mt-2 h-3 w-64" />
          <div className="mt-5 space-y-3">
            <SkeletonBlock className="h-6 w-[90%] rounded-lg" />
            <SkeletonBlock className="h-6 w-[70%] rounded-lg" />
            <SkeletonBlock className="h-6 w-[80%] rounded-lg" />
            <SkeletonBlock className="h-6 w-[60%] rounded-lg" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-3">
              <SkeletonBlock className="h-3 w-16" />
              <SkeletonBlock className="mt-2 h-5 w-10 rounded" />
            </div>
            <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-3">
              <SkeletonBlock className="h-3 w-16" />
              <SkeletonBlock className="mt-2 h-5 w-10 rounded" />
            </div>
            <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-3">
              <SkeletonBlock className="h-3 w-16" />
              <SkeletonBlock className="mt-2 h-5 w-10 rounded" />
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="lg:col-span-2 space-y-5">
          <TableSkeleton rows={5} cols={3} />
          <TableSkeleton rows={5} cols={3} />
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

export default AdminOverviewSkeleton;
