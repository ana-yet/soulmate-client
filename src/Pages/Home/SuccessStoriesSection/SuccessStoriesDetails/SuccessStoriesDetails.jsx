import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, Link } from "react-router";
import usePublicAxios from "../../../../Hook/usePublicAxios";
import SuccessDetailSection from "./SuccessDetailSection/SuccessDetailSection";
import { FaHeart, FaRing, FaGlassCheers } from "react-icons/fa";
import useAuth from "../../../../Hook/useAuth";
import SuccessLoading from "./SuccessDetailSection/SuccessLoading";
import SuccessError from "./SuccessDetailSection/SuccessError";

const SuccessStoriesDetails = () => {
  const { id } = useParams();
  const axiosPublic = usePublicAxios();
  const { user } = useAuth();

  const {
    data: story,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["successStory", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/success-stories/${id}`);
      return data.data;
    },
  });

  // Loading Skeleton
  if (isLoading) {
    return <SuccessLoading />;
  }

  // Error Handling
  if (isError) {
    return <SuccessError error={error} />;
  }

  return (
    <div className="bg-background/50 dark:bg-dark-bg container mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent/10 to-utility/10 dark:from-accent/20 dark:to-utility/20 py-12 mx-3">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-secondary text-4xl font-bold text-txt dark:text-dark-text mb-4">
            A Love Story That Began Here
          </h1>
          <p className="text-xl text-txt/80 dark:text-dark-text-muted max-w-3xl mx-auto">
            Celebrating the beautiful journey of {story?.selfName} &{" "}
            {story?.partnerName}
          </p>

          <div className="flex justify-center space-x-6 mt-8">
            <div className="flex items-center space-x-2">
              <FaHeart className="text-accent text-2xl" />
              <span className="text-txt dark:text-dark-text">Matched</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRing className="text-accent text-2xl" />
              <span className="text-txt dark:text-dark-text">Married</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaGlassCheers className="text-accent text-2xl" />
              <span className="text-txt dark:text-dark-text">Happy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Banner */}
      <div className="bg-secondary/10 dark:bg-dark-secondary/70 py-8 rounded-md mx-3">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <blockquote className="font-secondary text-xl italic text-txt dark:text-dark-text">
            "Our platform brings together hearts destined to meet. Every success
            story like this one reaffirms our commitment to helping people find
            their perfect match."
          </blockquote>
          <p className="mt-4 text-txt/70 dark:text-dark-text-muted">
            - The Matchmaking Team
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-4">
        {story ? (
          <SuccessDetailSection story={story} />
        ) : (
          <div className="container mx-auto px-4 text-center">
            <p className="text-txt dark:text-dark-text">
              No story data available
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-accent py-12 mb-2 rounded-xl mx-3">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-secondary text-3xl font-bold text-white mb-4">
            Ready to Begin Your Own Love Story?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of singles who found their perfect match through our
            platform.
          </p>
          <Link
            to={!user ? "/register" : "/dashboard/edit-biodata"}
            className="px-8 py-3 bg-white text-accent rounded-lg hover:bg-white/90 transition-colors font-medium inline-block"
          >
            Create Your Profile Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesDetails;
