import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
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
} from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useBiodata } from "../../../Hook/useBiodata";
import StatusBadge from "./StatusBadge";

// Reusable component for displaying a single profile field
const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <span className="mt-1 text-accent">{icon}</span>
    <div>
      <p className="text-sm font-semibold text-txt/60">{label}</p>
      <p className="text-lg font-medium text-txt">{value || "N/A"}</p>
    </div>
  </div>
);

const ViewBiodata = () => {
  const { user } = useAuth();
  const secureAxios = useAxiosSecure();
  const { data: biodata, isLoading, error, refetch } = useBiodata(user?.email);

  const handlePremiumRequest = () => {
    Swal.fire({
      title: "Confirm Premium Request",
      text: "Are you sure you want to request premium status for your biodata?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#C2185B",
      cancelButtonColor: "#4F4F4F",
      confirmButtonText: "Yes, request premium!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Submitting your request...");
        try {
          await secureAxios.patch(`/request-premium/${biodata._id}`);
          toast.success("Premium request sent successfully!", { id: toastId });
          refetch();
        } catch (err) {
          toast.error(err.message || "Failed to send request.", {
            id: toastId,
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center p-10">Loading your biodata profile...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-accent">Error: {error.message}</div>
    );
  }

  if (!biodata) {
    return (
      <div className="text-center p-10">
        You have not created your biodata yet. Please go to "Edit Biodata" to
        create one.
      </div>
    );
  }

  const isButtonVisible =
    biodata.bioDataStatus !== "premium" && biodata.bioDataStatus !== "pending";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          {/* --- Header --- */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="font-secondary text-4xl font-bold text-txt">
                {biodata.name}
              </h1>
              <p className="text-txt/70">Biodata ID: {biodata.biodataId}</p>
            </div>
            <div className="flex-shrink-0">
              {isButtonVisible ? (
                <button
                  onClick={handlePremiumRequest}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 font-semibold text-white shadow-md transition-transform hover:scale-105"
                >
                  <FaStar />
                  Make Biodata Premium
                </button>
              ) : (
                <StatusBadge status={biodata.bioDataStatus} />
              )}
            </div>
          </div>

          {/* --- Main Content --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Image */}
            <div className="md:col-span-1 flex justify-center">
              <img
                src={biodata.profileImage}
                alt={biodata.name}
                className="h-64 w-64 rounded-full object-cover shadow-lg border-4 border-secondary/20"
              />
            </div>

            {/* Details */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
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

              <h2 className="sm:col-span-2 font-secondary text-2xl font-semibold text-txt border-b border-secondary/20 pb-2 mt-4">
                Contact Information
              </h2>
              <ProfileField
                icon={<FaEnvelope />}
                label="Contact Email"
                value={biodata.contactEmail}
              />
              <ProfileField
                icon={<FaMobileAlt />}
                label="Mobile Number"
                value={biodata.mobileNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBiodata;
