import React, { useState } from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import {
  HiMenuAlt3,
  HiX,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa"; // Placeholder Logo Icon
import NavbarLink from "./NavbarLink";

const mainLinks = [
  { path: "/", title: "Home", icon: <HiOutlineHome /> },
  { path: "/biodatas", title: "Biodatas", icon: <HiOutlineUsers /> },
  {
    path: "/about-us",
    title: "About Us",
    icon: <HiOutlineInformationCircle />,
  },
  { path: "/contact-us", title: "Contact Us", icon: <HiOutlineMail /> },
];

/**
 * The main application Navbar, styled with the "Velvet & Ivory" theme.
 * @param {{isLoggedIn?: boolean}} props
 */
const Navbar = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // Header uses bg-background and a subtle border of bg-secondary
    <header className="sticky top-0 z-50 w-full border-b border-secondary/50 bg-background/90 backdrop-blur-lg">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          {/* Logo icon uses the main accent color for prominence */}
          <FaRegHeart className="text-3xl text-accent" />
          {/* Site name uses the secondary font and main text color (text-txt) */}
          <span className="font-secondary text-2xl font-bold text-txt">
            Soulmate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {mainLinks.map((link) => (
            <NavbarLink key={link.path} to={link.path} icon={link.icon}>
              {link.title}
            </NavbarLink>
          ))}
          {isLoggedIn ? (
            <NavbarLink
              to="/dashboard"
              icon={<HiOutlineViewGrid />}
              // Dashboard link uses the utility color for a premium feel
              className="!text-utility hover:!bg-utility/10 hover:!text-utility"
            >
              Dashboard
            </NavbarLink>
          ) : (
            <Link
              to="/login"
              className="ml-4 rounded-full bg-accent px-6 py-2 font-primary font-medium text-white shadow-sm transition-transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-3xl text-txt md:hidden"
        >
          {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute w-full bg-background shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "top-20" : "-top-[30rem]"
        }`}
      >
        <div className="flex flex-col gap-4 border-t border-secondary/50 p-6">
          {mainLinks.map((link) => (
            <NavbarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              onClick={toggleMenu}
            >
              {link.title}
            </NavbarLink>
          ))}
          <div className="mt-4 w-full border-t border-secondary/50 pt-6">
            {isLoggedIn ? (
              <NavbarLink
                to="/dashboard"
                icon={<HiOutlineViewGrid />}
                onClick={toggleMenu}
                className="w-full justify-center !bg-utility/10 !text-utility"
              >
                Dashboard
              </NavbarLink>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block w-full rounded-md bg-accent py-3 text-center font-primary font-medium text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navbar;
