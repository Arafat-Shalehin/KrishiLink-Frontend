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
      "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
      "dark:before:via-white/10",
      className,
    ].join(" ")}
  />
);

const CropCardSkeleton = () => (
  <div
    className="flex flex-col md:flex-row items-center justify-evenly gap-5 lg:gap-0
      rounded-2xl overflow-hidden shadow-md border border-[var(--color-border)]
      bg-[var(--color-surface)] p-4 md:p-6"
  >
    {/* image */}
    <SkeletonBlock className="h-40 w-full md:h-28 md:w-40 rounded-lg" />

    {/* text */}
    <div className="w-full space-y-3">
      <SkeletonBlock className="h-6 w-2/3" />
      <SkeletonBlock className="h-5 w-1/2" />
      <SkeletonBlock className="h-5 w-1/3" />
      <SkeletonBlock className="h-10 w-40 rounded" />
    </div>
  </div>
);

const AllCropsPageSkeleton = ({ cards = 9 }) => {
  return (
    <section className="py-10 bg-[var(--color-bg)]">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header skeleton */}
        {/* <div className="text-center">
          <SkeletonBlock className="mx-auto h-10 w-56 rounded-lg" />
          <SkeletonBlock className="mx-auto mt-3 h-4 w-[min(520px,90%)] rounded" />
        </div>

        // Top bar skeleton 
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SkeletonBlock className="h-5 w-44 rounded" />

          <div className="w-full sm:w-[320px]">
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 shadow-sm">
              <SkeletonBlock className="h-5 w-5 rounded" />
              <SkeletonBlock className="h-4 w-full rounded" />
            </div>
          </div>
        </div> */}

        {/* Grid skeleton */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Array.from({ length: cards }).map((_, i) => (
            <CropCardSkeleton key={i} />
          ))}
        </div>

        <span className="sr-only">Loading crops...</span>

        {/* Keyframes for shimmer */}
        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default AllCropsPageSkeleton;
