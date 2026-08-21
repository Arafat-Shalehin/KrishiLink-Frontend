import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const useFailedPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ["farmer", "failed-payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/farmer/failed-payments");
      return res.data.failedPayments || [];
    },
    staleTime: 1000 * 30,
  });
};

export default useFailedPayments;
