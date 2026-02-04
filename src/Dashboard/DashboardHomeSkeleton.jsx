import React from "react";
import { motion } from "framer-motion";

const SkeletonBlock = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={[
      "relative overflow-hidden rounded-md",
      "bg-muted/10",
      "dark:bg-muted/10",
      "before:absolute before:inset-0",
      "before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
      "dark:before:via-white/5",
      className,
    ].join(" ")}
  />
);

const StatCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="rounded-xl border border-border bg-card shadow-sm h-32 p-6 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start">
      <SkeletonBlock className="h-4 w-24 rounded" />
      <SkeletonBlock className="h-8 w-8 rounded-lg" />
    </div>
    <SkeletonBlock className="h-8 w-16 rounded mt-2" />
  </motion.div>
);

const ChartSkeleton = () => (
  <div className="rounded-xl border border-border bg-card shadow-sm h-[400px] p-6 flex flex-col">
    <SkeletonBlock className="h-6 w-48 rounded mb-6" />
    <div className="flex-1 flex items-end gap-4 px-4 pb-2">
       {/* Fake bars */}
       {[...Array(7)].map((_, i) => (
          <SkeletonBlock key={i} className={`w-full rounded-t-lg h-[${Math.floor(Math.random() * 60 + 30)}%]`} />
       ))}
    </div>
  </div>
);

const DashboardHomeSkeleton = ({ cards = 3 }) => {
  return (
    <div className="p-4 sm:p-8 space-y-8 min-h-screen">
      {/* Header Skeleton */}
      {/* <div className="space-y-2">
         <SkeletonBlock className="h-10 w-64 rounded-lg" />
         <SkeletonBlock className="h-5 w-96 rounded-lg" />
      </div> */}

      <div className="space-y-8">
        {/* Stat cards */}
        <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${cards === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {Array.from({ length: cards }).map((_, idx) => (
            <StatCardSkeleton key={idx} />
          ))}
        </div>

        {/* Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2">
                <ChartSkeleton />
             </div>
             <div className="hidden lg:block">
                 <div className="rounded-xl border border-border bg-card shadow-sm h-[200px] p-6 mb-6 flex flex-col justify-center space-y-4">
                     <SkeletonBlock className="h-12 w-12 rounded-full mx-auto" />
                     <SkeletonBlock className="h-6 w-32 rounded mx-auto" />
                     <SkeletonBlock className="h-10 w-full rounded-lg" />
                 </div>
             </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default DashboardHomeSkeleton;
