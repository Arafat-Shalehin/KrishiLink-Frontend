import { useContext, useMemo } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import useAuthProfile from "@/Hooks/useAuthProfile";
import useAdminOverview from "@/Hooks/admin/useAdminOverview";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAdminCropStatusMutation } from "@/Hooks/admin/mutations/useAdminMutations";
import AdminOverviewSkeleton from "./AdminOverviewSkeleton";

const KpiCard = ({ title, value, hint, to, tone = "primary" }) => {
  const toneClasses =
    tone === "danger"
      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200"
      : tone === "warning"
        ? "border-[color-mix(in_srgb,var(--color-accent)_35%,transparent) bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent) text-(--color-text)"
        : "border-[color-mix(in_srgb,var(--color-primary)_25%,transparent) bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent) text-(--color-text)";

  const content = (
    <div
      className={`rounded-2xl border p-4 transition hover:shadow-sm ${toneClasses}`}
    >
      <p className="text-xs font-semibold opacity-80">{title}</p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
      {hint ? <p className="mt-1 text-xs opacity-80">{hint}</p> : null}
    </div>
  );

  return to ? (
    <Link
      to={to}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
    >
      {content}
    </Link>
  ) : (
    content
  );
};

const TableShell = ({ title, subtitle, children, action }) => (
  <div className="rounded-2xl border border-(--color-border) bg-(--color-surface)">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-(--color-border) px-4 py-4">
      <div>
        <h3 className="text-sm font-bold text-(--color-text)">{title}</h3>
        {subtitle ? (
          <p className="text-xs text-(--color-muted)">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const StatusPill = ({ value }) => {
  const v = String(value || "").toLowerCase();
  const cls =
    v === "pending"
      ? "border-[color-mix(in_srgb,var(--color-accent)_35%,transparent) bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent) text-(--color-text)"
      : v === "approved" || v === "accepted"
        ? "border-[color-mix(in_srgb,var(--color-primary)_35%,transparent) bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent) text-(--color-primary)"
        : v === "rejected"
          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200"
          : "border-(--color-border) bg-(--color-bg) text-(--color-muted)";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${cls}`}
    >
      {value || "—"}
    </span>
  );
};

const AdminOverview = () => {
  const { user } = useContext(AuthContext);
  const { dbUser, loading: profileLoading } = useAuthProfile(user);
  const cropStatusMut = useAdminCropStatusMutation();

  const isAdmin = dbUser?.role === "admin";
  const { data, isLoading, isError } = useAdminOverview(isAdmin);

  const stats = data?.stats || {};
  const recentRequests = data?.recentRequests || [];
  const recentHiddenCrops = data?.recentHiddenCrops || [];

  const interestChart = useMemo(() => {
    return [
      { name: "Pending", value: stats.pendingInterests ?? 0 },
      { name: "Accepted", value: stats.acceptedInterests ?? 0 },
      { name: "Rejected", value: stats.rejectedInterests ?? 0 },
    ];
  }, [stats]);

  const toggleCropStatus = async (crop) => {
    const nextStatus = crop.status === "active" ? "hidden" : "active";

    const result = await Swal.fire({
      title: "Change crop visibility?",
      text:
        nextStatus === "active"
          ? "Approve and make this crop visible publicly?"
          : "Hide this crop from the public listing?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2F855A",
      cancelButtonColor: "#8B5E34",
    });

    if (!result.isConfirmed) return;

    try {
      await cropStatusMut.mutateAsync({ id: crop._id, status: nextStatus });
      toast.success("Crop status updated.");
    } catch (e) {
      toast.error(
        e?.response?.data?.message || "Failed to update crop status.",
      );
    }
  };

  if (profileLoading) return <AdminOverviewSkeleton />;
  if (isLoading) return <AdminOverviewSkeleton />;
  if (isError)
    return (
      <p className="text-sm text-(--color-muted)">
        Failed to load admin overview.
      </p>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-(--color-text)">
          Admin <span className="text-(--color-primary)">Overview</span>
        </h1>
        <p className="mt-2 text-sm text-(--color-muted)">
          Monitor platform health, approvals, moderation queue, and user safety
          signals.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/dashboard/admin/requests"
            className="rounded-xl bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white hover:brightness-95 transition"
          >
            Review Requests
          </Link>
          <Link
            to="/dashboard/admin/crops"
            className="rounded-xl border border-(--color-secondary) px-4 py-2 text-sm font-semibold text-(--color-secondary)
            hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent) transition"
          >
            Moderate Crops
          </Link>
          <Link
            to="/dashboard/admin/users"
            className="rounded-xl border border-(--color-border) bg-(--color-bg) px-4 py-2 text-sm font-semibold text-(--color-text)
            hover:border-(--color-primary) transition"
          >
            Manage Users
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Pending Farmer Requests"
          value={stats.pendingRequests ?? 0}
          hint="Needs admin decision"
          to="/dashboard/admin/requests"
          tone="warning"
        />
        <KpiCard
          title="Hidden Crops"
          value={stats.hiddenCrops ?? 0}
          hint="Awaiting approval"
          to="/dashboard/admin/crops"
          tone="warning"
        />
        <KpiCard
          title="Blocked Users"
          value={stats.blockedUsers ?? 0}
          hint="Safety & moderation"
          to="/dashboard/admin/users"
          tone="danger"
        />
        <KpiCard
          title="Total Interests"
          value={stats.totalInterests ?? 0}
          hint="Demand signals"
          tone="primary"
        />
        <KpiCard
          title="Accepted Deals"
          value={stats.acceptedDeals ?? 0}
          hint="Successful matches"
          tone="primary"
        />
      </div>

      {/* Chart + Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="lg:col-span-1 rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
          <h3 className="text-sm font-bold text-(--color-text)">
            Interest Status Distribution
          </h3>
          <p className="mt-1 text-xs text-(--color-muted)">
            Helps track marketplace friction and conversion.
          </p>

          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interestChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-3">
              <p className="text-[11px] font-semibold text-(--color-muted)">
                Pending
              </p>
              <p className="mt-1 text-lg font-extrabold text-(--color-text)">
                {stats.pendingInterests ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-3">
              <p className="text-[11px] font-semibold text-(--color-muted)">
                Accepted
              </p>
              <p className="mt-1 text-lg font-extrabold text-(--color-text)">
                {stats.acceptedInterests ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-3">
              <p className="text-[11px] font-semibold text-(--color-muted)">
                Rejected
              </p>
              <p className="mt-1 text-lg font-extrabold text-(--color-text)">
                {stats.rejectedInterests ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="lg:col-span-2 space-y-5">
          <TableShell
            title="Recent Farmer Requests"
            subtitle="Latest updates on farmer access requests."
            action={
              <Link
                to="/dashboard/admin/requests"
                className="text-sm font-semibold text-(--color-primary) hover:underline"
              >
                View all
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-(--color-bg) border border-(--color-border)">
                  <tr className="text-left">
                    <th className="px-3 py-2 font-semibold">User</th>
                    <th className="px-3 py-2 font-semibold">Role</th>
                    <th className="px-3 py-2 font-semibold">Request</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.length === 0 ? (
                    <tr>
                      <td
                        className="px-3 py-6 text-(--color-muted)"
                        colSpan={3}
                      >
                        No recent request activity.
                      </td>
                    </tr>
                  ) : (
                    recentRequests.map((u) => (
                      <tr
                        key={u._id}
                        className="border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent) transition"
                      >
                        <td className="px-3 py-3">
                          <p className="font-semibold text-(--color-text)">
                            {u.name || "—"}
                          </p>
                          <p className="text-xs text-(--color-muted)">
                            {u.email}
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <StatusPill value={u.role} />
                        </td>
                        <td className="px-3 py-3">
                          <StatusPill value={u.farmerRequest?.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TableShell>

          {/* Moderation Queue */}
          <TableShell
            title="Moderation Queue (Hidden Crops)"
            subtitle="New crops are hidden by default. Approve them to go live."
            action={
              <Link
                to="/dashboard/admin/crops"
                className="text-sm font-semibold text-(--color-primary) hover:underline"
              >
                View all
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-(--color-bg) border border-(--color-border)">
                  <tr className="text-left">
                    <th className="px-3 py-2 font-semibold">Crop</th>
                    <th className="px-3 py-2 font-semibold">Owner</th>
                    <th className="px-3 py-2 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {recentHiddenCrops.length === 0 ? (
                    <tr>
                      <td
                        className="px-3 py-6 text-(--color-muted)"
                        colSpan={3}
                      >
                        No hidden crops waiting.
                      </td>
                    </tr>
                  ) : (
                    recentHiddenCrops.map((c) => (
                      <tr
                        key={c._id}
                        className="border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent) transition"
                      >
                        <td className="px-3 py-3">
                          <p className="font-semibold text-(--color-text)">
                            {c.name}
                          </p>
                          <p className="text-xs text-(--color-muted)">
                            {c.type} • {c.location}
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-semibold text-(--color-text)">
                            {c?.owner?.ownerName || "—"}
                          </p>
                          <p className="text-xs text-(--color-muted)">
                            {c?.owner?.ownerEmail || "—"}
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <button
                            onClick={() => toggleCropStatus(c)}
                            disabled={cropStatusMut.isPending}
                            className="rounded-lg bg-(--color-primary) px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {cropStatusMut.isPending
                              ? "Working..."
                              : "Approve (Show)"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TableShell>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
