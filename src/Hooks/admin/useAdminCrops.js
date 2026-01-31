import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";

const useAdminCrops = (params, enabled = true) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin", "crops", params],
    enabled,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/crops", { params });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 15,
  });
};

export default useAdminCrops;
