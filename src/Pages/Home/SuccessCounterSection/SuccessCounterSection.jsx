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
      icon: <HiOutlineUserGroup className="text-3xl" />,
      end: stats?.totalBiodata || 0,
      title: "Total Profiles",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500/20",
      delay: 0.1,
      suffix: "+",
    },
    {
      icon: <BsGenderMale className="text-3xl" />,
      end: stats?.maleBiodata || 0,
      title: "Male Profiles",
      color: "from-sky-500 to-sky-600",
      iconBg: "bg-sky-500/20",
      delay: 0.3,
      suffix: "+",
    },
    {
      icon: <BsGenderFemale className="text-3xl" />,
      end: stats?.femaleBiodata || 0,
      title: "Female Profiles",
      color: "from-pink-500 to-pink-600",
      iconBg: "bg-pink-500/20",
      delay: 0.5,
      suffix: "+",
    },
    {
      icon: <FaHeart className="text-3xl" />,
      end: stats?.totalMarriages || 0,
      title: "Success Stories",
      color: "from-accent to-accent-light",
      iconBg: "bg-accent/20",
      delay: 0.7,
      suffix: "+",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-utility/5 to-accent-light/5"></div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
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
                className="h-48 glass rounded-2xl animate-pulse"
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
              className="inline-flex items-center rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-white hover:scale-105 transition-transform"
            >
              Refresh Data
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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

