import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2 group"
    >
      <FaRegHeart className="text-3xl text-accent transition-transform group-hover:scale-110" />
      <span className="font-secondary text-2xl font-bold text-txt">
        Soulmate
      </span>
    </button>
  );
};

export default Logo;
