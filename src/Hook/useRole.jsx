import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import usePublicAxios from "./usePublicAxios";

const useRole = () => {
  const { user, loading } = useAuth();
  const publicAxios = usePublicAxios();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsRoleLoading(true);
      publicAxios
        .get(`/users/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setIsRoleLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsRoleLoading(false);
        });
    }
  }, [user, publicAxios]);

  return {
    role,
    isAdmin: role === "admin",
    isUser: role === "user",
    isRoleLoading,
  };
};

export default useRole;
