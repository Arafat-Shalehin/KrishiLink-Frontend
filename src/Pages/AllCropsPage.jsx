// src/Pages/AllCropsPage.jsx
import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import EachCrops from "../Components/EachCrops";
import AllCropsPageSkeleton from "../Components/Skeleton/AllCropsPageSkeleton";
import { useAllCrops, useCropFilterOptions } from "../Hooks/crops/useAllCrops";
import { useDebounce } from "../Hooks/crops/useDebounce";

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold Out" },
];

const ITEMS_PER_PAGE = 12;

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const AllCropsPage = () => {
  // URL Search Params for shareable filters
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Mobile filter toggle
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  const debouncedSearch = useDebounce(search, 400);

  // Build params object
  const params = useMemo(
    () => ({
      search: debouncedSearch,
      type,
      location,
      status,
      minPrice,
      maxPrice,
      sort,
      page,
      limit: ITEMS_PER_PAGE,
    }),
    [debouncedSearch, type, location, status, minPrice, maxPrice, sort, page],
  );

  // Fetch crops data
  const { data, isLoading, isError, error, isFetching } = useAllCrops(params);

  // Fetch filter options (types, locations)
  const { data: filterOptions } = useCropFilterOptions();

  // Extract data
  const crops = data?.crops || [];
  const meta = data?.meta || { total: 0, page: 1, limit: ITEMS_PER_PAGE };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  // Dynamic filter options from backend
  const typeOptions = filterOptions?.types || [];
  const locationOptions = filterOptions?.locations || [];

  // Update URL when filters change
  const updateURLParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams();

      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "" && value !== 1) {
          params.set(key, value);
        }
      });

      setSearchParams(params, { replace: true });
    },
    [setSearchParams],
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (key, value) => {
      const newPage = 1; // Reset to page 1 on filter change

      const stateSetters = {
        search: setSearch,
        type: setType,
        location: setLocation,
        status: setStatus,
        minPrice: setMinPrice,
        maxPrice: setMaxPrice,
        sort: setSort,
      };

      stateSetters[key]?.(value);
      setPage(newPage);

      // Update URL
      updateURLParams({
        ...params,
        [key]: value,
        page: newPage,
      });
    },
    [params, updateURLParams],
  );

  // Handle page change
  const handlePageChange = useCallback(
    (newPage) => {
      setPage(newPage);
      updateURLParams({ ...params, page: newPage });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [params, updateURLParams],
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearch("");
    setType("");
    setLocation("");
    setStatus("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setPage(1);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Check if any filter is active
  const hasActiveFilters =
    search || type || location || status || minPrice || maxPrice || sort;

  // Count active filters
  const activeFilterCount = [
    type,
    location,
    status,
    minPrice || maxPrice,
    sort,
  ].filter(Boolean).length;

  return (
    <section className="min-h-screen pt-10 bg-(--color-bg)">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 mx-auto">
        {/* ─────────────────────────────────────────────────────────────
            Header
        ───────────────────────────────────────────────────────────── */}
        <div className="text-center">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-(--color-text)">
            Explore <span className="text-(--color-primary)">Crops</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-(--color-muted)">
            Browse all listed crops with advanced filters and sorting.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Search Bar + Filter Toggle (Mobile)
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="flex items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-(--color-primary)/30 transition">
              <SearchIcon />
              <input
                value={search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                type="search"
                placeholder="Search crops by name..."
                aria-label="Search crops"
                className="w-full bg-transparent text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => handleFilterChange("search", "")}
                  className="text-(--color-muted) hover:text-(--color-text) transition"
                  aria-label="Clear search"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm font-semibold text-(--color-text) hover:border-(--color-primary) transition"
          >
            <FilterIcon />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-(--color-primary) text-white text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Filters Section
        ───────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {(showFilters) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden lg:overflow-visible"
            >
              <div className="mt-4 p-4 rounded-2xl border border-(--color-border) bg-(--color-surface) lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                  {/* Type Filter */}
                  <FilterSelect
                    label="Type"
                    value={type}
                    onChange={(val) => handleFilterChange("type", val)}
                    options={[
                      { value: "", label: "All Types" },
                      ...typeOptions.map((t) => ({ value: t, label: t })),
                    ]}
                  />

                  {/* Location Filter */}
                  <FilterSelect
                    label="Location"
                    value={location}
                    onChange={(val) => handleFilterChange("location", val)}
                    options={[
                      { value: "", label: "All Locations" },
                      ...locationOptions.map((l) => ({ value: l, label: l })),
                    ]}
                  />

                  {/* Status Filter */}
                  <FilterSelect
                    label="Status"
                    value={status}
                    onChange={(val) => handleFilterChange("status", val)}
                    options={STATUS_OPTIONS}
                  />

                  {/* Price Range */}
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-semibold text-(--color-muted) mb-1.5">
                      Price Range
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) =>
                          handleFilterChange("minPrice", e.target.value)
                        }
                        min="0"
                        className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30"
                      />
                      <span className="text-(--color-muted)">–</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) =>
                          handleFilterChange("maxPrice", e.target.value)
                        }
                        min="0"
                        className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <FilterSelect
                    label="Sort By"
                    value={sort}
                    onChange={(val) => handleFilterChange("sort", val)}
                    options={SORT_OPTIONS}
                  />

                  {/* Reset Button */}
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                    >
                      <CloseIcon />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─────────────────────────────────────────────────────────────
            Results Header
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-(--color-muted)">
              Showing:{" "}
              <span className="text-(--color-text)">
                {crops.length} of {meta.total}
              </span>{" "}
              crops
            </h2>
            {isFetching && !isLoading && (
              <div className="w-4 h-4 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
            )}
          </div>

          {/* Active Filters Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {search && (
                <FilterTag
                  label={`Search: "${search}"`}
                  onRemove={() => handleFilterChange("search", "")}
                />
              )}
              {type && (
                <FilterTag
                  label={`Type: ${type}`}
                  onRemove={() => handleFilterChange("type", "")}
                />
              )}
              {location && (
                <FilterTag
                  label={`Location: ${location}`}
                  onRemove={() => handleFilterChange("location", "")}
                />
              )}
              {status && (
                <FilterTag
                  label={`Status: ${status}`}
                  onRemove={() => handleFilterChange("status", "")}
                />
              )}
              {(minPrice || maxPrice) && (
                <FilterTag
                  label={`Price: ${minPrice || 0} - ${maxPrice || "∞"}`}
                  onRemove={() => {
                    handleFilterChange("minPrice", "");
                    handleFilterChange("maxPrice", "");
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Error State
        ───────────────────────────────────────────────────────────── */}
        {isError && (
          <div className="mt-10 rounded-2xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-10 text-center">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Failed to load crops
            </h3>
            <p className="mt-2 text-sm text-red-500 dark:text-red-300">
              {error?.response?.data?.message || "Please try again later."}
            </p>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            Empty State
        ───────────────────────────────────────────────────────────── */}
        {!isLoading && !isError && crops.length === 0 && (
          <div className="mt-10 rounded-2xl border border-(--color-border) bg-(--color-surface) p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-(--color-bg) flex items-center justify-center">
              <SearchIcon className="w-8 h-8 text-(--color-muted)" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-(--color-text)">
              No Crops Found
            </h3>
            <p className="mt-2 text-sm sm:text-base text-(--color-muted)">
              Try adjusting your filters or search terms.
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            Crops Grid
        ───────────────────────────────────────────────────────────── */}
        {isLoading ? (
          <AllCropsPageSkeleton cards={ITEMS_PER_PAGE} />
        ) : (
          crops.length > 0 && (
            <div
              className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              
            >
              {crops.map((crop, index) => (
                <EachCrops key={crop._id} crops={crop} index={index} />
              ))}
            </div>
          )
        )}

        {/* ─────────────────────────────────────────────────────────────
            Pagination
        ───────────────────────────────────────────────────────────── */}
        {!isLoading && !isError && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isFetching={isFetching}
          />
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Filter Select Component
// ─────────────────────────────────────────────────────────────
const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="flex-1 min-w-0 lg:min-w-[140px]">
    <label className="block text-xs font-semibold text-(--color-muted) mb-1.5">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/30 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Filter Tag Component
// ─────────────────────────────────────────────────────────────
const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-(--color-border) bg-(--color-bg) px-3 py-1 text-xs font-medium text-(--color-text)">
    {label}
    <button
      onClick={onRemove}
      className="text-(--color-muted) hover:text-(--color-text) transition"
      aria-label={`Remove ${label} filter`}
    >
      <CloseIcon className="w-3 h-3" />
    </button>
  </span>
);

// ─────────────────────────────────────────────────────────────
// Pagination Component
// ─────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange, isFetching }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Max pages to show
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Page Info */}
      <p className="text-sm text-(--color-muted)">
        Page{" "}
        <span className="font-semibold text-(--color-text)">{currentPage}</span>{" "}
        of{" "}
        <span className="font-semibold text-(--color-text)">{totalPages}</span>
      </p>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || isFetching}
          className="p-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:border-(--color-primary) hover:text-(--color-primary) transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="First page"
        >
          <ChevronDoubleLeftIcon />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isFetching}
          className="p-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:border-(--color-primary) hover:text-(--color-primary) transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {pageNumbers[0] > 1 && (
            <>
              <PageButton
                page={1}
                current={currentPage}
                onClick={onPageChange}
              />
              {pageNumbers[0] > 2 && (
                <span className="px-2 text-(--color-muted)">...</span>
              )}
            </>
          )}

          {pageNumbers.map((pageNum) => (
            <PageButton
              key={pageNum}
              page={pageNum}
              current={currentPage}
              onClick={onPageChange}
              disabled={isFetching}
            />
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-2 text-(--color-muted)">...</span>
              )}
              <PageButton
                page={totalPages}
                current={currentPage}
                onClick={onPageChange}
              />
            </>
          )}
        </div>

        {/* Mobile: Show current/total */}
        <span className="sm:hidden px-3 py-2 text-sm font-medium text-(--color-text)">
          {currentPage} / {totalPages}
        </span>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isFetching}
          className="p-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:border-(--color-primary) hover:text-(--color-primary) transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || isFetching}
          className="p-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:border-(--color-primary) hover:text-(--color-primary) transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Last page"
        >
          <ChevronDoubleRightIcon />
        </button>
      </div>
    </div>
  );
};

// Page Button Component
const PageButton = ({ page, current, onClick, disabled }) => (
  <button
    onClick={() => onClick(page)}
    disabled={disabled}
    className={`min-w-[40px] h-10 rounded-lg border text-sm font-semibold transition ${
      page === current
        ? "border-(--color-primary) bg-(--color-primary) text-white"
        : "border-(--color-border) bg-(--color-surface) text-(--color-text) hover:border-(--color-primary)"
    } disabled:cursor-not-allowed`}
  >
    {page}
  </button>
);

// ─────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={`${className} text-(--color-muted)`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const FilterIcon = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const CloseIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const ChevronDoubleLeftIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
    />
  </svg>
);

const ChevronDoubleRightIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 5l7 7-7 7M5 5l7 7-7 7"
    />
  </svg>
);

export default AllCropsPage;
