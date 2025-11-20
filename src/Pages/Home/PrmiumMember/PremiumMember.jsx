import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import usePublicAxios from "../../../Hook/usePublicAxios";
import PremiumCard from "./PremiumCard";

const usePremiumBiodata = () => {
  const publicAxios = usePublicAxios();

  return useQuery({
    queryKey: ["premiumBiodata"],
    queryFn: async () => {
      const { data } = await publicAxios.get("/biodata/premium?sort=asc");
      return data.data;
    },
  });
};

// Loading Skeleton Component
const PremiumCardSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-secondary/20 bg-white dark:border-dark-border dark:bg-dark-secondary overflow-hidden">
    <div className="h-80 w-full bg-gray-200 dark:bg-dark-border/50"></div>
    <div className="p-5">
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="h-12 rounded-xl bg-gray-200 dark:bg-dark-border/50"></div>
        <div className="h-12 rounded-xl bg-gray-200 dark:bg-dark-border/50"></div>
      </div>
      <div className="h-10 rounded-xl bg-gray-200 dark:bg-dark-border/50"></div>
    </div>
  </div>
);

const PremiumMember = () => {
  const { data: premiumBiodata, isLoading, error } = usePremiumBiodata();

  return (
    <section className="py-20 bg-background dark:bg-dark-bg relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="mx-auto h-12 w-1/3 rounded-lg bg-gray-200 dark:bg-dark-border/50"></div>
              <div className="mx-auto h-4 w-1/2 rounded bg-gray-200 dark:bg-dark-border/50"></div>
            </div>
          ) : (
            <>
              <h2 className="font-secondary text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink-500 to-accent dark:from-accent dark:via-pink-400 dark:to-accent animate-gradient-x pb-2">
                Premium Members
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-txt/70 dark:text-dark-text-muted">
                Meet our exclusive members who are serious about finding their
                perfect life partner.
              </p>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, index) => (
              <PremiumCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-accent dark:text-accent">
            Failed to load premium profiles. Please try again later.
          </div>
        ) : premiumBiodata?.length === 0 ? (
          <div className="text-center py-10">
            <FaStar className="mx-auto text-4xl text-utility dark:text-utility/80 mb-4" />
            <h3 className="text-2xl font-bold text-txt dark:text-dark-text">
              No Premium Members Available
            </h3>
            <Link
              to="/biodatas"
              className="mt-6 inline-block rounded-lg bg-accent px-6 py-2 font-medium text-white hover:bg-accent/90 dark:hover:bg-accent/80"
            >
              Browse All Profiles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {premiumBiodata?.map((biodata) => (
              <PremiumCard key={biodata._id} biodata={biodata} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PremiumMember;
