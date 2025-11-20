import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import ProfileSkeleton from "./ProfileSkeleton/ProfileSkeleton";
import EditProfileForm from "./EditProfileform/EditProfileform";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import PersonalInfoSection from "./PersonalInfoSection/PersonalInfoSection";
import ProfessionalInfoSection from "./ProfessionalInfoSection/ProfessionalInfoSection";
import LifestyleInfoSection from "./LifeStyleInfoSection/LifeStyleInfoSection";
import FamilyInfo from "./FamilyInfo/FamilyInfo";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";

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

const MyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useMyProfile(user?.email);

  // Mutation for updating profile
  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      const { data } = await axiosSecure.put(
        `/update-profile/${user.email}`,
        updatedData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-profile", user.email]);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSave = (data) => {
    const formattedData = {
      ...data,
      ...profile,
      height: parseInt(data.height),
      weight: parseInt(data.weight),
      languages: data.languages.split(",").map((lang) => lang.trim()),
      hobbies: data.hobbies.split(",").map((hobby) => hobby.trim()),
      interests: data.interests.split(",").map((interest) => interest.trim()),
    };
    updateProfile(formattedData);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-accent dark:text-dark-accent">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-4 min-h-[calc(100vh-200px)]">
      <Helmet>
        <title>My Profile | SoulMate</title>
        <meta
          name="description"
          content="Manage your matrimony profile to find your perfect match."
        />
      </Helmet>

      <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg overflow-hidden border border-secondary/20 dark:border-dark-border">
        {isEditing ? (
          <EditProfileForm
            profile={profile}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
        ) : (
          <>
            <ProfileHeader
              profile={profile}
              onEdit={() => setIsEditing(true)}
            />

            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <PersonalInfoSection profile={profile} />
                <ProfessionalInfoSection profile={profile} />
              </div>

              <div className="space-y-8">
                <LifestyleInfoSection profile={profile} />
                <FamilyInfo profile={profile} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
