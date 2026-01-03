// MyPostPageSkeleton.jsx
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
    <td className="py-2 px-4">
      <SkeletonBlock className="h-16 w-16 rounded-xl" />
    </td>
    <td className="py-2 px-4">
      <SkeletonBlock className="h-4 w-40" />
    </td>
    <td className="py-2 px-4">
      <SkeletonBlock className="h-4 w-20" />
    </td>
    <td className="py-2 px-4">
      <SkeletonBlock className="h-4 w-24" />
    </td>
    <td className="py-2 px-4">
      <SkeletonBlock className="h-4 w-16" />
    </td>
    <td className="py-2 px-4">
      <SkeletonBlock className="h-4 w-24" />
    </td>
    <td className="py-2 px-4">
      <div className="flex items-center justify-center gap-3">
        <SkeletonBlock className="h-9 w-9 rounded-full" />
        <SkeletonBlock className="h-9 w-9 rounded-full" />
      </div>
    </td>
  </tr>
);

const MyPostPageSkeleton = ({ rows = 6 }) => {
  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <div className="mt-20 text-center">
          <SkeletonBlock className="mx-auto h-9 w-44 rounded-lg" />
        </div>

        {/* Table card */}
        <div
          role="status"
          aria-label="Loading posts"
          aria-busy="true"
          className="mt-8 overflow-x-auto bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl rounded-2xl p-4"
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
                  <SkeletonBlock className="h-4 w-12" />
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

export default MyPostPageSkeleton;
