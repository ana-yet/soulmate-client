import React from "react";
import useUserInfo from "../../Hook/useUserInfo";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";

const Dashboard = () => {
  const { isAdmin, isUserInfoLoading } = useUserInfo();
  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
