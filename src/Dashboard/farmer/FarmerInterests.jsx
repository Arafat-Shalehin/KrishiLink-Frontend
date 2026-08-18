import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import FarmerInterestsSkeleton from "./FarmerInterestsSkeleton";
import {
  useFarmerInterests,
  useUpdateInterestStatus,
} from "@/Hooks/farmer/useFarmerInterests";
import useFailedPayments from "@/Hooks/farmer/useFailedPayments";
import useReAttemptRequest from "@/Hooks/farmer/useReAttemptRequest";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Inbox, AlertCircle } from "lucide-react";

const FarmerInterests = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("interests");

  // Received Interests tab
  const {
    data: receivedInterests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFarmerInterests(user?.email);

  const updateStatusMutation = useUpdateInterestStatus();

  const handleStatusChange = (cropId, interestId, newStatus) => {
    updateStatusMutation.mutate({ cropId, interestId, newStatus });
  };

  const isUpdating = (interestId) =>
    updateStatusMutation.isPending &&
    updateStatusMutation.variables?.interestId === interestId;

  // Failed Payments tab
  const {
    data: failedPayments = [],
    isLoading: failedLoading,
  } = useFailedPayments();

  const reAttemptMutation = useReAttemptRequest();

  const handleReAttemptRequest = async (payment) => {
    const { value: farmerMessage } = await Swal.fire({
      title: "Request Re-attempt for Buyer",
      html: `
        <div style="text-align:left; margin-bottom:8px;">
          <p style="margin-bottom:6px;"><strong>Buyer:</strong> ${payment.buyerName} (${payment.buyerEmail})</p>
          <p style="margin-bottom:12px;"><strong>Crop:</strong> ${payment.cropName}</p>
          <p style="margin-bottom:6px; font-size:13px; color:#6b7280;">
            Explain why this buyer should be given another payment chance.
            The admin will review your message before approving.
          </p>
        </div>
      `,
      input: "textarea",
      inputPlaceholder:
        "e.g. The buyer had a bank issue during payment and has confirmed they want to proceed...",
      inputAttributes: { style: "min-height:100px; font-size:14px;" },
      showCancelButton: true,
      confirmButtonText: "Submit Request",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#8B5E34",
      inputValidator: (value) => {
        if (!value?.trim()) return "Please provide a reason for the request";
        if (value.trim().length < 20)
          return "Please provide a more detailed reason (at least 20 characters)";
      },
    });

    if (!farmerMessage) return;

    reAttemptMutation.mutate({
      interestId: payment.interestId,
      farmerMessage: farmerMessage.trim(),
    });
  };

  if (authLoading || isLoading) return <FarmerInterestsSkeleton rows={6} />;

  return (
    <div className="mt-6">
      {/* Tab Headers */}
      <div className="flex gap-1 border-b border-(--color-border) mb-6">
        <TabButton
          active={activeTab === "interests"}
          onClick={() => setActiveTab("interests")}
          icon={<Inbox className="h-4 w-4" />}
          label="Received Interests"
          count={receivedInterests.length}
        />
        <TabButton
          active={activeTab === "failed"}
          onClick={() => setActiveTab("failed")}
          icon={<AlertCircle className="h-4 w-4" />}
          label="Failed Payments"
          count={failedPayments.length}
          countColor="text-red-500"
        />
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "interests" && (
          <motion.div
            key="interests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isError ? (
              <div className="rounded-2xl border border-red-300 bg-red-50 dark:bg-red-900/20 p-6 text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">
                  {error?.response?.data?.message || "Failed to load interests"}
                </p>
                <button
                  onClick={() => refetch()}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            ) : receivedInterests.length === 0 ? (
              <p className="text-center text-(--color-muted) italic py-12">
                No interest requests received yet.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-(--color-border)">
                <table className="min-w-full text-sm">
                  <thead className="bg-[color-mix(in_srgb,var(--color-primary)_10%,var(--color-bg))] text-(--color-text)">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Crop</th>
                      <th className="px-4 py-3 text-left font-semibold">Buyer</th>
                      <th className="px-4 py-3 text-left font-semibold">Qty</th>
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
                          {/* Repeat buyer enrichment */}
                          {interest.isRepeatBuyer && (
                            <span className="inline-flex items-center mt-1 rounded-full border border-amber-300 bg-amber-50 dark:border-amber-700/40 dark:bg-amber-900/20 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                              🔄 Repeat Buyer
                            </span>
                          )}
                          {interest.completedPurchaseCount > 0 && (
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                              {interest.completedPurchaseCount} purchase{interest.completedPurchaseCount > 1 ? "s" : ""} completed
                            </p>
                          )}
                          {interest.failedCycleCount > 0 && (
                            <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                              {interest.failedCycleCount} failed cycle{interest.failedCycleCount > 1 ? "s" : ""}
                            </p>
                          )}
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
                                "accepted"
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
                                "rejected"
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
        )}

        {activeTab === "failed" && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {failedLoading ? (
              <FarmerInterestsSkeleton rows={4} />
            ) : failedPayments.length === 0 ? (
              <p className="text-center text-(--color-muted) italic py-12">
                No buyers have exhausted their payment attempts.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-(--color-border)">
                <table className="min-w-full text-sm">
                  <thead className="bg-[color-mix(in_srgb,var(--color-primary)_10%,var(--color-bg))] text-(--color-text)">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Crop</th>
                      <th className="px-4 py-3 text-left font-semibold">Buyer</th>
                      <th className="px-4 py-3 text-left font-semibold">Attempts</th>
                      <th className="px-4 py-3 text-left font-semibold">Failed Cycles</th>
                      <th className="px-4 py-3 text-left font-semibold">Re-attempts Given</th>
                      <th className="px-4 py-3 text-left font-semibold">Request Status</th>
                      <th className="px-4 py-3 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {failedPayments.map((payment) => {
                      const latest = payment.latestRequest;
                      const isPending = latest?.status === "pending";
                      const isRejected = latest?.status === "rejected";
                      const isApproved = latest?.status === "approved";

                      return (
                        <motion.tr
                          key={payment.interestId}
                          className="border-t border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition duration-200"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <td className="px-4 py-3 font-semibold text-(--color-text)">
                            {payment.cropName}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-(--color-text)">
                              {payment.buyerName}
                            </p>
                            <p className="text-xs text-(--color-muted)">
                              {payment.buyerEmail}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/20 dark:border-red-900/40 dark:text-red-300">
                              {payment.attemptCount} / 3
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {payment.failedCycleCount >= 3 ? (
                              <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300">
                                {payment.failedCycleCount} 🔒
                              </span>
                            ) : payment.failedCycleCount > 0 ? (
                              <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-300">
                                {payment.failedCycleCount}
                              </span>
                            ) : (
                              <span className="text-xs text-(--color-muted)">0</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-(--color-muted)">
                              {payment.totalReAttemptGrants > 0 ? (
                                <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] px-2.5 py-1 text-xs font-semibold text-(--color-primary)">
                                  {payment.totalReAttemptGrants}x granted
                                </span>
                              ) : (
                                <span className="text-(--color-muted) text-xs">None yet</span>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {!latest && (
                              <span className="text-xs text-(--color-muted)">No request yet</span>
                            )}
                            {isPending && (
                              <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700 dark:border-yellow-700/40 dark:bg-yellow-900/20 dark:text-yellow-300">
                                Pending review
                              </span>
                            )}
                            {isApproved && (
                              <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] px-2.5 py-1 text-xs font-semibold text-(--color-primary)">
                                Approved
                              </span>
                            )}
                            {isRejected && (
                              <div>
                                <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300">
                                  Rejected
                                </span>
                                {payment.cooldownEndsAt && !payment.canReRequest && (
                                  <p className="text-xs text-(--color-muted) mt-1">
                                    Can re-submit:{" "}
                                    {new Date(payment.cooldownEndsAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              disabled={
                                !payment.canReRequest ||
                                reAttemptMutation.isPending
                              }
                              onClick={() => handleReAttemptRequest(payment)}
                              className="rounded-lg border border-(--color-primary) px-3 py-1.5 text-xs font-semibold text-(--color-primary)
                                hover:bg-(--color-primary) hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {isPending ? "Awaiting Admin" : "Request Re-attempt"}
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

const TabButton = ({ active, onClick, icon, label, count, countColor = "text-(--color-muted)" }) => (
  <button
    onClick={onClick}
    className={[
      "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition -mb-px",
      active
        ? "border-(--color-primary) text-(--color-primary)"
        : "border-transparent text-(--color-muted) hover:text-(--color-text)",
    ].join(" ")}
  >
    {icon}
    {label}
    {count > 0 && (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[color-mix(in_srgb,currentColor_15%,transparent)] px-2 py-0.5 text-xs font-bold ${countColor || ""}`}
      >
        {count}
      </span>
    )}
  </button>
);

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
