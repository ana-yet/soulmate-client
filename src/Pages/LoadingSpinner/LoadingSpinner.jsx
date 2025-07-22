import React from "react";

const LoadingSpinner = ({ size = 48 }) => {
  return (
    <div
      className="flex justify-center items-center p-10"
      aria-label="Loading content"
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Spinner Track (the static heart) */}
        <svg
          className="absolute text-secondary/20 dark:text-dark-border"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>

        {/* Spinner Animation (the spinning heart) */}
        <svg
          className="animate-spin text-accent"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: "40, 80", // Creates a partial line for the spinning effect
          }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
    </div>
  );
};

export default LoadingSpinner;
