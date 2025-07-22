import React from "react";
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
  return (
    <section className=" py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-secondary text-4xl md:text-5xl font-bold text-txt dark:text-dark-text">
            How It Works
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-txt/70 dark:text-dark-text-muted">
            Follow these simple steps to find your ideal life partner on our
            platform.
          </p>
        </motion.div>

        {/* --- Timeline --- */}
        <div className="relative">
          {/* The vertical line (visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-secondary/30 dark:bg-dark-border"></div>

          <div className="space-y-16 md:space-y-40">
            {steps.map((item, index) => (
              <div key={item.step} className="relative ">
                {/* Step Number Circle */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                  {item.step}
                </div>
                <Step {...item} isReversed={index % 2 !== 0} />
              </div>
            ))}
          </div>
        </div>

        {/* ---  Button --- */}
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
              className="inline-block rounded-full bg-accent px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105"
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
