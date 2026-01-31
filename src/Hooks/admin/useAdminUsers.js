import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";

const useAdminUsers = (params, enabled = true) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin", "users", params],
    enabled,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users", { params });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 15,
  });
};

export default useAdminUsers;
