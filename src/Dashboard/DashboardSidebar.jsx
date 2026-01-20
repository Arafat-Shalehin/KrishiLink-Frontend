import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAuthProfile from "../Hooks/useAuthProfile";

const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "block rounded-xl px-3 py-2 text-sm font-semibold transition",
        isActive
          ? "bg-[var(--color-primary)] text-white"
          : "text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
      ].join(" ")
    }
  >
    {label}
  </NavLink>
);

const DashboardSidebar = () => {
  const { user } = useContext(AuthContext);
  const { dbUser } = useAuthProfile(user);

  const role = dbUser?.role;

  return (
    <aside className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm p-4">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
          Dashboard
        </p>
        <p className="mt-1 text-lg font-bold text-[var(--color-text)]">
          {dbUser?.name || user?.displayName || "User"}
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          Role: <span className="font-semibold">{role || "—"}</span>
        </p>
      </div>

      <div className="space-y-2">
        <SidebarLink to="/dashboard" label="Overview" />
        <SidebarLink to="/dashboard/profile" label="Profile" />

        {role === "buyer" && (
          <>
            <SidebarLink to="/dashboard/buyer" label="Buyer Dashboard" />
            <SidebarLink to="/dashboard/buyer/interests" label="My Interests" />
          </>
        )}

        {role === "farmer" && (
          <>
            <SidebarLink to="/dashboard/farmer" label="Farmer Dashboard" />
            <SidebarLink to="/dashboard/farmer/crops" label="My Crops" />
            <SidebarLink to="/dashboard/farmer/crops/add" label="Add Crop" />
            <SidebarLink
              to="/dashboard/farmer/interests"
              label="Crop Interests"
            />
          </>
        )}

        {/* Admin later */}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
