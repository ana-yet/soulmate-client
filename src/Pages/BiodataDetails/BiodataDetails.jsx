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

const BiodataDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: biodata,
    // isPremium,
    isLoading: isBiodataLoading,
  } = useQuery({
    queryKey: ["biodataId", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/singleBiodata/${id}`);
      return data.data;
    },
  });

  const { role, isPremium, isLoading: isUserLoading } = useUserInfo();

  const { data: similarBiodatas } = useSimilarBiodata(biodata?._id);

  // Mutation for adding to favourites
  const { mutate: addToFavourites, isPending: isFavouriting } = useMutation({
    mutationFn: (favouriteData) =>
      axiosSecure.post("/favourites", favouriteData),
    onSuccess: () => {
      toast.success("Added to your favourites!");
      // Optionally, refetch a query that checks if it's a favourite
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
      name: biodata.name,
      profileImage: biodata.profileImage,
      biodataType: biodata.biodataType,
    };
    addToFavourites(favouriteData);
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata._id}`);
  };

  if (isBiodataLoading || isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Profile Details...
      </div>
    );
  }

  if (!biodata) {
    return (
      <div className="flex justify-center items-center h-screen text-accent">
        Could not find biodata. It may have been removed.
      </div>
    );
  }

  return (
    <>
      <div className="bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Main Profile Card */}
          <div className=" mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Image and Actions */}
                <div className="lg:col-span-1 flex flex-col items-center">
                  <img
                    src={biodata.profileImage}
                    alt={biodata.name}
                    className="h-64 w-64 rounded-full object-cover shadow-lg border-4 border-secondary/20"
                  />
                  <h1 className="font-secondary text-4xl font-bold text-txt mt-6 text-center">
                    {biodata.name}
                  </h1>
                  <p className="text-txt/70">Biodata ID: {biodata.biodataId}</p>
                  <div className="w-full mt-8 space-y-3">
                    <button
                      onClick={handleAddToFavourites}
                      disabled={isFavouriting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent/10 px-6 py-3 font-semibold text-accent shadow-sm transition-colors hover:bg-accent/20 disabled:cursor-not-allowed"
                    >
                      <FaHeart />{" "}
                      {isFavouriting ? "Adding..." : "Add to Favourites"}
                    </button>
                    {!isPremium && (
                      <button
                        onClick={handleRequestContact}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105"
                      >
                        <FaStar /> Request Contact Info
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <h2 className="sm:col-span-2 font-secondary text-2xl font-semibold text-txt border-b border-secondary/20 pb-2">
                    Personal Details
                  </h2>
                  <ProfileField
                    icon={<FaVenusMars />}
                    label="Biodata Type"
                    value={biodata.biodataType}
                  />
                  <ProfileField
                    icon={<FaBirthdayCake />}
                    label="Date of Birth"
                    value={new Date(biodata.dateOfBirth).toLocaleDateString()}
                  />
                  <ProfileField
                    icon={<FaUserCircle />}
                    label="Age"
                    value={`${biodata.age} years`}
                  />
                  <ProfileField
                    icon={<FaRulerVertical />}
                    label="Height"
                    value={biodata.height}
                  />
                  <ProfileField
                    icon={<FaWeight />}
                    label="Weight"
                    value={biodata.weight}
                  />
                  <ProfileField
                    icon={<FaBriefcase />}
                    label="Occupation"
                    value={biodata.occupation}
                  />
                  <ProfileField
                    icon={<FaFlag />}
                    label="Race"
                    value={biodata.race}
                  />

                  <h2 className="sm:col-span-2 font-secondary text-2xl font-semibold text-txt border-b border-secondary/20 pb-2 mt-4">
                    Family & Location
                  </h2>
                  <ProfileField
                    icon={<FaUserCircle />}
                    label="Father's Name"
                    value={biodata.fathersName}
                  />
                  <ProfileField
                    icon={<FaUserCircle />}
                    label="Mother's Name"
                    value={biodata.mothersName}
                  />
                  <ProfileField
                    icon={<FaFlag />}
                    label="Permanent Division"
                    value={biodata.permanentDivision}
                  />
                  <ProfileField
                    icon={<FaFlag />}
                    label="Present Division"
                    value={biodata.presentDivision}
                  />

                  <h2 className="sm:col-span-2 font-secondary text-2xl font-semibold text-txt border-b border-secondary/20 pb-2 mt-4">
                    Partner Expectation
                  </h2>
                  <ProfileField
                    icon={<FaUserCircle />}
                    label="Expected Partner Age"
                    value={`${biodata.expectedPartnerAge} years`}
                  />
                  <ProfileField
                    icon={<FaRulerVertical />}
                    label="Expected Partner Height"
                    value={biodata.expectedPartnerHeight}
                  />
                  <ProfileField
                    icon={<FaWeight />}
                    label="Expected Partner Weight"
                    value={biodata.expectedPartnerWeight}
                  />

                  {/* Conditional Contact Info */}
                  {isPremium && (
                    <>
                      <h2 className="sm:col-span-2 font-secondary text-2xl font-semibold text-utility border-b border-utility/20 pb-2 mt-4">
                        Contact Information (Premium)
                      </h2>
                      <ProfileField
                        icon={<FaEnvelope className="text-utility" />}
                        label="Contact Email"
                        value={biodata.contactEmail}
                      />
                      <ProfileField
                        icon={<FaMobileAlt className="text-utility" />}
                        label="Mobile Number"
                        value={biodata.mobileNumber}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Biodatas Section */}
          {similarBiodatas && similarBiodatas.length > 0 && (
            <div className="mt-16">
              <h2 className="text-center font-secondary text-3xl font-bold text-txt mb-8">
                Similar Profiles
              </h2>
              <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarBiodatas.map((similar) => (
                  <SimilarProfileCard key={similar._id} biodata={similar} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BiodataDetailsPage;
