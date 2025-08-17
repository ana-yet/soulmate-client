import React, { useCallback } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router";

const Logo = React.memo(() => {
  const navigate = useNavigate();

  // Memoized click handler to prevent unnecessary recreations
  const handleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 group focus:outline-none"
      aria-label="Go to homepage"
    >
      <FaRegHeart className="text-3xl text-accent transition-transform duration-200 group-hover:scale-110 dark:text-accent" />
      <span className="font-secondary text-2xl font-bold text-txt dark:text-dark-text transition-colors duration-200">
        Soulmate
      </span>
    </button>
  );
});

export default Logo;
