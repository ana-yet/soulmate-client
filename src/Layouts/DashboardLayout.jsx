import React, { useState } from "react";
import { Outlet } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Pages/Dashboard/Header/Header";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-background dark:bg-dark-bg font-primary text-txt">
      {/* --- Mobile Sidebar --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
            />
            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              <Sidebar onLinkClick={toggleSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- Static Sidebar for Desktop --- */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:border-r md:border-secondary/30">
        <Sidebar />
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex flex-1 flex-col md:pl-64">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* --- Page Content using Outlet --- */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
