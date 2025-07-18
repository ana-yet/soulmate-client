import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaUser,
  FaVenusMars,
  FaMapMarkerAlt,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
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

// Main Section Component
const PremiumMember = () => {
  const { data: premiumBiodata, isLoading, error } = usePremiumBiodata();

  if (isLoading) {
    return <div className="text-center py-16">Loading premium profiles...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-16 text-accent">
        Failed to load premium profiles. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-secondary text-4xl font-bold text-txt">
            Our Premium Members
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-txt/70">
            Meet some of our members who are serious about finding their life
            partner.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {premiumBiodata?.map((biodata) => (
            <PremiumCard key={biodata._id} biodata={biodata} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMember;
