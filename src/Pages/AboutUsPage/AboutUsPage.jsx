import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaHeart } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import useAuth from "../../Hook/useAuth";
import Faq from "./Faq/Faq";

// Reusable Team Member Card
const TeamMemberCard = ({ image, name, role }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg border-4 border-white dark:border-dark-secondary"
    />
    <h4 className="mt-4 font-bold text-lg text-txt dark:text-dark-text">
      {name}
    </h4>
    <p className="text-sm text-accent">{role}</p>
  </motion.div>
);

const AboutUsPage = () => {
  const { user } = useAuth();
  return (
    <div className="bg-background dark:bg-dark-bg">
      {/* --- 1. Hero Section --- */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-secondary text-4xl  font-bold text-txt dark:text-dark-text"
          >
            Our Sacred Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-3xl mx-auto text-lg text-txt/80 dark:text-dark-text-muted"
          >
            To bring people together in meaningful partnerships, nurturing
            lifelong connections built on trust, mutual respect, and genuine
            love.
          </motion.p>
        </div>
      </section>

      {/* --- 2. Mission and Vision Section --- */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <div className="p-8 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border">
                <FaBullseye className="text-4xl text-accent mb-4" />
                <h3 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
                  Our Mission
                </h3>
                <p className="mt-3 text-txt/70 dark:text-dark-text-muted">
                  To provide a secure, trustworthy, and modern platform where
                  people can find compatible life partners who share their core
                  values.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <div className="p-8 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border">
                <FaEye className="text-4xl text-accent mb-4" />
                <h3 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
                  Our Vision
                </h3>
                <p className="mt-3 text-txt/70 dark:text-dark-text-muted">
                  To be the most trusted matrimonial service for the global
                  community, empowering meaningful connections and building
                  lasting relationships one successful marriage at a time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. Founder Story Section --- */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <img
                src="https://placehold.co/400x400/DCD8D3/4F4F4F?text=Founder"
                alt="Founder"
                className="rounded-full w-80 h-80 object-cover shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
                A Message from Our Founder
              </h3>
              <p className="mt-4 text-txt/70 dark:text-dark-text-muted italic">
                "This project began after witnessing how challenging it can be
                for people to find partners who truly align with their values
                and long-term goals. I wanted to build something deeper than a
                typical dating app—a space where meaningful relationships could
                blossom within a thoughtful and respectful community. Over time,
                each success story has affirmed the importance of creating
                intentional experiences for those seeking lifelong
                companionship."
              </p>
              <p className="mt-4 font-bold text-txt dark:text-dark-text">
                - Anayet
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 4. Meet The Team Section --- */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Dedicated Team"
            subtitle="The people working behind the scenes to help you find your perfect match."
            icon={<FaHeart className="text-3xl text-accent" />}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TeamMemberCard
              image="https://placehold.co/200x200"
              name="Jane Doe"
              role="Lead Matchmaker"
            />
            <TeamMemberCard
              image="https://placehold.co/200x200"
              name="John Smith"
              role="Head of Technology"
            />
            <TeamMemberCard
              image="https://placehold.co/200x200"
              name="Aisha Ahmed"
              role="Community Support"
            />
            <TeamMemberCard
              image="https://placehold.co/200x200"
              name="Omar Khan"
              role="Data Security"
            />
          </div>
        </div>
      </section>

      <Faq />

      {/* --- 6. Final CTA Section --- */}
      <section className="bg-accent/10 dark:bg-accent/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-secondary text-4xl font-bold text-txt dark:text-dark-text">
            Begin Your Journey Today
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-txt/70 dark:text-dark-text-muted">
            Your search for a truly compatible partner begins here. Join a
            community built on sincerity, shared values, and the desire to build
            something lasting. Take the first step toward a meaningful
            connection that could transform your future.
          </p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Link
              to={user ? "../dashboard/edit-biodata" : "../register"}
              className="inline-block rounded-full bg-accent px-10 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Create Your Biodata
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
