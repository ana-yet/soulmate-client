import React from "react";

const SuccessLoading = () => {
  return (
    <div className="bg-background/50 dark:bg-dark-bg min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 bg-secondary/20 dark:bg-dark-secondary rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-secondary/20 dark:bg-dark-secondary rounded w-1/2 mx-auto"></div>
          </div>

          {/* Image Skeleton */}
          <div className="h-96 w-full bg-secondary/20 dark:bg-dark-secondary rounded-xl mb-8"></div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-6 bg-secondary/20 dark:bg-dark-secondary rounded w-1/4"></div>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-secondary/20 dark:bg-dark-secondary rounded"
                ></div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-secondary/20 dark:bg-dark-secondary rounded w-1/4"></div>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-secondary/20 dark:bg-dark-secondary rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessLoading;
