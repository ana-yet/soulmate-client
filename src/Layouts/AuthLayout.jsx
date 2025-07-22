import React from "react";
import { Outlet, useNavigate } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import AuthIllustration from "../assets/login.svg";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen max-h-screen w-full bg-background dark:bg-dark-bg font-primary">
      {/* Left Column: Illustration (visible on medium screens and up) */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/3 items-center justify-center p-12 bg-secondary/10 relative overflow-hidden">
        <img
          src={AuthIllustration}
          alt="Couple finding love"
          className="max-w-full max-h-full object-contain animate-zoom-in"
        />
      </div>

      {/* Right Column: Form Content */}
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center p-6 sm:p-12">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <FaRegHeart className="text-3xl text-accent transition-transform group-hover:scale-110" />
            <span className="font-secondary text-2xl font-bold text-txt">
              Soulmate
            </span>
          </button>
        </div>

        {/* Outlet for Login/Register form */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
