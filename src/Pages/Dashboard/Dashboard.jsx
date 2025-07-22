import React from "react";
import useUserInfo from "../../Hook/useUserInfo";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
  const { isAdmin, isUserInfoLoading } = useUserInfo();
  if (isUserInfoLoading) {
    return <LoadingSpinner />;
  }
  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
