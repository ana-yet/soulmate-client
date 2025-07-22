import React, { Children } from "react";
import { Navigate } from "react-router";
import useAuth from "../Hook/useAuth";
import useUserInfo from "../Hook/useUserInfo";
import LoadingSpinner from "../Pages/LoadingSpinner/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isUserInfoLoading } = useUserInfo();

  if (loading || isUserInfoLoading) {
    return <LoadingSpinner />;
  }

  if (!user || !isAdmin) {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default AdminRoute;
