import { NavLink } from "react-router";
import clsx from "clsx"; // Using clsx for better className composition
import React from "react";

const SidebarLink = ({ to, icon, text, onClick }) => {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      onClick={onClick}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-4 rounded-lg px-4 py-3 font-medium transition-all duration-200",
          {
            // Active state (both light and dark)
            "bg-accent text-white shadow-md": isActive,

            // Inactive state - light mode
            "text-txt/70 hover:bg-accent/10 hover:text-accent": !isActive,

            // Inactive state - dark mode
            "dark:text-dark-text-muted dark:hover:bg-accent/20 dark:hover:text-accent":
              !isActive,

            // Active state - dark mode adjustments
            "dark:bg-accent-dark dark:text-white": isActive,
          }
        )
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm sm:text-base">{text}</span>
    </NavLink>
  );
};

export default React.memo(SidebarLink);
