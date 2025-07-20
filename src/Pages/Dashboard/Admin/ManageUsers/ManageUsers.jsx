import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  HiOutlineSearch,
  HiOutlineUserAdd,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import useDebounce from "../../../../Hook/useDebounce";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import RoleBadge from "./RoleBadge";
import PremiumBadge from "./PremiumBadge";

const useUsers = (searchTerm) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?search=${searchTerm}`);
      return data;
    },
  });
};

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useUsers(debouncedSearchTerm);

  // Mutation for making a user an admin
  const { mutate: makeAdmin, isPending: isAdminLoading } = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/users/admin/${userId}`),
    onSuccess: () => {
      toast.success("User has been promoted to Admin!");
      queryClient.invalidateQueries({
        queryKey: ["users", debouncedSearchTerm],
      });
    },
    onError: (err) => toast.error(err.message || "Failed to update role."),
  });

  // Mutation for making a user premium
  const { mutate: makePremium, isPending: isPremiumLoading } = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/users/premium/${userId}`),
    onSuccess: () => {
      toast.success("User has been upgraded to Premium!");
      queryClient.invalidateQueries({
        queryKey: ["users", debouncedSearchTerm],
      });
    },
    onError: (err) => toast.error(err.message || "Failed to upgrade user."),
  });

  return (
    <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-4 sm:p-6 border border-secondary/20 dark:border-dark-border">
      <Toaster position="top-center" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
            Manage Users
          </h2>
          <p className="text-txt/70 dark:text-dark-text-muted mt-1">
            Update user roles and premium status.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 text-txt dark:bg-dark-bg dark:border-dark-border dark:text-dark-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-secondary/10 dark:bg-dark-bg">
            <tr>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted">
                Name
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden md:table-cell">
                Email
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted">
                Status
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Skeleton Loader
              [...Array(5)].map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-secondary/20 dark:border-dark-border"
                >
                  <td className="p-4">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan="4" className="text-center p-10 text-accent">
                  Error: {error.message}
                </td>
              </tr>
            ) : !users || users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-10 text-txt/70 dark:text-dark-text-muted"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-secondary/20 dark:border-dark-border hover:bg-secondary/5 dark:hover:bg-dark-border/50 transition-colors"
                >
                  <td className="p-4 text-txt dark:text-dark-text font-medium">
                    {user.name}
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden md:table-cell">
                    {user.email}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <RoleBadge role={user.role} />
                      <PremiumBadge subscriptionType={user.subscriptionType} />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => makeAdmin(user._id)}
                          disabled={isAdminLoading}
                          className="px-3 py-1.5 text-xs font-semibold text-txt dark:text-dark-text bg-secondary/20 dark:bg-dark-border rounded-md hover:bg-secondary/30 transition-colors disabled:opacity-50"
                        >
                          Make Admin
                        </button>
                      )}
                      {user.subscriptionType === "free" && (
                        <button
                          onClick={() => makePremium(user._id)}
                          disabled={isPremiumLoading}
                          className="px-3 py-1.5 text-xs font-semibold text-utility bg-utility/10 dark:bg-utility/20 rounded-md hover:bg-utility/20 transition-colors disabled:opacity-50"
                        >
                          Make Premium
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
