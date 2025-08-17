import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import GoogleLoginButton from "./GoogleLoginButton";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet-async";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { emailPasswordLogin } = useAuth();

  // Determine the redirect path after login
  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Using useCallback to memoize the function and prevent unnecessary re-creations
  const handleLogin = useCallback(
    async ({ email, password }) => {
      try {
        await emailPasswordLogin(email, password);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      } catch (error) {
        toast.error(error.message || "Invalid credentials.");
      }
    },
    [emailPasswordLogin, navigate, from]
  );

  return (
    <div className="w-full dark:bg-dark-bg dark:text-dark-text transition-colors duration-200">
      <Helmet>
        <title>Login | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <h2 className="mb-2 font-secondary text-4xl font-bold text-txt dark:text-dark-text">
        Welcome Back
      </h2>
      <p className="mb-8 font-primary text-txt/70 dark:text-dark-text-muted">
        Please enter your details to sign in.
      </p>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <HiOutlineMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary dark:text-dark-text-muted" />
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-12 pr-4 font-primary text-txt placeholder-txt/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-muted"
            autoComplete="email"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-accent dark:text-accent">
            {errors.email.message}
          </p>
        )}

        {/* Password Input */}
        <div className="relative">
          <HiOutlineLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary dark:text-dark-text-muted" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-12 pr-4 font-primary text-txt placeholder-txt/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:bg-dark-secondary dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-muted"
            autoComplete="current-password"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-accent dark:text-accent">
            {errors.password.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-accent py-3 font-primary text-lg font-semibold text-white shadow-md transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50 dark:hover:bg-accent/80 dark:disabled:bg-accent/30"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="font-primary text-sm text-txt dark:text-dark-text-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-accent hover:underline dark:text-accent"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-secondary/50 dark:border-dark-border"></div>
        <span className="mx-4 flex-shrink font-primary text-sm text-txt/70 dark:text-dark-text-muted">
          OR
        </span>
        <div className="flex-grow border-t border-secondary/50 dark:border-dark-border"></div>
      </div>

      {/* Google Login */}
      <GoogleLoginButton />
    </div>
  );
};

export default React.memo(LoginForm);
