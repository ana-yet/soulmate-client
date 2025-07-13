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

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, userSignOut } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleLogout = async () => {
    await userSignOut();
    navigate("/login");
  };

  // todo: dark mode functionality
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 flex-shrink-0 items-center justify-between border-b border-secondary/30 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="rounded-full p-2 text-txt/70 transition-colors hover:bg-secondary/20 md:hidden"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <HiOutlineX size={24} />
          ) : (
            <HiOutlineMenu size={24} />
          )}
        </button>

        {/* Mobile Logo (visible only on mobile) */}
        <div className="md:hidden">
          <Logo />
        </div>
      </div>

      {/* Right-side Icons and Avatar */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 text-txt/70 transition-colors hover:bg-secondary/20"
        >
          {isDarkTheme ? (
            <HiOutlineSun size={22} />
          ) : (
            <HiOutlineMoon size={22} />
          )}
        </button>

        {/* Notification Bell */}
        <button className="relative rounded-full p-2 text-txt/70 transition-colors hover:bg-secondary/20">
          <HiOutlineBell size={22} />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-accent"></span>
        </button>

        {/* Avatar and Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="block"
          >
            <img
              className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent transition-all hover:ring-accent/50"
              src={user?.photoURL || "https://placehold.co/100x100"}
              alt="User avatar"
            />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-4 py-2 text-sm text-txt">
                  <p className="font-semibold">{user?.displayName}</p>
                  <p className="truncate text-txt/60">{user?.email}</p>
                </div>
                <div className="my-1 h-px bg-secondary/20" />
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="block w-full px-4 py-2 text-left text-sm text-txt hover:bg-secondary/10"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-accent hover:bg-accent/10"
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

export default Header;
