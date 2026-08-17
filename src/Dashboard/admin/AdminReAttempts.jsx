import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  useAdminReAttemptRequests,
  useReviewReAttemptRequest,
} from "@/Hooks/admin/useReAttemptRequests";
import AdminTableSkeleton from "./AdminTableSkeleton";

const AdminReAttempts = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({ status: statusFilter, page, limit: 10 }),
    [statusFilter, page]
  );

  const { data, isLoading } = useAdminReAttemptRequests(params);
  const requests = data?.requests || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const reviewMutation = useReviewReAttemptRequest();

  const handleApprove = async (request) => {
    const { value: adminNote } = await Swal.fire({
      title: "Approve Re-attempt?",
      html: `
        <div style="text-align:left; margin-bottom:8px;">
          <p><strong>Farmer:</strong> ${request.farmerName} (${request.farmerEmail})</p>
          <p><strong>Buyer:</strong> ${request.buyerName} (${request.buyerEmail})</p>
          <p><strong>Crop:</strong> ${request.cropName}</p>
          <p style="margin-top:10px;"><strong>Farmer's message:</strong></p>
          <p style="color:#374151; background:#f9fafb; padding:8px; border-radius:6px; margin-top:4px; font-size:13px;">
            "${request.farmerMessage}"
          </p>
          <p style="margin-top:10px; font-size:13px; color:#6b7280;">
            Approving will reset the buyer's payment attempts to 0 and notify them.
          </p>
        </div>
      `,
      input: "text",
      inputPlaceholder: "Optional note to farmer/buyer (leave blank if none)",
      showCancelButton: true,
      confirmButtonText: "Approve",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#8B5E34",
    });

    if (adminNote === undefined) return; // user cancelled

    try {
      await reviewMutation.mutateAsync({
        id: request._id,
        action: "approved",
        adminNote: adminNote || "",
      });
      toast.success("Re-attempt approved. Buyer has been notified.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async (request) => {
    const { value: formValues } = await Swal.fire({
      title: "Reject Re-attempt?",
      html: `
        <div style="text-align:left; margin-bottom:12px;">
          <p><strong>Farmer:</strong> ${request.farmerName}</p>
          <p><strong>Buyer:</strong> ${request.buyerName}</p>
          <p style="margin-top:10px;"><strong>Farmer's message:</strong></p>
          <p style="color:#374151; background:#f9fafb; padding:8px; border-radius:6px; margin-top:4px; font-size:13px;">
            "${request.farmerMessage}"
          </p>
        </div>
        <div style="text-align:left;">
          <label style="font-size:13px; font-weight:600; display:block; margin-bottom:4px;">
            Admin note (optional):
          </label>
          <input id="swal-admin-note" class="swal2-input" style="margin:0 0 12px;" placeholder="Reason for rejection...">
          <label style="font-size:13px; font-weight:600; display:block; margin-bottom:4px;">
            Cooldown before farmer can re-submit (days):
          </label>
          <input id="swal-cooldown" class="swal2-input" type="number" min="1" max="30" value="3" style="margin:0;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#8B5E34",
      preConfirm: () => {
        const note = document.getElementById("swal-admin-note").value;
        const days = parseInt(document.getElementById("swal-cooldown").value, 10);
        if (!days || days < 1) {
          Swal.showValidationMessage("Cooldown must be at least 1 day");
          return false;
        }
        return { adminNote: note, rejectionCooldownDays: days };
      },
    });

    if (!formValues) return;

    try {
      await reviewMutation.mutateAsync({
        id: request._id,
        action: "rejected",
        adminNote: formValues.adminNote,
        rejectionCooldownDays: formValues.rejectionCooldownDays,
      });
      toast.success(`Request rejected. Farmer can re-submit after ${formValues.rejectionCooldownDays} day(s).`);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to reject");
    }
  };

  if (isLoading)
    return <AdminTableSkeleton titleWidth="w-56" cols={5} rows={8} />;

  return (
    <div className="dark:min-h-[calc(112vh-200px)]">
      <h1 className="text-2xl font-bold text-(--color-text)">
        Re-attempt <span className="text-(--color-primary)">Requests</span>
      </h1>
      <p className="mt-2 text-sm text-(--color-muted)">
        Review farmer requests to grant buyers another payment chance.
      </p>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="rounded-xl border border-(--color-border) bg-(--color-bg) px-4 py-2 text-sm font-semibold text-(--color-muted) flex items-center justify-between">
          <span>Total</span>
          <span className="text-(--color-text)">{meta.total}</span>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-(--color-border) bg-(--color-surface)">
        <table className="min-w-full text-sm">
          <thead className="bg-(--color-bg) border-b border-(--color-border)">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold">Crop / Farmer</th>
              <th className="px-4 py-3 font-semibold">Buyer</th>
              <th className="px-4 py-3 font-semibold">Farmer's Message</th>
              <th className="px-4 py-3 font-semibold">Re-attempts Given</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr
                key={r._id}
                className="border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition"
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-(--color-text)">{r.cropName}</p>
                  <p className="text-xs text-(--color-muted)">{r.farmerName}</p>
                  <p className="text-xs text-(--color-muted)">{r.farmerEmail}</p>
                </td>

                <td className="px-4 py-3">
                  <p className="font-semibold text-(--color-text)">{r.buyerName}</p>
                  <p className="text-xs text-(--color-muted)">{r.buyerEmail}</p>
                </td>

                <td className="px-4 py-3 max-w-xs">
                  <p className="text-sm text-(--color-text) line-clamp-3 italic">
                    "{r.farmerMessage}"
                  </p>
                  {r.adminNote && (
                    <p className="text-xs text-(--color-muted) mt-1">
                      Admin note: {r.adminNote}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3 text-center">
                  {r.totalReAttemptGrants > 0 ? (
                    <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] px-2.5 py-1 text-xs font-semibold text-(--color-primary)">
                      {r.totalReAttemptGrants}x
                    </span>
                  ) : (
                    <span className="text-xs text-(--color-muted)">0</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <RequestStatusBadge status={r.status} />
                  {r.status === "rejected" && r.rejectionCooldownDays && (
                    <p className="text-xs text-(--color-muted) mt-1">
                      Cooldown: {r.rejectionCooldownDays}d
                    </p>
                  )}
                </td>

                <td className="px-4 py-3">
                  {r.status === "pending" && (
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        onClick={() => handleApprove(r)}
                        disabled={reviewMutation.isPending}
                        className="rounded-lg border border-(--color-primary) px-3 py-1.5 text-xs font-semibold text-(--color-primary) hover:bg-(--color-primary) hover:text-white transition disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(r)}
                        disabled={reviewMutation.isPending}
                        className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {r.status !== "pending" && (
                    <p className="text-xs text-right text-(--color-muted)">
                      Reviewed
                    </p>
                  )}
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-(--color-muted)">
                  No re-attempt requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

const RequestStatusBadge = ({ status }) => {
  const styles = {
    pending:
      "border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-700/40 dark:bg-yellow-900/20 dark:text-yellow-300",
    approved:
      "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-(--color-primary)",
    rejected:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] || styles.pending}`}
    >
      {status}
    </span>
  );
};

export default AdminReAttempts;
