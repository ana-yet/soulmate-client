import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  HiOutlineUserAdd,
  HiOutlinePencilAlt,
  HiOutlineSearch,
  HiOutlineMail,
  HiOutlineHeart,
} from "react-icons/hi";
import register from "../../../assets/HowWork/createAccount.svg";
import form from "../../../assets/HowWork/forms.svg";
import search from "../../../assets/HowWork/people-search.svg";
import contract from "../../../assets/HowWork/contact.svg";
import wedding from "../../../assets/HowWork/wedding.svg";
import Step from "./Step";
import useAuth from "../../../Hook/useAuth";

// --- Data for the steps ---
const steps = [
  {
    step: 1,
    icon: <HiOutlineUserAdd className="h-10 w-10 text-accent" />,
    illustration: register,
    title: "Create an Account",
    description:
      "Sign up for a free account with your email and create a secure password to begin your journey.",
  },
  {
    step: 2,
    icon: <HiOutlinePencilAlt className="h-10 w-10 text-accent" />,
    illustration: form,
    title: "Create Your Biodata",
    description:
      "Fill out your biodata with all the necessary details to present yourself to potential matches.",
  },
  {
    step: 3,
    icon: <HiOutlineSearch className="h-10 w-10 text-accent" />,
    illustration: search,
    title: "Explore & Favourite",
    description:
      "Browse through thousands of verified profiles and add the ones you like to your favourites list to review later.",
  },
  {
    step: 4,
    icon: <HiOutlineMail className="h-10 w-10 text-accent" />,
    illustration: contract,
    title: "Request Contact Info",
    description:
      "Once you find a suitable match, request their contact information to take the next step forward.",
  },
  {
    step: 5,
    icon: <HiOutlineHeart className="h-10 w-10 text-accent" />,
    illustration: wedding,
    title: "Connect & Get Married",
    description:
      "Connect with potential partners, involve your families, and with blessings, proceed to a beautiful Nikah!",
  },
];

const HowItWorksSection = () => {
  const { user } = useAuth();
  const [visibleSteps, setVisibleSteps] = useState([]);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.2 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            How It Works
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-txt/70 dark:text-dark-text-muted">
            Follow these simple steps to find your ideal life partner on our
            platform.
          </p>
        </motion.div>

        {/* --- Enhanced Timeline --- */}
        <div className="relative">
          {/* The gradient vertical line (visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent via-utility to-accent-light rounded-full opacity-30"></div>

          <div className="space-y-16 md:space-y-32">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="relative"
                ref={(el) => (stepRefs.current[index] = el)}
              >
                {/* Animated Step Number Circle with Progress */}
                <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 ${
                  visibleSteps.includes(index) ? 'animate-scale-in' : 'opacity-0'
                }`}>
                  <div className="relative w-16 h-16">
                    {/* Circular Progress Background */}
                    <svg className="absolute inset-0 w-16 h-16 -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-secondary/30"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className={`transition-all duration-1000 ${
                          visibleSteps.includes(index) ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          strokeDasharray: 176,
                          strokeDashoffset: visibleSteps.includes(index) ? 0 : 176,
                        }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8e242c" />
                          <stop offset="100%" stopColor="#b38b59" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Step Number */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg">
                      <span className="text-2xl font-bold gradient-text">{item.step}</span>
                    </div>
                  </div>
                </div>

                {/* Step Content with Animation */}
                <div className={visibleSteps.includes(index) ? 'animate-fade-in-up' : 'opacity-0'}>
                  <Step {...item} isReversed={index % 2 !== 0} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---  Enhanced Button --- */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link
              to="/register"
              className="inline-block rounded-full bg-gradient-primary px-10 py-4 font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-glow"
            >
              Create Your Biodata Now
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HowItWorksSection;

