import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Loader";
import EachCrops from "../Components/EachCrops";
import AllCropsPageSkeleton from "../Components/AllCropsPageSkeleton";
// import { motion } from "framer-motion";

const AllCropsPage = () => {
  const [allCrops, setAllCrops] = useState([]);
  const [search, setSearch] = useState("");
  const { loading, setLoading } = useContext(AuthContext);
  const instance = useAxios();

  // const sectionVariants = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.15,
  //       delayChildren: 0.2,
  //     },
  //   },
  // };

  useEffect(() => {
    const fetchAllCrops = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/allCrops`);
        setAllCrops(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCrops();
  }, [instance, setLoading]);

  const finalSearch = search.trim().toLowerCase();
  const searchApps = finalSearch
    ? allCrops.filter((crops) => crops.name.toLowerCase().includes(finalSearch))
    : allCrops;

  return (
    <section className="pt-10 bg-[var(--color-bg)]">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--color-text)]">
            All <span className="text-[var(--color-primary)]">Crops</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[var(--color-muted)]">
            Browse all listed crops and quickly search by name.
          </p>
        </div>

        {/* Top bar: count + search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm sm:text-base font-semibold text-[var(--color-muted)]">
            Total Product:{" "}
            <span className="text-[var(--color-text)]">
              {searchApps.length}
            </span>
          </h2>

          <div className="w-full sm:w-[320px]">
            <div
              className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30"
              // If your Tailwind doesn't support /30 on CSS vars, replace with:
              // className="... focus-within:ring-2 focus-within:ring-[var(--color-primary)]"
            >
              <svg
                className="h-5 w-5 text-[var(--color-muted)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                type="search"
                placeholder="Search crops..."
                aria-label="Search crops"
                className="w-full bg-transparent text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Empty state */}
        {searchApps.length === 0 && !loading && (
          <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-text)]">
              No Product Found
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[var(--color-muted)]">
              Try a different keyword or clear the search box.
            </p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <AllCropsPageSkeleton cards={9} />
        ) : (
          <div className="mt-10 w-full grid grid-cols-2 md:grid-cols-3 mx-auto gap-5">
            {searchApps.map((crops) => (
              <EachCrops key={crops._id} crops={crops}></EachCrops>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCropsPage;
