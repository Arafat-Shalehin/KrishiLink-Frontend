// src/Hooks/useFarmerInterests.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";
import { toast } from "react-toastify";

// ─────────────────────────────────────────────────────────────
// Query: Fetch all interests received by farmer
// ─────────────────────────────────────────────────────────────
export const useFarmerInterests = (userEmail) => {
  const instance = useAxiosSecure();

  return useQuery({
    queryKey: ["farmerInterests", userEmail],
    queryFn: async () => {
      // Step 1: Get farmer's crops
      const cropsRes = await instance.get("/myCrops");
      const myCrops = cropsRes.data?.crops || [];

      // Step 2: Fetch interests for each crop in parallel
      const interestLists = await Promise.all(
        myCrops.map(async (crop) => {
          try {
            const res = await instance.get(`/allCrops/${crop._id}/interests`);
            const interests = res.data?.interests || [];

            return interests.map((interest) => ({
              cropId: crop._id,
              cropName: crop.name,
              buyerName: interest.buyerName || interest.userName,
              buyerEmail: interest.buyerEmail || interest.userEmail,
              quantity: interest.quantity,
              message: interest.message,
              status: interest.status,
              paymentStatus: interest.paymentStatus ?? null,
              interestId: interest._id,
              cropQuantity: crop.quantity,
              // Repeat-purchase enrichment fields from backend
              isRepeatBuyer: interest.isRepeatBuyer ?? false,
              completedPurchaseCount: interest.completedPurchaseCount ?? 0,
              failedCycleCount: interest.failedCycleCount ?? 0,
            }));
          } catch {
            // If a crop has no interests or request fails, return empty
            return [];
          }
        }),
      );

      return interestLists.flat();
    },
    enabled: !!userEmail, // Only run if user email exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });
};

// ─────────────────────────────────────────────────────────────
// Mutation: Update interest status (accept/reject)
// ─────────────────────────────────────────────────────────────
export const useUpdateInterestStatus = () => {
  const instance = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cropId, interestId, newStatus }) => {
      const res = await instance.patch(
        `/updateInterestStatus/${cropId}/${interestId}`,
        { status: newStatus },
      );
      return {
        ...res.data,
        interestId,
        newStatus,
      };
    },

    // ✅ Optimistic update for instant UI feedback
    onMutate: async ({ interestId, newStatus }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["farmerInterests"] });

      // Snapshot the previous value
      const previousInterests = queryClient.getQueryData(["farmerInterests"]);

      // Optimistically update the cache
      queryClient.setQueriesData({ queryKey: ["farmerInterests"] }, (old) => {
        if (!old) return old;
        return old.map((interest) =>
          interest.interestId === interestId
            ? { ...interest, status: newStatus }
            : interest,
        );
      });

      // Return context with the snapshot
      return { previousInterests };
    },

    onSuccess: (data) => {
      toast.success(data.message || `Interest ${data.newStatus} successfully!`);

      // Update crop quantity if changed (for accepted interests)
      if (data.newStatus === "accepted" && data.newQuantity !== undefined) {
        queryClient.setQueriesData({ queryKey: ["farmerInterests"] }, (old) => {
          if (!old) return old;
          return old.map((interest) =>
            interest.interestId === data.interestId
              ? { ...interest, cropQuantity: data.newQuantity }
              : interest,
          );
        });
      }

      // Invalidate to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["farmerInterests"] });
    },

    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousInterests) {
        queryClient.setQueriesData(
          { queryKey: ["farmerInterests"] },
          context.previousInterests,
        );
      }
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
};
