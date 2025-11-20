import React from "react";
import { useNavigate } from "react-router";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    navigate(user ? "/dashboard" : "/register");
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-primary"></div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaHeart className="absolute top-20 left-10 text-white/20 text-4xl animate-float" />
        <FaHeart className="absolute top-40 right-20 text-white/15 text-3xl animate-float delay-200" />
        <FaHeart className="absolute bottom-32 left-1/4 text-white/20 text-5xl animate-float delay-400" />
        <FaHeart className="absolute top-1/3 right-1/3 text-white/10 text-3xl animate-float delay-300" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Ready to Find Your Perfect Match?
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Join thousands of happy couples who found their soulmate through our trusted platform
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
            <button
              onClick={handleGetStarted}
              className="group relative bg-white text-accent px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>

            <button
              onClick={handleLearnMore}
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300 hover:scale-105"
            >
              Learn More
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 animate-fade-in delay-300">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
