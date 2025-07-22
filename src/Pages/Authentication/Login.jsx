import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import GoogleLoginButton from "./GoogleLoginButton";
import useAuth from "../../Hook/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";
  const { emailPasswordLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async ({ email, password }) => {
    try {
      await emailPasswordLogin(email, password);
      toast.success("Login successful!");
      navigate(from);
    } catch (error) {
      toast.error(error.message || "Invalid credentials.");
    }
  };

  return (
    <>
      <div className="w-full">
        <h2 className="mb-2 font-secondary text-4xl font-bold text-txt">
          Welcome Back
        </h2>
        <p className="mb-8 font-primary text-txt/70">
          Please enter your details to sign in.
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="relative">
            <HiOutlineMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-12 pr-4 font-primary text-txt placeholder-txt/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-accent">{errors.email.message}</p>
          )}

          <div className="relative">
            <HiOutlineLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full rounded-lg border border-secondary/50 bg-background py-3 pl-12 pr-4 font-primary text-txt placeholder-txt/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-accent">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-accent py-3 font-primary text-lg font-semibold text-white shadow-md transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-primary text-sm text-txt">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-accent hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-secondary/50"></div>
          <span className="mx-4 flex-shrink font-primary text-sm text-txt/70">
            OR
          </span>
          <div className="flex-grow border-t border-secondary/50"></div>
        </div>

        <GoogleLoginButton />
      </div>
    </>
  );
};

export default LoginForm;
