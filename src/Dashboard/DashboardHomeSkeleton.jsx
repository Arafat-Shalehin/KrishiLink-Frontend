import React from "react";
import { motion } from "framer-motion";

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

const StatCardSkeleton = () => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
  >
    <div className="p-4 flex items-center justify-between">
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-7 w-16 rounded-lg" />
      </div>
      <SkeletonBlock className="h-9 w-9 rounded-full" />
    </div>
  </motion.div>
);

const ChartSkeleton = () => (
  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
    <div className="p-4">
      <SkeletonBlock className="h-5 w-48" />
      <div className="mt-4 space-y-3">
        {/* Fake bars */}
        <SkeletonBlock className="h-6 w-[90%] rounded-lg" />
        <SkeletonBlock className="h-6 w-[75%] rounded-lg" />
        <SkeletonBlock className="h-6 w-[60%] rounded-lg" />
        <SkeletonBlock className="h-6 w-[85%] rounded-lg" />
      </div>
    </div>
  </div>
);

const DashboardHomeSkeleton = ({ cards = 3 }) => {
  return (
    <section
      role="status"
      aria-label="Loading dashboard overview"
      aria-busy="true"
      className="p-6 space-y-6"
    >
      {/* Title */}
      {/* <SkeletonBlock className="h-9 w-64 rounded-lg" /> */}

      {/* Stat cards */}
      <div
        className={`grid gap-6 ${cards === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}
      >
        {Array.from({ length: cards }).map((_, idx) => (
          <StatCardSkeleton key={idx} />
        ))}
      </div>

      {/* Chart */}
      <ChartSkeleton />

      <span className="sr-only">Loading...</span>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default DashboardHomeSkeleton;
