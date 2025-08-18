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
      title: `<strong class="font-secondary ">Story Preview</strong>`,
      html: `
    <div class="text-left p-4 space-y-4 font-primary">
      <!-- Main Couple Image -->
      <div class="flex justify-center">
        <img src="${
          story.coupleImage
        }" alt="Couple" class="rounded-lg w-48 h-48 object-cover mx-auto shadow-md border border-secondary/20"/>
      </div>

      <!-- Basic Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm"><strong class="text-accent">Self:</strong> ${
            story.selfName
          } (ID: ${story.selfBiodataId})</p>
          <p class="text-sm"><strong class="text-accent">Partner:</strong> ${
            story.partnerName
          } (ID: ${story.partnerBiodataId})</p>
        </div>
        <div>
          <p class="text-sm"><strong class="text-accent">Marriage Date:</strong> ${new Date(
            story.marriageDate
          ).toLocaleDateString()}</p>
          <p class="text-sm"><strong class="text-accent">Location:</strong> ${
            story.weddingLocation
          }</p>
        </div>
      </div>

      <!-- Timeline Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm"><strong class="text-accent">Duration Before Marriage:</strong> ${
            story.durationBeforeMarriage
          }</p>
          <p class="text-sm"><strong class="text-accent">First Contact:</strong> ${
            story.firstContactStory
          }</p>
        </div>
        <div>
          <p class="text-sm"><strong class="text-accent">Favorite Memory:</strong> ${
            story.favoriteMemory
          }</p>
          <p class="text-sm"><strong class="text-accent">Platform Rating:</strong> ${"★".repeat(
            story.platformRating
          )}</p>
        </div>
      </div>

      <!-- Success Story -->
      <div class="bg-secondary/10 dark:bg-dark-secondary/50 p-3 rounded-lg">
        <h4 class="font-semibold text-accent mb-1">Success Story</h4>
        <p class="text-sm text-txt dark:text-dark-text">${
          story.successStory
        }</p>
      </div>

      <!-- Advice -->
      <div class="bg-secondary/10 dark:bg-dark-secondary/50 p-3 rounded-lg">
        <h4 class="font-semibold text-accent mb-1">Advice to Singles</h4>
        <p class="text-sm text-txt dark:text-dark-text">${
          story.adviceToSingles
        }</p>
      </div>

      <!-- Feedback -->
      <div class="bg-secondary/10 dark:bg-dark-secondary/50 p-3 rounded-lg">
        <h4 class="font-semibold text-accent mb-1">Platform Feedback</h4>
        <p class="text-sm text-txt dark:text-dark-text">${
          story.platformFeedback
        }</p>
      </div>

      <!-- Wedding Photos Preview -->
      ${
        story.weddingPhotos?.length > 0
          ? `
        <div>
          <h4 class="font-semibold text-accent mb-2">Wedding Album (${
            story.weddingPhotos.length
          } photos)</h4>
          <div class="flex flex-wrap gap-2">
            ${story.weddingPhotos
              .slice(0, 4)
              .map(
                (photo) => `
              <img src="${photo}" class="w-16 h-16 object-cover rounded-md border border-secondary/20"/>
            `
              )
              .join("")}
            ${
              story.weddingPhotos.length > 4
                ? `
              <div class="w-16 h-16 bg-secondary/10 dark:bg-dark-secondary/50 rounded-md border border-secondary/20 flex items-center justify-center">
                <span class="text-xs">+${story.weddingPhotos.length - 4}</span>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `
          : ""
      }

      <!-- Certificate & Video -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        ${
          story.marriageCertificate
            ? `
          <div>
            <h4 class="font-semibold text-accent mb-1">Marriage Certificate</h4>
            <img src="${story.marriageCertificate}" class="h-24 object-contain border border-secondary/20 rounded-md"/>
          </div>
        `
            : ""
        }
        ${
          story.videoLink
            ? `
          <div>
            <h4 class="font-semibold text-accent mb-1">Wedding Video</h4>
            <a href="${story.videoLink}" target="_blank" class="text-sm text-accent underline">View Video Link</a>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `,
      width: "800px",
      background: "#faf6f0", // light mode background
      backdrop: `
    rgba(0,0,0,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
      showCancelButton: true,
      confirmButtonText: "Approve Story",
      confirmButtonColor: "#8E242C",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "font-primary bg-background dark:bg-dark-secondary",
        title: "text-txt dark:text-dark-text",
        htmlContainer: "text-txt dark:text-dark-text",
        confirmButton: "hover:bg-accent/90",
        cancelButton: "hover:bg-secondary/20 dark:hover:bg-dark-border",
        actions: "border-t border-secondary/20 dark:border-dark-border pt-4",
      },
      didOpen: () => {
        // Set dark mode if detected
        if (document.documentElement.classList.contains("dark")) {
          Swal.getPopup().classList.add("dark");
          Swal.getPopup().style.background = "#1a1d24"; // dark mode background
        }
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
                  No pending success stories.
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
