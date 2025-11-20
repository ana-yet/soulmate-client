import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPaperPlane, FaSmile } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useSocket } from "../../../Context/SocketContext";
import toast from "react-hot-toast";

const ChatWindow = ({ conversation, onBack }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const conversationId = [user?.email, conversation.receiverId || conversation.senderId]
    .sort()
    .join("_");

  // Load initial messages
  const { data: initialMessages = [], isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/messages/${conversationId}`);
      return data.data || [];
    },
    enabled: !!conversationId,
  });

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // Socket.IO event listeners
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      if (newMessage.conversationId === conversationId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    // Listen for message sent confirmation
    socket.on("messageSent", (sentMessage) => {
      if (sentMessage.conversationId === conversationId) {
        setMessages((prev) => [...prev, sentMessage]);
      }
    });

    // Listen for typing indicator
    socket.on("userTyping", ({ conversationId: typingConvId }) => {
      if (typingConvId === conversationId) {
        setIsTyping(true);
      }
    });

    socket.on("userStoppedTyping", ({ conversationId: typingConvId }) => {
      if (typingConvId === conversationId) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageSent");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [socket, isConnected, conversationId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socket || !isConnected) return;

    const messageData = {
      senderId: user?.email,
      receiverId: conversation.receiverId || conversation.senderId,
      message: message.trim(),
      conversationId,
    };

    socket.emit("sendMessage", messageData);
    setMessage("");

    // Stop typing indicator
    socket.emit("stopTyping", {
      conversationId,
      receiverId: conversation.receiverId || conversation.senderId,
    });
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket || !isConnected) return;

    // Send typing indicator
    socket.emit("typing", {
      conversationId,
      receiverId: conversation.receiverId || conversation.senderId,
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        conversationId,
        receiverId: conversation.receiverId || conversation.senderId,
      });
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="glass-strong rounded-2xl flex flex-col h-[600px] dark:bg-dark-secondary dark:border dark:border-dark-border">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-txt/10 dark:border-dark-border">
        <button
          onClick={onBack}
          className="lg:hidden w-10 h-10 rounded-full bg-white/50 dark:bg-dark-bg flex items-center justify-center hover:bg-white/80 dark:hover:bg-dark-border transition-colors"
        >
          <FaArrowLeft className="dark:text-dark-text" />
        </button>
        <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-bold text-lg">
          {conversation.name?.[0] || "U"}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg dark:text-dark-text">{conversation.name || "Unknown User"}</h3>
          <p className="text-sm text-txt/60 dark:text-dark-text-muted">
            {isConnected ? (
              isTyping ? (
                <span className="text-accent dark:text-accent">Typing...</span>
              ) : (
                "Active now"
              )
            ) : (
              "Connecting..."
            )}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 dark:bg-dark-bg">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-txt/50 dark:text-dark-text-muted">
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
                      : "bg-white/80 dark:bg-dark-secondary dark:border dark:border-dark-border text-txt dark:text-dark-text rounded-bl-none"
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-white/70" : "text-txt/50 dark:text-dark-text-muted"
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
      <form onSubmit={handleSendMessage} className="p-6 border-t border-txt/10 dark:border-dark-border dark:bg-dark-secondary">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/50 dark:bg-dark-bg border border-txt/10 dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none transition-colors placeholder:text-txt/40 dark:placeholder:text-dark-text-muted"
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!message.trim() || !isConnected}
            className="w-12 h-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </button>
        </div>
        {!isConnected && (
          <p className="text-xs text-red-500 mt-2">Connecting to server...</p>
        )}
      </form>
    </div>
  );
};

export default ChatWindow;
