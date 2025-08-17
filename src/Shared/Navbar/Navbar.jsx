import React, { useState, useCallback } from "react";
import { Link } from "react-router";
import {
  HiMenuAlt3,
  HiX,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import NavbarLink from "./NavbarLink";
import useAuth from "../../Hook/useAuth";

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

const Navbar = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary/50 bg-background/90 backdrop-blur-lg dark:border-dark-border dark:bg-dark-bg/90">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-md p-1"
          aria-label="Home"
        >
          <FaRegHeart className="text-3xl text-accent dark:text-accent transition-colors" />
          <span className="font-secondary text-2xl font-bold text-txt dark:text-dark-text transition-colors">
            Soulmate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {mainLinks.map((link) => (
            <NavbarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              className="dark:hover:bg-dark-secondary/50"
            >
              {link.title}
            </NavbarLink>
          ))}
          {user ? (
            <NavbarLink
              to="/dashboard"
              icon={<HiOutlineViewGrid />}
              className="!text-utility hover:!bg-utility/10 hover:!text-utility dark:hover:!bg-utility/20"
            >
              Dashboard
            </NavbarLink>
          ) : (
            <Link
              to="/login"
              className="ml-4 rounded-full bg-accent px-6 py-2 font-primary font-medium text-white shadow-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-accent dark:hover:bg-accent/90"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-3xl text-txt transition-colors hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-md p-1 md:hidden dark:text-dark-text dark:hover:text-accent"
        >
          {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed left-0 right-0 z-40 bg-background shadow-lg transition-all duration-300 ease-in-out md:hidden dark:bg-dark-bg dark:shadow-dark-border/10 ${
          isMenuOpen
            ? "top-20 opacity-100 visible"
            : "-top-[30rem] opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-4 border-t border-secondary/50 p-6 dark:border-dark-border">
          {mainLinks.map((link) => (
            <NavbarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              onClick={closeMenu}
              className="dark:hover:bg-dark-secondary"
            >
              {link.title}
            </NavbarLink>
          ))}
          <div className="mt-4 w-full border-t border-secondary/50 pt-6 dark:border-dark-border">
            {user ? (
              <NavbarLink
                to="/dashboard"
                icon={<HiOutlineViewGrid />}
                onClick={closeMenu}
                className="w-full justify-center !bg-utility/10 !text-utility dark:!bg-utility/20"
              >
                Dashboard
              </NavbarLink>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block w-full rounded-md bg-accent py-3 text-center font-primary font-medium text-white transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-accent dark:hover:bg-accent/80"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
