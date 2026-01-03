// CropsDetailsSkeleton.jsx
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

const CropsDetailsSkeleton = ({ interestRows = 4 }) => {
  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 py-8 mt-15">
        {/* Main Details Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2">
            <SkeletonBlock className="h-72 w-full md:h-full md:min-h-[420px] rounded-none" />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <SkeletonBlock className="h-8 w-3/4 rounded-lg" />
              <SkeletonBlock className="mt-3 h-4 w-full" />
              <SkeletonBlock className="mt-2 h-4 w-11/12" />
              <SkeletonBlock className="mt-2 h-4 w-10/12" />

              <div className="mt-6 space-y-3">
                <SkeletonBlock className="h-4 w-1/2" />
                <SkeletonBlock className="h-4 w-2/3" />
                <SkeletonBlock className="h-4 w-1/2" />
                <SkeletonBlock className="h-4 w-2/3" />
              </div>
            </div>

            {/* Owner info */}
            <div className="mt-6 border-t border-[var(--color-border)] pt-4">
              <SkeletonBlock className="h-5 w-40" />
              <SkeletonBlock className="mt-3 h-4 w-2/3" />
              <SkeletonBlock className="mt-2 h-4 w-3/4" />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <SkeletonBlock className="h-11 w-full sm:w-1/2 rounded-lg" />
              <SkeletonBlock className="h-11 w-full sm:w-1/2 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Interested People Section */}
        <div className="mt-16 sm:mt-20">
          <SkeletonBlock className="h-7 w-[min(520px,90%)] rounded-lg" />

          <div className="mt-8 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
            {/* Table header */}
            <div className="bg-[var(--color-bg)] border-b border-[var(--color-border)] px-4 py-3">
              <div className="grid grid-cols-4 gap-4">
                <SkeletonBlock className="h-4 w-16" />
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-4 w-20" />
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[var(--color-border)]">
              {Array.from({ length: interestRows }).map((_, i) => (
                <div key={i} className="px-4 py-4">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <SkeletonBlock className="h-4 w-10" />
                    <div className="space-y-2">
                      <SkeletonBlock className="h-4 w-40" />
                      <SkeletonBlock className="h-3 w-52" />
                    </div>
                    <SkeletonBlock className="h-4 w-20" />
                    <SkeletonBlock className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <span className="sr-only">Loading crop details...</span>

        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default CropsDetailsSkeleton;
