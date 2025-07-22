import React from "react";
import { NavLink } from "react-router";
import PropTypes from "prop-types";

const NavbarLink = ({ to, icon, children, className = "", onClick }) => {
  // Base classes for all links, using your custom font-primary
  const baseClasses =
    "group flex items-center gap-3 rounded-lg px-4 py-2 font-primary text-base font-medium transition-all duration-300";

  const activeClass = "bg-accent/10 text-accent";

  const inactiveClass = "text-txt hover:bg-accent/5 hover:text-accent";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClass : inactiveClass} ${className}`
      }
    >
      {/* Icon passed as a prop */}
      <span className="text-xl">{icon}</span>
      {/* Link title */}
      <span>{children}</span>
    </NavLink>
  );
};

NavbarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavbarLink;
