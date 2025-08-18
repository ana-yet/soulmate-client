import React from "react";
import BackButton from "../../../../../Shared/BackButton/BackButton";

const SuccessError = ({ error }) => {
  return (
    <div className="bg-background/50 dark:bg-dark-bg min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="bg-white dark:bg-dark-secondary p-8 rounded-xl shadow-lg border border-secondary/20 dark:border-dark-border">
          <h2 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-txt dark:text-dark-text mb-6">
            We couldn't load this success story.{" "}
            {error?.message || "Please try again later."}
          </p>
          <BackButton text="to Stories" />
        </div>
      </div>
    </div>
  );
};

export default SuccessError;
