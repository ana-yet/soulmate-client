import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaHeart, FaUsers, FaShieldAlt } from "react-icons/fa";
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
      gradient: "from-accent/80 via-accent/60 to-transparent",
    },
    {
      image: "https://i.ibb.co/jCf0ZbL/coupleimage.webp",
      title: "Trusted Matchmaking",
      subtitle: "Built on values that matter for lasting relationships",
      buttonText: "Join Our Community",
      gradient: "from-utility/80 via-utility/60 to-transparent",
    },
    {
      image: "https://i.ibb.co/cRvT026/banner.webp",
      title: "Your Future Awaits",
      subtitle: "Discover compatible partners who share your vision",
      buttonText: "Start Exploring",
      gradient: "from-accent-light/80 via-accent-light/60 to-transparent",
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
    <div className="relative h-[70vh] w-full overflow-hidden md:h-[85vh] lg:h-[90vh]">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-white/20 rounded-full animate-float delay-200"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-white/25 rounded-full animate-float delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-float delay-500"></div>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
          }`}
        >
          {/* Parallax Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.image}
              alt=""
              className={`h-full w-full object-cover ${
                index === currentSlide ? "scale-110" : "scale-100"
              } transition-transform duration-[8000ms] ease-out`}
              style={{
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          </div>

          {/* Modern Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl space-y-6 text-white">
          {/* Animated Title */}
          <h1
            className="text-4xl font-bold drop-shadow-2xl md:text-6xl lg:text-7xl animate-fade-in-up"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              lineHeight: '1.2'
            }}
          >
            {slides[currentSlide].title}
          </h1>

          {/* Animated Subtitle */}
          <p className="text-lg drop-shadow-lg md:text-2xl lg:text-3xl font-light animate-fade-in-up delay-200">
            {slides[currentSlide].subtitle}
          </p>

          {/* Modern CTA Button */}
          <div className="animate-fade-in-up delay-300">
            <button
              onClick={handleButtonClick}
              className="mt-8 relative group rounded-full bg-gradient-primary px-10 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-white/50 overflow-hidden"
            >
              <span className="relative z-10">{slides[currentSlide].buttonText}</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12 animate-fade-in delay-400">
            <div className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full">
              <FaUsers className="text-2xl text-utility-light" />
              <span className="text-sm md:text-base font-medium">10,000+ Members</span>
            </div>
            <div className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full">
              <FaHeart className="text-2xl text-red-400" />
              <span className="text-sm md:text-base font-medium">500+ Success Stories</span>
            </div>
            <div className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full">
              <FaShieldAlt className="text-2xl text-green-400" />
              <span className="text-sm md:text-base font-medium">100% Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 rounded-full glass-strong p-3 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <HiOutlineChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 rounded-full glass-strong p-3 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <HiOutlineChevronRight size={30} />
      </button>

      {/* Modern Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-10 bg-white shadow-glow"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

