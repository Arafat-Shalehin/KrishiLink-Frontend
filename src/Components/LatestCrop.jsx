import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import EachCrops from "./EachCrops";
import LatestCropSkeleton from "./Skeleton/LatestCropSkeleton";
import useAxiosSecure from "../Hooks/useAxios";

const LatestCrop = () => {
  const [sixCrops, setSixCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const instance = useAxiosSecure();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(false);

    instance
      .get("/sixCrops")
      .then((res) => {
        if (!mounted) return;
        setSixCrops(res.data.crops || []);
      })
      .catch((error) => {
        console.error(error);
        if (!mounted) return;
        setError(true);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [instance]);

  return (
    /* ── Section entry animation: fade up from slight offset ── */
    <motion.section
      className="bg-(--color-bg)"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-(--color-secondary)">
            Fresh arrivals
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--color-text) sm:text-4xl">
            Latest Crop Posts
          </h1>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-(--color-accent)" />

          <p className="mt-4 text-sm leading-6 text-(--color-muted)">
            Browse newly listed crops from farmers and explore the best deals.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10">
          {loading ? (
            <LatestCropSkeleton count={6} />
          ) : (
            <div className="grid gap-2 md:gap-5 grid-cols-2 lg:grid-cols-3 lg:mx-12">
              {sixCrops.map((crops, index) => (
                <EachCrops key={crops._id} crops={crops} index={index} />
              ))}
            </div>
          )}
          {/* Error State */}
          {!loading && error && (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <h3 className="text-lg font-semibold text-red-600">
                Unable to load latest crops
              </h3>
              <p className="mt-2 text-sm text-red-500">
                Something went wrong while fetching the latest listings. Please
                try again later.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sixCrops.length === 0 && (
            <div className="mx-auto max-w-xl rounded-2xl border border-(--color-border) bg-(--color-surface) p-8 text-center">
              <h3 className="text-lg font-semibold text-(--color-text)">
                No new crops available yet
              </h3>
              <p className="mt-2 text-sm text-(--color-muted)">
                Farmers haven't posted any new crops recently. Please check back
                soon or explore all available listings.
              </p>

              <div className="mt-6">
                <Link to="/all-crops">
                  <button className="rounded-full border border-(--color-secondary) px-6 py-2 text-sm font-semibold text-(--color-secondary) transition hover:bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)]">
                    Browse all crops
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex justify-center">
          <Link to="/all-crops">
            <button
              className={[
                "text-sm sm:text-lg lg:text-xl inline-flex items-center justify-center rounded-full border px-10 py-3 font-semibold transition-colors",
                "border-(--color-secondary) text-(--color-secondary)",
                "hover:bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              ].join(" ")}
            >
              View All
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default LatestCrop;
