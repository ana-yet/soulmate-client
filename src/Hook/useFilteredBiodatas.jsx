import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const useFilteredBiodatas = (filters) => {
  const publicAxios = usePublicAxios();
  console.log(filters);

  return useQuery({
    queryKey: ["filtered-biodatas", filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: filters.search || "",
        minAge: filters.ageMin || "",
        maxAge: filters.ageMax || "",
        division: filters.division || "",
        biodataType: filters.gender || "",
        page: filters.page,
      }).toString();

      const res = await publicAxios(`/biodatas?${params}`);

      return res.data;
    },
    enabled: !!filters,
  });
};
export default useFilteredBiodatas;
