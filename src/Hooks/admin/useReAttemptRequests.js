import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";

export const useAdminReAttemptRequests = (params = {}) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin", "re-attempt-requests", params],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/re-attempt-requests", { params });
      return res.data;
    },
    staleTime: 1000 * 15,
    keepPreviousData: true,
  });
};

export const useReviewReAttemptRequest = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, action, adminNote, rejectionCooldownDays }) => {
      const res = await axiosSecure.patch(`/admin/re-attempt-requests/${id}`, {
        action,
        adminNote,
        rejectionCooldownDays,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "re-attempt-requests"] });
    },
  });
};
