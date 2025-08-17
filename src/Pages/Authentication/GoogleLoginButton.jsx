import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { SiGoogle } from "react-icons/si";
import useAuth from "../../Hook/useAuth";
import usePublicAxios from "../../Hook/usePublicAxios";

const GoogleLoginButton = React.memo(() => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const publicAxios = usePublicAxios();

  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const handleGoogleLogin = useCallback(async () => {
    const toastId = toast.loading("Signing in with Google...");

    try {
      // Google login
      const { user } = await googleLogin();

      // Prepare user data
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        role: "user",
        subscriptionType: "free",
        subscriptionExpires: null,
        createdAt: new Date().toISOString(),
      };

      // API call
      await publicAxios.post("/users", userInfo);

      // Success feedback
      toast.success("Successfully signed in!", { id: toastId });

      // Navigate to home
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Failed to sign in with Google", {
        id: toastId,
      });
    }
  }, [googleLogin, navigate, publicAxios, from]);

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      aria-label="Continue with Google"
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-secondary/50 bg-white py-3 font-primary font-semibold text-txt shadow-sm transition-all hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-accent/50 dark:border-dark-border dark:bg-dark-secondary dark:text-dark-text dark:hover:bg-dark-secondary/80"
    >
      <SiGoogle className="text-xl text-accent dark:text-accent" />
      <span>Continue with Google</span>
    </button>
  );
});

export default GoogleLoginButton;
