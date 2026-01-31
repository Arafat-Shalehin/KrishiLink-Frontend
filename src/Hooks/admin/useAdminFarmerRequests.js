import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";

const useAdminFarmerRequests = (params, enabled = true) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin", "farmer-requests", params],
    enabled,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/farmer-requests", { params });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 15,
  });
};

export default useAdminFarmerRequests;
