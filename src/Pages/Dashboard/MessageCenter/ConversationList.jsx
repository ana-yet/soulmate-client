import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSearch, FaCircle } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ConversationList = ({ selectedConversation, onSelectConversation }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/conversations/${user?.email}`);
      return data.data || [];
    },
    enabled: !!user?.email,
  });

  const filteredConversations = conversations.filter((conv) =>
    conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="glass-strong rounded-2xl p-6 h-[600px] flex flex-col">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-txt/40" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/30">
                  <div className="w-12 h-12 rounded-full bg-txt/10"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-txt/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-txt/10 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-txt/50">No conversations yet</p>
          </div>
        ) : (
          filteredConversations.map((conversation, index) => (
            <motion.div
              key={conversation._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectConversation(conversation)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover-lift ${
                selectedConversation?._id === conversation._id
                  ? "bg-gradient-primary text-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-bold text-lg">
                  {conversation.name?.[0] || "U"}
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold truncate">
                    {conversation.name || "Unknown User"}
                  </h4>
                  <span className="text-xs opacity-70">
                    {formatTime(conversation.lastTimestamp)}
                  </span>
                </div>
                <p className="text-sm opacity-80 truncate">
                  {conversation.lastMessage || "No messages yet"}
                </p>
              </div>

              {/* Online Status */}
              <FaCircle className="text-green-500 text-xs" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
