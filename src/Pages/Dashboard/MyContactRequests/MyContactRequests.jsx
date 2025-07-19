import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HiOutlineTrash, HiOutlineRefresh } from "react-icons/hi";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import useMyContactRequests from "../../../Hook/useMyContactRequests";
import StatusBadge from "./StatusBadge";

const MyContactRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: requests,
    isLoading,
    isError,
    error,
    refetch,
  } = useMyContactRequests();

  // Mutation for deleting a contact request
  const { mutate: deleteRequest, isPending: isDeleting } = useMutation({
    mutationFn: (requestId) =>
      axiosSecure.delete(`/delete-contact-requests/${requestId}`),
    onSuccess: () => {
      toast.success("Request deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["myContactRequests", user?.email],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete request.");
    },
  });

  const handleDelete = (requestId, name) => {
    Swal.fire({
      title: `Delete request for ${name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C2185B",
      cancelButtonColor: "#4F4F4F",
      confirmButtonText: "Yes, delete it!",
      background: "#FAF6F0",
      color: "#3C322E",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest(requestId);
        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-accent">Error: {error.message}</div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-4 sm:p-6 border border-secondary/20 dark:border-dark-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
          My Contact Requests
        </h2>
        <button
          onClick={() => refetch()}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-lg border border-secondary/50 dark:border-dark-border px-4 py-2 text-sm font-semibold text-txt dark:text-dark-text bg-white dark:bg-dark-secondary hover:bg-secondary/10 dark:hover:bg-dark-border transition-colors"
        >
          <HiOutlineRefresh className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {!requests || requests.length === 0 ? (
        <div className="text-center p-10">
          <h3 className="text-2xl font-semibold text-txt dark:text-dark-text">
            No Requests Found
          </h3>
          <p className="mt-2 text-txt/70 dark:text-dark-text-muted">
            You haven’t requested any contact information yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/10 dark:bg-dark-bg">
              <tr>
                <th className="p-4 font-semibold text-txt dark:text-dark-text-muted">
                  Name
                </th>
                <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden md:table-cell">
                  Biodata ID
                </th>
                <th className="p-4 font-semibold text-txt dark:text-dark-text-muted">
                  Status
                </th>
                <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden lg:table-cell">
                  Mobile No.
                </th>
                <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden lg:table-cell">
                  Email
                </th>
                <th className="p-4 font-semibold text-txt dark:text-dark-text-muted text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr
                  key={i}
                  className="border-b border-secondary/20 dark:border-dark-border hover:bg-secondary/5 dark:hover:bg-dark-border/50 transition-colors"
                >
                  <td className="p-4 text-txt dark:text-dark-text font-medium">
                    {req.name}
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden md:table-cell">
                    {req.biodataId}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden lg:table-cell">
                    {req.status === "approved" ? req.mobileNumber : "N/A"}
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden lg:table-cell">
                    {req.status === "approved" ? req.email : "N/A"}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(req._id, req.name)}
                      disabled={isDeleting}
                      className="p-2 rounded-full text-txt/70 dark:text-dark-text-muted hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors disabled:cursor-not-allowed"
                      title="Delete Request"
                    >
                      <HiOutlineTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContactRequests;
