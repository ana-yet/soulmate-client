import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HiOutlinePencil,
  HiOutlineMail,
  HiOutlineUserCircle,
  HiOutlineShieldCheck,
  HiOutlineCalendar,
} from "react-icons/hi";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";

const useMyProfile = (email) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["my-profile", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-profile?email=${email}`);

      return data;
    },
    enabled: !!email,
  });
};

// Skeleton Component for Loading State
const ProfileSkeleton = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
    <div className="w-full max-w-md p-6 mx-auto bg-white dark:bg-dark-secondary rounded-2xl shadow-lg animate-pulse">
      <div className="w-32 h-32 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <div className="h-8 mt-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
      <div className="h-4 mt-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
      <div className="mt-8 space-y-4">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-12 mt-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);

// Main Profile Component
const MyProfile = () => {
  const { user } = useAuth();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useMyProfile(user?.email);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-accent">Error: {error.message}</div>
    );
  }

  const formattedDate = new Date(profile.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const providerName =
    profile.providerId === "password" ? "Email/Password" : "Google";

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 sm:p-8 mx-auto bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border">
        <div className="flex flex-col items-center">
          <img
            src={profile.photoURL}
            alt={profile.displayName}
            className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white dark:border-dark-secondary"
          />
          <h1 className="mt-6 font-secondary text-3xl font-bold text-txt dark:text-dark-text">
            {profile.displayName}
          </h1>
          <p className="mt-1 text-txt/70 dark:text-dark-text-muted">
            {profile.email}
          </p>
        </div>

        <div className="mt-8 space-y-4 text-sm">
          <div className="flex justify-between items-center py-3 border-b border-secondary/20 dark:border-dark-border">
            <span className="flex items-center gap-3 text-txt/70 dark:text-dark-text-muted">
              <HiOutlineUserCircle className="h-5 w-5" /> Role
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent dark:bg-accent/20">
              {profile.role}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-secondary/20 dark:border-dark-border">
            <span className="flex items-center gap-3 text-txt/70 dark:text-dark-text-muted">
              <HiOutlineShieldCheck className="h-5 w-5" /> Sign-in Method
            </span>
            <span className="font-semibold text-txt dark:text-dark-text">
              {providerName}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="flex items-center gap-3 text-txt/70 dark:text-dark-text-muted">
              <HiOutlineCalendar className="h-5 w-5" /> Member Since
            </span>
            <span className="font-semibold text-txt dark:text-dark-text">
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-white shadow-md transition-all hover:bg-accent/90">
            <HiOutlinePencil />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
