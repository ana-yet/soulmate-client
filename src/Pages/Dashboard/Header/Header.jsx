import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../Hook/useAuth";
import Logo from "../../../Shared/Logo/Logo";
import toast from "react-hot-toast";
import clsx from "clsx";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, userSignOut, darkMode, setDarkMode } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const toastId = toast.loading("Signing out...");

    try {
      await userSignOut();
      toast.success("Signed out successfully!", { id: toastId });
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.", { id: toastId });
      console.error("Logout Error:", error);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    //  Persist theme preference in localStorage
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-30 flex h-20 flex-shrink-0 items-center justify-between",
        "border-b border-secondary/30 bg-background/80 px-4 backdrop-blur-md",
        "dark:border-dark-border dark:bg-dark-bg/80 sm:px-6 lg:px-8"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className={clsx(
            "rounded-full p-2 transition-colors hover:bg-secondary/20",
            "text-txt/70 hover:text-txt dark:text-dark-text-muted dark:hover:bg-dark-secondary/50",
            "md:hidden"
          )}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <HiOutlineX size={24} />
          ) : (
            <HiOutlineMenu size={24} />
          )}
        </button>

        {/* Mobile Logo */}
        <div className="md:hidden">
          <Logo />
        </div>
      </div>

      {/* Right-side Navigation */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={clsx(
            "rounded-full p-2 transition-colors hover:bg-secondary/20",
            "text-txt/70 hover:text-txt dark:text-dark-text-muted dark:hover:bg-dark-secondary/50",
            "focus:outline-none focus:ring-2 focus:ring-accent/50"
          )}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? (
            <HiOutlineSun size={22} className="text-amber-300" />
          ) : (
            <HiOutlineMoon size={22} className="text-indigo-500" />
          )}
        </button>

        {/* Notification Bell */}
        <button
          className={clsx(
            "relative rounded-full p-2 transition-colors hover:bg-secondary/20",
            "text-txt/70 hover:text-txt dark:text-dark-text-muted dark:hover:bg-dark-secondary/50",
            "focus:outline-none focus:ring-2 focus:ring-accent/50"
          )}
          aria-label="Notifications"
        >
          <HiOutlineBell size={22} />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-accent ring-2 ring-white dark:ring-dark-bg"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full"
            aria-label="User menu"
          >
            <img
              className={clsx(
                "h-10 w-10 rounded-full object-cover transition-all",
                "ring-2 ring-transparent hover:ring-accent/50",
                "dark:hover:ring-accent/70"
              )}
              src={user?.photoURL || "https://placehold.co/100x100"}
              alt={user?.displayName || "User avatar"}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={clsx(
                  "absolute right-0 mt-2 w-56 origin-top-right rounded-lg py-1 shadow-lg",
                  "bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border",
                  "focus:outline-none z-50"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-3">
                  <p className="truncate font-medium text-txt dark:text-dark-text">
                    {user?.displayName}
                  </p>
                  <p className="truncate text-sm text-txt/60 dark:text-dark-text-muted">
                    {user?.email}
                  </p>
                </div>
                <div className="mx-4 my-1 h-px bg-secondary/20 dark:bg-dark-border"></div>
                <button
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setIsDropdownOpen(false);
                  }}
                  className={clsx(
                    "block w-full px-4 py-2 text-left text-sm transition-colors",
                    "text-txt hover:bg-secondary/10 dark:text-dark-text dark:hover:bg-dark-secondary/70"
                  )}
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className={clsx(
                    "block w-full px-4 py-2 text-left text-sm transition-colors",
                    "text-accent hover:bg-accent/10 dark:text-accent-light dark:hover:bg-accent/20"
                  )}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
