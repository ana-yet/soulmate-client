import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import BackButton from "../../../../../Shared/BackButton/BackButton";
import WeddingPhoto from "./WeddingPhoto";

const SuccessDetailSection = ({ story }) => {
  if (!story) {
    return (
      <div className="bg-background dark:bg-dark-bg min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-txt dark:text-dark-text">Story not found</p>
        </div>
      </div>
    );
  }

  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background/50 dark:bg-dark-bg min-h-screen px-4">
      <div className="container mx-auto">
        <BackButton text={"to Stories"} />

        {/* Main Content */}
        <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden border border-secondary/20 dark:border-dark-border">
          {/* Couple Image */}
          <div className="relative h-[550px] w-full">
            <img
              src={story.coupleImage}
              alt={`${story.selfName} & ${story.partnerName}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <div>
                <h1 className="font-secondary text-4xl font-bold text-white mb-1">
                  {story.selfName} & {story.partnerName}
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < story.platformRating
                            ? "text-utility dark:text-dark-utility"
                            : "text-utility/30 dark:text-dark-utility/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/80">
                    Married on {formattedDate(story.marriageDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-2">
                  About the Couple
                </h3>
                <p className="text-txt dark:text-dark-text">
                  <span className="font-semibold">Bride:</span> {story.selfName}{" "}
                  (Born {story.selfBirthYear})
                </p>
                <p className="text-txt dark:text-dark-text">
                  <span className="font-semibold">Groom:</span>{" "}
                  {story.partnerName} (Born {story.partnerBirthYear})
                </p>
                <p className="text-txt dark:text-dark-text">
                  <span className="font-semibold">Together for:</span>{" "}
                  {story.durationBeforeMarriage}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-2">
                  Wedding Details
                </h3>
                <p className="text-txt dark:text-dark-text">
                  <span className="font-semibold">Location:</span>{" "}
                  {story.weddingLocation}
                </p>
                <p className="text-txt dark:text-dark-text">
                  <span className="font-semibold">Date:</span>{" "}
                  {formattedDate(story.marriageDate)}
                </p>
                {story.videoLink && (
                  <a
                    href={story.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    Watch Wedding Video
                  </a>
                )}
              </div>
            </div>

            {/* Marriage Certificate */}
            {story.marriageCertificate && (
              <div className="mb-8">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-4">
                  Marriage Certificate
                </h3>
                <div className="max-w-lg mx-auto">
                  <img
                    src={story.marriageCertificate}
                    alt="Marriage Certificate"
                    className="w-full h-auto rounded-lg border border-secondary/20 dark:border-dark-border"
                  />
                </div>
              </div>
            )}

            {/* Story Sections */}
            <div className="space-y-8">
              <div className="bg-secondary/10 dark:bg-dark-secondary/70 p-6 rounded-lg border border-secondary/20 dark:border-dark-border">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-3">
                  Their Success Story
                </h3>
                <p className="text-txt dark:text-dark-text">
                  {story.successStory}
                </p>
              </div>

              <div className="bg-secondary/10 dark:bg-dark-secondary/70 p-6 rounded-lg border border-secondary/20 dark:border-dark-border">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-3">
                  First Contact Story
                </h3>
                <p className="text-txt dark:text-dark-text">
                  {story.firstContactStory}
                </p>
              </div>

              <div className="bg-secondary/10 dark:bg-dark-secondary/70 p-6 rounded-lg border border-secondary/20 dark:border-dark-border">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-3">
                  Favorite Memory
                </h3>
                <p className="text-txt dark:text-dark-text">
                  {story.favoriteMemory}
                </p>
              </div>

              <div className="bg-secondary/10 dark:bg-dark-secondary/70 p-6 rounded-lg border border-secondary/20 dark:border-dark-border">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-3">
                  Advice to Singles
                </h3>
                <p className="text-txt dark:text-dark-text">
                  {story.adviceToSingles}
                </p>
              </div>

              <div className="bg-secondary/10 dark:bg-dark-secondary/70 p-6 rounded-lg border border-secondary/20 dark:border-dark-border">
                <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-3">
                  Platform Feedback
                </h3>
                <p className="text-txt dark:text-dark-text">
                  {story.platformFeedback}
                </p>
              </div>
            </div>

            {/* Wedding Photos */}
            {story.weddingPhotos?.length > 0 && (
              <div className="mt-12">
                <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-6 text-center">
                  Wedding Photos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {story.weddingPhotos.map((photo, index) => (
                    <WeddingPhoto photo={photo} index={index} key={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessDetailSection;
