import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminDashboardStats = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-dashboard-stats");
      console.log(res.data);
      return res.data;
    },
  });
};

export default useAdminDashboardStats;
