import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaBell,
  FaHeart,
  FaUserCheck,
  FaEnvelope,
  FaStar,
  FaTrash,
  FaCheckDouble,
} from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const NotificationCenter = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/notifications/${user?.email}`);
      return data.data || [];
    },
    enabled: !!user?.email,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/api/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/api/notifications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notification deleted");
    },
  });

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    await Promise.all(
      unreadNotifications.map((n) => markAsReadMutation.mutateAsync(n._id))
    );
    toast.success("All notifications marked as read");
  };

  const getIcon = (type) => {
    const icons = {
      message: <FaEnvelope className="text-blue-500" />,
      favorite: <FaHeart className="text-red-500" />,
      contact: <FaUserCheck className="text-green-500" />,
      verification: <FaCheckDouble className="text-purple-500" />,
      premium: <FaStar className="text-yellow-500" />,
    };
    return icons[type] || <FaBell className="text-accent" />;
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications.filter((n) => n.isRead);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <FaBell className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                  Notifications
                </h1>
                <p className="text-txt/70 dark:text-dark-text-muted">
                  {notifications.filter((n) => !n.isRead).length} unread
                </p>
              </div>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-full bg-gradient-primary text-white hover:scale-105 transition-transform text-sm font-medium"
            >
              Mark All Read
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {["all", "unread", "read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filter === f
                    ? "bg-gradient-primary text-white"
                    : "bg-white/50 text-txt hover:bg-white/80"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-3">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="glass-strong dark:bg-dark-secondary dark:border dark:border-dark-border rounded-2xl p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-txt/10"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-txt/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-txt/10 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredNotifications.length === 0 ? (
            <div className="glass-strong dark:bg-dark-secondary dark:border dark:border-dark-border rounded-2xl p-12 text-center">
              <FaBell className="text-6xl text-accent/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-txt/70 dark:text-dark-text mb-2">
                No Notifications
              </h3>
              <p className="text-txt/50 dark:text-dark-text-muted">
                {filter === "unread"
                  ? "You're all caught up!"
                  : "You don't have any notifications yet"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-strong dark:bg-dark-secondary dark:border dark:border-dark-border rounded-2xl p-6 cursor-pointer transition-all hover-lift ${
                  !notification.isRead ? "border-l-4 border-l-accent" : ""
                }`}
                onClick={() => {
                  if (!notification.isRead) {
                    markAsReadMutation.mutate(notification._id);
                  }
                }}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-dark-bg flex items-center justify-center text-2xl flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-txt dark:text-dark-text font-medium mb-1">
                      {notification.message}
                    </p>
                    <p className="text-txt/50 dark:text-dark-text-muted text-sm">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <div className="w-3 h-3 rounded-full bg-accent"></div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotificationMutation.mutate(notification._id);
                      }}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-600 transition-colors"
                    >
                      <FaTrash className="text-sm" />
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

export default NotificationCenter;
