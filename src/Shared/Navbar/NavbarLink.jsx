import React from "react";
import { NavLink } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx"; // For better className composition

const NavbarLink = React.memo(
  ({ to, icon, children, className = "", onClick }) => {
    // Base classes for all states
    const baseClasses = clsx(
      "group flex items-center gap-3 rounded-lg px-4 py-2",
      "font-primary text-base font-medium",
      "transition-all duration-300",
      className
    );

    // Active state classes
    const activeClasses = clsx(
      "bg-accent/10 text-accent",
      "dark:bg-accent/20 dark:text-accent-light"
    );

    // Inactive state classes
    const inactiveClasses = clsx(
      "text-txt hover:bg-accent/5 hover:text-accent",
      "dark:text-dark-text-muted dark:hover:bg-accent/10 dark:hover:text-accent-light"
    );

    return (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          clsx(baseClasses, isActive ? activeClasses : inactiveClasses)
        }
      >
        {/* Icon with consistent sizing and transition */}
        <span className="text-xl transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
        {/* Link text with proper truncation */}
        <span className="truncate">{children}</span>
      </NavLink>
    );
  }
);

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavbarLink;
