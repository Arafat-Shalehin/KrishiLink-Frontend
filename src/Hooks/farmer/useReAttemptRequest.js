import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";
import { toast } from "react-toastify";

const useReAttemptRequest = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ interestId, farmerMessage }) => {
      const res = await axiosSecure.post("/farmer/re-attempt-request", {
        interestId,
        farmerMessage,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Re-attempt request submitted successfully!");
      qc.invalidateQueries({ queryKey: ["farmer", "failed-payments"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit request"
      );
    },
  });
};

export default useReAttemptRequest;
