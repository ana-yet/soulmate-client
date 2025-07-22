import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";
import LoadingSpinner from "../Pages/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};

export default PrivateRoute;
