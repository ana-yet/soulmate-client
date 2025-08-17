import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import usePublicAxios from "../../../Hook/usePublicAxios";
import CounterCard from "./CounterCard";

const useSuccessCounter = () => {
  const axiosPublic = usePublicAxios();
  return useQuery({
    queryKey: ["successCounter"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/success-counter");
      return data;
    },
    staleTime: 3600000, // 1 hour cache
    retry: 2,
  });
};

const SuccessCounterSection = () => {
  const { data: stats, isLoading, isError } = useSuccessCounter();

  const counters = [
    {
      icon: <HiOutlineUserGroup className="text-2xl" />,
      end: stats?.totalBiodata || 0,
      title: "Total Profiles",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
      delay: 0.1,
      suffix: "+",
    },
    {
      icon: <BsGenderMale className="text-2xl" />,
      end: stats?.maleBiodata || 0,
      title: "Male Profiles",
      color: "bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300",
      delay: 0.3,
      suffix: "+",
    },
    {
      icon: <BsGenderFemale className="text-2xl" />,
      end: stats?.femaleBiodata || 0,
      title: "Female Profiles",
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-300",
      delay: 0.5,
      suffix: "+",
    },
    {
      icon: <FaHeart className="text-2xl" />,
      end: stats?.totalMarriages || 0,
      title: "Success Stories",
      color:
        "bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light",
      delay: 0.7,
      suffix: "+",
    },
  ];

  return (
    <section className="dark:bg-dark-bg py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-txt dark:text-dark-text mb-4 font-secondary">
            Our Growing Community
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-txt/70 dark:text-dark-text-muted">
            Join thousands who have found their perfect match through our
            platform
          </p>
        </motion.div>

        {/* Counter cards grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-48 bg-white dark:bg-dark-secondary rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 p-4 mb-4">
              <FaHeart className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-txt dark:text-dark-text mb-2">
              Unable to load statistics
            </h3>
            <p className="text-txt/70 dark:text-dark-text-muted mb-4">
              Please refresh the page or try again later
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 dark:hover:bg-accent/80"
            >
              Refresh Data
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {counters.map((counter, index) => (
              <CounterCard key={index} {...counter} />
            ))}
          </motion.div>
        )}

        {/* Last updated footer */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-sm text-txt/50 dark:text-dark-text-muted inline-flex items-center">
              <span className="mr-2">Last updated:</span>
              {new Date(stats?.lastUpdated).toLocaleString("en-US", {
                timeZone: "Asia/Dhaka",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SuccessCounterSection;
