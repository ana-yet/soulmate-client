import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import useAuth from "../../../Hook/useAuth";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const slides = [
    {
      image: "https://i.ibb.co/zTrSkYwD/banner1.webp",
      title: "Where Hearts Meet",
      subtitle: "Begin your journey to meaningful connections today",
      buttonText: "Find Your Match",
    },
    {
      image: "https://i.ibb.co/jCf0ZbL/coupleimage.webp",
      title: "Trusted Matchmaking",
      subtitle: "Built on values that matter for lasting relationships",
      buttonText: "Join Our Community",
    },
    {
      image: "https://i.ibb.co/cRvT026/banner.webp",
      title: "Your Future Awaits",
      subtitle: "Discover compatible partners who share your vision",
      buttonText: "Start Exploring",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = () => {
    navigate(user ? "/dashboard" : "/register");
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover ${
              index === currentSlide ? "scale-110" : "scale-100"
            } transition-transform duration-1000`}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-4 text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg drop-shadow-md md:text-xl lg:text-2xl">
            {slides[currentSlide].subtitle}
          </p>
          <button
            onClick={handleButtonClick}
            className="mt-6 rounded-full bg-accent px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {slides[currentSlide].buttonText}
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        aria-label="Previous slide"
      >
        <HiOutlineChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        aria-label="Next slide"
      >
        <HiOutlineChevronRight size={30} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlide === index
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

export default Banner;
