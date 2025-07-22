import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlinePencil,
} from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import FloatingLabelInput from "./FloatingLabelInput";
import { Helmet } from "react-helmet-async";

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Sending your message...");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success/failure
    if (data.email.includes("error")) {
      toast.error("Failed to send message. Please try again.", { id: toastId });
    } else {
      toast.success(
        "Message sent successfully! We will get back to you soon.",
        { id: toastId }
      );
      reset();
    }
  };

  return (
    <div className="bg-background dark:bg-dark-bg min-h-screen">
      <Helmet>
        <title>Contact Us | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 sm:py-20">
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-secondary text-lg italic text-txt/80 dark:text-dark-text-muted">
            "The best of people are those that bring most benefit to the rest of
            mankind."
          </p>
          <p className="mt-2 text-sm font-semibold text-txt dark:text-dark-text">
            (Hadith, Bukhari)
          </p>
          <h1 className="font-secondary text-4xl md:text-5xl font-bold text-txt dark:text-dark-text mt-6">
            Get In Touch
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-txt/70 dark:text-dark-text-muted">
            Have a question, feedback, or need support? We're here to help.
            Reach out to us anytime.
          </p>
        </motion.div>

        {/* --- Main Content: Form and Details --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-dark-secondary p-8 rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border"
          >
            <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FloatingLabelInput
                label="Your Name"
                name="name"
                register={register}
                validation={{ required: "Your name is required" }}
                errors={errors}
                icon={<HiOutlineUser />}
              />
              <FloatingLabelInput
                label="Your Email"
                name="email"
                type="email"
                register={register}
                validation={{ required: "A valid email is required" }}
                errors={errors}
                icon={<HiOutlineMail />}
              />
              <FloatingLabelInput
                label="Subject"
                name="subject"
                register={register}
                validation={{ required: "Subject is required" }}
                errors={errors}
                icon={<HiOutlinePencil />}
              />

              <div className="relative">
                <textarea
                  id="message"
                  {...register("message", {
                    required: "Please enter your message",
                  })}
                  placeholder=" "
                  rows="5"
                  className="block w-full px-4 py-3 text-base text-txt bg-transparent rounded-lg border border-secondary/50 appearance-none dark:text-dark-text dark:border-dark-border focus:outline-none focus:ring-0 focus:border-accent peer"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute text-base text-txt/70 dark:text-dark-text-muted duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark-secondary px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Your Message
                </label>
                {errors.message && (
                  <p className="mt-1 text-xs text-accent">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-accent py-3 font-semibold text-white shadow-md transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-dark-secondary p-8 rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border">
              <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <HiOutlineMail className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-txt dark:text-dark-text">
                      Email Us
                    </h4>
                    <p className="text-txt/70 dark:text-dark-text-muted">
                      Our support team will get back to you within 24 hours.
                    </p>
                    <a
                      href="mailto:support@yourdomain.com"
                      className="text-accent font-medium hover:underline"
                    >
                      support@yourdomain.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HiOutlinePhone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-txt dark:text-dark-text">
                      Call Us
                    </h4>
                    <p className="text-txt/70 dark:text-dark-text-muted">
                      Available from Sunday to Thursday, 10 AM to 6 PM.
                    </p>
                    <a
                      href="tel:+8801234567890"
                      className="text-accent font-medium hover:underline"
                    >
                      +880-1234-567890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HiOutlineLocationMarker className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-txt dark:text-dark-text">
                      Our Office
                    </h4>
                    <p className="text-txt/70 dark:text-dark-text-muted">
                      Pakistan, Sylhet Division, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-secondary/20 dark:border-dark-border flex items-center gap-6">
                <a
                  href="https://www.facebook.com/ana.y37.h0"
                  aria-label="Facebook"
                  className="text-txt/70 dark:text-dark-text-muted hover:text-accent dark:hover:text-accent transition-colors"
                >
                  <FaFacebook size={22} />
                </a>
                <a
                  href="instagram.com"
                  aria-label="Instagram"
                  className="text-txt/70 dark:text-dark-text-muted hover:text-accent dark:hover:text-accent transition-colors"
                >
                  <FaInstagram size={22} />
                </a>
                <a
                  href="https://x.com/md_anayet_m"
                  aria-label="Twitter"
                  className="text-txt/70 dark:text-dark-text-muted hover:text-accent dark:hover:text-accent transition-colors"
                >
                  <FaTwitter size={22} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
