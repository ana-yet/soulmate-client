import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <h1>loading...</h1>;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};

export default PrivateRoute;
