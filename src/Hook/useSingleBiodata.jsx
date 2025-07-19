import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleBiodata = (biodataId) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["singleBiodata", biodataId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singleBiodata/${biodataId}`);
      return res.data?.data;
    },
    enabled: !!biodataId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export default useSingleBiodata;
