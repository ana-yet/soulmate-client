import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaBook, FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import BlogCard from "./BlogCard";
import usePublicAxios from "../../Hook/usePublicAxios";

const BlogPage = () => {
  const axiosPublic = usePublicAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blogPosts", currentPage, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 9,
      });
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      const { data } = await axiosPublic.get(`/api/blog/posts?${params}`);
      return data;
    },
  });

  const categories = [
    "all",
    "Relationship Tips",
    "Marriage Advice",
    "Success Stories",
    "Dating Tips",
    "Family Life",
  ];

  const filteredPosts = blogData?.data?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <FaBook className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Relationship Blog
          </h1>
          <p className="text-lg text-txt/70 max-w-2xl mx-auto">
            Expert advice, tips, and inspiring stories to help you in your journey to finding love
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-txt/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong border border-txt/10 focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-primary text-white"
                    : "glass-strong hover:bg-white/80"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-strong rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-txt/10 rounded-xl mb-4"></div>
                <div className="h-4 bg-txt/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-txt/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="glass-strong rounded-2xl p-12 text-center">
            <FaBook className="text-6xl text-accent/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-txt/70 mb-2">No Articles Found</h3>
            <p className="text-txt/50">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {blogData?.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl glass-strong hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {[...Array(blogData.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl transition-all ${
                        currentPage === i + 1
                          ? "bg-gradient-primary text-white"
                          : "glass-strong hover:bg-white/80"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(blogData.totalPages, p + 1))}
                  disabled={currentPage === blogData.totalPages}
                  className="px-4 py-2 rounded-xl glass-strong hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
