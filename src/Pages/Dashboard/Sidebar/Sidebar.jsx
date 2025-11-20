import React from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineUsers,
  HiOutlineCheckCircle,
  HiOutlineMailOpen,
  HiOutlineLogout,
  HiOutlinePencilAlt,
  HiOutlineEye,
  HiOutlineStar,
  HiOutlineHeart,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { FaBell, FaEnvelope, FaShieldAlt, FaBook, FaCheckCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import Logo from "../../../Shared/Logo/Logo";
import SidebarLink from "./SidebarLink";
import toast from "react-hot-toast";
import useUserInfo from "../../../Hook/useUserInfo";

// Constants for sidebar links
const ADMIN_LINKS = [
  { to: "/dashboard", icon: <HiOutlineViewGrid />, text: "Dashboard" },
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
  {
    to: "/dashboard/approve-married",
    icon: <HiOutlineHeart />,
    text: "Approve Married",
  },
  {
    to: "/dashboard/blog-manager",
    icon: <FaBook />,
    text: "Blog Manager",
  },
  {
    to: "/dashboard/verify-profiles",
    icon: <FaCheckCircle />,
    text: "Verify Profiles",
  },
];

const USER_LINKS = [
  { to: "/dashboard", icon: <HiOutlineViewGrid />, text: "Dashboard" },
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
  {
    to: "/dashboard/got-married",
    icon: <HiOutlineHeart />,
    text: "Got Married",
  },
  {
    to: "/dashboard/messages",
    icon: <FaEnvelope />,
    text: "Messages",
  },
  {
    to: "/dashboard/notifications",
    icon: <FaBell />,
    text: "Notifications",
  },
  {
    to: "/dashboard/verification",
    icon: <FaShieldAlt />,
    text: "Get Verified",
  },
];

const Sidebar = ({ onLinkClick = () => {} }) => {
  const { role, isUserInfoLoading } = useUserInfo();
  const { userSignOut } = useAuth();
  const navigate = useNavigate();

  const links = role === "admin" ? ADMIN_LINKS : USER_LINKS;

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

  return (
    <div className="flex h-full flex-col bg-white dark:bg-dark-secondary border-r border-secondary/20 dark:border-dark-border">
      {/* Logo Section */}
      <div className="flex h-20 flex-shrink-0 items-center gap-2 px-6 border-b border-secondary/20 dark:border-dark-border">
        <Logo />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {isUserInfoLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-full animate-pulse rounded-lg bg-secondary/20 dark:bg-dark-border/20"
              />
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
      <div className="mt-auto border-t border-secondary/20 dark:border-dark-border p-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-txt/70 transition-colors hover:bg-accent/10 hover:text-accent dark:text-dark-text-muted dark:hover:bg-accent/20 dark:hover:text-accent"
        >
          <HiOutlineLogout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
