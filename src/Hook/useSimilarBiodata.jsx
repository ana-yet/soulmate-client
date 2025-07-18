import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useSimilarBiodata = (id) => {
  const axios = useAxiosSecure();

  return useQuery({
    queryKey: ["similarBiodata", id],
    queryFn: async () => {
      const res = await axios.get(`/biodata/similar/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};
