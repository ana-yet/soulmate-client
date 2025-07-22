import React from "react";
import { Link } from "react-router";
import { HiLockClosed, HiArrowLeft } from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-dark-bg p-4 text-center">
      <Helmet>
        <title>Forbidden | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-md w-full">
        <div className="mb-6">
          <HiLockClosed className="mx-auto h-24 w-24 text-accent/50" />
        </div>
        <h1 className="text-8xl font-bold font-secondary text-accent">403</h1>
        <h2 className="mt-4 text-3xl font-bold text-txt dark:text-dark-text">
          Access Denied
        </h2>
        <p className="mt-4 text-lg text-txt/70 dark:text-dark-text-muted">
          We're sorry, but you do not have the necessary permissions to access
          this page. This area is restricted to authorized users only.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            <HiArrowLeft className="h-5 w-5" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
