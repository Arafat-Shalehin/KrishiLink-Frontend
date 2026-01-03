// AddCropsSkeleton.jsx
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

const AddCropsSkeleton = () => {
  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-4xl mx-auto mt-30 mb-15 px-4">
        <div
          role="status"
          aria-label="Loading add crop form"
          aria-busy="true"
          className="p-6 sm:p-8 rounded-2xl shadow-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          {/* Title */}
          <div className="text-center">
            <SkeletonBlock className="mx-auto h-9 w-56 rounded-lg" />
            <SkeletonBlock className="mx-auto mt-3 h-4 w-[min(520px,90%)] rounded" />
          </div>

          {/* Form skeleton */}
          <div className="mt-8 space-y-5">
            {/* Crop Name */}
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-11 w-full rounded-xl" />
            </div>

            {/* Type & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-16" />
                <SkeletonBlock className="h-11 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-16" />
                <SkeletonBlock className="h-11 w-full rounded-xl" />
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-11 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="h-11 w-full rounded-xl" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-24 w-full rounded-xl" />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-11 w-full rounded-xl" />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-11 w-full rounded-xl" />
            </div>

            {/* Preview placeholder */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <SkeletonBlock className="mx-auto h-4 w-24" />
              <SkeletonBlock className="mt-4 h-44 w-full rounded-xl" />
            </div>

            {/* Submit button */}
            <SkeletonBlock className="h-12 w-full rounded-xl" />
          </div>

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

export default AddCropsSkeleton;
