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
      console.log(data);
      return data;
    },
  });
};

const SuccessCounterSection = () => {
  const { data: stats, isLoading, isError } = useSuccessCounter();

  const counters = [
    {
      icon: <HiOutlineUserGroup className="h-10 w-10 text-blue-600" />,
      end: stats?.totalBiodata,
      title: "Total Biodata",
      color: "bg-blue-100 dark:bg-blue-900/50",
    },
    {
      icon: <BsGenderMale className="h-10 w-10 text-sky-600" />,
      end: stats?.maleBiodata,
      title: "Male Biodata",
      color: "bg-sky-100 dark:bg-sky-900/50",
    },
    {
      icon: <BsGenderFemale className="h-10 w-10 text-pink-600" />,
      end: stats?.femaleBiodata,
      title: "Female Biodata",
      color: "bg-pink-100 dark:bg-pink-900/50",
    },
    {
      icon: <FaHeart className="h-10 w-10 text-accent" />,
      end: stats?.totalMarriages,
      title: "Successful Marriages",
      color: "bg-accent/10 dark:bg-accent/20",
    },
  ];

  return (
    <section className="bg-background dark:bg-dark-bg py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-56 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-accent">
            Failed to load statistics.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {counters.map((counter, index) => (
              <CounterCard key={index} {...counter} />
            ))}
          </div>
        )}
        <p className="text-center text-sm text-txt/60 dark:text-dark-text-muted mt-12">
          Last updated:
          {new Date(stats?.lastUpdated).toLocaleString("en-US", {
            timeZone: "Asia/Dhaka",
            dateStyle: "full",
            timeStyle: "medium",
          })}
        </p>
      </div>
    </section>
  );
};

export default SuccessCounterSection;
