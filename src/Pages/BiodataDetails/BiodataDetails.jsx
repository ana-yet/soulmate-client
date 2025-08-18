import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUserCircle,
  FaVenusMars,
  FaBirthdayCake,
  FaRulerVertical,
  FaWeight,
  FaBriefcase,
  FaFlag,
  FaEnvelope,
  FaMobileAlt,
  FaStar,
  FaHeart,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ProfileField from "./ProfileField";
import SimilarProfileCard from "./SimilarProfileCard";
import { useSimilarBiodata } from "../../Hook/useSimilarBiodata";
import useUserInfo from "../../Hook/useUserInfo";
import useIsFavourite from "../../Hook/useIsFavourite";
import useRemoveFavourite from "../../Hook/useRemoveFavourite ";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const BiodataDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: biodata, isLoading: isBiodataLoading } = useQuery({
    queryKey: ["biodataId", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/singleBiodata/${id}`);
      return data.data;
    },
  });

  const { isPremium, isLoading: isUserLoading } = useUserInfo();
  const { isFavourite, isLoading } = useIsFavourite(biodata?._id);
  const { removeFromFavourites, isRemoving } = useRemoveFavourite();

  const { data: similarBiodatas } = useSimilarBiodata(biodata?._id);

  // Mutation for adding to favourites
  const { mutate: addToFavourites, isPending: isFavouriting } = useMutation({
    mutationFn: (favouriteData) =>
      axiosSecure.post("/favourites", favouriteData),
    onSuccess: () => {
      toast.success("Added to your favourites!");
      queryClient.invalidateQueries(["isFavourite", biodata._id]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Already in favourites or an error occurred."
      );
    },
  });

  const handleAddToFavourites = () => {
    if (!user) {
      toast.error("You must be logged in to add favourites.");
      return;
    }
    const favouriteData = {
      userEmail: user.email,
      biodataId: biodata._id,
      favouritedAt: new Date(),
    };
    addToFavourites(favouriteData);
  };

  const handleRemove = () => {
    removeFromFavourites({ userEmail: user.email, biodataId: biodata._id });
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata._id}`);
  };

  if (isBiodataLoading || isUserLoading || isLoading) {
    return <LoadingSpinner />;
  }

  if (!biodata) {
    return (
      <div className="flex justify-center items-center h-screen text-accent dark:text-dark-accent">
        Could not find biodata. It may have been removed.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bio Data Details | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-background dark:bg-dark-bg min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Main Profile Card */}
          <div className="container mx-auto bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden border border-secondary/20 dark:border-dark-border">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Image and Actions */}
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={biodata.profileImage}
                      alt={biodata.name}
                      className="h-64 w-64 rounded-full object-cover shadow-lg border-4 border-secondary/20 dark:border-dark-border"
                    />
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      {biodata.biodataType}
                    </div>
                  </div>
                  <h1 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text mt-8 text-center">
                    {biodata.name}
                  </h1>
                  <p className="text-txt/70 dark:text-dark-text-muted mt-1">
                    Biodata ID: {biodata.biodataId}
                  </p>
                  <div className="w-full mt-8 space-y-4">
                    {isFavourite ? (
                      <button
                        onClick={handleRemove}
                        disabled={isRemoving}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent/10 dark:bg-dark-accent/20 px-6 py-3 font-medium text-accent dark:text-dark-utility shadow-sm hover:bg-accent/20 dark:hover:bg-dark-accent/30 transition-colors disabled:opacity-50"
                      >
                        <FaHeart className="text-accent dark:text-dark-utility" />
                        {isRemoving ? "Removing..." : "Added to Favourites"}
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToFavourites}
                        disabled={isFavouriting}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent/10 dark:bg-dark-accent/20 px-6 py-3 font-medium text-accent dark:text-dark-utility shadow-sm hover:bg-accent/20 dark:hover:bg-dark-accent/30 transition-colors disabled:opacity-50"
                      >
                        <FaHeart className="text-accent dark:text-dark-utility" />
                        {isFavouriting ? "Adding..." : "Add to Favourites"}
                      </button>
                    )}

                    <button
                      onClick={handleRequestContact}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent dark:bg-dark-accent px-6 py-3 font-medium text-white shadow-md hover:bg-accent/90 dark:hover:bg-dark-accent/90 transition-transform hover:scale-[1.02]"
                    >
                      <FaStar />
                      {isPremium ? "View Contact Info" : "Request Contact Info"}
                    </button>
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details Section */}
                    <div className="md:col-span-2">
                      <h2 className="font-secondary text-2xl font-semibold text-txt dark:text-dark-text mb-4 pb-2 border-b border-secondary/20 dark:border-dark-border">
                        Personal Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          icon={
                            <FaBirthdayCake className="text-utility dark:text-dark-utility" />
                          }
                          label="Date of Birth"
                          value={new Date(
                            biodata.dateOfBirth
                          ).toLocaleDateString()}
                        />
                        <ProfileField
                          icon={
                            <FaUserCircle className="text-utility dark:text-dark-utility" />
                          }
                          label="Age"
                          value={`${biodata.age} years`}
                        />
                        <ProfileField
                          icon={
                            <FaRulerVertical className="text-utility dark:text-dark-utility" />
                          }
                          label="Height"
                          value={biodata.height}
                        />
                        <ProfileField
                          icon={
                            <FaWeight className="text-utility dark:text-dark-utility" />
                          }
                          label="Weight"
                          value={biodata.weight}
                        />
                        <ProfileField
                          icon={
                            <FaBriefcase className="text-utility dark:text-dark-utility" />
                          }
                          label="Occupation"
                          value={biodata.occupation}
                        />
                        <ProfileField
                          icon={
                            <FaFlag className="text-utility dark:text-dark-utility" />
                          }
                          label="Race"
                          value={biodata.race}
                        />
                      </div>
                    </div>

                    {/* Family & Location Section */}
                    <div className="md:col-span-2">
                      <h2 className="font-secondary text-2xl font-semibold text-txt dark:text-dark-text mb-4 pb-2 border-b border-secondary/20 dark:border-dark-border">
                        Family & Location
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          icon={
                            <FaUserCircle className="text-utility dark:text-dark-utility" />
                          }
                          label="Father's Name"
                          value={biodata.fathersName}
                        />
                        <ProfileField
                          icon={
                            <FaUserCircle className="text-utility dark:text-dark-utility" />
                          }
                          label="Mother's Name"
                          value={biodata.mothersName}
                        />
                        <ProfileField
                          icon={
                            <FaFlag className="text-utility dark:text-dark-utility" />
                          }
                          label="Permanent Division"
                          value={biodata.permanentDivision}
                        />
                        <ProfileField
                          icon={
                            <FaFlag className="text-utility dark:text-dark-utility" />
                          }
                          label="Present Division"
                          value={biodata.presentDivision}
                        />
                      </div>
                    </div>

                    {/* Partner Expectation Section */}
                    <div className="md:col-span-2">
                      <h2 className="font-secondary text-2xl font-semibold text-txt dark:text-dark-text mb-4 pb-2 border-b border-secondary/20 dark:border-dark-border">
                        Partner Expectation
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          icon={
                            <FaUserCircle className="text-utility dark:text-dark-utility" />
                          }
                          label="Expected Partner Age"
                          value={`${biodata.expectedPartnerAge} years`}
                        />
                        <ProfileField
                          icon={
                            <FaRulerVertical className="text-utility dark:text-dark-utility" />
                          }
                          label="Expected Partner Height"
                          value={biodata.expectedPartnerHeight}
                        />
                        <ProfileField
                          icon={
                            <FaWeight className="text-utility dark:text-dark-utility" />
                          }
                          label="Expected Partner Weight"
                          value={biodata.expectedPartnerWeight}
                        />
                      </div>
                    </div>

                    {/* Conditional Contact Info */}
                    {isPremium && (
                      <div className="md:col-span-2">
                        <h2 className="font-secondary text-2xl font-semibold text-utility dark:text-dark-utility mb-4 pb-2 border-b border-utility/20 dark:border-dark-utility/20">
                          Contact Information (Premium)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ProfileField
                            icon={
                              <FaEnvelope className="text-utility dark:text-dark-utility" />
                            }
                            label="Contact Email"
                            value={biodata.contactEmail}
                          />
                          <ProfileField
                            icon={
                              <FaMobileAlt className="text-utility dark:text-dark-utility" />
                            }
                            label="Mobile Number"
                            value={biodata.mobileNumber}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Biodatas Section */}
          {similarBiodatas && similarBiodatas.length > 0 && (
            <div className="mt-16">
              <h2 className="text-center font-secondary text-3xl font-bold text-txt dark:text-dark-text mb-8">
                Similar Profiles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarBiodatas.map((similar) => (
                  <SimilarProfileCard key={similar._id} biodata={similar} />
                ))}
              </div>
            </div>
          )}
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default BiodataDetailsPage;
