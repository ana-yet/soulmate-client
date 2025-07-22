import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-background dark:bg-dark-bg">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
