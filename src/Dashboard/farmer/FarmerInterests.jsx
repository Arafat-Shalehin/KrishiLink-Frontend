// src/Components/FarmerInterests.jsx
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { motion } from "framer-motion";
import FarmerInterestsSkeleton from "./FarmerInterestsSkeleton";
import {
  useFarmerInterests,
  useUpdateInterestStatus,
} from "@/Hooks/farmer/useFarmerInterests";

const FarmerInterests = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  // ✅ TanStack Query for fetching interests
  const {
    data: receivedInterests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFarmerInterests(user?.email);

  // ✅ Mutation for accept/reject
  const updateStatusMutation = useUpdateInterestStatus();

  // Handler for status change
  const handleStatusChange = (cropId, interestId, newStatus) => {
    updateStatusMutation.mutate({ cropId, interestId, newStatus });
  };

  // Check if a specific interest is being updated
  const isUpdating = (interestId) => {
    return (
      updateStatusMutation.isPending &&
      updateStatusMutation.variables?.interestId === interestId
    );
  };

  // Loading state
  if (authLoading || isLoading) {
    return <FarmerInterestsSkeleton rows={6} />;
  }

  // Error state
  if (isError) {
    return (
      <motion.div
        className="mt-12 rounded-2xl border border-red-300 bg-red-50 dark:bg-red-900/20 p-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-red-600 dark:text-red-400 mb-4">
          {error?.response?.data?.message || "Failed to load interests"}
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mt-12 rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-xl p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mt-6 text-2xl sm:text-3xl font-bold mb-6 text-(--color-text) text-center">
        Received <span className="text-(--color-primary)">Interests</span>
      </h3>

      {receivedInterests.length === 0 ? (
        <p className="text-center text-(--color-muted) italic">
          No interest requests received yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-xl border border-(--color-border) overflow-hidden">
            <thead className="bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-bg))] text-(--color-text)">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Crop</th>
                <th className="px-4 py-3 text-left font-semibold">Buyer</th>
                <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left font-semibold">Message</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {receivedInterests.map((interest) => (
                <motion.tr
                  key={interest.interestId}
                  className="border-t border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <td className="px-4 py-3 font-semibold text-(--color-text)">
                    {interest.cropName}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-semibold text-(--color-text)">
                      {interest.buyerName || "Unknown"}
                    </p>
                    <p className="text-xs text-(--color-muted)">
                      {interest.buyerEmail || "—"}
                    </p>
                  </td>

                  <td className="px-4 py-3 font-semibold text-(--color-text)/90">
                    {interest.quantity}
                  </td>

                  <td className="px-4 py-3 text-(--color-text)/90">
                    {interest.message || "—"}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={interest.status} />
                  </td>

                  <td className="px-4 py-3 space-x-2">
                    <button
                      disabled={
                        interest.status !== "pending" ||
                        isUpdating(interest.interestId)
                      }
                      onClick={() =>
                        handleStatusChange(
                          interest.cropId,
                          interest.interestId,
                          "accepted",
                        )
                      }
                      className="rounded-lg border border-(--color-primary) px-3 py-1.5 text-sm font-semibold text-(--color-primary)
                        hover:bg-(--color-primary) hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating(interest.interestId) ? "..." : "Accept"}
                    </button>

                    <button
                      disabled={
                        interest.status !== "pending" ||
                        isUpdating(interest.interestId)
                      }
                      onClick={() =>
                        handleStatusChange(
                          interest.cropId,
                          interest.interestId,
                          "rejected",
                        )
                      }
                      className="rounded-lg border border-red-500 px-3 py-1.5 text-sm font-semibold text-red-600
                        hover:bg-red-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating(interest.interestId) ? "..." : "Reject"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Status Badge Component (extracted for cleaner code)
// ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const statusStyles = {
    accepted:
      "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-(--color-primary)",
    rejected:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300",
    pending:
      "border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-(--color-secondary)",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[status] || statusStyles.pending}`}
    >
      {status}
    </span>
  );
};

export default FarmerInterests;
