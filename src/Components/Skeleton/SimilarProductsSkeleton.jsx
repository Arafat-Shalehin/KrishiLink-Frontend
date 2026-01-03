// SimilarProductsSkeleton.jsx
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

const SimilarProductCardSkeleton = () => (
  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm">
    <SkeletonBlock className="h-40 w-full rounded-none" />
    <div className="p-4 space-y-3">
      <SkeletonBlock className="h-5 w-2/3" />
      <SkeletonBlock className="h-4 w-1/2" />
      <SkeletonBlock className="h-10 w-full rounded-full" />
    </div>
  </div>
);

const SimilarProductsSkeleton = ({ count = 4 }) => {
  return (
    <div role="status" aria-label="Loading similar products" aria-busy="true">
      {/* Title placeholder (optional) */}
      <div className="mb-4">
        <SkeletonBlock className="h-8 w-72 rounded-lg" />
      </div>

      {/* Matches your Swiper "2 slides per view" vibe */}
      <div className="grid grid-cols-2 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <SimilarProductCardSkeleton key={i} />
        ))}
      </div>

      <span className="sr-only">Loading...</span>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SimilarProductsSkeleton;
