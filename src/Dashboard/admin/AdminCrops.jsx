import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "@/Components/Loader";
import useAdminCrops from "@/Hooks/admin/useAdminCrops";
import {
  useAdminCropStatusMutation,
  useAdminDeleteCropMutation,
} from "@/Hooks/admin/mutations/useAdminMutations";
import AdminTableSkeleton from "./AdminTableSkeleton";

const AdminCrops = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({ search, status, page, limit: 12 }),
    [search, status, page],
  );

  const { data, isLoading } = useAdminCrops(params, true);
  const crops = data?.crops || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 12 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  const statusMut = useAdminCropStatusMutation();
  const deleteMut = useAdminDeleteCropMutation();

  const confirmToggleStatus = async (crop) => {
    const nextStatus = crop.status === "active" ? "hidden" : "active";

    const result = await Swal.fire({
      title: "Change crop visibility?",
      text:
        nextStatus === "active"
          ? "Make this crop visible to everyone?"
          : "Hide this crop from public listing?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2F855A",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await statusMut.mutateAsync({ id: crop._id, status: nextStatus });
      toast.success("Crop status updated.");
    } catch (e) {
      toast.error(
        e?.response?.data?.message || "Failed to update crop status.",
      );
    }
  };

  const confirmDelete = async (crop) => {
    const result = await Swal.fire({
      title: "Delete this crop?",
      text: "This action will permanently remove the crop and its interests.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMut.mutateAsync({ id: crop._id });
      toast.success("Crop deleted.");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to delete crop.");
    }
  };

  if (isLoading)
    return <AdminTableSkeleton titleWidth="w-48" cols={4} rows={8} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-(--color-text)">
        Admin <span className="text-(--color-primary)">Crops</span>
      </h1>
      <p className="mt-2 text-sm text-(--color-muted)">
        Moderate crop listings (show/hide, delete).
      </p>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search name/type/location/owner..."
          className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm text-(--color-text)"
        />

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
          <option value="hidden">hidden</option>
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
              <th className="px-4 py-3 font-semibold">Crop</th>
              <th className="px-4 py-3 font-semibold">Owner</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {crops.map((crop) => (
              <tr
                key={crop._id}
                className="border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent) transition"
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-(--color-text)">
                    {crop.name}
                  </p>
                  <p className="text-xs text-(--color-muted)">
                    {crop.type} • {crop.location}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <p className="font-semibold text-(--color-text)">
                    {crop?.owner?.ownerName || "—"}
                  </p>
                  <p className="text-xs text-(--color-muted)">
                    {crop?.owner?.ownerEmail || "—"}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={[
                      "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
                      crop.status === "active"
                        ? "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent) bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent) text-(--color-primary)"
                        : "border-[color-mix(in_srgb,var(--color-accent)_30%,transparent) bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent) text-(--color-secondary)",
                    ].join(" ")}
                  >
                    {crop.status || "hidden"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => confirmToggleStatus(crop)}
                      className="rounded-lg border border-(--color-secondary) px-3 py-1.5 text-xs font-semibold text-(--color-secondary) hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent) transition"
                      disabled={statusMut.isPending}
                    >
                      {crop.status === "active" ? "Hide" : "Show"}
                    </button>

                    <button
                      onClick={() => confirmDelete(crop)}
                      className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition"
                      disabled={deleteMut.isPending}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {crops.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-(--color-muted)"
                >
                  No crops found.
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

export default AdminCrops;
