import React from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { SiGoogle } from "react-icons/si";
import useAuth from "../../Hook/useAuth";
import usePublicAxios from "../../Hook/usePublicAxios";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const publicAxios = usePublicAxios();
  // const location = useLocation();
  // const from = location.state?.from || "/dashboard";

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Signing in with Google...");
    try {
      // google login
      const user = await googleLogin();
      console.log(user);
      // user data
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        role: "user",
        subscriptionType: "free",
        subscriptionExpires: null,
        createdAt: new Date(),
      };

      // api call
      await publicAxios.post("/users", userInfo);

      // success alert
      toast.success("Successfully signed in!", { id: toastId });

      // navigate after success
      navigate("/");
    } catch (error) {
      console.log(error);
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
