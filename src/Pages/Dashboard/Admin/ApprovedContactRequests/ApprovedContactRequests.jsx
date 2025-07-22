import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import StatusBadge from "../../MyContactRequests/StatusBadge";
import { Helmet } from "react-helmet-async";

const usePendingContactRequests = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["pending-contact-requests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/pending-contact-requests");
      return data.data;
    },
  });
};

const ApprovedContactRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: pendingRequests,
    isLoading,
    isError,
    error,
  } = usePendingContactRequests();

  // Mutation for approving a contact request
  const { mutate: approveContact, isPending: isApproving } = useMutation({
    mutationFn: (requestId) =>
      axiosSecure.patch(`/approve-contact/${requestId}`),
    onSuccess: () => {
      toast.success("Contact request has been approved!");
      // Invalidate the query to refetch the list of pending requests
      queryClient.invalidateQueries({ queryKey: ["pending-contact-requests"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to approve request.");
    },
  });

  return (
    <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-4 sm:p-6 border border-secondary/20 dark:border-dark-border">
      <Helmet>
        <title>Contact Requests | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mb-6">
        <h2 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
          Approve Contact Requests
        </h2>
        <p className="text-txt/70 dark:text-dark-text-muted mt-1">
          Review and approve pending requests for contact information.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-secondary/10 dark:bg-dark-bg">
            <tr>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted">
                Requester Name
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden md:table-cell">
                Email
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden sm:table-cell">
                Biodata ID
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted">
                Status
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Skeleton Loader
              [...Array(4)].map((_, i) => (
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
                  <td className="p-4 hidden sm:table-cell">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-32 mx-auto animate-pulse"></div>
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan="5" className="text-center p-10 text-accent">
                  Error: {error.message}
                </td>
              </tr>
            ) : !pendingRequests || pendingRequests.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-10 text-txt/70 dark:text-dark-text-muted"
                >
                  No pending contact requests found.
                </td>
              </tr>
            ) : (
              pendingRequests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b border-secondary/20 dark:border-dark-border hover:bg-secondary/5 dark:hover:bg-dark-border/50 transition-colors"
                >
                  <td className="p-4 text-txt dark:text-dark-text font-medium">
                    {request.requesterName}
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden md:table-cell">
                    {request.requesterEmail}
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden sm:table-cell">
                    {request.requestedBiodataId}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => approveContact(request._id)}
                      disabled={isApproving}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 rounded-md hover:bg-green-200 dark:hover:bg-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <HiOutlineCheckCircle />
                      <span>
                        {isApproving ? "Approving..." : "Approve Contact"}
                      </span>
                    </button>
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

export default ApprovedContactRequests;
