import React from "react";

const AdminStatsSkeleton = ({ count = 1 }) => {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 bg-secondary/20 dark:bg-dark-secondary rounded w-1/3"></div>
            <div className="h-10 bg-secondary/20 dark:bg-dark-secondary rounded-full w-10"></div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, j) => (
              <div
                key={j}
                className="bg-white dark:bg-dark-secondary rounded-xl shadow-md border border-secondary/20 dark:border-dark-border p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="h-4 bg-secondary/20 dark:bg-dark-secondary rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-secondary/20 dark:bg-dark-secondary rounded w-1/4"></div>
                  </div>
                  <div className="h-10 w-10 bg-secondary/20 dark:bg-dark-secondary rounded-full"></div>
                </div>
                <div className="h-40 bg-secondary/20 dark:bg-dark-secondary rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsSkeleton;
