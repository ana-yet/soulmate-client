import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya & Rahul",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "We found each other through SoulMate and couldn't be happier. The platform made it easy to connect with someone who shares our values and dreams.",
      location: "Mumbai, India",
      verified: true,
    },
    {
      id: 2,
      name: "Ananya & Vikram",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "The verification process gave us confidence in the authenticity of profiles. We're grateful for this wonderful platform that brought us together.",
      location: "Bangalore, India",
      verified: true,
    },
    {
      id: 3,
      name: "Sneha & Arjun",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "SoulMate's matching algorithm is incredible! We matched based on our interests and values, and now we're planning our future together.",
      location: "Delhi, India",
      verified: true,
    },
    {
      id: 4,
      name: "Kavya & Aditya",
      image: "https://i.pravatar.cc/150?img=16",
      rating: 5,
      text: "A truly premium experience. The platform is user-friendly, secure, and helped us find our perfect match. Highly recommended!",
      location: "Chennai, India",
      verified: true,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-fade-in-up">
            Love Stories
          </h2>
          <p className="text-lg md:text-xl text-txt/70 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Real couples, real happiness. Hear from those who found their soulmate
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-6xl text-accent/10">
              <FaQuoteLeft />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Profile Section */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="relative">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-accent/20 shadow-lg"
                  />
                  {testimonials[currentIndex].verified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-txt mb-1">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-txt/60 mb-2">{testimonials[currentIndex].location}</p>

                  {/* Star Rating */}
                  <div className="flex gap-1 justify-center md:justify-start">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-lg" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-lg md:text-xl text-txt/80 leading-relaxed italic text-center md:text-left">
                "{testimonials[currentIndex].text}"
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white hover:bg-accent text-accent hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <HiChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white hover:bg-accent text-accent hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <HiChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-10 bg-accent"
                    : "w-2.5 bg-accent/30 hover:bg-accent/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
