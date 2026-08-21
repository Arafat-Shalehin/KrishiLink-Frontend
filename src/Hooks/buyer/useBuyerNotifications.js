import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

export const useBuyerNotifications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ["buyer", "notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/buyer/notifications");
      return res.data.notifications || [];
    },
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60, // Poll every minute
  });
};

export const useMarkNotificationRead = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId) => {
      const res = await axiosSecure.patch(
        `/buyer/notifications/${notificationId}/read`
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["buyer", "notifications"] });
      qc.invalidateQueries({ queryKey: ["myInterests"] });
    },
  });
};
