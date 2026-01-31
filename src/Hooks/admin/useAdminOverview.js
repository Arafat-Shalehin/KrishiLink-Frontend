import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";

const useAdminOverview = (enabled = true) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin", "overview"],
    enabled,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data;
    },
    staleTime: 1000 * 30,
  });
};

export default useAdminOverview;
