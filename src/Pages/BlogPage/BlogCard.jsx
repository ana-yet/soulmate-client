import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const BlogCard = ({ post, index }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(" ").length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
          className="glass-strong dark:bg-dark-secondary dark:border dark:border-dark-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={post?.image}
            alt={post?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold gradient-text">
            {post?.title}
          </h3>
          <p className="text-sm text-txt/70 dark:text-dark-text-muted">
            {post?.description}
          </p>
          <span className="text-sm text-txt/70 dark:text-dark-text-muted">
            {formatDate(post.publishedAt)}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
          >
            Read More
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
