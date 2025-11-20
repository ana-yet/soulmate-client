import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const AdminBlogManager = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    author: "",
    category: "",
    tags: [],
    featuredImage: "",
    status: "draft",
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["adminBlogPosts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/blog/posts?page=1&limit=100");
      return data.data || [];
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData) => {
      const { data } = await axiosSecure.post("/api/blog/posts", postData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminBlogPosts"]);
      toast.success("Post created successfully");
      resetForm();
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, ...postData }) => {
      const { data } = await axiosSecure.patch(`/api/blog/posts/${id}`, postData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminBlogPosts"]);
      toast.success("Post updated successfully");
      resetForm();
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/api/blog/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminBlogPosts"]);
      toast.success("Post deleted successfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost._id, ...formData });
    } else {
      createPostMutation.mutate(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      author: "",
      category: "",
      tags: [],
      featuredImage: "",
      status: "draft",
    });
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags || [],
      featuredImage: post.featuredImage || "",
      status: post.status,
    });
    setIsCreating(true);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold gradient-text">Blog Manager</h1>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="px-6 py-3 rounded-xl bg-gradient-primary text-white hover:scale-105 transition-transform flex items-center gap-2"
          >
            <FaPlus />
            {isCreating ? "Cancel" : "New Post"}
          </button>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Relationship Tips">Relationship Tips</option>
                    <option value="Marriage Advice">Marriage Advice</option>
                    <option value="Success Stories">Success Stories</option>
                    <option value="Dating Tips">Dating Tips</option>
                    <option value="Family Life">Family Life</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) =>
                    setFormData({ ...formData, featuredImage: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={createPostMutation.isPending || updatePostMutation.isPending}
                  className="flex-1 py-3 rounded-xl bg-gradient-primary text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {editingPost ? "Update Post" : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 rounded-xl bg-white/50 hover:bg-white/80 font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">All Posts ({posts.length})</h2>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-strong rounded-2xl p-12 text-center">
              <p className="text-txt/50">No blog posts yet. Create your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-2xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                    <p className="text-txt/70 mb-2">
                      {post.content?.substring(0, 150)}...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-txt/60">
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this post?")) {
                          deletePostMutation.mutate(post._id);
                        }
                      }}
                      className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogManager;
