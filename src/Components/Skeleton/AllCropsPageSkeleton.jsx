// AllCropsPageSkeleton.jsx
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

const CropCardSkeleton = () => (
  <div
    className="flex flex-col rounded-2xl overflow-hidden shadow-md border border-[var(--color-border)]
      bg-[var(--color-surface)] h-full"
  >
    {/* image container */}
    <div className="relative w-full aspect-[4/3]">
      <SkeletonBlock className="h-full w-full rounded-none" />
    </div>

    {/* text container */}
    <div className="flex flex-col flex-1 p-4 sm:p-5">
      <SkeletonBlock className="h-6 w-3/4 rounded mb-4" />
      
      <div className="space-y-2 mb-6">
        <SkeletonBlock className="h-4 w-1/2 rounded" />
        <SkeletonBlock className="h-4 w-1/3 rounded" />
      </div>
      
      <div className="mt-auto w-full">
        <SkeletonBlock className="h-8 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

const AllCropsPageSkeleton = ({ cards = 12 }) => {
  return (
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: cards }).map((_, i) => (
        <CropCardSkeleton key={i} />
      ))}

      <span className="sr-only">Loading crops...</span>

      {/* Keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default AllCropsPageSkeleton;
