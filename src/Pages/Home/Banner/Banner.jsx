import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import useAuth from "../../../Hook/useAuth";
import { useNavigate } from "react-router";

// todo: add the banner images
const defaultSlides = [
  {
    imgUrl: "https://i.ibb.co/zTrSkYwD/banner1.webp",
    overlayText: "Where Hearts Meet — Start Your Journey Here",
  },
  {
    imgUrl: "https://i.ibb.co/jCf0ZbL/coupleimage.webp",
    overlayText: "Trusted Matchmaking, Built on Values",
  },
  {
    imgUrl: "https://i.ibb.co/cRvT026/banner.webp",
    overlayText: "Your Future Awaits — Connect Now",
  },
];

const Banner = ({ slides = defaultSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // --- Navigation Handler for the Button ---
  const handleGetStartedClick = () => {
    // If user is logged in, go to dashboard. Otherwise, go to login page.
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.imgUrl})` }}
        >
          {/* Image Zoom Effect: Applied only to the active slide */}
          <div
            className={`h-full w-full bg-cover bg-center ${
              index === currentIndex
                ? "scale-150 duration-500 transition-transform delay-2200 "
                : ""
            }`}
            style={{ backgroundImage: `url(${slide.imgUrl})` }}
          />
        </div>
      ))}

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="font-secondary text-4xl font-bold text-background drop-shadow-md md:text-6xl lg:text-7xl">
          {slides[currentIndex].overlayText}
        </h1>
        {/* --- UPDATED BUTTON --- */}
        <button
          onClick={handleGetStartedClick}
          className="mt-8 rounded-full bg-accent px-8 py-3 font-primary text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 mx-auto flex items-center justify-between px-4">
        <button
          onClick={goToPrevious}
          className="rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50"
          aria-label="Previous Slide"
        >
          <HiOutlineChevronLeft size={30} />
        </button>
        <button
          onClick={goToNext}
          className="rounded-full bg-black/30 p-2 text-white transition hover:bg-black/50"
          aria-label="Next Slide"
        >
          <HiOutlineChevronRight size={30} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-6 bg-accent"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

Banner.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string.isRequired,
      overlayText: PropTypes.string.isRequired,
    })
  ),
};

export default Banner;
