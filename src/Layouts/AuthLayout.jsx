import React, { useMemo } from "react";
import { Outlet } from "react-router";
import AuthIllustration from "../assets/login.svg";
import Logo from "../Shared/Logo/Logo";

const AuthLayout = React.memo(() => {
  // Memoizing the illustration to prevent unnecessary re-renders
  const illustration = useMemo(
    () => (
      <img
        src={AuthIllustration}
        alt="Couple finding love"
        className="max-w-full max-h-full object-contain animate-zoom-in"
        loading="lazy"
        decoding="async"
      />
    ),
    []
  );

  return (
    <div className="flex min-h-screen max-h-screen w-full bg-background dark:bg-dark-bg font-primary transition-colors duration-200">
      {/* Left Column: Illustration (visible on medium screens and up) */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/3 items-center justify-center p-12 bg-secondary/10 dark:bg-dark-secondary/20 relative overflow-hidden">
        {illustration}
      </div>

      {/* Right Column: Form Content */}
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center p-6 sm:p-12">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <Logo />
        </div>

        {/* Outlet for Login/Register form */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
});

export default AuthLayout;
