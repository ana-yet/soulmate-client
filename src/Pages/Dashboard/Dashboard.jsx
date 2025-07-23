import React from "react";
import useUserInfo from "../../Hook/useUserInfo";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
  const { isAdmin, isUserInfoLoading } = useUserInfo();
  if (isUserInfoLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
