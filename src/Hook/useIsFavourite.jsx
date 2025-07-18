import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useIsFavourite = (biodataId) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isFavourite = false,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["isFavourite", user?.email, biodataId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/favourites/check/${user.email}/${biodataId}`
      );
      return res.data.isFavourite;
    },
    enabled: !!user?.email && !!biodataId,
  });

  return { isFavourite, isLoading, isError };
};

export default useIsFavourite;
