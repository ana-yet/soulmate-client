import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";
import usePublicAxios from "../../../Hook/usePublicAxios";

const useSuccessStories = () => {
  const axiosPublic = usePublicAxios();
  return useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/success-stories");
      return data;
    },
  });
};

// Reusable Star Rating Component
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <FaStar className="text-utility" />
          ) : (
            <FaRegStar className="text-utility" />
          )}
        </span>
      ))}
    </div>
  );
};

// Reusable Story Card Component
const StoryCard = ({ story }) => {
  const formattedDate = new Date(story.marriageDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg overflow-hidden border border-secondary/20 dark:border-dark-border"
    >
      <img
        src={story.coupleImage}
        alt="Happy Couple"
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-txt/70 dark:text-dark-text-muted">
            Married on: {formattedDate}
          </p>
          <StarRating rating={story.rating} />
        </div>
        <p className="text-txt dark:text-dark-text text-base leading-relaxed">
          "{story.successStory.substring(0, 150)}
          {story.successStory.length > 150 ? "..." : ""}"
        </p>
        {story.successStory.length > 150 && (
          <a
            href="#"
            className="text-accent font-semibold text-sm mt-2 inline-block hover:underline"
          >
            Read more
          </a>
        )}
      </div>
    </motion.div>
  );
};

const SuccessStoriesSection = () => {
  const { data: stories, isLoading, isError } = useSuccessStories();

  return (
    <section className="bg-background/50 dark:bg-dark-bg py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-secondary text-4xl  font-bold text-txt dark:text-dark-text">
            Marriage Success Stories 💍
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-txt/70 dark:text-dark-text-muted">
            these are some of the beautiful unions that began on our platform.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center">Loading stories...</div>
        ) : isError ? (
          <div className="text-center text-accent">
            Failed to load success stories.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories?.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
