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
      transition={{ delay: index * 0.1 }}
      className="glass-strong rounded-2xl overflow-hidden hover-lift group"
    >
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.featuredImage || "https://via.placeholder.com/400x300"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-gradient-primary text-white text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-txt/60 mb-3">
          <div className="flex items-center gap-1">
            <FaUser className="text-xs" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-xs" />
            <span>{calculateReadTime(post.content)} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-txt mb-3 line-clamp-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-txt/70 mb-4 line-clamp-3">
          {post.content?.substring(0, 150)}...
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-txt/50">
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
