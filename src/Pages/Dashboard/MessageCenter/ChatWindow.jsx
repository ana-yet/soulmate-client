import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPaperPlane, FaSmile } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const ChatWindow = ({ conversation, onBack }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", conversation._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/messages/${conversation._id}`);
      return data.data || [];
    },
    enabled: !!conversation._id,
    refetchInterval: 3000, // Poll every 3 seconds for new messages
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData) => {
      const { data } = await axiosSecure.post("/api/messages", messageData);
      return data;
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries(["messages", conversation._id]);
      queryClient.invalidateQueries(["conversations"]);
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessageMutation.mutate({
      senderId: user?.email,
      receiverId: conversation.receiverId || conversation.senderId,
      message: message.trim(),
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="glass-strong rounded-2xl flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-txt/10">
        <button
          onClick={onBack}
          className="lg:hidden w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 transition-colors"
        >
          <FaArrowLeft />
        </button>
        <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-bold text-lg">
          {conversation.name?.[0] || "U"}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{conversation.name || "Unknown User"}</h3>
          <p className="text-sm text-txt/60">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-txt/50">
            <FaSmile className="text-4xl mb-2" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOwnMessage = msg.senderId === user?.email;
            return (
              <motion.div
                key={msg._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    isOwnMessage
                      ? "bg-gradient-primary text-white rounded-br-none"
                      : "bg-white/80 text-txt rounded-bl-none"
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-white/70" : "text-txt/50"
                    }`}
                  >
                    {formatMessageTime(msg.timestamp)}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-6 border-t border-txt/10">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="w-12 h-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
