import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useBiodata = (email) => {
  const secureAxios = useAxiosSecure();
  return useQuery({
    queryKey: ["biodata", email],
    queryFn: async () => {
      const res = await secureAxios.get(`/biodata?email=${email}`);
      console.log(res.data.data);
      return res.data.data;
    },
    enabled: !!email,
  });
};
