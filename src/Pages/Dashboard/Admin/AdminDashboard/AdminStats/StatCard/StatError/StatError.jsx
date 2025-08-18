import React from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

const StatError = ({
  message = "Failed to load data",
  onRetry,
  retryText = "Try Again",
  className = "",
}) => {
  return (
    <div
      className={`bg-white dark:bg-dark-secondary rounded-xl shadow-lg border border-red-200 dark:border-red-900/50 p-6 max-w-md mx-auto text-center ${className}`}
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-500 dark:text-red-400">
          <FiAlertTriangle size={24} />
        </div>
      </div>
      <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-txt/80 dark:text-dark-text-muted mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          <FiRefreshCw className="mr-2" />
          {retryText}
        </button>
      )}
    </div>
  );
};

export default StatError;
