import { toast } from "react-hot-toast";
import useAxiosSecure from "./useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveFavourite = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: removeFromFavourites, isPending: isRemoving } = useMutation({
    mutationFn: ({ userEmail, biodataId }) =>
      axiosSecure.delete(`/favourites`, {
        params: { userEmail, biodataId },
      }),

    onSuccess: () => {
      toast.success("Removed from your favourites.");
      queryClient.invalidateQueries(["favourites"]);
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to remove favourite."
      );
    },
  });

  return { removeFromFavourites, isRemoving };
};

export default useRemoveFavourite;
