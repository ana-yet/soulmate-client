import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useDebounce from "../../Hook/useDebounce";

import {
  HiOutlineSearch,
  HiFilter,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaVenusMars,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import useFilteredBiodatas from "../../Hook/useFilteredBiodatas";
import BiodataCard from "./BiodataCard";
import FilterSidebar from "./FilterSidebar";

const BiodatasPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialize filters from URL search params or with defaults
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get("search") || "",
      ageMin: params.get("ageMin") || "",
      ageMax: params.get("ageMax") || "",
      gender: params.get("gender") || "",
      division: params.get("division") || "",
      page: parseInt(params.get("page") || "1", 10),
    };
  });

  // Debounce filters to reduce API calls
  const debouncedFilters = useDebounce(filters, 500);

  // Update URL search params when debounced filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedFilters.search) params.set("search", debouncedFilters.search);
    if (debouncedFilters.ageMin) params.set("ageMin", debouncedFilters.ageMin);
    if (debouncedFilters.ageMax) params.set("ageMax", debouncedFilters.ageMax);
    if (debouncedFilters.gender) params.set("gender", debouncedFilters.gender);
    if (debouncedFilters.division)
      params.set("division", debouncedFilters.division);
    if (debouncedFilters.page > 1) params.set("page", debouncedFilters.page);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [debouncedFilters, navigate, location.pathname]);

  // Fetch data using your custom hook
  const { data, isLoading, isError, error } =
    useFilteredBiodatas(debouncedFilters);

  const handlePageChange = (newPage) => {
    console.log(newPage);
    if (newPage > 0 && newPage <= (data?.totalPages || 1)) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  const biodatas = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  return (
    <div className="bg-background dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* --- Page Title and Description --- */}
        <div className="text-center mb-12">
          <h1 className="font-secondary text-4xl md:text-5xl font-bold text-txt dark:text-dark-text">
            Find Your Soulmate
          </h1>
          <p className="mt-2 text-center mx-auto text-txt/70 dark:text-dark-text-muted">
            Browse through profiles and use the filters to find the perfect
            match for your journey ahead.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- Desktop Filter Sidebar --- */}
          <aside className="hidden lg:block lg:col-span-1 bg-white dark:bg-dark-secondary p-6 rounded-2xl shadow-lg h-fit md:min-h-[calc(100vh-300px)] sticky top-24">
            <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-6">
              Filter Profiles
            </h3>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* --- Main Content --- */}
          <main className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-white font-semibold shadow-md"
              >
                <HiFilter />
                <span>Show Filters</span>
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white dark:bg-dark-secondary p-4 space-y-4 animate-pulse"
                  >
                    <div className="h-72 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20 text-accent">
                Error: {error.message}
              </div>
            ) : biodatas.length > 0 ? (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {biodatas.map((biodata) => (
                      <BiodataCard key={biodata._id} biodata={biodata} />
                    ))}
                  </AnimatePresence>
                </motion.div>
                {/* Pagination */}
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-dark-secondary hover:bg-secondary/20 dark:hover:bg-dark-border"
                  >
                    <HiChevronLeft className="h-5 w-5 text-txt dark:text-dark-text" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        currentPage === i + 1
                          ? "bg-accent text-white"
                          : "bg-white dark:bg-dark-secondary text-txt dark:text-dark-text hover:bg-secondary/20 dark:hover:bg-dark-border"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-dark-secondary hover:bg-secondary/20 dark:hover:bg-dark-border"
                  >
                    <HiChevronRight className="h-5 w-5 text-txt dark:text-dark-text" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-txt dark:text-dark-text">
                  No Biodata Found
                </h3>
                <p className="mt-2 text-txt/70 dark:text-dark-text-muted">
                  Try adjusting your filters to find more results.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- Mobile Filter Drawer --- */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-40 bg-black/50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[90vw] bg-white dark:bg-dark-secondary shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text">
                  Filter Profiles
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-secondary/20 dark:hover:bg-dark-border"
                >
                  <HiX className="h-6 w-6 text-txt dark:text-dark-text" />
                </button>
              </div>
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BiodatasPage;
