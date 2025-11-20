import React, { useState } from "react";
import { motion } from "framer-motion";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { FaComments } from "react-icons/fa";

const MessageCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <FaComments className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                Messages
              </h1>
              <p className="text-txt/70">Connect with your matches</p>
            </div>
          </div>
        </motion.div>

        {/* Message Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation List */}
          <div
            className={`lg:col-span-1 ${
              isMobileView && selectedConversation ? "hidden lg:block" : ""
            }`}
          >
            <ConversationList
              selectedConversation={selectedConversation}
              onSelectConversation={(conv) => {
                setSelectedConversation(conv);
                setIsMobileView(true);
              }}
            />
          </div>

          {/* Chat Window */}
          <div
            className={`lg:col-span-2 ${
              !selectedConversation && isMobileView ? "hidden lg:block" : ""
            }`}
          >
            {selectedConversation ? (
              <ChatWindow
                conversation={selectedConversation}
                onBack={() => {
                  setSelectedConversation(null);
                  setIsMobileView(false);
                }}
              />
            ) : (
              <div className="glass-strong rounded-2xl p-12 flex flex-col items-center justify-center h-[600px]">
                <FaComments className="text-6xl text-accent/30 mb-4" />
                <h3 className="text-2xl font-bold text-txt/70 mb-2">
                  No Conversation Selected
                </h3>
                <p className="text-txt/50 text-center max-w-md">
                  Select a conversation from the list to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
