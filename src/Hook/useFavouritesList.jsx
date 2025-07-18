import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFavouritesList = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["favouritesList", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favourites/${email}`);
      return res.data.data;
    },
    enabled: !!email,
  });
};

export default useFavouritesList;
