import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import usePublicAxios from "../../../Hook/usePublicAxios";

const useSuccessStories = () => {
  const axiosPublic = usePublicAxios();
  return useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/success-stories");
      return data.filter((story) => story.status === "approved");
    },
  });
};

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <FaRegStar className="text-utility/50 dark:text-dark-utility/50" />
          ) : (
            <FaStar className="text-utility dark:text-dark-utility" />
          )}
        </span>
      ))}
    </div>
  );
};

const SuccessStoriesCarousel = () => {
  const { data: stories = [], isLoading, isError } = useSuccessStories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (stories.length > 1) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, stories.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="bg-background/50 dark:bg-dark-bg py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary/20 dark:bg-dark-secondary rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-secondary/20 dark:bg-dark-secondary rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-background/50 dark:bg-dark-bg py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center text-accent">
          Failed to load success stories.
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return (
      <section className="bg-background/50 dark:bg-dark-bg py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          No success stories available yet.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background/50 dark:bg-dark-bg py-16 sm:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-secondary text-4xl font-bold text-txt dark:text-dark-text">
            Marriage Success Stories
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-txt/70 dark:text-dark-text-muted">
            These are some of the beautiful unions that began on our platform.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          {stories.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-dark-secondary p-3 rounded-full shadow-md border border-secondary/20 dark:border-dark-border hover:bg-secondary/10 dark:hover:bg-dark-border transition-colors"
                aria-label="Previous story"
              >
                <FaChevronLeft className="text-txt dark:text-dark-text" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-dark-secondary p-3 rounded-full shadow-md border border-secondary/20 dark:border-dark-border hover:bg-secondary/10 dark:hover:bg-dark-border transition-colors"
                aria-label="Next story"
              >
                <FaChevronRight className="text-txt dark:text-dark-text" />
              </button>
            </>
          )}

          {/* Carousel Content */}
          <div className="overflow-hidden relative h-[600px] rounded-2xl">
            <AnimatePresence custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={stories[currentIndex].coupleImage}
                  alt={`${stories[currentIndex].selfName} & ${stories[currentIndex].partnerName}`}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm font-semibold text-white/80">
                        Married on:{" "}
                        {formattedDate(stories[currentIndex].marriageDate)}
                      </p>
                      <StarRating rating={stories[currentIndex].rating} />
                    </div>

                    <h3 className="font-secondary text-3xl font-bold text-white mb-3">
                      {stories[currentIndex].selfName} &{" "}
                      {stories[currentIndex].partnerName}
                    </h3>

                    <p className="text-white/90 mb-6 line-clamp-3">
                      "{stories[currentIndex].successStory.substring(0, 200)}
                      {stories[currentIndex].successStory.length > 200
                        ? "..."
                        : ""}
                      "
                    </p>

                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="text-sm text-white/80">
                          <span className="font-semibold">Location:</span>{" "}
                          {stories[currentIndex].weddingLocation}
                        </div>
                        <div className="text-sm text-white/80">
                          <span className="font-semibold">Together for:</span>{" "}
                          {stories[currentIndex].durationBeforeMarriage}
                        </div>
                      </div>

                      <Link
                        to="/success-stories"
                        className="px-6 py-2.5 bg-white text-accent rounded-lg hover:bg-white/90 transition-colors font-medium"
                      >
                        View More Stories
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          {stories.length > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-accent" : "bg-white/50"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;
