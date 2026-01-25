import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxios";

const useBuyerDashboard = (enabled = true) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["dashboard", "buyer"],
    queryFn: async () => (await axiosSecure.get("/dashboard/buyer")).data,
    enabled, // ✅ important
    staleTime: 1000 * 30,
  });
};

export default useBuyerDashboard;
