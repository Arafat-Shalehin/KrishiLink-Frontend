// MyInterestSkeleton.jsx
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

const RowSkeleton = () => (
  <tr className="border-b border-[var(--color-border)]">
    <td className="py-3 px-4">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="h-12 w-12 rounded-lg" />
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-3 w-28" />
        </div>
      </div>
    </td>
    <td className="py-3 px-4">
      <SkeletonBlock className="h-4 w-28" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBlock className="h-4 w-20" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBlock className="h-4 w-16" />
    </td>
    <td className="py-3 px-4">
      <SkeletonBlock className="h-4 w-56" />
    </td>
    <td className="py-3 px-4 text-center">
      <SkeletonBlock className="h-6 w-20 rounded-full mx-auto" />
    </td>
  </tr>
);

const MyInterestSkeleton = ({ rows = 6 }) => {
  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <div className="mt-15 text-center">
          <SkeletonBlock className="mx-auto h-9 w-56 rounded-lg" />
        </div>

        {/* Top meta */}
        <div className="mt-6 mb-6 flex items-center justify-between">
          <SkeletonBlock className="h-5 w-44 rounded" />
          <div />
        </div>

        {/* Table card */}
        <div
          role="status"
          aria-label="Loading interests"
          aria-busy="true"
          className="overflow-x-auto bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl rounded-2xl p-4"
        >
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                <th className="py-3 px-4">
                  <SkeletonBlock className="h-4 w-16" />
                </th>
                <th className="py-3 px-4">
                  <SkeletonBlock className="h-4 w-16" />
                </th>
                <th className="py-3 px-4">
                  <SkeletonBlock className="h-4 w-14" />
                </th>
                <th className="py-3 px-4">
                  <SkeletonBlock className="h-4 w-20" />
                </th>
                <th className="py-3 px-4">
                  <SkeletonBlock className="h-4 w-20" />
                </th>
                <th className="py-3 px-4 text-center">
                  <SkeletonBlock className="h-4 w-16 mx-auto" />
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: rows }).map((_, i) => (
                <RowSkeleton key={i} />
              ))}
            </tbody>
          </table>

          <span className="sr-only">Loading...</span>

          <style>{`
            @keyframes shimmer {
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default MyInterestSkeleton;
