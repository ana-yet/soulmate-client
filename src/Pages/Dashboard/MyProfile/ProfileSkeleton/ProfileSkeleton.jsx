const ProfileSkeleton = () => (
  <div className="max-w-6xl mx-auto p-4 min-h-[calc(100vh-200px)]">
    <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg overflow-hidden border border-secondary/20 dark:border-dark-border animate-pulse">
      {/* Header Skeleton */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Profile Image Skeleton */}
      <div className="relative px-6">
        <div className="absolute -top-16 left-6 w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-dark-secondary"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 gap-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
