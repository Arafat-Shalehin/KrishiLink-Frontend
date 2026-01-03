import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxios from "../Hooks/useAxios";
import EachCrops from "./EachCrops";
import LatestCropSkeleton from "./Skeleton/LatestCropSkeleton";

const LatestCrop = () => {
  const [sixCrops, setSixCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const instance = useAxios();

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    instance
      .get("/sixCrops")
      .then((res) => {
        if (!mounted) return;
        setSixCrops(res.data);
      })
      .catch((error) => {
        console.error(error);
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
    <motion.section
      className="bg-[var(--color-bg)]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-[var(--color-secondary)]">
            Fresh arrivals
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Latest Crop Posts
          </h1>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[var(--color-accent)]" />

          <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
            Browse newly listed crops from farmers and explore the best deals.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10">
          {loading ? (
            <LatestCropSkeleton count={6} />
          ) : (
            <div className="grid gap-2 md:gap-5 grid-cols-2 lg:grid-cols-3 lg:mx-12">
              {sixCrops.map((crops) => (
                <EachCrops key={crops._id} crops={crops} />
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex justify-center">
          <Link to="/all-crops">
            <button
              className={[
                "text-sm sm:text-lg lg:text-xl inline-flex items-center justify-center rounded-full border px-10 py-3 font-semibold transition-colors",
                "border-[var(--color-secondary)] text-[var(--color-secondary)]",
                "hover:bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
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
