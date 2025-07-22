import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { HiOutlineCheckCircle } from "react-icons/hi";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const usePendingSuccessStories = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["pending-success-stories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/pending-success-stories");
      return data?.data;
    },
  });
};

const SuccessStoryApproval = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: stories,
    isLoading,
    isError,
    error,
  } = usePendingSuccessStories();

  // Mutation for approving a success story
  const { mutate: approveStory, isPending: isApproving } = useMutation({
    mutationFn: (storyId) =>
      axiosSecure.patch(`/accept-success-story/${storyId}`),
    onSuccess: (data, storyId) => {
      toast.success("Story approved and published!");
      // Optimistically update the UI by removing the approved story from the query cache
      queryClient.setQueryData(["pending-success-stories"], (oldData) =>
        oldData.filter((story) => story._id !== storyId)
      );
    },
    onError: (err) => {
      toast.error(err.message || "Failed to approve story.");
    },
  });

  const handleApproveClick = (story) => {
    Swal.fire({
      title: `<strong class="font-secondary">Story Preview</strong>`,
      html: `
        <div class="text-left p-4 space-y-4">
          <img src="${story.coupleImage}" alt="Couple" class="rounded-lg w-32 h-32 object-cover mx-auto shadow-md"/>
          <p class="text-base text-gray-700">${story.successStory}</p>
          <p class="text-sm"><strong>Self ID:</strong> ${story.selfBiodataId} | <strong>Partner ID:</strong> ${story.partnerBiodataId}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Approve Story",
      confirmButtonColor: "#8E242C", // accent color
      cancelButtonText: "Cancel",
      customClass: {
        popup: "font-primary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        approveStory(story._id);
      }
    });
  };

  return (
    <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-4 sm:p-6 border border-secondary/20 dark:border-dark-border">
      <Helmet>
        <title>Success Story | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mb-6">
        <h2 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
          Approve Success Stories
        </h2>
        <p className="text-txt/70 dark:text-dark-text-muted mt-1">
          Review and publish user-submitted success stories.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-secondary/10 dark:bg-dark-bg">
            <tr>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted">
                Couple Info
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden lg:table-cell">
                Story Preview
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted hidden md:table-cell">
                Submitted At
              </th>
              <th className="p-4 font-semibold text-txt dark:text-dark-text-muted text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Skeleton Loader
              [...Array(3)].map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-secondary/20 dark:border-dark-border"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                      <div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-24 mx-auto animate-pulse"></div>
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan="4" className="text-center p-10 text-accent">
                  Error: {error.message}
                </td>
              </tr>
            ) : !stories || stories.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-10 text-txt/70 dark:text-dark-text-muted"
                >
                  No pending success stories. MashAllah!
                </td>
              </tr>
            ) : (
              stories.map((story) => (
                <tr
                  key={story._id}
                  className="border-b border-secondary/20 dark:border-dark-border hover:bg-secondary/5 dark:hover:bg-dark-border/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={story.coupleImage}
                        alt="Couple"
                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-txt dark:text-dark-text">
                          Self ID: {story.selfBiodataId}
                        </p>
                        <p className="text-sm text-txt/80 dark:text-dark-text-muted">
                          Partner ID: {story.partnerBiodataId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden lg:table-cell text-sm">
                    {story.successStory.substring(0, 100)}...
                  </td>
                  <td className="p-4 text-txt/80 dark:text-dark-text-muted hidden md:table-cell text-sm">
                    {new Date(story.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleApproveClick(story)}
                      disabled={isApproving}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 rounded-md hover:bg-green-200 dark:hover:bg-green-900 transition-colors disabled:opacity-50"
                    >
                      <HiOutlineCheckCircle />
                      <span>Approve</span>
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

export default SuccessStoryApproval;
