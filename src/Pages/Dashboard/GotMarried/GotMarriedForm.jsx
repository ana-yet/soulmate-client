import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  HiOutlinePhotograph,
  HiOutlineLink,
  HiOutlinePencilAlt,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineCalendar,
} from "react-icons/hi";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useBiodata } from "../../../Hook/useBiodata";
import useImgbbUploader from "../../../Hook/useImgbbUploader";

const GotMarriedForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: selfBiodata, isLoading: isBiodataLoading } = useBiodata(
    user?.email
  );
  const { uploadImage, uploading } = useImgbbUploader();
  const [imageSource, setImageSource] = useState("upload"); // 'upload' or 'url'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      selfBiodataId: selfBiodata?.biodataId || "",
      selfName: selfBiodata?.name || "",
    },
  });

  // Pre-fill the user's biodata ID and name when it loads
  React.useEffect(() => {
    if (selfBiodata) {
      reset({
        selfBiodataId: selfBiodata.biodataId,
        selfName: selfBiodata.name,
      });
    }
  }, [selfBiodata, reset]);

  const onSubmit = async (formData) => {
    const toastId = toast.loading("Submitting your story...");

    try {
      let finalImageUrl = "";
      if (imageSource === "upload" && formData.coupleImage[0]) {
        finalImageUrl = await uploadImage(formData.coupleImage[0]);
      } else {
        finalImageUrl = formData.imageUrl;
      }

      if (!finalImageUrl) {
        throw new Error("Couple image is required.");
      }

      const storyPayload = {
        selfBiodataId: parseInt(formData.selfBiodataId),
        selfName: formData.selfName,
        partnerBiodataId: parseInt(formData.partnerBiodataId),
        partnerName: formData.partnerName,
        marriageDate: formData.marriageDate,
        coupleImage: finalImageUrl,
        successStory: formData.successStory,
      };

      await axiosSecure.post("/success-stories", storyPayload);

      toast.success("Your story has been submitted for review!", {
        id: toastId,
      });
      reset({
        selfBiodataId: selfBiodata?.biodataId,
        selfName: selfBiodata?.name,
        partnerBiodataId: "",
        partnerName: "",
        marriageDate: "",
        imageUrl: "",
        successStory: "",
      });
    } catch (error) {
      if (error.status === 409) {
        toast.error("You have already submitted Your Story", { id: toastId });
      } else {
        toast.error(error.message || "Failed to submit your story.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <div className="max-w-full mx-auto bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-6 sm:p-8 border border-secondary/20 dark:border-dark-border">
      {/* --- Quranic Verse Header --- */}
      <div className="text-center mb-8 border-b border-secondary/20 dark:border-dark-border pb-6">
        <p className="font-secondary text-lg italic text-txt/80 dark:text-dark-text-muted">
          "And of His signs is that He created for you from yourselves mates
          that you may find tranquillity in them; and He placed between you
          affection and mercy."
        </p>
        <p className="mt-2 text-sm font-semibold text-txt dark:text-dark-text">
          (Surah Ar-Rum 30:21)
        </p>
      </div>

      <h1 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text mb-2">
        Share Your Success Story
      </h1>
      <p className="text-txt/70 dark:text-dark-text-muted mb-8">
        Alhamdulillah! Your journey has led to a beautiful union. Share your
        story to inspire others.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Self Biodata ID */}
          <div>
            <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1">
              Your Biodata ID
            </label>
            <div className="relative">
              <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                {...register("selfBiodataId")}
                readOnly
                className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-mono text-txt/70 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text-muted"
              />
            </div>
          </div>

          {/* Self Name */}
          <div>
            <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1">
              Your Name
            </label>
            <div className="relative">
              <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                {...register("selfName")}
                readOnly
                className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-mono text-txt/70 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text-muted"
              />
            </div>
          </div>

          {/* Partner Biodata ID */}
          <div>
            <label
              htmlFor="partnerBiodataId"
              className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1"
            >
              Partner's Biodata ID
            </label>
            <div className="relative">
              <HiOutlineHeart className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                id="partnerBiodataId"
                type="number"
                {...register("partnerBiodataId", {
                  required: "Partner's ID is required",
                })}
                className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-primary text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            {errors.partnerBiodataId && (
              <p className="mt-1 text-xs text-accent">
                {errors.partnerBiodataId.message}
              </p>
            )}
          </div>

          {/* Partner Name */}
          <div>
            <label
              htmlFor="partnerName"
              className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1"
            >
              Partner's Name
            </label>
            <div className="relative">
              <HiOutlineHeart className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                id="partnerName"
                type="text"
                {...register("partnerName", {
                  required: "Partner's name is required",
                })}
                className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-primary text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            {errors.partnerName && (
              <p className="mt-1 text-xs text-accent">
                {errors.partnerName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marriage Date */}
          <div>
            <label
              htmlFor="marriageDate"
              className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1"
            >
              Marriage Date
            </label>
            <div className="relative">
              <HiOutlineCalendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                id="marriageDate"
                type="date"
                {...register("marriageDate", {
                  required: "Marriage date is required",
                })}
                className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-primary text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            {errors.marriageDate && (
              <p className="mt-1 text-xs text-accent">
                {errors.marriageDate.message}
              </p>
            )}
          </div>

          {/* Couple Image Input */}
          <div>
            <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-2">
              Couple Image
            </label>
            <div className="flex items-center gap-4 mb-2">
              <button
                type="button"
                onClick={() => setImageSource("upload")}
                className={`px-4 py-2 text-sm rounded-full ${
                  imageSource === "upload"
                    ? "bg-accent text-white"
                    : "bg-secondary/20 dark:bg-dark-border"
                }`}
              >
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => setImageSource("url")}
                className={`px-4 py-2 text-sm rounded-full ${
                  imageSource === "url"
                    ? "bg-accent text-white"
                    : "bg-secondary/20 dark:bg-dark-border"
                }`}
              >
                Use Image URL
              </button>
            </div>
            {imageSource === "upload" ? (
              <div>
                <input
                  id="coupleImage"
                  type="file"
                  {...register("coupleImage", {
                    required:
                      imageSource === "upload"
                        ? "Please upload a photo"
                        : false,
                  })}
                  className="block w-full text-sm text-txt dark:text-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
                />
                {errors.coupleImage && (
                  <p className="mt-1 text-xs text-accent">
                    {errors.coupleImage.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="relative">
                <HiOutlineLink className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  id="imageUrl"
                  type="url"
                  {...register("imageUrl", {
                    required:
                      imageSource === "url"
                        ? "Please provide an image URL"
                        : false,
                  })}
                  placeholder="https://example.com/couple.jpg"
                  className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-primary text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-xs text-accent">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Success Story Textarea */}
        <div>
          <label
            htmlFor="successStory"
            className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1"
          >
            Your Success Story
          </label>
          <div className="relative">
            <HiOutlinePencilAlt className="pointer-events-none absolute left-3 top-4 text-secondary" />
            <textarea
              id="successStory"
              {...register("successStory", {
                required: "Please share your beautiful story",
              })}
              rows="6"
              placeholder="Share how you met, your journey, and your happiness..."
              className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-10 pr-4 font-primary text-txt dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            ></textarea>
          </div>
          {errors.successStory && (
            <p className="mt-1 text-xs text-accent">
              {errors.successStory.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-secondary/20 dark:border-dark-border text-right">
          <button
            type="submit"
            disabled={isSubmitting || uploading || isBiodataLoading}
            className="inline-flex justify-center rounded-lg bg-accent py-3 px-8 font-primary text-lg font-semibold text-white shadow-md transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
          >
            {isSubmitting || uploading ? "Submitting..." : "Submit Your Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GotMarriedForm;
