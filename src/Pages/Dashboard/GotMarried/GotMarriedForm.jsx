import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  HiOutlineLink,
  HiOutlinePencilAlt,
  HiOutlineHeart,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineVideoCamera,
  HiOutlineStar,
} from "react-icons/hi";

import useAuth from "../../../Hook/useAuth";
import { useBiodata } from "../../../Hook/useBiodata";
import useImgbbUploader from "../../../Hook/useImgbbUploader";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import RatingStars from "./RatingStars/RatingStars";
import FormField from "./FormField/FormField";

const GotMarriedForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: selfBiodata,
    isLoading: isBiodataLoading,
    error,
  } = useBiodata(user?.email);
  const { uploadImage, uploading } = useImgbbUploader();

  const [imageSource, setImageSource] = useState("upload");
  const [weddingPhotos, setWeddingPhotos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      selfBiodataId: selfBiodata?.biodataId || "",
      selfName: selfBiodata?.name || "",
      selfBirthYear: selfBiodata?.dateOfBirth?.split("-")[0] || "",
      platformRating: 5,
    },
  });

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - weddingPhotos.length);
    if (!files.length) return;
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => ({
          url: await uploadImage(file),
          name: file.name,
        }))
      );
      setWeddingPhotos([...weddingPhotos, ...uploaded]);
    } catch {
      toast.error("Failed to upload photos");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      let finalImageUrl = "";
      if (imageSource === "upload" && data.coupleImage?.[0]) {
        finalImageUrl = await uploadImage(data.coupleImage[0]);
      } else {
        finalImageUrl = data.imageUrl;
      }

      // Handle marriage certificate upload
      const certificate = data.marriageCertificate?.[0]
        ? await uploadImage(data.marriageCertificate[0])
        : "";

      const payload = {
        ...data,
        selfBiodataId: selfBiodata?.biodataId,
        selfName: selfBiodata?.name,
        coupleImage: finalImageUrl,
        weddingPhotos: weddingPhotos.map((p) => p.url),
        marriageCertificate: certificate,
      };
      console.log(payload);

      // send data to server
      // await axiosSecure.post("/success-stories", payload);
      toast.success("Story submitted for review!");
      // reset();
      // setWeddingPhotos([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    }
  };

  // Field Definitions
  const fields = [
    {
      label: "Your Birth Year",
      name: "selfBirthYear",
      icon: HiOutlineHeart,
      type: "number",
      required: true,
      placeholder: "e.g. 1999",
    },
    {
      label: "Partner's Biodata ID",
      name: "partnerBiodataId",
      icon: HiOutlineHeart,
      required: true,
      placeholder: "Enter partner's ID",
    },
    {
      label: "Partner's Name",
      name: "partnerName",
      icon: HiOutlineHeart,
      required: true,
      placeholder: "Partner's full name",
    },
    {
      label: "Partner's Birth Year",
      name: "partnerBirthYear",
      type: "number",
      icon: HiOutlineHeart,
      required: true,
      placeholder: "e.g. 2000",
    },
    {
      label: "Marriage Date",
      name: "marriageDate",
      type: "date",
      icon: HiOutlineCalendar,
      required: true,
      placeholder: "Select date",
    },
    {
      label: "Wedding Location",
      name: "weddingLocation",
      icon: HiOutlineLocationMarker,
      required: true,
      placeholder: "City, Country",
    },
    {
      label: "Duration Before Marriage",
      name: "durationBeforeMarriage",
      icon: HiOutlineClock,
      required: true,
      placeholder: "e.g. 6 months",
    },
    {
      label: "First Contact Story",
      name: "firstContactStory",
      icon: HiOutlineSparkles,
      placeholder: "How you first met",
    },
    {
      label: "Favorite Memory",
      name: "favoriteMemory",
      icon: HiOutlineSparkles,
      placeholder: "Your best moment",
    },
    {
      label: "Video Link",
      name: "videoLink",
      icon: HiOutlineVideoCamera,
      placeholder: "Paste video URL",
    },
    {
      label: "Marriage Certificate",
      name: "marriageCertificate",
      type: "file",
      accept: "image/*,.pdf",
    },
    {
      label: "Your Success Story",
      name: "successStory",
      type: "textarea",
      icon: HiOutlinePencilAlt,
      required: true,
      rows: 6,
      placeholder: "Write your story...",
    },
    {
      label: "Advice to Singles",
      name: "adviceToSingles",
      type: "textarea",
      icon: HiOutlineLightBulb,
      required: true,
      placeholder: "Share your advice...",
    },
    {
      label: "Platform Feedback",
      name: "platformFeedback",
      type: "textarea",
      icon: HiOutlineStar,
      placeholder: "Your feedback here",
    },
  ];

  if (isBiodataLoading) {
    return (
      <div className="p-6 bg-background dark:bg-dark-bg rounded-2xl shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-secondary/30 dark:bg-dark-secondary rounded w-1/3"></div>
          <div className="h-4 bg-secondary/20 dark:bg-dark-secondary rounded w-2/3"></div>
          <div className="h-64 bg-secondary/20 dark:bg-dark-secondary rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-background dark:bg-dark-bg rounded-2xl shadow-lg text-center">
        <p className="text-accent font-semibold">
          Failed to load biodata. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto bg-background dark:bg-dark-bg rounded-2xl shadow-lg p-6 sm:p-8 border border-secondary/20 dark:border-dark-border">
      <h1 className="text-3xl font-secondary font-bold text-txt dark:text-dark-text mb-2">
        Share Your Success Story
      </h1>
      <p className="text-txt/70 dark:text-dark-text-muted mb-8">
        Alhamdulillah! Share your journey to inspire others.
      </p>

      <div className="mb-6 p-4 bg-secondary/20 dark:bg-dark-secondary rounded-lg">
        <p className="text-txt dark:text-dark-text font-semibold">
          Your Biodata ID: {selfBiodata?.biodataId}
        </p>
        <p className="text-txt dark:text-dark-text font-semibold">
          Your Name: {selfBiodata?.name}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Looping Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((f) => (
            <FormField
              key={f.name}
              {...f}
              register={register}
              errors={errors}
              disabled={isBiodataLoading || uploading}
            />
          ))}
        </div>

        {/* Couple Image */}
        <div>
          <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-2">
            Couple Image
          </label>
          <div className="flex gap-4 mb-2">
            {["upload", "url"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setImageSource(v)}
                disabled={isBiodataLoading || uploading}
                className={`px-4 py-2 text-sm rounded-full ${
                  imageSource === v
                    ? "bg-accent text-white"
                    : "bg-secondary/20 dark:bg-dark-border"
                }`}
              >
                {v === "upload" ? "Upload" : "Use URL"}
              </button>
            ))}
          </div>
          {imageSource === "upload" ? (
            <input
              type="file"
              {...register("coupleImage", { required: true })}
              disabled={isBiodataLoading || uploading}
            />
          ) : (
            <FormField
              name="imageUrl"
              register={register}
              errors={errors}
              required
              icon={HiOutlineLink}
              placeholder="Paste image URL"
              disabled={isBiodataLoading || uploading}
            />
          )}
        </div>

        {/* Wedding Photos */}
        <div>
          <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-2">
            Wedding Photos (Max 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            disabled={isBiodataLoading || uploading}
          />
          {weddingPhotos.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {weddingPhotos.map((photo, i) => (
                <div key={i} className="relative group">
                  <img
                    src={photo.url}
                    alt=""
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setWeddingPhotos(
                        weddingPhotos.filter((_, idx) => idx !== i)
                      )
                    }
                    className="absolute -top-2 -right-2 bg-accent text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-2">
            Platform Rating
          </label>
          <RatingStars
            value={watch("platformRating")}
            onChange={(r) => setValue("platformRating", r)}
          />
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-secondary/20 dark:border-dark-border text-right">
          <button
            type="submit"
            disabled={isSubmitting || isBiodataLoading || uploading}
            className="rounded-lg bg-accent py-3 px-8 font-primary text-lg font-semibold text-white shadow-md hover:bg-accent/90 disabled:bg-accent/50"
          >
            {isSubmitting || uploading ? "Submitting..." : "Submit Your Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GotMarriedForm;
