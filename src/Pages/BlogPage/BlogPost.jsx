import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowLeft, FaClock, FaUser, FaCalendar, FaShare } from "react-icons/fa";
import usePublicAxios from "../../../Hook/usePublicAxios";

const BlogPost = () => {
  const { slug } = useParams();
  const axiosPublic = usePublicAxios();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/api/blog/posts/${slug}`);
      return data.data;
    },
    enabled: !!slug,
  });

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content?.substring(0, 100),
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-accent hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-8"
        >
          <FaArrowLeft />
          Back to Blog
        </Link>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl overflow-hidden"
        >
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-2 rounded-full bg-gradient-primary text-white font-medium">
                  {post.category}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-txt/70 mb-8 pb-8 border-b border-txt/10">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{calculateReadTime(post.content)} min read</span>
              </div>
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary text-white hover:scale-105 transition-transform"
              >
                <FaShare />
                Share
              </button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-txt/80 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-txt/10">
                <h3 className="font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-white/50 text-txt/70 text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.article>

        {/* Related Posts Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for related posts */}
            <div className="glass-strong rounded-xl p-4 text-center text-txt/50">
              More articles coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
