import React from "react";
import { NavLink, useNavigate } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import {
  HiOutlineUsers,
  HiOutlineCheckCircle,
  HiOutlineMailOpen,
  HiOutlineLogout,
  HiOutlinePencilAlt,
  HiOutlineEye,
  HiOutlineStar,
} from "react-icons/hi";
import useRole from "../../../Hook/useRole";
import useAuth from "../../../Hook/useAuth";
import Logo from "../../../Shared/Logo/Logo";
import SidebarLink from "./SidebarLink";
import toast from "react-hot-toast";
import useUserInfo from "../../../Hook/useUserInfo";

// --- Sidebar Link Data ---
const adminLinks = [
  {
    to: "/dashboard/manage-users",
    icon: <HiOutlineUsers />,
    text: "Manage Users",
  },
  {
    to: "/dashboard/approve-premium",
    icon: <HiOutlineCheckCircle />,
    text: "Approve Premium",
  },
  {
    to: "/dashboard/approve-contacts",
    icon: <HiOutlineMailOpen />,
    text: "Approve Contacts",
  },
];

const userLinks = [
  {
    to: "/dashboard/edit-biodata",
    icon: <HiOutlinePencilAlt />,
    text: "Edit Biodata",
  },
  {
    to: "/dashboard/view-biodata",
    icon: <HiOutlineEye />,
    text: "View Biodata",
  },
  {
    to: "/dashboard/contact-requests",
    icon: <HiOutlineMailOpen />,
    text: "Contact Requests",
  },
  {
    to: "/dashboard/favourites",
    icon: <HiOutlineStar />,
    text: "Favourite Biodata",
  },
];

const Sidebar = ({ onLinkClick = () => {} }) => {
  const {
    role,
    subscriptionType,
    isAdmin,
    isPremium,
    isUser,
    isPending,
    isUserInfoLoading,
  } = useUserInfo();
  console.log(
    { role },
    { isAdmin },
    { isPremium },
    { isUser },
    { subscriptionType },
    { isPending }
  );

  const { userSignOut } = useAuth();
  const navigate = useNavigate();

  const links = role === "admin" ? adminLinks : userLinks;

  const handleLogout = async () => {
    // 1. Start a loading toast and get its ID
    const toastId = toast.loading("Signing out...");

    try {
      //2. Attempt to sign out the user
      await userSignOut();

      // 3. Update the toast to show success
      toast.success("Signed out successfully!", { id: toastId });
      navigate("/login");
    } catch (error) {
      // 4. Update the toast to show an error if it fails
      toast.error("Failed to sign out. Please try again.", { id: toastId });
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-20 flex-shrink-0 items-center gap-2 px-6">
        <Logo />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {isUserInfoLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-full animate-pulse rounded-lg bg-secondary/20"
              ></div>
            ))}
          </div>
        ) : (
          links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              text={link.text}
              onClick={onLinkClick}
            />
          ))
        )}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto border-t border-secondary/30 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-lg px-4 py-3 font-medium text-txt/70 transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <HiOutlineLogout className="text-2xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
