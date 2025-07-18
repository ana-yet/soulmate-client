import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const { user, loading } = useAuth();
  const secureAxios = useAxiosSecure();

  const [userInfo, setUserInfo] = useState({
    role: null,
    subscriptionType: null,
  });
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsUserInfoLoading(true);
      secureAxios
        .get(`/users/info/${user.email}`)
        .then((res) => {
          setUserInfo({
            role: res.data.role,
            subscriptionType: res.data.subscriptionType || "basic",
          });
          setIsUserInfoLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
          setIsUserInfoLoading(false);
        });
    }
  }, [user?.email, secureAxios]);

  return {
    ...userInfo,
    isAdmin: userInfo.role === "admin",
    isUser: userInfo.role === "user",
    isPremium: userInfo.subscriptionType === "premium",
    isPending: userInfo.subscriptionType === "pending",
    isBasic: userInfo.subscriptionType === "basic",
    isUserInfoLoading,
  };
};

export default useUserInfo;
