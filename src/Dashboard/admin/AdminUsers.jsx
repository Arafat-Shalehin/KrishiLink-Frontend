import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAdminUsers from "@/Hooks/admin/useAdminUsers";
import {
  useAdminUserRoleMutation,
  useAdminUserStatusMutation,
} from "@/Hooks/admin/mutations/useAdminMutations";
import Loader from "@/Components/Loader";
import AdminTableSkeleton from "./AdminTableSkeleton";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({ search, role, status, page, limit: 10 }),
    [search, role, status, page],
  );

  const { data, isLoading } = useAdminUsers(params, true);
  const users = data?.users || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10 };

  const statusMut = useAdminUserStatusMutation();
  const roleMut = useAdminUserRoleMutation();

  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const confirmAndSetStatus = async (u, nextStatus) => {
    const result = await Swal.fire({
      title: "Confirm action",
      text:
        nextStatus === "blocked"
          ? `Block ${u.email}? They will not be able to use the platform.`
          : `Unblock ${u.email}? They will regain access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2F855A",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await statusMut.mutateAsync({ id: u._id, status: nextStatus });
      toast.success("User status updated.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update status.");
    }
  };

  const confirmAndSetRole = async (u, nextRole) => {
    const result = await Swal.fire({
      title: "Change role?",
      text: `Change role of ${u.email} to "${nextRole}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2F855A",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await roleMut.mutateAsync({ id: u._id, role: nextRole });
      toast.success("User role updated.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update role.");
    }
  };

  if (isLoading)
    return <AdminTableSkeleton titleWidth="w-48" cols={4} rows={8} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-(--color-text)">
        Admin <span className="text-(--color-primary)">Users</span>
      </h1>
      <p className="mt-2 text-sm text-(--color-muted)">
        Manage user roles and access status.
      </p>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search by name/email..."
          className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm text-(--color-text)"
        />

        <select
          value={role}
          onChange={(e) => {
            setPage(1);
            setRole(e.target.value);
          }}
          className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm"
        >
          <option value="">All Roles</option>
          <option value="buyer">buyer</option>
          <option value="farmer">farmer</option>
          <option value="admin">admin</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="active">active</option>
          <option value="blocked">blocked</option>
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
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
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
                  <span
                    className={[
                      "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
                      u.status === "active"
                        ? "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent) bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent) text-(--color-primary)"
                        : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300",
                    ].join(" ")}
                  >
                    {u.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap justify-end gap-2">
                    {/* Block/Unblock */}
                    {u.status === "active" ? (
                      <button
                        onClick={() => confirmAndSetStatus(u, "blocked")}
                        className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition"
                        disabled={statusMut.isPending}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => confirmAndSetStatus(u, "active")}
                        className="rounded-lg border border-(--color-primary) px-3 py-1.5 text-xs font-semibold text-(--color-primary) hover:bg-(--color-primary) hover:text-white transition"
                        disabled={statusMut.isPending}
                      >
                        Unblock
                      </button>
                    )}

                    {/* Role */}
                    <select
                      value={u.role}
                      onChange={(e) => confirmAndSetRole(u, e.target.value)}
                      className="rounded-lg border border-(--color-border) bg-(--color-surface) px-2 py-1 text-xs"
                      disabled={roleMut.isPending}
                    >
                      <option value="buyer">buyer</option>
                      <option value="farmer">farmer</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-(--color-muted)"
                >
                  No users found.
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

export default AdminUsers;
