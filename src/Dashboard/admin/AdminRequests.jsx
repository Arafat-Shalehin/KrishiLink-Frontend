import { useCallback, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAdminFarmerRequests from "@/Hooks/admin/useAdminFarmerRequests";
import {
  useAdminApproveRequestMutation,
  useAdminRejectRequestMutation,
  useAdminResetRequestMutation,
} from "@/Hooks/admin/mutations/useAdminMutations";
import AdminTableSkeleton from "./AdminTableSkeleton";

const AdminRequests = () => {
  const [status, setStatus] = useState("pending");
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({ status, page, limit: 10 }), [status, page]);
  const { data, isLoading, isError, error, refetch } = useAdminFarmerRequests(
    params,
    true,
  );
  const requests = data?.requests || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const approveMut = useAdminApproveRequestMutation();
  const rejectMut = useAdminRejectRequestMutation();
  const resetMut = useAdminResetRequestMutation();

  // ✅ Check if ANY mutation is in progress
  const isAnyMutationPending =
    approveMut.isPending || rejectMut.isPending || resetMut.isPending;

  // ✅ Get the currently processing request ID
  const pendingRequestId =
    approveMut.variables?.id ||
    rejectMut.variables?.id ||
    resetMut.variables?.id;

  // ✅ Handle empty page after mutation
  const handlePostMutationRefetch = useCallback(async () => {
    await refetch();

    // If current page becomes empty and we're not on page 1, go back
    if (requests.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [refetch, requests.length, page]);

  const approve = async (u) => {
    const result = await Swal.fire({
      title: "Approve request?",
      text: `Approve farmer access for ${u.email}? This will change role to "farmer".`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2F855A",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await approveMut.mutateAsync({ id: u._id });
      toast.success("Request approved.");
      await handlePostMutationRefetch(); // ✅ Refetch data
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to approve.");
    }
  };

  const reject = async (u) => {
    const result = await Swal.fire({
      title: "Reject request?",
      text: `Reject farmer request for ${u.email}? They will not be able to re-request unless admin resets later.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await rejectMut.mutateAsync({ id: u._id });
      toast.success("Request rejected.");
      await handlePostMutationRefetch(); // ✅ Refetch data
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to reject.");
    }
  };

  const reset = async (u) => {
    const result = await Swal.fire({
      title: "Reset rejected request?",
      text: `This will allow ${u.email} to submit a new farmer request.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Reset",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2F855A",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await resetMut.mutateAsync({ id: u._id });
      toast.success("Request reset. User can request again.");
      await handlePostMutationRefetch(); // ✅ Refetch data
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to reset request.");
    }
  };

  if (isLoading)
    return <AdminTableSkeleton titleWidth="w-48" cols={4} rows={8} />;

  // ✅ Error state
  if (isError) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
          Failed to load requests
        </h2>
        <p className="text-red-500 dark:text-red-300 mb-4">
          {error?.response?.data?.message || error?.message || "Unknown error"}
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-(--color-text)">
        Farmer <span className="text-(--color-primary)">Requests</span>
      </h1>
      <p className="mt-2 text-sm text-(--color-muted)">
        Review buyer requests to become farmers.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="w-full sm:w-56 rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm"
          disabled={isAnyMutationPending} // ✅ Disable during mutations
        >
          <option value="pending">pending</option>
          <option value="cancelled">cancelled</option>
          <option value="rejected">rejected</option>
          <option value="approved">approved</option>
        </select>

        <div className="rounded-xl border border-(--color-border) bg-(--color-bg) px-4 py-2 text-sm font-semibold text-(--color-muted) flex items-center justify-between sm:w-56">
          <span>Total</span>
          <span className="text-(--color-text)">{meta.total}</span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-(--color-border) bg-(--color-surface)">
        <table className="min-w-full text-sm">
          <thead className="bg-(--color-bg) border-b border-(--color-border)">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Current Role</th>
              <th className="px-4 py-3 font-semibold">Request Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((u) => (
              <tr
                key={u._id}
                className={`border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition ${
                  pendingRequestId === u._id ? "opacity-60" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-(--color-text)">
                    {u.name || "—"}
                  </p>
                  <p className="text-xs text-(--color-muted)">{u.email}</p>
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-(--color-border) bg-(--color-bg) px-2.5 py-1 text-xs font-semibold capitalize">
                    {u.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-(--color-border) bg-(--color-bg) px-2.5 py-1 text-xs font-semibold capitalize">
                    {u.farmerRequest?.status || "—"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {u.farmerRequest?.status === "pending" ? (
                      <>
                        <button
                          onClick={() => approve(u)}
                          className="rounded-lg border border-(--color-primary) px-3 py-1.5 text-xs font-semibold text-(--color-primary) hover:bg-(--color-primary) hover:text-white transition"
                          disabled={isAnyMutationPending} // ✅ Disable during mutations
                        >
                          {pendingRequestId === u._id && approveMut.isPending
                            ? "Approving..."
                            : "Approve"}
                        </button>
                        <button
                          onClick={() => reject(u)}
                          className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition"
                          disabled={isAnyMutationPending} // ✅ Disable all when any mutation pending
                        >
                          {pendingRequestId === u._id && rejectMut.isPending
                            ? "Rejecting..."
                            : "Reject"}
                        </button>
                      </>
                    ) : u.farmerRequest?.status === "rejected" ? (
                      <button
                        onClick={() => reset(u)}
                        className="rounded-lg border border-(--color-secondary) px-3 py-1.5 text-xs font-semibold text-(--color-secondary) hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] transition"
                        disabled={isAnyMutationPending} // ✅ Disable all when any mutation pending
                      >
                        {pendingRequestId === u._id && resetMut.isPending
                          ? "Resetting..."
                          : "Reset"}
                      </button>
                    ) : (
                      <span className="text-xs text-(--color-muted)">
                        No actions
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-(--color-muted)"
                >
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-(--color-muted)">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-(--color-border) 
            bg-(--color-surface) px-3 py-1.5 text-sm font-semibold 
            hover:border-(--color-primary) transition 
            disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page <= 1 || isAnyMutationPending}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            className="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-sm font-semibold hover:border-(--color-primary) transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page >= totalPages || isAnyMutationPending}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;
