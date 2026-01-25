import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxios";

const useFarmerDashboard = (enabled = true) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["dashboard", "farmer"],
    queryFn: async () => (await axiosSecure.get("/dashboard/farmer")).data,
    enabled, // ✅ important
    staleTime: 1000 * 30,
  });
};

export default useFarmerDashboard;
