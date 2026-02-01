// src/Dashboard/farmer/FarmerInterestsSkeleton.jsx
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

const RowSkeleton = () => (
  <tr className="border-t border-(--color-border)">
    <td className="px-4 py-3">
      <SkeletonBlock className="h-4 w-32" />
    </td>

    <td className="px-4 py-3">
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-3 w-40" />
      </div>
    </td>

    <td className="px-4 py-3">
      <SkeletonBlock className="h-4 w-14" />
    </td>

    <td className="px-4 py-3">
      <SkeletonBlock className="h-4 w-56" />
    </td>

    <td className="px-4 py-3">
      <SkeletonBlock className="h-6 w-20 rounded-full" />
    </td>

    <td className="px-4 py-3">
      <div className="flex gap-2">
        <SkeletonBlock className="h-9 w-20 rounded-lg" />
        <SkeletonBlock className="h-9 w-20 rounded-lg" />
      </div>
    </td>
  </tr>
);

const FarmerInterestsSkeleton = ({ rows = 6 }) => {
  return (
    <section
      role="status"
      aria-label="Loading received interests"
      aria-busy="true"
      className="mt-12 rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-xl p-6"
    >
      {/* Title */}
      <div className="text-center">
        <SkeletonBlock className="mx-auto h-8 w-64 rounded-lg" />
        <SkeletonBlock className="mx-auto mt-3 h-4 w-80 rounded" />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full rounded-xl border border-(--color-border) overflow-hidden">
          <thead className="bg-(--color-bg) border-b border-(--color-border)">
            <tr>
              <th className="px-4 py-3 text-left">
                <SkeletonBlock className="h-4 w-16" />
              </th>
              <th className="px-4 py-3 text-left">
                <SkeletonBlock className="h-4 w-16" />
              </th>
              <th className="px-4 py-3 text-left">
                <SkeletonBlock className="h-4 w-20" />
              </th>
              <th className="px-4 py-3 text-left">
                <SkeletonBlock className="h-4 w-20" />
              </th>
              <th className="px-4 py-3 text-left">
                <SkeletonBlock className="h-4 w-16" />
              </th>
              <th className="px-4 py-3 text-left">
                <SkeletonBlock className="h-4 w-16" />
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, idx) => (
              <RowSkeleton key={idx} />
            ))}
          </tbody>
        </table>
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

export default FarmerInterestsSkeleton;
