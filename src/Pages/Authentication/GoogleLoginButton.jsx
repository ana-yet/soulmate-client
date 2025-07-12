import React from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { SiGoogle } from "react-icons/si";
import useAuth from "../../Hook/useAuth";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Signing in with Google...");
    try {
      await googleLogin();
      toast.success("Successfully signed in!", { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to sign in with Google.", {
        id: toastId,
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-secondary/50 bg-white py-3 font-primary font-semibold text-txt shadow-sm transition-all hover:bg-secondary/10"
    >
      <SiGoogle className="text-xl text-accent" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
