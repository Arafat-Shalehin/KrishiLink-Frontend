// LatestCropSkeleton.jsx
import React from "react";

const SkeletonBlock = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={[
      "relative overflow-hidden rounded-md",
      // base skeleton color (works in light/dark via your CSS vars)
      "bg-[color-mix(in_srgb,var(--color-muted)_18%,transparent)]",
      "dark:bg-[color-mix(in_srgb,var(--color-muted)_24%,transparent)]",
      // shimmer
      "before:absolute before:inset-0",
      "before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
      "dark:before:via-white/10",
      className,
    ].join(" ")}
  />
);

const CropCardSkeleton = () => (
  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
    <SkeletonBlock className="h-40 w-full rounded-xl sm:h-44" />
    <div className="mt-4 space-y-3">
      <SkeletonBlock className="h-4 w-3/4" />
      <SkeletonBlock className="h-3.5 w-full" />
      <SkeletonBlock className="h-3.5 w-5/6" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <SkeletonBlock className="h-8 w-full rounded-lg" />
        <SkeletonBlock className="h-8 w-full rounded-lg" />
      </div>

      <SkeletonBlock className="mt-4 h-10 w-full rounded-full" />
    </div>
  </div>
);

const LatestCropSkeleton = ({ count = 6 }) => {
  return (
    <div
      role="status"
      aria-label="Loading latest crop posts"
      aria-busy="true"
      className="mt-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
          <CropCardSkeleton key={idx} />
        ))}
      </div>

      <span className="sr-only">Loading...</span>

      {/* Keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LatestCropSkeleton;
