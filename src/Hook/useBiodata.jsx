import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const fetchBiodata = async (axiosInstance, email) => {
  const res = await axiosInstance.get(`/biodata?email=${email}`);
  return res.data.data;
};

export const useBiodata = (email) => {
  const axiosInstance = usePublicAxios();
  return useQuery({
    queryKey: ["biodata", email],
    queryFn: () => fetchBiodata(axiosInstance, email),
    enabled: !!email,
  });
};
