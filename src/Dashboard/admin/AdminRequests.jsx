import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "@/Components/Loader";
import useAdminFarmerRequests from "@/Hooks/admin/useAdminFarmerRequests";
import {
  useAdminApproveRequestMutation,
  useAdminRejectRequestMutation,
} from "@/Hooks/admin/mutations/useAdminMutations";
import AdminTableSkeleton from "./AdminTableSkeleton";

const AdminRequests = () => {
  const [status, setStatus] = useState("pending");
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({ status, page, limit: 10 }), [status, page]);
  const { data, isLoading } = useAdminFarmerRequests(params, true);

  const requests = data?.requests || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const approveMut = useAdminApproveRequestMutation();
  const rejectMut = useAdminRejectRequestMutation();

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
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to reject.");
    }
  };

  if (isLoading)
    return <AdminTableSkeleton titleWidth="w-48" cols={4} rows={8} />;

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
                className="border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent) transition"
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
                          disabled={approveMut.isPending}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(u)}
                          className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition"
                          disabled={rejectMut.isPending}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-(--color-muted)">
                        No actions available
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
          Page {meta.page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-sm font-semibold hover:border-(--color-primary) transition disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            className="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-sm font-semibold hover:border-(--color-primary) transition disabled:opacity-50"
            disabled={page >= totalPages}
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
