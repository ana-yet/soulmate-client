import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";
import GoogleLoginButton from "./GoogleLoginButton";
import useAuth from "../../Hook/useAuth";
import useImgbbUploader from "../../Hook/useImgbbUploader";
import usePublicAxios from "../../Hook/usePublicAxios";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const navigate = useNavigate();
  const { updateUserProfile, createEmailUser } = useAuth();
  const [photoPreview, setPhotoPreview] = useState(null);
  const { uploadImage, uploading } = useImgbbUploader();
  const publicAxios = usePublicAxios();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const objectUrl = URL.createObjectURL(photoFile[0]);
      setPhotoPreview(objectUrl);

      // Cleanup
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photoFile]);

  const handleRegister = async (data) => {
    const { name, email, password, photo } = data;
    const file = photo[0];

    try {
      // Upload image and create user
      const [photoURL, userCredential] = await Promise.all([
        uploadImage(file),
        createEmailUser(email, password),
      ]);

      const user = userCredential.user;

      // Update profile and post to backend
      await Promise.all([
        updateUserProfile(name, photoURL),
        publicAxios.post("/users", {
          name,
          email,
          photoURL,
          uid: user.uid,
          providerId: user.providerData[0].providerId,
          role: "user",
          subscriptionType: "free",
          subscriptionExpires: null,
          createdAt: new Date(),
        }),
      ]);

      toast.success("Account created successfully!");
      navigate(from);
    } catch (error) {
      toast.error(error.message || "Failed to create account.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Create Account" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="w-full dark:bg-dark-bg dark:text-dark-text">
        <h2 className="mb-2 font-secondary text-3xl mt-10 md:mt-0 md:text-4xl font-bold text-txt dark:text-dark-text">
          Create an Account
        </h2>
        <p className="mb-8 font-primary text-txt/70 dark:text-dark-text-muted">
          Let's get started on your journey.
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <HiOutlineUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary dark:text-dark-text-muted" />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-12 pr-4 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-muted"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-accent dark:text-accent">
              {errors.name.message}
            </p>
          )}

          {/* Email */}
          <div className="relative">
            <HiOutlineMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary dark:text-dark-text-muted" />
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-12 pr-4 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-muted"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-accent dark:text-accent">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <div className="relative">
            <HiOutlineLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary dark:text-dark-text-muted" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-12 pr-4 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-muted"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-accent dark:text-accent">
              {errors.password.message}
            </p>
          )}

          {/* Photo Upload */}
          <div className="flex items-center gap-4">
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Avatar Preview"
                className="h-16 w-16 rounded-full object-cover"
              />
            )}
            <label className="block w-full">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                {...register("photo", {
                  required: "A profile photo is required",
                })}
                accept="image/*"
                className="block w-full text-sm text-txt file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 dark:text-dark-text dark:file:bg-accent/20 dark:file:text-accent dark:hover:file:bg-accent/30"
              />
            </label>
          </div>
          {errors.photo && (
            <p className="text-sm text-accent dark:text-accent">
              {errors.photo.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="w-full rounded-lg bg-accent py-3 font-primary text-lg font-semibold text-white shadow-md transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50 dark:hover:bg-accent/80 dark:disabled:bg-accent/30"
          >
            {isSubmitting || uploading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-primary text-sm text-txt dark:text-dark-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-accent hover:underline dark:text-accent"
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-secondary/50 dark:border-dark-border"></div>
          <span className="mx-4 flex-shrink font-primary text-sm text-txt/70 dark:text-dark-text-muted">
            OR
          </span>
          <div className="flex-grow border-t border-secondary/50 dark:border-dark-border"></div>
        </div>

        <GoogleLoginButton />
      </div>
    </>
  );
};

export default Register;
